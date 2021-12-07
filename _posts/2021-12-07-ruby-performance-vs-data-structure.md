---
categories: optimization
date: 2021-12-07 19:00:00 +0200
excerpt: >
  The same problem can be solved in many different ways.
  Even if the algorithm is the same, changing the data structure can affect performance.
  The inspiration for this was Advent of Code.
lang: en
layout: post
title: Impact of data structure on performance in Ruby
---

The analyzed problem is from Advent of Code.
This problem is titled "[Day 6: Lanternfish][lanternfish]" (2021).
Skipping the plot, we can brief it like this:

As an input, we have a set of non-negative integers.
Each step will decrease all numbers by 1.
When the number becomes negative, it becomes 6.
Moreover, in this case, the new number 8 is also added to the set.

The most important thing is to build a method
that will allow us to simulate the next steps.
So it will convert input into new output.
Something like this, more or less:

```ruby
input = [3,4,3,1,2]
output = simulate(input)
output
 => [2,3,2,0,1]
```

Based on the example above,
the implementation of the `simulate` method could be as follows:

```ruby
def simulate(input)
  output = []
  input.each do |number|
    number -= 1
    if number < 0
      output += [6, 8]
    else
      output << number
    end
  end
  output
end
```

The solution is simple and works.
Probably enough in many cases.
There are only five numbers in the test data.
However, the real data for the problem contains a set of 300 numbers.
The first part of the task calls the simulation for 80 steps.
On my computer, it takes over a minute.

```shell
$ time ruby lanternfish.rb

real	1m25,829s
user	1m13,931s
sys	0m11,395s
```

The second part of the task requires 256 steps.
As you can guess, the increase is exponential.
The problem is not only the run time but also the memory used.
To increase performance, we need a different solution.

When we talk about a set of numbers, we intuitively mean an array.
In this way, we fall into the trap of thinking.
This does not mean that we think badly about the problem.
But that we impose our own limitations on the solution.
This makes it difficult for us to think out of the box.

If we analyze a few steps of the simulation,
we notice that the only possible numbers are between 0 and 8.
All zeros will behave the same in the current simulation step.
Also, all ones will decrease by 1.
Likewise, all twos, threes, fours...

## Changing the data structure

An example from the beginning can be written like this:

```ruby
# [3,4,3,1,2]
hash = {
  3 => 2, # we have 2 threes
  4 => 1, # we have 1 four
  1 => 1, # single 1
  2 => 1  # single 2
}
```

So we can convert an array of numbers to a hash.
The keys of this hash will be numbers in the array.
Values are the number of occurrences of these numbers.
For the input data from the task, our hash will look like this:

```ruby
hash = array.tally
hash
 => {1=>205, 4=>26, 2=>19, 5=>23, 3=>27}
```

It's worth remembering that the array contained 300 numbers.
We can immediately see that there is less data,
so they will probably also take up less memory.

The implementation of the `simulate` method doesn't change much.
We just have to remember that instead of operating on a single number,
we work with many of the same numbers.

```ruby
def simulate(input)
  output = Hash.new(0)
  input.each do |number, counter|
    number -= 1
    if number < 0
      output[6] += counter
      output[8] += counter
    else
      output[number] += counter
    end
  end
  output
end
```

The algorithm is the same.
The data structure has changed.
Does this little change affect the performance?

80 steps of simulation:

```shell
$ time ruby lanternfish.rb

real	0m0,083s
user	0m0,066s
sys	0m0,018s
```

65536 steps of simulation (much more steps than in the task):

```shell
$ time ruby lanternfish.rb

real	0m0,597s
user	0m0,584s
sys	0m0,012s
```

As you can see, this solution is as simple as the first.
It's also much faster.
All we had to do was adjust the data structure to the problem.
Everything else was a consequence of this process.

[lanternfish]: https://adventofcode.com/2021/day/6
