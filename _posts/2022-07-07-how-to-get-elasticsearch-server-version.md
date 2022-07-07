---
categories: tips
date: 2022-07-07 16:00:00 +0200
excerpt: >
  A few ways to get the ElasticSearch version.
lang: en
layout: post
title: Different ways to get ElasticSearch server version
---

I have an ElasticSearch update planned.
To do this, I need to know what version of ElasticSearch I'm using.
Let's see how we can find out.

ElasticSearch listens on port 9200 by default and uses the http protocol.
So let's use `curl` to see what we get.
I will use `curl -sS` instead of `curl -s -XGET`.
Mainly because it is shorter.

```shell
$ curl -sS localhost:9200
{
  "name" : "RZIuBEo",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "Vcgf8fy-SZKMMPrYiLOkoQ",
  "version" : {
    "number" : "6.8.0",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "65b6179",
    "build_date" : "2019-05-15T20:06:13.172855Z",
    "build_snapshot" : false,
    "lucene_version" : "7.7.0",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

As we can see, the version of ElasticSearch in this case is `6.8.0`.
But is there a way to parse ElasticSearch response and get the version number only?

## ElasticSearch version in command line

Since ElasticSearch allows response filtering, it's worth taking advantage of this.

```shell
$ curl -sS localhost:9200?filter_path=version.number
{
  "version" : {
    "number" : "6.8.0"
  }
}
```

This JSON is pretty, but we prefer the one-line answer.

```shell
$ curl -sS 'localhost:9200?filter_path=version.number&pretty=false'
{"version":{"number":"6.8.0"}}
```

Now we can use `awk` to select just the version number of ElasticSearch.

```shell
$ curl -sS 'localhost:9200?filter_path=version.number&pretty=false' | awk -F'"' {'print $6'}
6.8.0
```

## ElasticSearch version in Ruby

In Ruby we can use the ElasticSearch Ruby client.
We will use the class `Elasticsearch::Client`,
whose instance has an info method.

```ruby
[1] pry(main)> client = Elasticsearch::Client.new log: true
=> #<Elasticsearch::Client ... >

[2] pry(main)> client.info
ETHON: performed EASY effective_url=http://localhost:9200/ response_code=200 return_code=ok total_time=0.018911
ETHON: performed EASY effective_url=http://localhost:9200/ response_code=200 return_code=ok total_time=0.027988
=> {"name"=>"RZIuBEo",
 "cluster_name"=>"docker-cluster",
 "cluster_uuid"=>"Vcgf8fy-SZKMMPrYiLOkoQ",
 "version"=>
  {"number"=>"6.8.0",
   "build_flavor"=>"default",
   "build_type"=>"docker",
   "build_hash"=>"65b6179",
   "build_date"=>"2019-05-15T20:06:13.172855Z",
   "build_snapshot"=>false,
   "lucene_version"=>"7.7.0",
   "minimum_wire_compatibility_version"=>"5.6.0",
   "minimum_index_compatibility_version"=>"5.0.0"},
 "tagline"=>"You Know, for Search"}
```

And we get the ElasticSearch version number in Ruby as follows:

```ruby
[1] pry(main)> Elasticsearch::Client.new.info.dig('version', 'number')
ETHON: Libcurl initialized
ETHON: performed EASY effective_url=http://localhost:9200/ response_code=200 return_code=ok total_time=0.015663
ETHON: performed EASY effective_url=http://localhost:9200/ response_code=200 return_code=ok total_time=0.00251
=> "6.8.0"
```

There are many other ways.
If I find them, I will complete this post.
