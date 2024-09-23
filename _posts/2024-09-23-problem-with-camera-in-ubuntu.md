---
categories: tips
date: 2024-09-23 11:30:00 +0200
excerpt: >
  Yesterday Ubuntu saw the webcam, today it doesn't.
  I'm looking for the cause of the problem.
lang: en
layout: post
title: Problem with camera in Ubuntu
---

I'm writing this post from the perspective of an Ubuntu user.
It is meant to help me solve a camera issue more easily in the future.
I don't want to do the research again, so I decided to publish my notes.
🗒️

Hopefully, someone else will also find this content useful.

The camera works on my laptop.
The issue occurs on Agnieszka's laptop.
BTW, I recommend her [blog Woman on Rails](https://womanonrails.com).
She doesn't have access to the camera.
🚫
🎥

The simplest solution: **restart your computer**.
🚀

Sometimes, hardware-related issues like this
can be resolved simply by rebooting the system,
🔌
as it forces the OS to reinitialize device drivers.

TL;DR

In Linux, devices are represented as files.
The camera should appear under the path `/dev/video0`.

```console
$ sudo ls -l /dev/video*
ls: cannot access '/dev/video*': No such file or directory
```

On my laptop, the same command looks like this:

```console
$ sudo ls -l /dev/video*
crw-rw----+ 1 root video 81, 0 /dev/video0
crw-rw----+ 1 root video 81, 1 /dev/video1
```

Ensure the user is part of the `video` group to access camera devices.
🛡️
Permissions may be granted directly (the user belongs to the video group)
or indirectly (the user belongs to a group with higher access).
The `groups` command will help you check
which groups your user is directly assigned to.

If needed, you can add your user to the `video` group:

```console
sudo usermod -aG video $USER
```

Ubuntu has tools to manage video from the command line.
The package is called [v4l-utils](https://linuxtv.org/wiki/index.php/V4l-utils)
and it can be easily installed using apt.
The `v4l-utils` is a collection of command-line tools
that allow you to manage and troubleshoot video devices in Linux.

I installed this package on both computers.
🔧

```console
$ sudo apt install v4l-utils
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  libv4l2rds0
The following NEW packages will be installed:
  libv4l2rds0 v4l-utils
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
...
```

On the problematic laptop, I ran the following command:

```console
$ sudo v4l2-ctl --list-devices -D
Cannot open device /dev/video0, exiting.
```

For comparison, I ran the same command on my laptop:

<!-- markdownlint-disable MD013 -->
```console
$ sudo v4l2-ctl --list-devices -D
USB2.0 HD UVC WebCam: USB2.0 HD (usb-0000:00:14.0-5):
  /dev/video0
  /dev/video1
  /dev/media0

Driver Info:
  Driver name      : uvcvideo
  Card type        : USB2.0 HD UVC WebCam: USB2.0 HD
  Bus info         : usb-0000:00:14.0-5
  Driver version   : 6.8.12
  Capabilities     : 0x84a00001
    Video Capture
    Metadata Capture
    Streaming
    Extended Pix Format
    Device Capabilities
  Device Caps      : 0x04200001
    Video Capture
    Streaming
    Extended Pix Format
Media Driver Info:
  Driver name      : uvcvideo
  Model            : USB2.0 HD UVC WebCam: USB2.0 HD
  Serial           : 0x0001
  Bus info         : usb-0000:00:14.0-5
  Media version    : 6.8.12
  Hardware revision: 0x00005828 (22568)
  Driver version   : 6.8.12
Interface Info:
  ID               : 0x03000002
  Type             : V4L Video
Entity Info:
  ID               : 0x00000001 (1)
  Name             : USB2.0 HD UVC WebCam: USB2.0 HD
  Function         : V4L2 I/O
  Flags            : default
  Pad 0x01000007   : 0: Sink
    Link 0x02000010: from remote pad 0x100000a of entity 'Extension 4' (Video Pixel Formatter): Data, Enabled, Immutable
```
<!-- markdownlint-enable MD013 -->

The system is up to date.
The laptop is not damaged.

The only solution that comes to mind is a restart.
🔄
After restarting the laptop, the camera starts working.

I reused the previous commands and this time the result was different:

```console
$ sudo ls -l /dev/video*
crw-rw----+ 1 root video 81, 0 /dev/video0
crw-rw----+ 1 root video 81, 1 /dev/video1
crw-rw----+ 1 root video 81, 2 /dev/video2
crw-rw----+ 1 root video 81, 3 /dev/video3
```

<!-- markdownlint-disable MD013 -->
```console
$ sudo v4l2-ctl --list-devices -D
Chicony USB2.0 Camera: Chicony  (usb-0000:00:14.0-7):
  /dev/video0
  /dev/video1
  /dev/video2
  /dev/video3
  /dev/media0
  /dev/media1

Driver Info:
  Driver name      : uvcvideo
  Card type        : Chicony USB2.0 Camera: Chicony
  Bus info         : usb-0000:00:14.0-7
  Driver version   : 6.2.16
  Capabilities     : 0x84a00001
    Video Capture
    Metadata Capture
    Streaming
    Extended Pix Format
    Device Capabilities
  Device Caps      : 0x04200001
    Video Capture
    Streaming
    Extended Pix Format
Media Driver Info:
  Driver name      : uvcvideo
  Model            : Chicony USB2.0 Camera: Chicony
  Serial           : 01.00.00
  Bus info         : usb-0000:00:14.0-7
  Media version    : 6.2.16
  Hardware revision: 0x00000002 (2)
  Driver version   : 6.2.16
Interface Info:
  ID               : 0x03000002
  Type             : V4L Video
Entity Info:
  ID               : 0x00000001 (1)
  Name             : Chicony USB2.0 Camera: Chicony
  Function         : V4L2 I/O
  Flags            : default
  Pad 0x01000007   : 0: Sink
    Link 0x02000013: from remote pad 0x100000a of entity 'Extension 4' (Video Pixel Formatter): Data, Enabled, Immutable
```
<!-- markdownlint-enable MD013 -->

It looks like a **restart** did the trick.
The cause of the issue is unknown,
but I will monitor if the problem occurs again.

If the issue persists,
I will check the system logs with `dmesg | grep video`
or `journalctl -xe` might provide more insight.

So far I don't see anything disturbing:

<!-- markdownlint-disable MD013 -->
```console
$ sudo dmesg | grep video
[    3.097705] videodev: Linux video capture interface: v2.00
[    3.211353] usbcore: registered new interface driver uvcvideo
[    4.791222] ACPI: video: Video Device [GFX0] (multi-head: yes  rom: no  post: no)
```
<!-- markdownlint-enable MD013 -->

However, deeper research allowed me to better understand
the possible causes of the problems.
Common reasons for camera issues in Ubuntu include missing drivers,
conflicts with other software,
or power management settings disabling the camera.

This guide should help you troubleshoot basic camera issues in Ubuntu.
Hopefully, it saves you some time and frustration!
😄
