---
categories: tips
date: 2022-08-03 08:00:00 +0200
excerpt: >
  When docker images take up too much space, you need to clean up.
lang: en
layout: post
title: What to pay attention to your docker will have space?
---

Recently, when I was using Dockers extensively,
I hit the limits of the root partition.
It was a big problem because it made it difficult for me to complete my tasks.
When I noticed that the "/" partition was 100% consumed,
I understood what happened.

Out of habit, when I install the operating system,
I divide my disk into several partitions.
This allows me to safely make various system-level changes without losing any data.

## Delete unused resources

The first step to increasing the space for Dockers is to remove unnecessary resources.
Old containers, images and volumes can be deleted with the command:

```console
$ docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

Are you sure you want to continue? [y/N] Y
Deleted Containers:
c7e8e2311c7f70a47f1a95787a5af55aa622732323e489d2135c06d257d91e5a
693cddf05fd0ede842576b39ccab3bcb0b6a89af7f639b753361ee118c2e9d2e
778b082b7fd4ff95e7600dab334778173fc56137404fe8cf3774b9f70781dcdd
bb06d0e44f960f1dee3e4a029b56e283978b9052f6a8d9d75cdc17821ec4f1a7

Total reclaimed space: 10.52MB
```

However, if you want to really clean up
and remove everything as it goes,
you have to add the `--all` option.

> Options: -a, --all
> Remove all unused images not just dangling ones

```console
$ docker system prune -a
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them
  - all build cache

Are you sure you want to continue? [y/N] Y
Deleted Images:
untagged: mysql:5.7
untagged: mysql@sha256:b3a86578a582617214477d91e47e850f9e18df0b5d1644fb2d96d91a340b8972
deleted: sha256:3147495b3a5ce957dee2319099a8808c1418e0b0a2c82c9b2396c5fb4b688509
deleted: sha256:326f57ec4510699d8f5e3286acab31c7fc5ff52030615178fc61a4e4e2666792
deleted: sha256:d5d890fe2493dddb27d7a9afe6efc2deab86a3d0d14bb55d61130ea92552234d
deleted: sha256:7fe3127c1b80dad856024ddbe4962beaadc360578de21cc24ff3f65898472ded
deleted: sha256:dff3729e0a6b6be8c74937ee796802973b5b4164042d517174a57026b77c8c60
deleted: sha256:f80a7c9d6763bc45d9f4a75b54304b9bb801d5c87d0848a22229f62a5b7a9dfc
deleted: sha256:27e299d6421f0c88f5f5c82cac2f51884e28351240838cd835a133628a1b03bc
deleted: sha256:9c23e82c5e50b4a1ba1978cb47a5028061609ddd0057c774bbf722e4b518a7c6
deleted: sha256:23da32aa7c7218232a08036f50e8e60417f89d172a8381309e221680497e223f
deleted: sha256:5a7d5cbcd5f100b4e3f3ce6f53766ca33c6464e86e29f6da96a070f9cd3deab2
deleted: sha256:8a6b5d70d43734f669f9c99f8c0d92923520787eca7c91a7a161d0a7064d85c8
deleted: sha256:9ba403017e5ec778c95a5c4673f9d9c36ddf94e30fcb47959142a9e89d6606ea
untagged: redis:5.0
untagged: redis@sha256:db4cd4378475a4d837ad15775a7655b7d1ca6a805875326a179b144a032a4816
deleted: sha256:51ee7ad62e146fe20db6f0eb73b69824efb34a4e979701404a441806844139bd
deleted: sha256:54c092a8a9097eaa60a827c46891ec3e5ce69146b0f46d2999297da6a2ba2d0c
deleted: sha256:e280271cadb23fc78a63a86861e6c3d2cd2426eda6aff6386d41960e577041b8
deleted: sha256:89f28cb8a1b7a9ed363858aa6df1fef75f716f6543724f5f3de27e401ea8b18d
deleted: sha256:f49c8f092e2cd4e9edea8a291179b8739ff6a00388fa54adbe1d9cda0d9165ad
deleted: sha256:d8210c42291129dc028e4e54e2cdfee11a5af3afc85ae6aba8682d7049d38123
deleted: sha256:43b3c4e3001c662d1c264ffb132f4e52950893452b15508df810214f1d3f124b
untagged: docker.elastic.co/elasticsearch/elasticsearch:6.8.23
untagged: docker.elastic.co/elasticsearch/elasticsearch@sha256:ca5dac2352e09263e55cccac445d69a0d2eec9c8c26a4c95c3b1430de1f427f2
deleted: sha256:9a2652c5f453b2f21ac32f841a6ed1897097741d69a1a4cc1947f58fae0d04b4
deleted: sha256:36374e7590640999b28edada266a11149f91d16b1e8e58ae785e0a0205900f6b
deleted: sha256:21ac4414df9fe08c52e4a209bc861a8b108898bf067ccdfe202e58f5916301c8
deleted: sha256:c86490f19ff6e9986833579e816e43ed1a615417eceb4ec2a60129271b825176
deleted: sha256:0474a4c0c93495f29d29dbaea2afe4abce1f03f7d94de9eb9ae58c515edf17ae
deleted: sha256:a411bf54654d45047f01ff39887249f2059b5f5d7f5e750f2243b7066a8acbc5
deleted: sha256:3adeb19d685bebcccb1c04583d4b5482386b9e636c9368f8d9431d420574e7be
deleted: sha256:174f5685490326fc0a1c0f5570b8663732189b327007e47ff13d2ca59673db02

Total reclaimed space: 1.504GB
```

## Change the location of Dockers

Since I have partitions whose size is much larger than the root partition,
I decided to move Dockers there.

I have created the folder.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD014 -->
```console
$ sudo mkdir -p /larger-partition/new-path/docker
```
<!-- markdownlint-restore -->

I stopped all Dockers.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD014 -->
```console
$ sudo systemctl stop docker.service
$ sudo systemctl stop docker.socket
```
<!-- markdownlint-restore -->

Alternatively, you can also use `service` command.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD014 -->
```console
$ sudo service docker stop
```
<!-- markdownlint-restore -->

In the `/lib/systemd/system/docker.service` file
in the `ExecStart` line I added the `-g` option.

```text
ExecStart=/usr/bin/dockerd -g /larger-partition/new-path/docker -H fd:// --containerd=/run/containerd/containerd.sock
```

BTW I tried the `--data-root` option before but it didn't work.

It will be a good practice to copy the contents of the docker folder
from the previous place.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD014 -->
```console
$ sudo rsync -aqxP /var/lib/docker/ /larger-partition/new-path/docker
```
<!-- markdownlint-restore -->

Then we need to reload the configuration.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD014 -->
```console
$ sudo systemctl daemon-reload
```
<!-- markdownlint-restore -->

And restart Dockers.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD014 -->
```console
$ sudo systemctl start docker
```
<!-- markdownlint-restore -->

It should also work:

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD014 -->
```console
$ sudo service docker start
```
<!-- markdownlint-restore -->

We can check if our configuration works in various ways.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ ps aux | grep -i docker | grep -v grep
root     29809  0.0  0.6 1126468 81192 ?       Ssl  08:00   0:00 /usr/bin/dockerd -g /larger-partition/new-path/docker -H fd:// --containerd=/run/containerd/containerd.sock
```
<!-- markdownlint-restore -->

Another way is:

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ sudo service docker status
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2022-08-03 08:00:00 CEST; 1min 43s ago
     Docs: https://docs.docker.com
 Main PID: 29809 (dockerd)
    Tasks: 13
   CGroup: /system.slice/docker.service
           └─29809 /usr/bin/dockerd -g /larger-partition/new-path/docker -H fd:// --containerd=/run/containerd/containerd.sock

dockerd[29809]: time="2022-08-03T08:00:00.245746796+02:00" level=warning msg="Your kernel does not support swap memory limit"
dockerd[29809]: time="2022-08-03T08:00:00.245783818+02:00" level=warning msg="Your kernel does not support cgroup rt period"
dockerd[29809]: time="2022-08-03T08:00:00.245794700+02:00" level=warning msg="Your kernel does not support cgroup rt runtime"
dockerd[29809]: time="2022-08-03T08:00:00.246801231+02:00" level=info msg="Loading containers: start."
dockerd[29809]: time="2022-08-03T08:00:00.373930443+02:00" level=info msg="Default bridge (docker0) is assigned with an IP address 172.17.0.0/16. Daemon option --bip can be used to set a pr
dockerd[29809]: time="2022-08-03T08:00:00.420883236+02:00" level=info msg="Loading containers: done."
dockerd[29809]: time="2022-08-03T08:00:00.540268430+02:00" level=info msg="Docker daemon" commit=5eb3275d40 graphdriver(s)=overlay2 version=19.03.14
dockerd[29809]: time="2022-08-03T08:00:00.540864012+02:00" level=info msg="Daemon has completed initialization"
dockerd[29809]: time="2022-08-03T08:00:00.569335225+02:00" level=info msg="API listen on /var/run/docker.sock"
systemd[1]: Started Docker Application Container Engine.
```
<!-- markdownlint-restore -->

If, despite the changes, you do not see the new path in the above commands,
you can finally restart your computer.

Finally, we managed to move Docker to another folder and do some cleanup.
