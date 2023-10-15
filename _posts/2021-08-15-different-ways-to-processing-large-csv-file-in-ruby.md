---
categories: optimization
date: 2021-08-15 20:00:00 +0200
excerpt: >
  There is no one perfect way to process large files.
  It depends on the file format, data structure, project requirements, system limitations, etc.
  In a word, each case may have a different optimal solution.
  Let's do a brief analysis in the Ruby programming language.
lang: en
layout: post
title: Different ways to processing large CSV file in Ruby
---

Processing large files in Ruby depends on so many factors
that it is impossible to present all combinations of solutions.
Therefore, I decided to do an analysis of the different parts of the solutions.
I believe that everyone will choose what best suits the real case.

## Introduction to problem

Recently, in the project,
we added a new column to the users table related to the last seen date.
The mechanism for completing this field while using the application has
also been added.
However, not all users are so active.
We want to backfill this column with dates.
The necessary data is available from another source (possibly Snowflake).
Anyway, they can be exported to a CSV file.
This file has over 16 million records.
It shows the scale of the challenge.

### Measure memory usage and time speed

For measuring and printing the memory used and time spent,
I used similar methods as [Dalibor Nasevic][dalibor-nasevic]
in the article "Processing large CSV files with Ruby".

```ruby
require 'benchmark'

def print_memory_usage
  memory_command = "ps -o rss= -p #{Process.pid}"
  memory_before = %x(#{memory_command}).to_i
  yield
  memory_after = %x(#{memory_command}).to_i
  puts "Memory: #{((memory_after - memory_before) / 1024.0).round(2)} MB"
end

def print_time_spent(&block)
  time = Benchmark.realtime(&block)
  puts "Time: #{time.round(2)}"
end

print_memory_usage do
  print_time_spent do
    ...
  end
end
```

#### Is RSS column from ps command enough?

**RSS** is Resident Set Size, and this is the size of memory
that the process is currently using to load (on all pages of memory).
It means that shared libraries that need to be loaded only once
will be counted for each process separately.
So we get a pessimistic value of memory usage.

### First implementation

We have a big CSV file whose structure looks like this:

```csv
user_id,last_visit_at
1,2021-08-15T20:00:00Z
...
```

Due to the fact that we are working with over 16M users,
we have decided to minimize the memory consumption as much as possible.
The above-mentioned article by [Dalibor Nasevic][dalibor-nasevic]
helped with choosing the way of implementation.
For each line in the CSV file, we parsed the data,
looked for the appropriate record in the database,
and updated its value.
Code in Ruby on Rails might look something like this:

```ruby
CSV.foreach('user_last_visits.csv', headers: true).with_index do |row, index|
  last_visit_at = Date.parse(row['last_visit_at'])
  user_id = row['user_id'].to_i
  user = User.find_by(id: user_id, last_seen_on: nil)
  user.update_columns(last_seen_on: last_visit_at) if user
end
```

Memory consumption is low (a few MB).
However, the code works sequentially, step by step.
We have achieved low memory consumption at the expense of speed.

## Different ways of load data

Let's check the memory consumption and speed of loading a CSV file
with 16 million lines by itself.

```ruby
CSV.foreach('16_million_lines.csv', headers: true).with_index do |row, index|
  last_visit_at = Date.parse(row['last_visit_at'])
  user_id = row['user_id'].to_i
end
```

The results are:

```text
Time: 270.65
Memory: 19.19 MB
```

Let's break the code above into smaller pieces.

### Load file using CSV.foreach

```ruby
CSV.foreach('16_million_lines.csv', headers: true).with_index do |row, index|
end
```

The results are:

```text
Time: 69.1
Memory: 6.7 MB
```

### Load CSV File using File class

The structure of our CSV file is very simple.
We only have two columns.
So we can take a risk and use `File` class instead of `CSV` class.

```ruby
File.open('16_million_lines.csv', 'r').each_line do |line|
end
```

The results are:

```text
Time: 4.9
Memory: 15.98 MB
```

Higher memory consumption translated into the speed of loading.

### Load data into Hash

Let's try to create a hash with the loaded data.
We will skip data parsing.

```ruby
CSV.foreach('16_million_lines.csv', headers: true).with_index do |row, index|
  hash[row['user_id']] = row['last_visit_at']
end
```

The results are:

```text
Time: 152.96
Memory: 2336.32 MB
```

### Load data into Hash using the File class

Let's see what we get when we use File class instead of CSV class.
Of course, we have to parse the CSV file ourselves,
but in this case,
it's trivial.

```ruby
hash = {}
File.open('16_million_lines.csv', 'r').each_line do |line|
  user_id, last_visit_at = line.split(',')
  hash[user_id] = last_visit_at
end
```

The results are:

```text
Time: 38.58
Memory: 2258.76 MB
```

The memory consumption is similar, but the speed is much faster.
It's probably because the CSV class provides data validation.
We believe the data is correct.
We know that the columns are separated by a comma,
and therefore we are doing a split.

## Better understand own data

The important thing is that we want to store the last seen date in the database.
In the first version of the implementation,
the input file contains the columns `user_id` and `last_visit_at`.
This means that we have objects of the `DateTime` class as input.
However, we actually need `Date` objects.

### Prepare CSV data sample

So let's prepare a data sample file,
but containing last_visit_on (Date class)
instead of last_visit_at (DateTime class).
I will assume that the dates will be randomly selected
between the beginning of 2013
and the publication date of this article.

```ruby
file = File.open('16_million_lines.csv', 'w')
file.write("user_id,last_visit_on\n")
date_range = Date.parse('2013-01-01')..Date.parse('2021-08-15')
(1..16_000_000).each do |id|
  file.write("#{id},#{rand(date_range)}\n")
  puts id if id % 10000 == 0
end
file.close
```

Note that id is always an integer.
Arrays with numbers take up less memory than hashes.

### Group by dates

Imagine the following example:

```csv
user_id, last_seen_on
1, 2021-08-15
2, 2019-09-21
3, 2021-08-15
4, 2020-09-20
5, 2019-09-21
```

If the user id is a key and data is a value, we get a hash like below:

```ruby
{
  1 => '2021-08-15',
  2 => '2019-09-21',
  3 => '2021-08-15',
  4 => '2020-09-20',
  5 => '2019-09-21'
}
```

However, we can do the opposite.
Let date be the key.
In this case, multiple user ids will have the same key.
We can store the user ids in an array.

```ruby
{
  '2021-08-13' => [1, 3],
  '2019-09-21' => [2, 5],
  '2020-09-20' => [4]
}
```

We will use the `File` class instead of the `CSV` class
to make it easier to compare to the previous results.
We also need to skip the line containing the header.
Here is an example code:

```ruby
hash = {}
File.open('16_million_lines.csv', 'r').each_line do |line|
  next if line == "user_id,last_visit_on\n"

  user_id, last_visit_on = line.strip.split(',')
  hash[last_visit_on] ||= []
  hash[last_visit_on] << user_id.to_i
end
```

The results are:

```text
Time: 24.31
Memory: 143.16 MB
```

Thanks to the change of the data structure used,
it was possible to go down from 2258.76 MB to 143.16 MB.

## Final implementation

In addition to reducing the size of the memory used,
this method will have another advantage.
User ids with the same dates can be updated in one SQL query.
The more data we group, the fewer queries we make.
It means that the pessimistic number of the groups
created based on the dates
from 2013 to 2021 is 3285 (9 years * 365 days).

I have not used the phrase "pessimistic number of queries" here,
but "pessimistic number of the groups".
There will probably be more SQL queries
because too large a group would lock the database.
Therefore, we will have to divide
individual groups into a batch of records.

```ruby
hash = {}
File.open('16_million_lines.csv', 'r').each_line do |line|
  next if line == "user_id,last_visit_on\n"

  user_id, last_visit_on = line.strip.split(',')
  hash[last_visit_on] ||= []
  hash[last_visit_on] << user_id.to_i
end

hash.each do |last_visit_on, user_ids|
  User.where(id: user_ids, last_seen_on: nil).find_in_batches do |group|
    users = User.where(id: group.pluck(:id))
    users.update_all(last_seen_on: last_visit_on)
  end
end
```

The results are:

```text
Time: 9933.15
Memory: 291.14 MB
```

Even though the amount of memory used has doubled,
it is still a small value.
Speed time is, of course, highly dependent on the inputs (groups of dates).
However, it will be much faster than saving sequentially.

## Summary

I've learned that a better understanding of a problem
allows us to find a better solution.
Optimizing for one parameter is not always the best solution.
We should look for alternative implementations.
And ask the right questions.

### Use of the solution in production

Below I present the logs after launching my solution in production.

```text
Mon Aug 16 18:57:57 CEST 2021 Task started with ID 57cd08e0dae943a5b352c138193edbaf
Mon Aug 16 18:58:44 CEST 2021 Running
Mon Aug 16 22:11:44 CEST 2021 Downloading file from S3 bucket
Mon Aug 16 22:11:44 CEST 2021 Starting a long process
Mon Aug 16 22:11:44 CEST 2021 Reading a CSV file user_last_visits_on.csv
Mon Aug 16 22:11:44 CEST 2021 Number of different dates: 2938
Mon Aug 16 22:11:44 CEST 2021 Number of data rows in input file: 17027248
Mon Aug 16 22:11:44 CEST 2021 Backfilling the last_seen_on column for users
Mon Aug 16 22:11:44 CEST 2021 Successfully completed
Mon Aug 16 22:11:44 CEST 2021 Number of users with no last_seen_on value: 4
Mon Aug 16 22:11:44 CEST 2021 Memory: 273.11 MB
Mon Aug 16 22:12:09 CEST 2021 Finished
```

There were exactly 17027248 rows in the CSV file representing 2938 different dates.
This process took 3 hours 14 minutes 12 seconds and took 273.11 MB of RAM.
It was perfectly acceptable to us.

[dalibor-nasevic]: https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby
