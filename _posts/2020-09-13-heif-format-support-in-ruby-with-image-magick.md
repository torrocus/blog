---
categories: deployment
date: 2020-09-13 18:00:00 +0200
excerpt: Instructions for preparing the Image Magick environment with HEIF / HEIC support.
lang: en
layout: post
title: HEIF / HEIC format support in Ruby with Image Magick
---

This article was written so that you can re-use this process.
I think of it as living documentation.

## What is HEIF?

HEIF is a High Efficiency Image File Format.
It's a file format that is a container for images.

## What is HEIC?

HEIC means a High Efficiency Image Coding.

## Installation process

I always check that I am up to date with packages on the system before starting
the installation.

```console
sudo apt update
sudo apt upgrade
```

The following packages will come in handy to compile from source,
maintain the git repository and download files.

```console
sudo apt install -y build-essential curl git
```

<!-- sudo apt-get install ca-certificates -->
<!-- sudo apt build-dep -y imagemagick -->

Development packages to support various **image file formats**.

```console
sudo apt install -y \
         libde265-dev \
         libjpeg-dev \
         libltdl-dev \
         libopenjp2-7-dev \
         librsvg2-dev \
         libwebp-dev \
         libx265-dev
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see the installation of these packages.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>
In my case, I already had these packages on my system.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ sudo apt install -y libde265-dev libjpeg-dev libopenjp2-7-dev librsvg2-dev libwebp-dev libx265-dev
Reading package lists... Done
Building dependency tree
Reading state information... Done
libjpeg-dev is already the newest version (8c-2ubuntu8).
libwebp-dev is already the newest version (0.6.1-2).
libx265-dev is already the newest version (2.6-3).
librsvg2-dev is already the newest version (2.40.20-2ubuntu0.2).
libopenjp2-7-dev is already the newest version (2.3.0-2build0.18.04.1).
libde265-dev is already the newest version (1.0.4-1~ppa1~ubuntu18.04.1).
```
<!-- markdownlint-restore -->
</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

### HEIF format library

Now it's time for the HEIF library.
Download the git repository.

```console
git clone https://github.com/strukturag/libheif.git
```

Go to the repo directory.

```console
cd libheif
```

Call the script `autogen.sh`

```console
./autogen.sh
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see the autogen.sh script call.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

```console
$ ./autogen.sh
Installing pre-commit hook ...
autoreconf: Entering directory `.'
autoreconf: configure.ac: not using Gettext
autoreconf: running: aclocal --force -I m4
autoreconf: configure.ac: tracing
autoreconf: running: libtoolize --copy --force
libtoolize: putting auxiliary files in AC_CONFIG_AUX_DIR, '.'.
libtoolize: copying file './ltmain.sh'
libtoolize: putting macros in AC_CONFIG_MACRO_DIRS, 'm4'.
libtoolize: copying file 'm4/libtool.m4'
libtoolize: copying file 'm4/ltoptions.m4'
libtoolize: copying file 'm4/ltsugar.m4'
libtoolize: copying file 'm4/ltversion.m4'
libtoolize: copying file 'm4/lt~obsolete.m4'
autoreconf: running: /usr/bin/autoconf --force
autoreconf: running: /usr/bin/autoheader --force
autoreconf: running: automake --add-missing --copy --force-missing
configure.ac:30: installing './compile'
configure.ac:29: installing './config.guess'
configure.ac:29: installing './config.sub'
configure.ac:38: installing './install-sh'
configure.ac:57: installing './missing'
examples/Makefile.am: installing './depcomp'
autoreconf: Leaving directory `.'
```

</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

Call the script `configure`

```console
./configure
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see the configure call.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ ./configure
checking build system type... x86_64-pc-linux-gnu
checking host system type... x86_64-pc-linux-gnu
checking target system type... x86_64-pc-linux-gnu
checking how to print strings... printf
checking for gcc... gcc
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables...
checking whether we are cross compiling... no
checking for suffix of object files... o
checking whether we are using the GNU C compiler... yes
checking whether gcc accepts -g... yes
checking for gcc option to accept ISO C89... none needed
checking whether gcc understands -c and -o together... yes
checking for a sed that does not truncate output... /bin/sed
checking for grep that handles long lines and -e... /bin/grep
checking for egrep... /bin/grep -E
checking for fgrep... /bin/grep -F
checking for ld used by gcc... /usr/bin/ld
checking if the linker (/usr/bin/ld) is GNU ld... yes
checking for BSD- or MS-compatible name lister (nm)... /usr/bin/nm -B
checking the name lister (/usr/bin/nm -B) interface... BSD nm
checking whether ln -s works... yes
checking the maximum length of command line arguments... 1572864
checking how to convert x86_64-pc-linux-gnu file names to x86_64-pc-linux-gnu format... func_convert_file_noop
checking how to convert x86_64-pc-linux-gnu file names to toolchain format... func_convert_file_noop
checking for /usr/bin/ld option to reload object files... -r
checking for objdump... objdump
checking how to recognize dependent libraries... pass_all
checking for dlltool... no
checking how to associate runtime and link libraries... printf %s\n
checking for ar... ar
checking for archiver @FILE support... @
checking for strip... strip
checking for ranlib... ranlib
checking for gawk... gawk
checking command to parse /usr/bin/nm -B output from gcc object... ok
checking for sysroot... no
checking for a working dd... /bin/dd
checking how to truncate binary pipes... /bin/dd bs=4096 count=1
checking for mt... mt
checking if mt is a manifest tool... no
checking how to run the C preprocessor... gcc -E
checking for ANSI C header files... yes
checking for sys/types.h... yes
checking for sys/stat.h... yes
checking for stdlib.h... yes
checking for string.h... yes
checking for memory.h... yes
checking for strings.h... yes
checking for inttypes.h... yes
checking for stdint.h... yes
checking for unistd.h... yes
checking for dlfcn.h... yes
checking for objdir... .libs
checking if gcc supports -fno-rtti -fno-exceptions... no
checking for gcc option to produce PIC... -fPIC -DPIC
checking if gcc PIC flag -fPIC -DPIC works... yes
checking if gcc static flag -static works... yes
checking if gcc supports -c -o file.o... yes
checking if gcc supports -c -o file.o... (cached) yes
checking whether the gcc linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking whether -lc should be explicitly linked in... no
checking dynamic linker characteristics... GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking whether stripping libraries is possible... yes
checking if libtool supports shared libraries... yes
checking whether to build shared libraries... yes
checking whether to build static libraries... yes
checking for style of include used by make... GNU
checking dependency style of gcc... gcc3
checking for g++... g++
checking whether we are using the GNU C++ compiler... yes
checking whether g++ accepts -g... yes
checking how to run the C++ preprocessor... g++ -E
checking for ld used by g++... /usr/bin/ld -m elf_x86_64
checking if the linker (/usr/bin/ld -m elf_x86_64) is GNU ld... yes
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking for g++ option to produce PIC... -fPIC -DPIC
checking if g++ PIC flag -fPIC -DPIC works... yes
checking if g++ static flag -static works... yes
checking if g++ supports -c -o file.o... yes
checking if g++ supports -c -o file.o... (cached) yes
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking dynamic linker characteristics... (cached) GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking for gcc... (cached) gcc
checking whether we are using the GNU C compiler... (cached) yes
checking whether gcc accepts -g... (cached) yes
checking for gcc option to accept ISO C89... (cached) none needed
checking whether gcc understands -c and -o together... (cached) yes
checking for a BSD-compatible install... /usr/bin/install -c
checking whether ln -s works... yes
checking for grep that handles long lines and -e... (cached) /bin/grep
checking for go... no
checking whether build environment is sane... yes
checking for a thread-safe mkdir -p... /bin/mkdir -p
checking whether make sets $(MAKE)... yes
checking whether make supports nested variables... yes
checking dependency style of gcc... gcc3
checking dependency style of g++... gcc3
checking whether g++ supports C++11 features by default... yes
checking for stdbool.h that conforms to C99... yes
checking for _Bool... yes
checking for inttypes.h... (cached) yes
checking stddef.h usability... yes
checking stddef.h presence... yes
checking for stddef.h... yes
checking for unistd.h... (cached) yes
checking for inline... inline
checking for error_at_line... yes
checking for size_t... yes
checking for uint8_t... yes
checking for uint16_t... yes
checking for uint32_t... yes
checking for uint64_t... yes
checking for pthread_create in -lpthread... yes
checking for simple visibility declarations... yes
checking for pkg-config... /usr/bin/pkg-config
checking pkg-config is at least version 0.9.0... yes
checking for aom... no
checking for libde265... yes
checking for x265... yes
checking jpeglib.h usability... yes
checking jpeglib.h presence... yes
checking for jpeglib.h... yes
checking for jpeg_CreateCompress in -ljpeg... yes
checking for jpeg_write_icc_profile... no
checking for libpng... yes
checking for gdkpixbuf... yes
configure: Enable multithreading
checking whether compiler supports -Wno-error=potentially-evaluated-expression... no
configure: ---------------------------------------
configure: Multithreading: yes
configure: Symbol visibility: yes
configure: libaom decoder: no
configure: libaom encoder: no
configure: rav1e encoder: no
configure: libde265 decoder: yes
configure: libx265 encoder: yes
configure: JPEG output: yes
configure: PNG output: yes
configure: GdkPixbuf2 loader: yes
configure: Examples: yes
configure: Tests:  (tests will cause 'visibility' to be turned off)
configure: ---------------------------------------
checking that generated files are newer than configure... done
configure: creating ./config.status
config.status: creating Makefile
config.status: creating examples/Makefile
config.status: creating extra/Makefile
config.status: creating fuzzing/Makefile
config.status: creating gdk-pixbuf/Makefile
config.status: creating go/Makefile
config.status: creating gnome/Makefile
config.status: creating scripts/Makefile
config.status: creating tests/Makefile
config.status: creating libheif/Makefile
config.status: creating libheif/heif_version.h
config.status: creating libheif.pc
config.status: creating config.h
config.status: executing libtool commands
config.status: executing depfiles commands
```
<!-- markdownlint-restore -->
</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

Call `make` to compile & test HEIF library.

```console
make
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see make process.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ make
make  all-recursive
make[1]: Entering directory '/home/torrocus/heif/libheif'
Making all in libheif
make[2]: Entering directory '/home/torrocus/heif/libheif/libheif'
depbase=`echo box_fuzzer.o | sed 's|[^/]*$|.deps/&|;s|\.o$||'`;\
g++ -DHAVE_CONFIG_H -I. -I..     -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT box_fuzzer.o -MD -MP -MF $depbase.Tpo -c -o box_fuzzer.o box_fuzzer.cc &&\
mv -f $depbase.Tpo $depbase.Po
depbase=`echo color_conversion_fuzzer.o | sed 's|[^/]*$|.deps/&|;s|\.o$||'`;\
g++ -DHAVE_CONFIG_H -I. -I..     -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT color_conversion_fuzzer.o -MD -MP -MF $depbase.Tpo -c -o color_conversion_fuzzer.o color_conversion_fuzzer.cc &&\
mv -f $depbase.Tpo $depbase.Po
depbase=`echo encoder_fuzzer.o | sed 's|[^/]*$|.deps/&|;s|\.o$||'`;\
g++ -DHAVE_CONFIG_H -I. -I..     -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT encoder_fuzzer.o -MD -MP -MF $depbase.Tpo -c -o encoder_fuzzer.o encoder_fuzzer.cc &&\
mv -f $depbase.Tpo $depbase.Po
depbase=`echo file_fuzzer.o | sed 's|[^/]*$|.deps/&|;s|\.o$||'`;\
g++ -DHAVE_CONFIG_H -I. -I..     -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT file_fuzzer.o -MD -MP -MF $depbase.Tpo -c -o file_fuzzer.o file_fuzzer.cc &&\
mv -f $depbase.Tpo $depbase.Po
rm -f libfuzzers.a
ar cru libfuzzers.a box_fuzzer.o color_conversion_fuzzer.o encoder_fuzzer.o file_fuzzer.o
ar: `u' modifier ignored since `D' is the default (see `U')
ranlib libfuzzers.a
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-bitstream.lo -MD -MP -MF .deps/libheif_la-bitstream.Tpo -c -o libheif_la-bitstream.lo `test -f 'bitstream.cc' || echo './'`bitstream.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-bitstream.lo -MD -MP -MF .deps/libheif_la-bitstream.Tpo -c bitstream.cc  -fPIC -DPIC -o .libs/libheif_la-bitstream.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-bitstream.lo -MD -MP -MF .deps/libheif_la-bitstream.Tpo -c bitstream.cc -o libheif_la-bitstream.o >/dev/null 2>&1
mv -f .deps/libheif_la-bitstream.Tpo .deps/libheif_la-bitstream.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-box.lo -MD -MP -MF .deps/libheif_la-box.Tpo -c -o libheif_la-box.lo `test -f 'box.cc' || echo './'`box.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-box.lo -MD -MP -MF .deps/libheif_la-box.Tpo -c box.cc  -fPIC -DPIC -o .libs/libheif_la-box.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-box.lo -MD -MP -MF .deps/libheif_la-box.Tpo -c box.cc -o libheif_la-box.o >/dev/null 2>&1
mv -f .deps/libheif_la-box.Tpo .deps/libheif_la-box.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-error.lo -MD -MP -MF .deps/libheif_la-error.Tpo -c -o libheif_la-error.lo `test -f 'error.cc' || echo './'`error.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-error.lo -MD -MP -MF .deps/libheif_la-error.Tpo -c error.cc  -fPIC -DPIC -o .libs/libheif_la-error.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-error.lo -MD -MP -MF .deps/libheif_la-error.Tpo -c error.cc -o libheif_la-error.o >/dev/null 2>&1
mv -f .deps/libheif_la-error.Tpo .deps/libheif_la-error.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_file.lo -MD -MP -MF .deps/libheif_la-heif_file.Tpo -c -o libheif_la-heif_file.lo `test -f 'heif_file.cc' || echo './'`heif_file.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_file.lo -MD -MP -MF .deps/libheif_la-heif_file.Tpo -c heif_file.cc  -fPIC -DPIC -o .libs/libheif_la-heif_file.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_file.lo -MD -MP -MF .deps/libheif_la-heif_file.Tpo -c heif_file.cc -o libheif_la-heif_file.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_file.Tpo .deps/libheif_la-heif_file.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_image.lo -MD -MP -MF .deps/libheif_la-heif_image.Tpo -c -o libheif_la-heif_image.lo `test -f 'heif_image.cc' || echo './'`heif_image.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_image.lo -MD -MP -MF .deps/libheif_la-heif_image.Tpo -c heif_image.cc  -fPIC -DPIC -o .libs/libheif_la-heif_image.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_image.lo -MD -MP -MF .deps/libheif_la-heif_image.Tpo -c heif_image.cc -o libheif_la-heif_image.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_image.Tpo .deps/libheif_la-heif_image.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif.lo -MD -MP -MF .deps/libheif_la-heif.Tpo -c -o libheif_la-heif.lo `test -f 'heif.cc' || echo './'`heif.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif.lo -MD -MP -MF .deps/libheif_la-heif.Tpo -c heif.cc  -fPIC -DPIC -o .libs/libheif_la-heif.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif.lo -MD -MP -MF .deps/libheif_la-heif.Tpo -c heif.cc -o libheif_la-heif.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif.Tpo .deps/libheif_la-heif.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_context.lo -MD -MP -MF .deps/libheif_la-heif_context.Tpo -c -o libheif_la-heif_context.lo `test -f 'heif_context.cc' || echo './'`heif_context.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_context.lo -MD -MP -MF .deps/libheif_la-heif_context.Tpo -c heif_context.cc  -fPIC -DPIC -o .libs/libheif_la-heif_context.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_context.lo -MD -MP -MF .deps/libheif_la-heif_context.Tpo -c heif_context.cc -o libheif_la-heif_context.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_context.Tpo .deps/libheif_la-heif_context.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_hevc.lo -MD -MP -MF .deps/libheif_la-heif_hevc.Tpo -c -o libheif_la-heif_hevc.lo `test -f 'heif_hevc.cc' || echo './'`heif_hevc.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_hevc.lo -MD -MP -MF .deps/libheif_la-heif_hevc.Tpo -c heif_hevc.cc  -fPIC -DPIC -o .libs/libheif_la-heif_hevc.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_hevc.lo -MD -MP -MF .deps/libheif_la-heif_hevc.Tpo -c heif_hevc.cc -o libheif_la-heif_hevc.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_hevc.Tpo .deps/libheif_la-heif_hevc.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_avif.lo -MD -MP -MF .deps/libheif_la-heif_avif.Tpo -c -o libheif_la-heif_avif.lo `test -f 'heif_avif.cc' || echo './'`heif_avif.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_avif.lo -MD -MP -MF .deps/libheif_la-heif_avif.Tpo -c heif_avif.cc  -fPIC -DPIC -o .libs/libheif_la-heif_avif.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_avif.lo -MD -MP -MF .deps/libheif_la-heif_avif.Tpo -c heif_avif.cc -o libheif_la-heif_avif.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_avif.Tpo .deps/libheif_la-heif_avif.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_plugin_registry.lo -MD -MP -MF .deps/libheif_la-heif_plugin_registry.Tpo -c -o libheif_la-heif_plugin_registry.lo `test -f 'heif_plugin_registry.cc' || echo './'`heif_plugin_registry.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_plugin_registry.lo -MD -MP -MF .deps/libheif_la-heif_plugin_registry.Tpo -c heif_plugin_registry.cc  -fPIC -DPIC -o .libs/libheif_la-heif_plugin_registry.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_plugin_registry.lo -MD -MP -MF .deps/libheif_la-heif_plugin_registry.Tpo -c heif_plugin_registry.cc -o libheif_la-heif_plugin_registry.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_plugin_registry.Tpo .deps/libheif_la-heif_plugin_registry.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_plugin.lo -MD -MP -MF .deps/libheif_la-heif_plugin.Tpo -c -o libheif_la-heif_plugin.lo `test -f 'heif_plugin.cc' || echo './'`heif_plugin.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_plugin.lo -MD -MP -MF .deps/libheif_la-heif_plugin.Tpo -c heif_plugin.cc  -fPIC -DPIC -o .libs/libheif_la-heif_plugin.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_plugin.lo -MD -MP -MF .deps/libheif_la-heif_plugin.Tpo -c heif_plugin.cc -o libheif_la-heif_plugin.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_plugin.Tpo .deps/libheif_la-heif_plugin.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_colorconversion.lo -MD -MP -MF .deps/libheif_la-heif_colorconversion.Tpo -c -o libheif_la-heif_colorconversion.lo `test -f 'heif_colorconversion.cc' || echo './'`heif_colorconversion.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_colorconversion.lo -MD -MP -MF .deps/libheif_la-heif_colorconversion.Tpo -c heif_colorconversion.cc  -fPIC -DPIC -o .libs/libheif_la-heif_colorconversion.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_colorconversion.lo -MD -MP -MF .deps/libheif_la-heif_colorconversion.Tpo -c heif_colorconversion.cc -o libheif_la-heif_colorconversion.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_colorconversion.Tpo .deps/libheif_la-heif_colorconversion.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-nclx.lo -MD -MP -MF .deps/libheif_la-nclx.Tpo -c -o libheif_la-nclx.lo `test -f 'nclx.cc' || echo './'`nclx.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-nclx.lo -MD -MP -MF .deps/libheif_la-nclx.Tpo -c nclx.cc  -fPIC -DPIC -o .libs/libheif_la-nclx.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-nclx.lo -MD -MP -MF .deps/libheif_la-nclx.Tpo -c nclx.cc -o libheif_la-nclx.o >/dev/null 2>&1
mv -f .deps/libheif_la-nclx.Tpo .deps/libheif_la-nclx.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_decoder_libde265.lo -MD -MP -MF .deps/libheif_la-heif_decoder_libde265.Tpo -c -o libheif_la-heif_decoder_libde265.lo `test -f 'heif_decoder_libde265.cc' || echo './'`heif_decoder_libde265.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_decoder_libde265.lo -MD -MP -MF .deps/libheif_la-heif_decoder_libde265.Tpo -c heif_decoder_libde265.cc  -fPIC -DPIC -o .libs/libheif_la-heif_decoder_libde265.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_decoder_libde265.lo -MD -MP -MF .deps/libheif_la-heif_decoder_libde265.Tpo -c heif_decoder_libde265.cc -o libheif_la-heif_decoder_libde265.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_decoder_libde265.Tpo .deps/libheif_la-heif_decoder_libde265.Plo
/bin/bash ../libtool  --tag=CXX   --mode=compile g++ -DHAVE_CONFIG_H -I. -I..    -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_encoder_x265.lo -MD -MP -MF .deps/libheif_la-heif_encoder_x265.Tpo -c -o libheif_la-heif_encoder_x265.lo `test -f 'heif_encoder_x265.cc' || echo './'`heif_encoder_x265.cc
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_encoder_x265.lo -MD -MP -MF .deps/libheif_la-heif_encoder_x265.Tpo -c heif_encoder_x265.cc  -fPIC -DPIC -o .libs/libheif_la-heif_encoder_x265.o
libtool: compile:  g++ -DHAVE_CONFIG_H -I. -I.. -fvisibility=hidden -DLIBHEIF_EXPORTS -I.. -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libheif_la-heif_encoder_x265.lo -MD -MP -MF .deps/libheif_la-heif_encoder_x265.Tpo -c heif_encoder_x265.cc -o libheif_la-heif_encoder_x265.o >/dev/null 2>&1
mv -f .deps/libheif_la-heif_encoder_x265.Tpo .deps/libheif_la-heif_encoder_x265.Plo
/bin/bash ../libtool  --tag=CXX   --mode=link g++ -fvisibility=hidden    -DLIBHEIF_EXPORTS -I..  -DHAVE_VISIBILITY -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -version-info 9:0:8   -o libheif.la -rpath /usr/local/lib libheif_la-bitstream.lo libheif_la-box.lo libheif_la-error.lo libheif_la-heif_file.lo libheif_la-heif_image.lo libheif_la-heif.lo libheif_la-heif_context.lo libheif_la-heif_hevc.lo libheif_la-heif_avif.lo libheif_la-heif_plugin_registry.lo libheif_la-heif_plugin.lo libheif_la-heif_colorconversion.lo libheif_la-nclx.lo  libheif_la-heif_decoder_libde265.lo  libheif_la-heif_encoder_x265.lo  -lde265 -lx265  -lpthread
libtool: link: g++  -fPIC -DPIC -shared -nostdlib /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/crti.o /usr/lib/gcc/x86_64-linux-gnu/7/crtbeginS.o  .libs/libheif_la-bitstream.o .libs/libheif_la-box.o .libs/libheif_la-error.o .libs/libheif_la-heif_file.o .libs/libheif_la-heif_image.o .libs/libheif_la-heif.o .libs/libheif_la-heif_context.o .libs/libheif_la-heif_hevc.o .libs/libheif_la-heif_avif.o .libs/libheif_la-heif_plugin_registry.o .libs/libheif_la-heif_plugin.o .libs/libheif_la-heif_colorconversion.o .libs/libheif_la-nclx.o .libs/libheif_la-heif_decoder_libde265.o .libs/libheif_la-heif_encoder_x265.o   /usr/lib/x86_64-linux-gnu/libde265.so -lx265 -lpthread -L/usr/lib/gcc/x86_64-linux-gnu/7 -L/usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu -L/usr/lib/gcc/x86_64-linux-gnu/7/../../../../lib -L/lib/x86_64-linux-gnu -L/lib/../lib -L/usr/lib/x86_64-linux-gnu -L/usr/lib/../lib -L/usr/lib/gcc/x86_64-linux-gnu/7/../../.. -lstdc++ -lm -lc -lgcc_s /usr/lib/gcc/x86_64-linux-gnu/7/crtendS.o /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/crtn.o  -g -O2   -Wl,-soname -Wl,libheif.so.1 -o .libs/libheif.so.1.8.0
libtool: link: (cd ".libs" && rm -f "libheif.so.1" && ln -s "libheif.so.1.8.0" "libheif.so.1")
libtool: link: (cd ".libs" && rm -f "libheif.so" && ln -s "libheif.so.1.8.0" "libheif.so")
libtool: link: ar cru .libs/libheif.a  libheif_la-bitstream.o libheif_la-box.o libheif_la-error.o libheif_la-heif_file.o libheif_la-heif_image.o libheif_la-heif.o libheif_la-heif_context.o libheif_la-heif_hevc.o libheif_la-heif_avif.o libheif_la-heif_plugin_registry.o libheif_la-heif_plugin.o libheif_la-heif_colorconversion.o libheif_la-nclx.o libheif_la-heif_decoder_libde265.o libheif_la-heif_encoder_x265.o
ar: `u' modifier ignored since `D' is the default (see `U')
libtool: link: ranlib .libs/libheif.a
libtool: link: ( cd ".libs" && rm -f "libheif.la" && ln -s "../libheif.la" "libheif.la" )
make[2]: Leaving directory '/home/torrocus/heif/libheif/libheif'
Making all in examples
make[2]: Entering directory '/home/torrocus/heif/libheif/examples'
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I../.  -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_convert-encoder.o -MD -MP -MF .deps/heif_convert-encoder.Tpo -c -o heif_convert-encoder.o `test -f 'encoder.cc' || echo './'`encoder.cc
mv -f .deps/heif_convert-encoder.Tpo .deps/heif_convert-encoder.Po
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I../.  -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_convert-heif_convert.o -MD -MP -MF .deps/heif_convert-heif_convert.Tpo -c -o heif_convert-heif_convert.o `test -f 'heif_convert.cc' || echo './'`heif_convert.cc
mv -f .deps/heif_convert-heif_convert.Tpo .deps/heif_convert-heif_convert.Po
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I../.  -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_convert-encoder_y4m.o -MD -MP -MF .deps/heif_convert-encoder_y4m.Tpo -c -o heif_convert-encoder_y4m.o `test -f 'encoder_y4m.cc' || echo './'`encoder_y4m.cc
mv -f .deps/heif_convert-encoder_y4m.Tpo .deps/heif_convert-encoder_y4m.Po
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I../.  -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_convert-encoder_jpeg.o -MD -MP -MF .deps/heif_convert-encoder_jpeg.Tpo -c -o heif_convert-encoder_jpeg.o `test -f 'encoder_jpeg.cc' || echo './'`encoder_jpeg.cc
mv -f .deps/heif_convert-encoder_jpeg.Tpo .deps/heif_convert-encoder_jpeg.Po
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I../.  -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_convert-encoder_png.o -MD -MP -MF .deps/heif_convert-encoder_png.Tpo -c -o heif_convert-encoder_png.o `test -f 'encoder_png.cc' || echo './'`encoder_png.cc
mv -f .deps/heif_convert-encoder_png.Tpo .deps/heif_convert-encoder_png.Po
/bin/bash ../libtool  --tag=CXX   --mode=link g++ -I.. -I../.  -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations   -o heif-convert heif_convert-encoder.o heif_convert-heif_convert.o heif_convert-encoder_y4m.o heif_convert-encoder_jpeg.o heif_convert-encoder_png.o ../libheif/libheif.la -ljpeg -lpng16 -lz -lpthread
libtool: link: g++ -I.. -I../. -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -o .libs/heif-convert heif_convert-encoder.o heif_convert-heif_convert.o heif_convert-encoder_y4m.o heif_convert-encoder_jpeg.o heif_convert-encoder_png.o  ../libheif/.libs/libheif.so -ljpeg -lpng16 -lz -lpthread
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I..  -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_enc-heif_enc.o -MD -MP -MF .deps/heif_enc-heif_enc.Tpo -c -o heif_enc-heif_enc.o `test -f 'heif_enc.cc' || echo './'`heif_enc.cc
mv -f .deps/heif_enc-heif_enc.Tpo .deps/heif_enc-heif_enc.Po
/bin/bash ../libtool  --tag=CXX   --mode=link g++ -I.. -I..  -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations   -o heif-enc heif_enc-heif_enc.o ../libheif/libheif.la -ljpeg -lpng16 -lz -lpthread
libtool: link: g++ -I.. -I.. -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -o .libs/heif-enc heif_enc-heif_enc.o  ../libheif/.libs/libheif.so -ljpeg -lpng16 -lz -lpthread
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_info-heif_info.o -MD -MP -MF .deps/heif_info-heif_info.Tpo -c -o heif_info-heif_info.o `test -f 'heif_info.cc' || echo './'`heif_info.cc
mv -f .deps/heif_info-heif_info.Tpo .deps/heif_info-heif_info.Po
/bin/bash ../libtool  --tag=CXX   --mode=link g++ -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations   -o heif-info heif_info-heif_info.o ../libheif/libheif.la -lpthread
libtool: link: g++ -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -o .libs/heif-info heif_info-heif_info.o  ../libheif/.libs/libheif.so -lpthread
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I.. -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_thumbnailer-encoder.o -MD -MP -MF .deps/heif_thumbnailer-encoder.Tpo -c -o heif_thumbnailer-encoder.o `test -f 'encoder.cc' || echo './'`encoder.cc
mv -f .deps/heif_thumbnailer-encoder.Tpo .deps/heif_thumbnailer-encoder.Po
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I.. -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_thumbnailer-heif_thumbnailer.o -MD -MP -MF .deps/heif_thumbnailer-heif_thumbnailer.Tpo -c -o heif_thumbnailer-heif_thumbnailer.o `test -f 'heif_thumbnailer.cc' || echo './'`heif_thumbnailer.cc
mv -f .deps/heif_thumbnailer-heif_thumbnailer.Tpo .deps/heif_thumbnailer-heif_thumbnailer.Po
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I.. -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_thumbnailer-encoder_png.o -MD -MP -MF .deps/heif_thumbnailer-encoder_png.Tpo -c -o heif_thumbnailer-encoder_png.o `test -f 'encoder_png.cc' || echo './'`encoder_png.cc
mv -f .deps/heif_thumbnailer-encoder_png.Tpo .deps/heif_thumbnailer-encoder_png.Po
/bin/bash ../libtool  --tag=CXX   --mode=link g++ -I.. -I.. -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -lpng16 -lz  -o heif-thumbnailer heif_thumbnailer-encoder.o heif_thumbnailer-heif_thumbnailer.o heif_thumbnailer-encoder_png.o ../libheif/libheif.la -lpthread
libtool: link: g++ -I.. -I.. -I/usr/include/libpng16 -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -o .libs/heif-thumbnailer heif_thumbnailer-encoder.o heif_thumbnailer-heif_thumbnailer.o heif_thumbnailer-encoder_png.o  -lpng16 -lz ../libheif/.libs/libheif.so -lpthread
g++ -DHAVE_CONFIG_H -I. -I..    -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT heif_test-heif_test.o -MD -MP -MF .deps/heif_test-heif_test.Tpo -c -o heif_test-heif_test.o `test -f 'heif_test.cc' || echo './'`heif_test.cc
mv -f .deps/heif_test-heif_test.Tpo .deps/heif_test-heif_test.Po
/bin/bash ../libtool  --tag=CXX   --mode=link g++ -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations   -o heif-test heif_test-heif_test.o ../libheif/libheif.la -lpthread
libtool: link: g++ -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -o .libs/heif-test heif_test-heif_test.o  ../libheif/.libs/libheif.so -lpthread
gcc -DHAVE_CONFIG_H -I. -I..    -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT test_c_api-test_c_api.o -MD -MP -MF .deps/test_c_api-test_c_api.Tpo -c -o test_c_api-test_c_api.o `test -f 'test_c_api.c' || echo './'`test_c_api.c
mv -f .deps/test_c_api-test_c_api.Tpo .deps/test_c_api-test_c_api.Po
/bin/bash ../libtool  --tag=CC   --mode=link gcc -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations   -o test-c-api test_c_api-test_c_api.o ../libheif/libheif.la -lpthread
libtool: link: gcc -I.. -I.. -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -o .libs/test-c-api test_c_api-test_c_api.o  ../libheif/.libs/libheif.so -lpthread
make[2]: Leaving directory '/home/torrocus/heif/libheif/examples'
Making all in extra
make[2]: Entering directory '/home/torrocus/heif/libheif/extra'
make[2]: Nothing to be done for 'all'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/extra'
Making all in fuzzing
make[2]: Entering directory '/home/torrocus/heif/libheif/fuzzing'
make[2]: Nothing to be done for 'all'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/fuzzing'
Making all in gdk-pixbuf
make[2]: Entering directory '/home/torrocus/heif/libheif/gdk-pixbuf'
/bin/bash ../libtool  --tag=CC   --mode=compile gcc -DHAVE_CONFIG_H -I. -I..    -I.. -I.. -pthread -I/usr/include/gdk-pixbuf-2.0 -I/usr/include/libpng16 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libpixbufloader_heif_la-pixbufloader-heif.lo -MD -MP -MF .deps/libpixbufloader_heif_la-pixbufloader-heif.Tpo -c -o libpixbufloader_heif_la-pixbufloader-heif.lo `test -f 'pixbufloader-heif.c' || echo './'`pixbufloader-heif.c
libtool: compile:  gcc -DHAVE_CONFIG_H -I. -I.. -I.. -I.. -pthread -I/usr/include/gdk-pixbuf-2.0 -I/usr/include/libpng16 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libpixbufloader_heif_la-pixbufloader-heif.lo -MD -MP -MF .deps/libpixbufloader_heif_la-pixbufloader-heif.Tpo -c pixbufloader-heif.c  -fPIC -DPIC -o .libs/libpixbufloader_heif_la-pixbufloader-heif.o
libtool: compile:  gcc -DHAVE_CONFIG_H -I. -I.. -I.. -I.. -pthread -I/usr/include/gdk-pixbuf-2.0 -I/usr/include/libpng16 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -MT libpixbufloader_heif_la-pixbufloader-heif.lo -MD -MP -MF .deps/libpixbufloader_heif_la-pixbufloader-heif.Tpo -c pixbufloader-heif.c -o libpixbufloader_heif_la-pixbufloader-heif.o >/dev/null 2>&1
mv -f .deps/libpixbufloader_heif_la-pixbufloader-heif.Tpo .deps/libpixbufloader_heif_la-pixbufloader-heif.Plo
/bin/bash ../libtool  --tag=CC   --mode=link gcc -I.. -I.. -pthread -I/usr/include/gdk-pixbuf-2.0 -I/usr/include/libpng16 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -avoid-version -module  -o libpixbufloader-heif.la -rpath /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders libpixbufloader_heif_la-pixbufloader-heif.lo ../libheif/libheif.la -lgdk_pixbuf-2.0 -lgobject-2.0 -lglib-2.0 -lpthread
libtool: link: gcc -shared  -fPIC -DPIC  .libs/libpixbufloader_heif_la-pixbufloader-heif.o   -Wl,-rpath -Wl,/home/torrocus/heif/libheif/libheif/.libs ../libheif/.libs/libheif.so -lgdk_pixbuf-2.0 -lgobject-2.0 -lglib-2.0 -lpthread  -pthread -g -O2   -pthread -Wl,-soname -Wl,libpixbufloader-heif.so -o .libs/libpixbufloader-heif.so
libtool: link: ar cru .libs/libpixbufloader-heif.a  libpixbufloader_heif_la-pixbufloader-heif.o
ar: `u' modifier ignored since `D' is the default (see `U')
libtool: link: ranlib .libs/libpixbufloader-heif.a
libtool: link: ( cd ".libs" && rm -f "libpixbufloader-heif.la" && ln -s "../libpixbufloader-heif.la" "libpixbufloader-heif.la" )
make[2]: Leaving directory '/home/torrocus/heif/libheif/gdk-pixbuf'
Making all in gnome
make[2]: Entering directory '/home/torrocus/heif/libheif/gnome'
make[2]: Nothing to be done for 'all'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/gnome'
Making all in go
make[2]: Entering directory '/home/torrocus/heif/libheif/go'
make[2]: Nothing to be done for 'all'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/go'
Making all in scripts
make[2]: Entering directory '/home/torrocus/heif/libheif/scripts'
make[2]: Nothing to be done for 'all'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/scripts'
Making all in tests
make[2]: Entering directory '/home/torrocus/heif/libheif/tests'
make[2]: Nothing to be done for 'all'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/tests'
make[2]: Entering directory '/home/torrocus/heif/libheif'
make[2]: Leaving directory '/home/torrocus/heif/libheif'
make[1]: Leaving directory '/home/torrocus/heif/libheif'
```
<!-- markdownlint-restore -->
</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

The compiled libraries can be found in the `libheif/.libs` subfolder.

Install HEIF library in Linux system.

```console
sudo make install
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see the installation process.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ sudo make install
[sudo] password for torrocus:
Making install in libheif
make[1]: Entering directory '/home/torrocus/heif/libheif/libheif'
make[2]: Entering directory '/home/torrocus/heif/libheif/libheif'
 /bin/mkdir -p '/usr/local/lib'
 /bin/bash ../libtool   --mode=install /usr/bin/install -c   libheif.la '/usr/local/lib'
libtool: install: /usr/bin/install -c .libs/libheif.so.1.8.0 /usr/local/lib/libheif.so.1.8.0
libtool: install: (cd /usr/local/lib && { ln -s -f libheif.so.1.8.0 libheif.so.1 || { rm -f libheif.so.1 && ln -s libheif.so.1.8.0 libheif.so.1; }; })
libtool: install: (cd /usr/local/lib && { ln -s -f libheif.so.1.8.0 libheif.so || { rm -f libheif.so && ln -s libheif.so.1.8.0 libheif.so; }; })
libtool: install: /usr/bin/install -c .libs/libheif.lai /usr/local/lib/libheif.la
libtool: install: /usr/bin/install -c .libs/libheif.a /usr/local/lib/libheif.a
libtool: install: chmod 644 /usr/local/lib/libheif.a
libtool: install: ranlib /usr/local/lib/libheif.a
libtool: finish: PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:/sbin" ldconfig -n /usr/local/lib
----------------------------------------------------------------------
Libraries have been installed in:
   /usr/local/lib

If you ever happen to want to link against installed libraries
in a given directory, LIBDIR, you must either use libtool, and
specify the full pathname of the library, or use the '-LLIBDIR'
flag during linking and do at least one of the following:
   - add LIBDIR to the 'LD_LIBRARY_PATH' environment variable
     during execution
   - add LIBDIR to the 'LD_RUN_PATH' environment variable
     during linking
   - use the '-Wl,-rpath -Wl,LIBDIR' linker flag
   - have your system administrator add LIBDIR to '/etc/ld.so.conf'

See any operating system documentation about shared libraries for
more information, such as the ld(1) and ld.so(8) manual pages.
----------------------------------------------------------------------
 /bin/mkdir -p '/usr/local/bin'
 /bin/mkdir -p '/usr/local/include/libheif'
 /usr/bin/install -c -m 644 heif.h heif_plugin.h heif_version.h heif_cxx.h '/usr/local/include/libheif'
make[2]: Leaving directory '/home/torrocus/heif/libheif/libheif'
make[1]: Leaving directory '/home/torrocus/heif/libheif/libheif'
Making install in examples
make[1]: Entering directory '/home/torrocus/heif/libheif/examples'
make[2]: Entering directory '/home/torrocus/heif/libheif/examples'
 /bin/mkdir -p '/usr/local/bin'
  /bin/bash ../libtool   --mode=install /usr/bin/install -c heif-convert heif-enc heif-info heif-thumbnailer '/usr/local/bin'
libtool: install: /usr/bin/install -c .libs/heif-convert /usr/local/bin/heif-convert
libtool: install: /usr/bin/install -c .libs/heif-enc /usr/local/bin/heif-enc
libtool: install: /usr/bin/install -c .libs/heif-info /usr/local/bin/heif-info
libtool: install: /usr/bin/install -c .libs/heif-thumbnailer /usr/local/bin/heif-thumbnailer
 /bin/mkdir -p '/usr/local/share/man/man1'
 /usr/bin/install -c -m 644 heif-convert.1 heif-thumbnailer.1 heif-info.1 heif-enc.1 '/usr/local/share/man/man1'
make[2]: Leaving directory '/home/torrocus/heif/libheif/examples'
make[1]: Leaving directory '/home/torrocus/heif/libheif/examples'
Making install in extra
make[1]: Entering directory '/home/torrocus/heif/libheif/extra'
make[2]: Entering directory '/home/torrocus/heif/libheif/extra'
make[2]: Nothing to be done for 'install-exec-am'.
make[2]: Nothing to be done for 'install-data-am'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/extra'
make[1]: Leaving directory '/home/torrocus/heif/libheif/extra'
Making install in fuzzing
make[1]: Entering directory '/home/torrocus/heif/libheif/fuzzing'
make[2]: Entering directory '/home/torrocus/heif/libheif/fuzzing'
make[2]: Nothing to be done for 'install-exec-am'.
make[2]: Nothing to be done for 'install-data-am'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/fuzzing'
make[1]: Leaving directory '/home/torrocus/heif/libheif/fuzzing'
Making install in gdk-pixbuf
make[1]: Entering directory '/home/torrocus/heif/libheif/gdk-pixbuf'
make[2]: Entering directory '/home/torrocus/heif/libheif/gdk-pixbuf'
make[2]: Nothing to be done for 'install-exec-am'.
 /bin/mkdir -p '/usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders'
 /bin/bash ../libtool   --mode=install /usr/bin/install -c   libpixbufloader-heif.la '/usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders'
libtool: warning: relinking 'libpixbufloader-heif.la'
libtool: install: (cd /home/torrocus/heif/libheif/gdk-pixbuf; /bin/bash "/home/torrocus/heif/libheif/libtool"  --tag CC --mode=relink gcc -I.. -I.. -pthread -I/usr/include/gdk-pixbuf-2.0 -I/usr/include/libpng16 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -g -O2 -Wall -Werror -Wsign-compare -Wconversion -Wno-sign-conversion -Wno-error=conversion -Wno-error=unused-parameter -Wno-error=deprecated-declarations -avoid-version -module -o libpixbufloader-heif.la -rpath /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders libpixbufloader_heif_la-pixbufloader-heif.lo ../libheif/libheif.la -lgdk_pixbuf-2.0 -lgobject-2.0 -lglib-2.0 -lpthread )
libtool: relink: gcc -shared  -fPIC -DPIC  .libs/libpixbufloader_heif_la-pixbufloader-heif.o   -L/usr/local/lib -lheif -lgdk_pixbuf-2.0 -lgobject-2.0 -lglib-2.0 -lpthread  -pthread -g -O2   -pthread -Wl,-soname -Wl,libpixbufloader-heif.so -o .libs/libpixbufloader-heif.so
libtool: install: /usr/bin/install -c .libs/libpixbufloader-heif.soT /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders/libpixbufloader-heif.so
libtool: install: /usr/bin/install -c .libs/libpixbufloader-heif.lai /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders/libpixbufloader-heif.la
libtool: install: /usr/bin/install -c .libs/libpixbufloader-heif.a /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders/libpixbufloader-heif.a
libtool: install: chmod 644 /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders/libpixbufloader-heif.a
libtool: install: ranlib /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders/libpixbufloader-heif.a
libtool: finish: PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:/sbin" ldconfig -n /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders
----------------------------------------------------------------------
Libraries have been installed in:
   /usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders

If you ever happen to want to link against installed libraries
in a given directory, LIBDIR, you must either use libtool, and
specify the full pathname of the library, or use the '-LLIBDIR'
flag during linking and do at least one of the following:
   - add LIBDIR to the 'LD_LIBRARY_PATH' environment variable
     during execution
   - add LIBDIR to the 'LD_RUN_PATH' environment variable
     during linking
   - use the '-Wl,-rpath -Wl,LIBDIR' linker flag
   - have your system administrator add LIBDIR to '/etc/ld.so.conf'

See any operating system documentation about shared libraries for
more information, such as the ld(1) and ld.so(8) manual pages.
----------------------------------------------------------------------
make[2]: Leaving directory '/home/torrocus/heif/libheif/gdk-pixbuf'
make[1]: Leaving directory '/home/torrocus/heif/libheif/gdk-pixbuf'
Making install in gnome
make[1]: Entering directory '/home/torrocus/heif/libheif/gnome'
make[2]: Entering directory '/home/torrocus/heif/libheif/gnome'
make[2]: Nothing to be done for 'install-exec-am'.
 /bin/mkdir -p '/usr/local/share/mime/packages'
 /usr/bin/install -c -m 644 heif.xml avif.xml '/usr/local/share/mime/packages'
 /bin/mkdir -p '/usr/local/share/thumbnailers'
 /usr/bin/install -c -m 644 heif.thumbnailer '/usr/local/share/thumbnailers'
make[2]: Leaving directory '/home/torrocus/heif/libheif/gnome'
make[1]: Leaving directory '/home/torrocus/heif/libheif/gnome'
Making install in go
make[1]: Entering directory '/home/torrocus/heif/libheif/go'
make[2]: Entering directory '/home/torrocus/heif/libheif/go'
make[2]: Nothing to be done for 'install-exec-am'.
make[2]: Nothing to be done for 'install-data-am'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/go'
make[1]: Leaving directory '/home/torrocus/heif/libheif/go'
Making install in scripts
make[1]: Entering directory '/home/torrocus/heif/libheif/scripts'
make[2]: Entering directory '/home/torrocus/heif/libheif/scripts'
make[2]: Nothing to be done for 'install-exec-am'.
make[2]: Nothing to be done for 'install-data-am'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/scripts'
make[1]: Leaving directory '/home/torrocus/heif/libheif/scripts'
Making install in tests
make[1]: Entering directory '/home/torrocus/heif/libheif/tests'
make[2]: Entering directory '/home/torrocus/heif/libheif/tests'
make[2]: Nothing to be done for 'install-exec-am'.
make[2]: Nothing to be done for 'install-data-am'.
make[2]: Leaving directory '/home/torrocus/heif/libheif/tests'
make[1]: Leaving directory '/home/torrocus/heif/libheif/tests'
make[1]: Entering directory '/home/torrocus/heif/libheif'
make[2]: Entering directory '/home/torrocus/heif/libheif'
make[2]: Nothing to be done for 'install-exec-am'.
 /bin/mkdir -p '/usr/local/lib/pkgconfig'
 /usr/bin/install -c -m 644 libheif.pc '/usr/local/lib/pkgconfig'
make[2]: Leaving directory '/home/torrocus/heif/libheif'
make[1]: Leaving directory '/home/torrocus/heif/libheif'
```
<!-- markdownlint-restore -->
</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

Exit the `libheif` folder.

```console
cd ..
```

### Image Magick

Download the Image Magick.

```console
curl https://download.imagemagick.org/ImageMagick/download/ImageMagick.tar.gz
```

Unpack the ImageMagick.tar.gz archive.

```console
tar xzf ImageMagick.tar.gz
```

Rename folder to name without version number.

```console
mv ImageMagick-7.0.10-29 ImageMagick
```

Go to the ImageMagick directory.

```console
cd ImageMagick
```

Call the script `configure` for Image Magick.

```console
./configure
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see ImageMagick configure call.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ ./configure
checking build system type... x86_64-pc-linux-gnu
checking host system type... x86_64-pc-linux-gnu
checking target system type... x86_64-pc-linux-gnu
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for a thread-safe mkdir -p... /bin/mkdir -p
checking for gawk... gawk
checking whether make sets $(MAKE)... yes
checking whether make supports nested variables... yes
checking whether UID '1000' is supported by ustar format... yes
checking whether GID '1000' is supported by ustar format... yes
checking how to create a ustar tar archive... gnutar
checking whether make supports nested variables... (cached) yes
configuring ImageMagick 7.0.10-29
checking whether build environment is sane... yes
checking whether make supports the include directive... yes (GNU style)
checking for gcc... gcc
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables...
checking whether we are cross compiling... no
checking for suffix of object files... o
checking whether we are using the GNU C compiler... yes
checking whether gcc accepts -g... yes
checking for gcc option to accept ISO C89... none needed
checking whether gcc understands -c and -o together... yes
checking dependency style of gcc... gcc3
checking how to run the C preprocessor... gcc -E
checking for grep that handles long lines and -e... /bin/grep
checking for egrep... /bin/grep -E
checking for ANSI C header files... yes
checking for sys/types.h... yes
checking for sys/stat.h... yes
checking for stdlib.h... yes
checking for string.h... yes
checking for memory.h... yes
checking for strings.h... yes
checking for inttypes.h... yes
checking for stdint.h... yes
checking for unistd.h... yes
checking minix/config.h usability... no
checking minix/config.h presence... no
checking for minix/config.h... no
checking whether it is safe to define __EXTENSIONS__... yes
checking for ar... ar
checking the archiver (ar) interface... ar
checking for gcc... (cached) gcc
checking whether we are using the GNU C compiler... (cached) yes
checking whether gcc accepts -g... (cached) yes
checking for gcc option to accept ISO C89... (cached) none needed
checking whether gcc understands -c and -o together... (cached) yes
checking dependency style of gcc... (cached) gcc3
checking for g++... g++
checking whether we are using the GNU C++ compiler... yes
checking whether g++ accepts -g... yes
checking dependency style of g++... gcc3
checking for gcc option to accept ISO C99... none needed
checking for gcc option to accept ISO Standard C... (cached) none needed
checking how to run the C preprocessor... gcc -E
checking for a sed that does not truncate output... /bin/sed
checking for fgrep... /bin/grep -F
checking how to print strings... printf
checking for ld used by gcc... /usr/bin/ld
checking if the linker (/usr/bin/ld) is GNU ld... yes
checking for gcc option to accept ISO C99... (cached) none needed
checking for C compiler vendor... gnu
checking CFLAGS for most reasonable warnings... -Wall
checking whether make sets $(MAKE)... (cached) yes
checking whether ln -s works... yes
checking for a sed that does not truncate output... (cached) /bin/sed
checking for gawk... (cached) gawk
checking if malloc debugging is wanted... no
checking for __attribute__... yes
checking for gcc architecture flag...
checking for x86 cpuid 0 output... d:756e6547:6c65746e:49656e69
checking for x86 cpuid 1 output... 40651:100800:7fdafbbf:bfebfbff
checking whether C compiler accepts -mtune=haswell... yes
checking for gcc architecture flag... -mtune=haswell
checking for pkg-config... /usr/bin/pkg-config
checking pkg-config is at least version 0.20... yes
checking for C compiler vendor... (cached) gnu
checking if LD -Wl,--version-script works... yes
checking for linker lazyload option... none
checking whether gcc is Clang... no
checking whether pthreads work with "-pthread" and "-lpthread"... yes
checking for joinable pthread attribute... PTHREAD_CREATE_JOINABLE
checking whether more special flags are required for pthreads... no
checking for PTHREAD_PRIO_INHERIT... yes
checking for gcc option to support OpenMP... -fopenmp
checking CL/cl.h usability... yes
checking CL/cl.h presence... yes
checking for CL/cl.h... yes
checking for OpenCL library... yes
checking for special C compiler options needed for large files... no
checking for _FILE_OFFSET_BITS value needed for large files... no
checking for _LARGEFILE_SOURCE value needed for large files... no
checking for BSD- or MS-compatible name lister (nm)... /usr/bin/nm -B
checking the name lister (/usr/bin/nm -B) interface... BSD nm
checking the maximum length of command line arguments... 1572864
checking how to convert x86_64-pc-linux-gnu file names to x86_64-pc-linux-gnu format... func_convert_file_noop
checking how to convert x86_64-pc-linux-gnu file names to toolchain format... func_convert_file_noop
checking for /usr/bin/ld option to reload object files... -r
checking for objdump... objdump
checking how to recognize dependent libraries... pass_all
checking for dlltool... no
checking how to associate runtime and link libraries... printf %s\n
checking for archiver @FILE support... @
checking for strip... strip
checking for ranlib... ranlib
checking command to parse /usr/bin/nm -B output from gcc object... ok
checking for sysroot... no
checking for a working dd... /bin/dd
checking how to truncate binary pipes... /bin/dd bs=4096 count=1
checking for mt... mt
checking if mt is a manifest tool... no
checking for dlfcn.h... yes
checking for objdir... .libs
checking if gcc supports -fno-rtti -fno-exceptions... no
checking for gcc option to produce PIC... -fPIC -DPIC
checking if gcc PIC flag -fPIC -DPIC works... yes
checking if gcc static flag -static works... yes
checking if gcc supports -c -o file.o... yes
checking if gcc supports -c -o file.o... (cached) yes
checking whether the gcc linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking whether -lc should be explicitly linked in... no
checking dynamic linker characteristics... GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking for shl_load... no
checking for shl_load in -ldld... no
checking for dlopen... no
checking for dlopen in -ldl... yes
checking whether a program can dlopen itself... yes
checking whether a statically linked program can dlopen itself... no
checking whether stripping libraries is possible... yes
checking if libtool supports shared libraries... yes
checking whether to build shared libraries... yes
checking whether to build static libraries... yes
checking how to run the C++ preprocessor... g++ -E
checking for ld used by g++... /usr/bin/ld -m elf_x86_64
checking if the linker (/usr/bin/ld -m elf_x86_64) is GNU ld... yes
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking for g++ option to produce PIC... -fPIC -DPIC
checking if g++ PIC flag -fPIC -DPIC works... yes
checking if g++ static flag -static works... yes
checking if g++ supports -c -o file.o... yes
checking if g++ supports -c -o file.o... (cached) yes
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking dynamic linker characteristics... (cached) GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking whether to enable maintainer-specific portions of Makefiles... no
checking whether gcc needs -traditional... no
checking for ANSI C header files... (cached) yes
checking whether to enable assertions... yes
checking for dirent.h that defines DIR... yes
checking for library containing opendir... none required
checking arm/limits.h usability... no
checking arm/limits.h presence... no
checking for arm/limits.h... no
checking arpa/inet.h usability... yes
checking arpa/inet.h presence... yes
checking for arpa/inet.h... yes
checking complex.h usability... yes
checking complex.h presence... yes
checking for complex.h... yes
checking errno.h usability... yes
checking errno.h presence... yes
checking for errno.h... yes
checking fcntl.h usability... yes
checking fcntl.h presence... yes
checking for fcntl.h... yes
checking limits.h usability... yes
checking limits.h presence... yes
checking for limits.h... yes
checking linux/unistd.h usability... yes
checking linux/unistd.h presence... yes
checking for linux/unistd.h... yes
checking locale.h usability... yes
checking locale.h presence... yes
checking for locale.h... yes
checking machine/param.h usability... no
checking machine/param.h presence... no
checking for machine/param.h... no
checking mach-o/dyld.h usability... no
checking mach-o/dyld.h presence... no
checking for mach-o/dyld.h... no
checking netinet/in.h usability... yes
checking netinet/in.h presence... yes
checking for netinet/in.h... yes
checking OS.h usability... no
checking OS.h presence... no
checking for OS.h... no
checking process.h usability... no
checking process.h presence... no
checking for process.h... no
checking sun_prefetch.h usability... no
checking sun_prefetch.h presence... no
checking for sun_prefetch.h... no
checking stdarg.h usability... yes
checking stdarg.h presence... yes
checking for stdarg.h... yes
checking sys/ipc.h usability... yes
checking sys/ipc.h presence... yes
checking for sys/ipc.h... yes
checking sys/mman.h usability... yes
checking sys/mman.h presence... yes
checking for sys/mman.h... yes
checking sys/resource.h usability... yes
checking sys/resource.h presence... yes
checking for sys/resource.h... yes
checking sys/sendfile.h usability... yes
checking sys/sendfile.h presence... yes
checking for sys/sendfile.h... yes
checking sys/socket.h usability... yes
checking sys/socket.h presence... yes
checking for sys/socket.h... yes
checking sys/syslimits.h usability... no
checking sys/syslimits.h presence... no
checking for sys/syslimits.h... no
checking sys/time.h usability... yes
checking sys/time.h presence... yes
checking for sys/time.h... yes
checking sys/timeb.h usability... yes
checking sys/timeb.h presence... yes
checking for sys/timeb.h... yes
checking sys/times.h usability... yes
checking sys/times.h presence... yes
checking for sys/times.h... yes
checking sys/wait.h usability... yes
checking sys/wait.h presence... yes
checking for sys/wait.h... yes
checking utime.h usability... yes
checking utime.h presence... yes
checking for utime.h... yes
checking wchar.h usability... yes
checking wchar.h presence... yes
checking for wchar.h... yes
checking xlocale.h usability... no
checking xlocale.h presence... no
checking for xlocale.h... no
checking for stdbool.h that conforms to C99... yes
checking for _Bool... yes
checking for working volatile... yes
checking for preprocessor stringizing operator... yes
checking whether stat file-mode macros are broken... no
checking whether time.h and sys/time.h may both be included... yes
checking whether struct tm is in sys/time.h or time.h... time.h
checking for struct tm.tm_zone... yes
checking whether #! works in shell scripts... yes
checking whether char is unsigned... no
checking for an ANSI C-conforming const... yes
checking for inline... inline
checking for C/C++ restrict keyword... __restrict
checking for working volatile... (cached) yes
checking whether byte ordering is bigendian... no
checking for int8_t... yes
checking for int16_t... yes
checking for int32_t... yes
checking for int64_t... yes
checking for unsigned long long int... yes
checking for long long int... yes
checking for intmax_t... yes
checking for intptr_t... yes
checking for mbstate_t... yes
checking for mode_t... yes
checking for off_t... yes
checking for pid_t... yes
checking for size_t... yes
checking for ssize_t... yes
checking for uid_t in sys/types.h... yes
checking for uint8_t... yes
checking for uint16_t... yes
checking for uint32_t... yes
checking for uint64_t... yes
checking for uintmax_t... yes
checking for uintptr_t... yes
checking size of float_t... 4
checking size of double_t... 8
checking size of float... 4
checking size of double... 8
checking size of long double... 16
checking size of unsigned long long... 8
checking size of void *... 8
checking whether our compiler supports __func__... yes
checking whether closedir returns void... no
checking for stdlib.h... (cached) yes
checking for unistd.h... (cached) yes
checking for sys/param.h... yes
checking for getpagesize... yes
checking for working mmap... yes
checking vfork.h usability... no
checking vfork.h presence... no
checking for vfork.h... no
checking for fork... yes
checking for vfork... yes
checking for working fork... yes
checking for working vfork... (cached) yes
checking for working memcmp... yes
checking sys/select.h usability... yes
checking sys/select.h presence... yes
checking for sys/select.h... yes
checking for sys/socket.h... (cached) yes
checking types of arguments for select... int,fd_set *,struct timeval *
checking for working strtod... yes
checking whether strerror_r is declared... yes
checking for strerror_r... yes
checking whether strerror_r returns char *... yes
checking for vprintf... yes
checking for _doprnt... no
checking for sqrt in -lm... yes
checking for library containing gethostbyname... none required
checking for library containing socket... none required
checking for library containing clock_gettime... none required
checking whether clock_gettime supports CLOCK_REALTIME... yes
checking whether pread is declared... yes
checking whether pwrite is declared... yes
checking whether strlcpy is declared... no
checking whether vsnprintf is declared... yes
checking whether we are using the GNU C++ compiler... (cached) yes
checking whether g++ accepts -g... (cached) yes
checking dependency style of g++... (cached) gcc3
checking whether the compiler recognizes bool as a built-in type... yes
checking whether the compiler implements namespaces... yes
checking if g++ supports namespace std... yes
checking whether the compiler supports ISO C++ standard library... yes
checking for g++ option to support OpenMP... -fopenmp
checking whether C++ compiler is sufficient for Magick++... yes
checking for X11 configure files...
checking for GOMP_parallel_start in -lgomp... yes
-------------------------------------------------------------
checking for BZLIB...
checking bzlib.h usability... yes
checking bzlib.h presence... yes
checking for bzlib.h... yes
checking for BZ2_bzDecompress in -lbz2... yes
checking if BZLIB package is complete... yes
checking for X... libraries , headers
checking for gethostbyname... yes
checking for connect... yes
checking for remove... yes
checking for shmat... yes
checking for IceConnectionNumber in -lICE... yes
-------------------------------------------------------------
checking for X11...
checking for shmctl... yes
checking for XShmAttach in -lXext... yes
checking for XShapeCombineMask in -lXext... yes
checking for XtSetEventDispatcher in -lXt... yes
-------------------------------------------------------------
checking for libzip >= 1.0.0... no

-------------------------------------------------------------
checking for zlib >= 1.0.0... yes

-------------------------------------------------------------
checking for libzstd >= 1.0.0... no

-------------------------------------------------------------
checking for libltdl...
checking ltdl.h usability... yes
checking ltdl.h presence... yes
checking for ltdl.h... yes
checking for lt_dlinit in -lltdl... yes
checking if libltdl package is complete... yes
-------------------------------------------------------------
checking for DPS...
checking DPS/dpsXclient.h usability... no
checking DPS/dpsXclient.h presence... no
checking for DPS/dpsXclient.h... no
checking for DPSInitialize in -ldps... no
checking for DPSInitialize in -ldps... no
checking for XDPSPixelsPerPoint in -ldpstk... no
checking if DPS package is complete... no
-------------------------------------------------------------
checking for fftw3 >= 3.0.0... no

-------------------------------------------------------------
checking for FLIF...
checking flif.h usability... no
checking flif.h presence... no
checking for flif.h... no
checking for flif_create_decoder in -lflif... no
checking if FLIF package is complete... no
-------------------------------------------------------------
checking for FlashPIX...
checking fpxlib.h usability... no
checking fpxlib.h presence... no
checking for fpxlib.h... no
checking for FPX_OpenImageByFilename in -lfpx... no
checking if FlashPIX package is complete... no
-------------------------------------------------------------
checking for ddjvuapi >= 3.5.0... no

-------------------------------------------------------------
checking for fontconfig >= 2.1.0... yes

-------------------------------------------------------------
checking for freetype2... yes

-------------------------------------------------------------
checking for raqm... no

-------------------------------------------------------------
checking for libgvc >= 2.9.0... no

-------------------------------------------------------------
checking for libheif... yes

-------------------------------------------------------------
checking for JBIG...
checking jbig.h usability... no
checking jbig.h presence... no
checking for jbig.h... no
checking for jbg_dec_init in -ljbig... no
checking if JBIG package is complete... no
-------------------------------------------------------------
checking for JPEG...
checking jconfig.h usability... yes
checking jconfig.h presence... yes
checking for jconfig.h... yes
checking jerror.h usability... yes
checking jerror.h presence... yes
checking for jerror.h... yes
checking jmorecfg.h usability... yes
checking jmorecfg.h presence... yes
checking for jmorecfg.h... yes
checking jpeglib.h usability... yes
checking jpeglib.h presence... yes
checking for jpeglib.h... yes
checking for jpeg_read_header in -ljpeg... yes
checking for JPEG library is version 6b or later... yes
checking if JPEG package is complete... yes
-------------------------------------------------------------
checking for brunsli...
checking brunsli/decode.h usability... no
checking brunsli/decode.h presence... no
checking for brunsli/decode.h... no
checking brunsli/encode.h usability... no
checking brunsli/encode.h presence... no
checking for brunsli/encode.h... no
checking for DecodeBrunsli in -lbrunslidec-c... no
checking for EncodeBrunsli in -lbrunslienc-c... no
checking if brunsli package is complete... no
-------------------------------------------------------------
checking for lcms2 >= 2.0.0... no

-------------------------------------------------------------
checking for libopenjp2 >= 2.1.0... yes

-------------------------------------------------------------
checking for lqr-1 >= 0.1.0... no

-------------------------------------------------------------
checking for liblzma >= 2.9.0... no

-------------------------------------------------------------
checking for OpenEXR >= 1.0.6... no

-------------------------------------------------------------
checking for pangocairo >= 1.28.1... no

checking for pango >= 1.28.1... no

-------------------------------------------------------------
checking for libpng >= 1.0.0... yes

-------------------------------------------------------------
checking for libraw_r >= 0.14.8... no

-------------------------------------------------------------
checking for TIFF...
checking tiff.h usability... no
checking tiff.h presence... no
checking for tiff.h... no
checking tiffio.h usability... no
checking tiffio.h presence... no
checking for tiffio.h... no
checking for TIFFOpen in -ltiff... no
checking for TIFFClientOpen in -ltiff... no
checking for TIFFIsByteSwapped in -ltiff... no
checking for TIFFReadRGBATile in -ltiff... no
checking for TIFFReadRGBAStrip in -ltiff... no
checking if TIFF package is complete... no
-------------------------------------------------------------
checking for libwebp... yes
checking for libwebpmux >= 0.5.0 libwebpdemux >= 0.5.0... yes

checking for WMF support ...
checking for libwmf/ipa.h... no
checking if WMF package is complete ... no
-------------------------------------------------------------
checking for libxml-2.0 >= 2.0.0... yes

checking for acosh... yes
checking for _aligned_malloc... no
checking for aligned_malloc... no
checking for asinh... yes
checking for atanh... yes
checking for atoll... yes
checking for atexit... yes
checking for cabs... yes
checking for carg... yes
checking for cimag... yes
checking for creal... yes
checking for clock... yes
checking for clock_getres... yes
checking for clock_gettime... yes
checking for ctime_r... yes
checking for directio... no
checking for erf... yes
checking for _exit... yes
checking for execvp... yes
checking for fchmod... yes
checking for floor... yes
checking for fork... (cached) yes
checking for ftime... yes
checking for ftruncate... yes
checking for getc_unlocked... yes
checking for getcwd... yes
checking for getpid... yes
checking for getexecname... no
checking for getdtablesize... yes
checking for getpagesize... (cached) yes
checking for getpwnam_r... yes
checking for getrlimit... yes
checking for getrusage... yes
checking for gettimeofday... yes
checking for gmtime_r... yes
checking for isnan... yes
checking for j0... yes
checking for j1... yes
checking for lltostr... no
checking for localtime_r... yes
checking for lstat... yes
checking for memmove... yes
checking for memset... yes
checking for mkstemp... yes
checking for munmap... yes
checking for nanosleep... yes
checking for newlocale... yes
checking for _NSGetExecutablePath... no
checking for pclose... yes
checking for _pclose... no
checking for poll... yes
checking for popen... yes
checking for _popen... no
checking for posix_fadvise... yes
checking for posix_fallocate... yes
checking for posix_madvise... yes
checking for posix_memalign... yes
checking for posix_spawnp... yes
checking for pow... yes
checking for pread... yes
checking for pwrite... yes
checking for qsort_r... yes
checking for raise... yes
checking for rand_r... yes
checking for readlink... yes
checking for realpath... yes
checking for select... yes
checking for seekdir... yes
checking for sendfile... yes
checking for setlocale... yes
checking for socket... yes
checking for sqrt... yes
checking for setvbuf... yes
checking for stat... yes
checking for strcasestr... yes
checking for strchr... yes
checking for strrchr... yes
checking for strcspn... yes
checking for strdup... yes
checking for strpbrk... yes
checking for strspn... yes
checking for strstr... yes
checking for strtod... (cached) yes
checking for strtod_l... yes
checking for strtol... yes
checking for strtoul... yes
checking for symlink... yes
checking for sysconf... yes
checking for sigemptyset... yes
checking for sigaction... yes
checking for spawnvp... no
checking for strerror... yes
checking for strlcat... no
checking for strlcpy... no
checking for strcasecmp... yes
checking for strncasecmp... yes
checking for telldir... yes
checking for tempnam... yes
checking for times... yes
checking for ulltostr... no
checking for uselocale... yes
checking for usleep... yes
checking for utime... yes
checking for vfprintf... yes
checking for vfprintf_l... no
checking for vsprintf... yes
checking for vsnprintf... yes
checking for vsnprintf_l... no
checking for waitpid... yes
checking for _wfopen... no
checking for _wstat... no
-------------------------------------------------------------
checking for ImageMagick delegate programs...
checking for bpgdec... bpgdec
checking for bpgenc... bpgenc
checking for blender... /usr/bin/blender
checking for xdg-open... /usr/bin/xdg-open
checking for ufraw-batch... ufraw-batch
checking for libreoffice... /usr/bin/libreoffice
checking for dvips... /usr/bin/dvips
checking for magick... /usr/local/bin/magick
checking for magick... /usr/local/bin/magick
checking for xterm... /usr/bin/xterm
checking for dot... dot
checking for hp2xx... hp2xx
checking for html2ps... html2ps
checking for ilbmtoppm... /usr/bin/ilbmtoppm
checking for ppmtoilbm... /usr/bin/ppmtoilbm
checking for JxrDecApp... JxrDecApp
checking for JxrEncApp... JxrEncApp
checking for lepton... lepton
checking for lp... /usr/bin/lp
checking for lpr... /usr/bin/lpr
checking for gimp... /usr/bin/gimp
checking for magick... /usr/local/bin/magick
checking for avconv... avconv
checking for ffmpeg... (cached) avconv
checking for avconv... avconv
checking for ffmpeg... (cached) avconv
checking for mrsidgeodecode... mrsidgeodecode
checking for mv... /bin/mv
checking for pcl6... pcl6
checking for gsx... no
checking for gsc... no
checking for gs... /usr/bin/gs
checking for rm... /bin/rm
checking for rsvg-convert... rsvg-convert
checking for inkscape... /usr/bin/inkscape
checking for potrace... /usr/bin/potrace
checking for fig2dev... /usr/bin/fig2dev
checking for dwebp... /usr/bin/dwebp
checking for cwebp... /usr/bin/cwebp
checking for curl... /usr/bin/curl
checking for gxps... gxps
checking for Apple fonts directory... not found!
checking for Dejavu fonts directory... not found!
checking for Ghostscript fonts directory... /usr/share/fonts/type1/gsfonts/
checking for URW-base35 fonts directory... not found!
checking for Windows fonts directory... not found!
checking for gnutar... no
checking for gtar... no
checking for tar... tar
checking for perl... perl
checking for rpmbuild... no
checking for rpm... no
checking for 7za... 7za
checking for zip... zip
-------------------------------------------------------------
checking for Ghostscript...
checking for Ghostscript version... 9.26
checking for gs color device... png16m
checking for gs alpha device... pngalpha
checking for gs CMYK device... pamcmyk32
checking for gs mono device... pbmraw
checking for gs PDF writing device... pdfwrite
checking for gs PS writing device... ps2write
checking for gs EPS writing device... eps2write
-------------------------------------------------------------
Update ImageMagick configuration
checking that generated files are newer than configure... done
checking that generated files are newer than configure... done
configure: creating ./config.status
config.status: creating common.shi
config.status: creating config/configure.xml
config.status: creating config/delegates.xml
config.status: creating config/ImageMagick.rdf
config.status: creating config/MagickCore.dox
config.status: creating config/MagickWand.dox
config.status: creating config/Magick++.dox
config.status: creating config/type-apple.xml
config.status: creating config/type-dejavu.xml
config.status: creating config/type-ghostscript.xml
config.status: creating config/type-urw-base35.xml
config.status: creating config/type-windows.xml
config.status: creating config/type.xml
config.status: creating ImageMagick.spec
config.status: creating Magick++/bin/Magick++-config
config.status: creating MagickCore/ImageMagick.pc
config.status: creating Magick++/lib/Magick++.pc
config.status: creating MagickCore/MagickCore-config
config.status: creating MagickCore/MagickCore.pc
config.status: creating MagickCore/version.h
config.status: creating Makefile
config.status: creating magick.sh
config.status: creating PerlMagick/check.sh
config.status: creating PerlMagick/default/Magick.pm
config.status: creating PerlMagick/Makefile.PL
config.status: creating PerlMagick/default/Makefile.PL
config.status: creating PerlMagick/quantum/Makefile.PL
config.status: creating PerlMagick/quantum/quantum.pm
config.status: creating PerlMagick/quantum/quantum.xs
config.status: creating PerlMagick/quantum/typemap
config.status: creating utilities/animate.1
config.status: creating utilities/compare.1
config.status: creating utilities/composite.1
config.status: creating utilities/conjure.1
config.status: creating utilities/convert.1
config.status: creating utilities/display.1
config.status: creating utilities/identify.1
config.status: creating utilities/ImageMagick.1
config.status: creating utilities/import.1
config.status: creating utilities/magick.1
config.status: creating utilities/magick-script.1
config.status: creating utilities/mogrify.1
config.status: creating utilities/montage.1
config.status: creating utilities/stream.1
config.status: creating MagickWand/MagickWand-config
config.status: creating MagickWand/MagickWand.pc
config.status: creating config/config.h
config.status: executing MagickCore/magick-baseconfig.h commands
config.status: creating MagickCore/magick-baseconfig.h - prefix MAGICKCORE for config/config.h defines
config.status: executing depfiles commands
config.status: executing libtool commands
config.status: executing default commands
config.status: executing magick.sh.in commands
config.status: executing MagickCore-config.in commands
config.status: executing MagickWand-config.in commands
config.status: executing Magick++-config.in commands
config.status: executing PerlMagick/check.sh.in commands
configure:
==============================================================================
ImageMagick 7.0.10-29 is configured as follows. Please verify that this
configuration matches your expectations.

Host system type: x86_64-pc-linux-gnu
Build system type: x86_64-pc-linux-gnu

               Option                        Value
------------------------------------------------------------------------------
Shared libraries  --enable-shared=yes          yes
Static libraries  --enable-static=yes          yes
Build utilities   --with-utilities=yes         yes
Module support    --with-modules=no            no
GNU ld            --with-gnu-ld=yes            yes
Quantum depth     --with-quantum-depth=16      16
High Dynamic Range Imagery
                  --enable-hdri=yes            yes

Install documentation:                         yes

Memory allocation library:
  JEMalloc          --with-jemalloc=no         no
  TCMalloc          --with-tcmalloc=no         no
  UMem              --with-umem=no             no

Delegate library configuration:
  BZLIB             --with-bzlib=yes           yes
  Autotrace         --with-autotrace=no        no
  DJVU              --with-djvu=yes            no
  DPS               --with-dps=yes             no
  FFTW              --with-fftw=yes            no
  FLIF              --with-flif=yes            no
  FlashPIX          --with-fpx=yes             no
  FontConfig        --with-fontconfig=yes      yes
  FreeType          --with-freetype=yes        yes
  Ghostscript lib   --with-gslib=no            no
  Graphviz          --with-gvc=yes             no
  HEIC              --with-heic=yes            yes
  JBIG              --with-jbig=yes            no
  JPEG v1           --with-jpeg=yes            yes
  JPEG XL           --with-jxl=yes             no
  LCMS              --with-lcms=yes            no
  LQR               --with-lqr=yes             no
  LTDL              --with-ltdl=yes            yes
  LZMA              --with-lzma=yes            no
  Magick++          --with-magick-plus-plus=yes yes
  OpenEXR           --with-openexr=yes         no
  OpenJP2           --with-openjp2=yes         yes
  PANGO             --with-pango=yes           no
  PERL              --with-perl=no             no
  PNG               --with-png=yes             yes
  RAQM              --with-raqm=yes            no
  RAW               --with-raw=yes             no
  RSVG              --with-rsvg=no             no
  TIFF              --with-tiff=yes            no
  WEBP              --with-webp=yes            yes
  WMF               --with-wmf=yes             no
  X11               --with-x=                  yes
  XML               --with-xml=yes             yes
  ZIP               --with-ziplib=yes          no
  ZLIB              --with-zlib=yes            yes
  ZSTD              --with-zstd=yes            no

Delegate program configuration:
  GhostPCL          None                       pcl6 (unknown)
  GhostXPS          None                       gxps (unknown)
  Ghostscript       None                       gs (9.26)

Font configuration:
  Apple fonts       --with-apple-font-dir=default
  Dejavu fonts      --with-dejavu-font-dir=default     none
  Ghostscript fonts --with-gs-font-dir=default         /usr/share/fonts/type1/gsfonts/
  URW-base35 fonts  --with-urw-base35-font-dir=default none
  Windows fonts     --with-windows-font-dir=default    none

X11 configuration:
  X_CFLAGS        =
  X_PRE_LIBS      =  -lSM -lICE
  X_LIBS          =
  X_EXTRA_LIBS    =

Options used to compile and link:
  PREFIX          = /usr/local
  EXEC-PREFIX     = /usr/local
  VERSION         = 7.0.10
  CC              = gcc
  CFLAGS          = -I/usr/include/libxml2   -I/usr/include/libpng16 -I/usr/include/openjpeg-2.3  -I/usr/include/freetype2 -I/usr/include/libpng16 -I/usr/include/freetype2 -I/usr/include/libpng16 -I/usr/include/freetype2 -I/usr/include/libpng16  -fopenmp -Wall -g -O2 -mtune=haswell -fexceptions -pthread -DMAGICKCORE_HDRI_ENABLE=1 -DMAGICKCORE_QUANTUM_DEPTH=16
  CPPFLAGS        =  -DMAGICKCORE_HDRI_ENABLE=1 -DMAGICKCORE_QUANTUM_DEPTH=16
  PCFLAGS         =
  DEFS            = -DHAVE_CONFIG_H
  LDFLAGS         =
  LIBS            =     -lfreetype  -ljpeg    -lpng16 -lz      -lfontconfig -lfreetype -lheif -lwebpmux -lwebpdemux -lwebp -lwebp   -lXext -lXt   -lSM -lICE -lX11   -lbz2  -lopenjp2    -lxml2  -lz -lz  -lltdl   -lm    -lpthread
  CXX             = g++
  CXXFLAGS        = -g -O2 -pthread
  FEATURES        = DPC HDRI Cipher OpenCL OpenMP
  DELEGATES       = bzlib mpeg fontconfig freetype heic jng jpeg openjp2 png ps webp x xml zlib
==============================================================================

```
<!-- markdownlint-restore -->
</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

Now it is worth stopping for a moment and checking
if everything is going as planned.
In my case, when I did it for the first time, not everything went well.
Admittedly, after compiling the new version,
Image Magick already supported HEIF / HEIC files.
But it stopped recognizing JPG files.
It was unintentional and had to be repeated all over again.
Please note the option DELEGATES.
The DELEGATES option is displayed in the last lines.

Here's what it looked like for me the first and second time.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```diff
-  DELEGATES       = bzlib mpeg fontconfig freetype heic openjp2 png ps webp x xml zlib
+  DELEGATES       = bzlib mpeg fontconfig freetype heic jng jpeg openjp2 png ps webp x xml zlib
```
<!-- markdownlint-restore -->

The correct configuration should include the line:

```text
checking if JPEG package is complete... yes
```

This is true for any format we're going to support.
Just in case configure can be called with parameters.

```console
./configure \
  --with-heic=yes \
  --with-jpeg=yes \
  --with-png=yes \
  --with-tiff=yes \
  --with-webp=yes
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see configure call with parameters.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

In my case, adding these parameters did not change anything,
which makes me very happy.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 MD013 -->
```console
$ ./configure \
>   --with-heic=yes \
>   --with-jpeg=yes \
>   --with-png=yes \
>   --with-tiff=yes \
>   --with-webp=yes
checking build system type... x86_64-pc-linux-gnu
checking host system type... x86_64-pc-linux-gnu
checking target system type... x86_64-pc-linux-gnu
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for a thread-safe mkdir -p... /bin/mkdir -p
checking for gawk... gawk
checking whether make sets $(MAKE)... yes
checking whether make supports nested variables... yes
checking whether UID '1000' is supported by ustar format... yes
checking whether GID '1000' is supported by ustar format... yes
checking how to create a ustar tar archive... gnutar
checking whether make supports nested variables... (cached) yes
configuring ImageMagick 7.0.10-29
checking whether build environment is sane... yes
checking whether make supports the include directive... yes (GNU style)
checking for gcc... gcc
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables...
checking whether we are cross compiling... no
checking for suffix of object files... o
checking whether we are using the GNU C compiler... yes
checking whether gcc accepts -g... yes
checking for gcc option to accept ISO C89... none needed
checking whether gcc understands -c and -o together... yes
checking dependency style of gcc... gcc3
checking how to run the C preprocessor... gcc -E
checking for grep that handles long lines and -e... /bin/grep
checking for egrep... /bin/grep -E
checking for ANSI C header files... yes
checking for sys/types.h... yes
checking for sys/stat.h... yes
checking for stdlib.h... yes
checking for string.h... yes
checking for memory.h... yes
checking for strings.h... yes
checking for inttypes.h... yes
checking for stdint.h... yes
checking for unistd.h... yes
checking minix/config.h usability... no
checking minix/config.h presence... no
checking for minix/config.h... no
checking whether it is safe to define __EXTENSIONS__... yes
checking for ar... ar
checking the archiver (ar) interface... ar
checking for gcc... (cached) gcc
checking whether we are using the GNU C compiler... (cached) yes
checking whether gcc accepts -g... (cached) yes
checking for gcc option to accept ISO C89... (cached) none needed
checking whether gcc understands -c and -o together... (cached) yes
checking dependency style of gcc... (cached) gcc3
checking for g++... g++
checking whether we are using the GNU C++ compiler... yes
checking whether g++ accepts -g... yes
checking dependency style of g++... gcc3
checking for gcc option to accept ISO C99... none needed
checking for gcc option to accept ISO Standard C... (cached) none needed
checking how to run the C preprocessor... gcc -E
checking for a sed that does not truncate output... /bin/sed
checking for fgrep... /bin/grep -F
checking how to print strings... printf
checking for ld used by gcc... /usr/bin/ld
checking if the linker (/usr/bin/ld) is GNU ld... yes
checking for gcc option to accept ISO C99... (cached) none needed
checking for C compiler vendor... gnu
checking CFLAGS for most reasonable warnings... -Wall
checking whether make sets $(MAKE)... (cached) yes
checking whether ln -s works... yes
checking for a sed that does not truncate output... (cached) /bin/sed
checking for gawk... (cached) gawk
checking if malloc debugging is wanted... no
checking for __attribute__... yes
checking for gcc architecture flag...
checking for x86 cpuid 0 output... d:756e6547:6c65746e:49656e69
checking for x86 cpuid 1 output... 40651:100800:7fdafbbf:bfebfbff
checking whether C compiler accepts -mtune=haswell... yes
checking for gcc architecture flag... -mtune=haswell
checking for pkg-config... /usr/bin/pkg-config
checking pkg-config is at least version 0.20... yes
checking for C compiler vendor... (cached) gnu
checking if LD -Wl,--version-script works... yes
checking for linker lazyload option... none
checking whether gcc is Clang... no
checking whether pthreads work with "-pthread" and "-lpthread"... yes
checking for joinable pthread attribute... PTHREAD_CREATE_JOINABLE
checking whether more special flags are required for pthreads... no
checking for PTHREAD_PRIO_INHERIT... yes
checking for gcc option to support OpenMP... -fopenmp
checking CL/cl.h usability... yes
checking CL/cl.h presence... yes
checking for CL/cl.h... yes
checking for OpenCL library... yes
checking for special C compiler options needed for large files... no
checking for _FILE_OFFSET_BITS value needed for large files... no
checking for _LARGEFILE_SOURCE value needed for large files... no
checking for BSD- or MS-compatible name lister (nm)... /usr/bin/nm -B
checking the name lister (/usr/bin/nm -B) interface... BSD nm
checking the maximum length of command line arguments... 1572864
checking how to convert x86_64-pc-linux-gnu file names to x86_64-pc-linux-gnu format... func_convert_file_noop
checking how to convert x86_64-pc-linux-gnu file names to toolchain format... func_convert_file_noop
checking for /usr/bin/ld option to reload object files... -r
checking for objdump... objdump
checking how to recognize dependent libraries... pass_all
checking for dlltool... no
checking how to associate runtime and link libraries... printf %s\n
checking for archiver @FILE support... @
checking for strip... strip
checking for ranlib... ranlib
checking command to parse /usr/bin/nm -B output from gcc object... ok
checking for sysroot... no
checking for a working dd... /bin/dd
checking how to truncate binary pipes... /bin/dd bs=4096 count=1
checking for mt... mt
checking if mt is a manifest tool... no
checking for dlfcn.h... yes
checking for objdir... .libs
checking if gcc supports -fno-rtti -fno-exceptions... no
checking for gcc option to produce PIC... -fPIC -DPIC
checking if gcc PIC flag -fPIC -DPIC works... yes
checking if gcc static flag -static works... yes
checking if gcc supports -c -o file.o... yes
checking if gcc supports -c -o file.o... (cached) yes
checking whether the gcc linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking whether -lc should be explicitly linked in... no
checking dynamic linker characteristics... GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking for shl_load... no
checking for shl_load in -ldld... no
checking for dlopen... no
checking for dlopen in -ldl... yes
checking whether a program can dlopen itself... yes
checking whether a statically linked program can dlopen itself... no
checking whether stripping libraries is possible... yes
checking if libtool supports shared libraries... yes
checking whether to build shared libraries... yes
checking whether to build static libraries... yes
checking how to run the C++ preprocessor... g++ -E
checking for ld used by g++... /usr/bin/ld -m elf_x86_64
checking if the linker (/usr/bin/ld -m elf_x86_64) is GNU ld... yes
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking for g++ option to produce PIC... -fPIC -DPIC
checking if g++ PIC flag -fPIC -DPIC works... yes
checking if g++ static flag -static works... yes
checking if g++ supports -c -o file.o... yes
checking if g++ supports -c -o file.o... (cached) yes
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking dynamic linker characteristics... (cached) GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking whether to enable maintainer-specific portions of Makefiles... no
checking whether gcc needs -traditional... no
checking for ANSI C header files... (cached) yes
checking whether to enable assertions... yes
checking for dirent.h that defines DIR... yes
checking for library containing opendir... none required
checking arm/limits.h usability... no
checking arm/limits.h presence... no
checking for arm/limits.h... no
checking arpa/inet.h usability... yes
checking arpa/inet.h presence... yes
checking for arpa/inet.h... yes
checking complex.h usability... yes
checking complex.h presence... yes
checking for complex.h... yes
checking errno.h usability... yes
checking errno.h presence... yes
checking for errno.h... yes
checking fcntl.h usability... yes
checking fcntl.h presence... yes
checking for fcntl.h... yes
checking limits.h usability... yes
checking limits.h presence... yes
checking for limits.h... yes
checking linux/unistd.h usability... yes
checking linux/unistd.h presence... yes
checking for linux/unistd.h... yes
checking locale.h usability... yes
checking locale.h presence... yes
checking for locale.h... yes
checking machine/param.h usability... no
checking machine/param.h presence... no
checking for machine/param.h... no
checking mach-o/dyld.h usability... no
checking mach-o/dyld.h presence... no
checking for mach-o/dyld.h... no
checking netinet/in.h usability... yes
checking netinet/in.h presence... yes
checking for netinet/in.h... yes
checking OS.h usability... no
checking OS.h presence... no
checking for OS.h... no
checking process.h usability... no
checking process.h presence... no
checking for process.h... no
checking sun_prefetch.h usability... no
checking sun_prefetch.h presence... no
checking for sun_prefetch.h... no
checking stdarg.h usability... yes
checking stdarg.h presence... yes
checking for stdarg.h... yes
checking sys/ipc.h usability... yes
checking sys/ipc.h presence... yes
checking for sys/ipc.h... yes
checking sys/mman.h usability... yes
checking sys/mman.h presence... yes
checking for sys/mman.h... yes
checking sys/resource.h usability... yes
checking sys/resource.h presence... yes
checking for sys/resource.h... yes
checking sys/sendfile.h usability... yes
checking sys/sendfile.h presence... yes
checking for sys/sendfile.h... yes
checking sys/socket.h usability... yes
checking sys/socket.h presence... yes
checking for sys/socket.h... yes
checking sys/syslimits.h usability... no
checking sys/syslimits.h presence... no
checking for sys/syslimits.h... no
checking sys/time.h usability... yes
checking sys/time.h presence... yes
checking for sys/time.h... yes
checking sys/timeb.h usability... yes
checking sys/timeb.h presence... yes
checking for sys/timeb.h... yes
checking sys/times.h usability... yes
checking sys/times.h presence... yes
checking for sys/times.h... yes
checking sys/wait.h usability... yes
checking sys/wait.h presence... yes
checking for sys/wait.h... yes
checking utime.h usability... yes
checking utime.h presence... yes
checking for utime.h... yes
checking wchar.h usability... yes
checking wchar.h presence... yes
checking for wchar.h... yes
checking xlocale.h usability... no
checking xlocale.h presence... no
checking for xlocale.h... no
checking for stdbool.h that conforms to C99... yes
checking for _Bool... yes
checking for working volatile... yes
checking for preprocessor stringizing operator... yes
checking whether stat file-mode macros are broken... no
checking whether time.h and sys/time.h may both be included... yes
checking whether struct tm is in sys/time.h or time.h... time.h
checking for struct tm.tm_zone... yes
checking whether #! works in shell scripts... yes
checking whether char is unsigned... no
checking for an ANSI C-conforming const... yes
checking for inline... inline
checking for C/C++ restrict keyword... __restrict
checking for working volatile... (cached) yes
checking whether byte ordering is bigendian... no
checking for int8_t... yes
checking for int16_t... yes
checking for int32_t... yes
checking for int64_t... yes
checking for unsigned long long int... yes
checking for long long int... yes
checking for intmax_t... yes
checking for intptr_t... yes
checking for mbstate_t... yes
checking for mode_t... yes
checking for off_t... yes
checking for pid_t... yes
checking for size_t... yes
checking for ssize_t... yes
checking for uid_t in sys/types.h... yes
checking for uint8_t... yes
checking for uint16_t... yes
checking for uint32_t... yes
checking for uint64_t... yes
checking for uintmax_t... yes
checking for uintptr_t... yes
checking size of float_t... 4
checking size of double_t... 8
checking size of float... 4
checking size of double... 8
checking size of long double... 16
checking size of unsigned long long... 8
checking size of void *... 8
checking whether our compiler supports __func__... yes
checking whether closedir returns void... no
checking for stdlib.h... (cached) yes
checking for unistd.h... (cached) yes
checking for sys/param.h... yes
checking for getpagesize... yes
checking for working mmap... yes
checking vfork.h usability... no
checking vfork.h presence... no
checking for vfork.h... no
checking for fork... yes
checking for vfork... yes
checking for working fork... yes
checking for working vfork... (cached) yes
checking for working memcmp... yes
checking sys/select.h usability... yes
checking sys/select.h presence... yes
checking for sys/select.h... yes
checking for sys/socket.h... (cached) yes
checking types of arguments for select... int,fd_set *,struct timeval *
checking for working strtod... yes
checking whether strerror_r is declared... yes
checking for strerror_r... yes
checking whether strerror_r returns char *... yes
checking for vprintf... yes
checking for _doprnt... no
checking for sqrt in -lm... yes
checking for library containing gethostbyname... none required
checking for library containing socket... none required
checking for library containing clock_gettime... none required
checking whether clock_gettime supports CLOCK_REALTIME... yes
checking whether pread is declared... yes
checking whether pwrite is declared... yes
checking whether strlcpy is declared... no
checking whether vsnprintf is declared... yes
checking whether we are using the GNU C++ compiler... (cached) yes
checking whether g++ accepts -g... (cached) yes
checking dependency style of g++... (cached) gcc3
checking whether the compiler recognizes bool as a built-in type... yes
checking whether the compiler implements namespaces... yes
checking if g++ supports namespace std... yes
checking whether the compiler supports ISO C++ standard library... yes
checking for g++ option to support OpenMP... -fopenmp
checking whether C++ compiler is sufficient for Magick++... yes
checking for X11 configure files...
checking for GOMP_parallel_start in -lgomp... yes
-------------------------------------------------------------
checking for BZLIB...
checking bzlib.h usability... yes
checking bzlib.h presence... yes
checking for bzlib.h... yes
checking for BZ2_bzDecompress in -lbz2... yes
checking if BZLIB package is complete... yes
checking for X... libraries , headers
checking for gethostbyname... yes
checking for connect... yes
checking for remove... yes
checking for shmat... yes
checking for IceConnectionNumber in -lICE... yes
-------------------------------------------------------------
checking for X11...
checking for shmctl... yes
checking for XShmAttach in -lXext... yes
checking for XShapeCombineMask in -lXext... yes
checking for XtSetEventDispatcher in -lXt... yes
-------------------------------------------------------------
checking for libzip >= 1.0.0... no

-------------------------------------------------------------
checking for zlib >= 1.0.0... yes

-------------------------------------------------------------
checking for libzstd >= 1.0.0... no

-------------------------------------------------------------
checking for libltdl...
checking ltdl.h usability... yes
checking ltdl.h presence... yes
checking for ltdl.h... yes
checking for lt_dlinit in -lltdl... yes
checking if libltdl package is complete... yes
-------------------------------------------------------------
checking for DPS...
checking DPS/dpsXclient.h usability... no
checking DPS/dpsXclient.h presence... no
checking for DPS/dpsXclient.h... no
checking for DPSInitialize in -ldps... no
checking for DPSInitialize in -ldps... no
checking for XDPSPixelsPerPoint in -ldpstk... no
checking if DPS package is complete... no
-------------------------------------------------------------
checking for fftw3 >= 3.0.0... no

-------------------------------------------------------------
checking for FLIF...
checking flif.h usability... no
checking flif.h presence... no
checking for flif.h... no
checking for flif_create_decoder in -lflif... no
checking if FLIF package is complete... no
-------------------------------------------------------------
checking for FlashPIX...
checking fpxlib.h usability... no
checking fpxlib.h presence... no
checking for fpxlib.h... no
checking for FPX_OpenImageByFilename in -lfpx... no
checking if FlashPIX package is complete... no
-------------------------------------------------------------
checking for ddjvuapi >= 3.5.0... no

-------------------------------------------------------------
checking for fontconfig >= 2.1.0... yes

-------------------------------------------------------------
checking for freetype2... yes

-------------------------------------------------------------
checking for raqm... no

-------------------------------------------------------------
checking for libgvc >= 2.9.0... no

-------------------------------------------------------------
checking for libheif... yes

-------------------------------------------------------------
checking for JBIG...
checking jbig.h usability... no
checking jbig.h presence... no
checking for jbig.h... no
checking for jbg_dec_init in -ljbig... no
checking if JBIG package is complete... no
-------------------------------------------------------------
checking for JPEG...
checking jconfig.h usability... yes
checking jconfig.h presence... yes
checking for jconfig.h... yes
checking jerror.h usability... yes
checking jerror.h presence... yes
checking for jerror.h... yes
checking jmorecfg.h usability... yes
checking jmorecfg.h presence... yes
checking for jmorecfg.h... yes
checking jpeglib.h usability... yes
checking jpeglib.h presence... yes
checking for jpeglib.h... yes
checking for jpeg_read_header in -ljpeg... yes
checking for JPEG library is version 6b or later... yes
checking if JPEG package is complete... yes
-------------------------------------------------------------
checking for brunsli...
checking brunsli/decode.h usability... no
checking brunsli/decode.h presence... no
checking for brunsli/decode.h... no
checking brunsli/encode.h usability... no
checking brunsli/encode.h presence... no
checking for brunsli/encode.h... no
checking for DecodeBrunsli in -lbrunslidec-c... no
checking for EncodeBrunsli in -lbrunslienc-c... no
checking if brunsli package is complete... no
-------------------------------------------------------------
checking for lcms2 >= 2.0.0... no

-------------------------------------------------------------
checking for libopenjp2 >= 2.1.0... yes

-------------------------------------------------------------
checking for lqr-1 >= 0.1.0... no

-------------------------------------------------------------
checking for liblzma >= 2.9.0... no

-------------------------------------------------------------
checking for OpenEXR >= 1.0.6... no

-------------------------------------------------------------
checking for pangocairo >= 1.28.1... no

checking for pango >= 1.28.1... no

-------------------------------------------------------------
checking for libpng >= 1.0.0... yes

-------------------------------------------------------------
checking for libraw_r >= 0.14.8... no

-------------------------------------------------------------
checking for TIFF...
checking tiff.h usability... no
checking tiff.h presence... no
checking for tiff.h... no
checking tiffio.h usability... no
checking tiffio.h presence... no
checking for tiffio.h... no
checking for TIFFOpen in -ltiff... no
checking for TIFFClientOpen in -ltiff... no
checking for TIFFIsByteSwapped in -ltiff... no
checking for TIFFReadRGBATile in -ltiff... no
checking for TIFFReadRGBAStrip in -ltiff... no
checking if TIFF package is complete... no
-------------------------------------------------------------
checking for libwebp... yes
checking for libwebpmux >= 0.5.0 libwebpdemux >= 0.5.0... yes

checking for WMF support ...
checking for libwmf/ipa.h... no
checking if WMF package is complete ... no
-------------------------------------------------------------
checking for libxml-2.0 >= 2.0.0... yes

checking for acosh... yes
checking for _aligned_malloc... no
checking for aligned_malloc... no
checking for asinh... yes
checking for atanh... yes
checking for atoll... yes
checking for atexit... yes
checking for cabs... yes
checking for carg... yes
checking for cimag... yes
checking for creal... yes
checking for clock... yes
checking for clock_getres... yes
checking for clock_gettime... yes
checking for ctime_r... yes
checking for directio... no
checking for erf... yes
checking for _exit... yes
checking for execvp... yes
checking for fchmod... yes
checking for floor... yes
checking for fork... (cached) yes
checking for ftime... yes
checking for ftruncate... yes
checking for getc_unlocked... yes
checking for getcwd... yes
checking for getpid... yes
checking for getexecname... no
checking for getdtablesize... yes
checking for getpagesize... (cached) yes
checking for getpwnam_r... yes
checking for getrlimit... yes
checking for getrusage... yes
checking for gettimeofday... yes
checking for gmtime_r... yes
checking for isnan... yes
checking for j0... yes
checking for j1... yes
checking for lltostr... no
checking for localtime_r... yes
checking for lstat... yes
checking for memmove... yes
checking for memset... yes
checking for mkstemp... yes
checking for munmap... yes
checking for nanosleep... yes
checking for newlocale... yes
checking for _NSGetExecutablePath... no
checking for pclose... yes
checking for _pclose... no
checking for poll... yes
checking for popen... yes
checking for _popen... no
checking for posix_fadvise... yes
checking for posix_fallocate... yes
checking for posix_madvise... yes
checking for posix_memalign... yes
checking for posix_spawnp... yes
checking for pow... yes
checking for pread... yes
checking for pwrite... yes
checking for qsort_r... yes
checking for raise... yes
checking for rand_r... yes
checking for readlink... yes
checking for realpath... yes
checking for select... yes
checking for seekdir... yes
checking for sendfile... yes
checking for setlocale... yes
checking for socket... yes
checking for sqrt... yes
checking for setvbuf... yes
checking for stat... yes
checking for strcasestr... yes
checking for strchr... yes
checking for strrchr... yes
checking for strcspn... yes
checking for strdup... yes
checking for strpbrk... yes
checking for strspn... yes
checking for strstr... yes
checking for strtod... (cached) yes
checking for strtod_l... yes
checking for strtol... yes
checking for strtoul... yes
checking for symlink... yes
checking for sysconf... yes
checking for sigemptyset... yes
checking for sigaction... yes
checking for spawnvp... no
checking for strerror... yes
checking for strlcat... no
checking for strlcpy... no
checking for strcasecmp... yes
checking for strncasecmp... yes
checking for telldir... yes
checking for tempnam... yes
checking for times... yes
checking for ulltostr... no
checking for uselocale... yes
checking for usleep... yes
checking for utime... yes
checking for vfprintf... yes
checking for vfprintf_l... no
checking for vsprintf... yes
checking for vsnprintf... yes
checking for vsnprintf_l... no
checking for waitpid... yes
checking for _wfopen... no
checking for _wstat... no
-------------------------------------------------------------
checking for ImageMagick delegate programs...
checking for bpgdec... bpgdec
checking for bpgenc... bpgenc
checking for blender... /usr/bin/blender
checking for xdg-open... /usr/bin/xdg-open
checking for ufraw-batch... ufraw-batch
checking for libreoffice... /usr/bin/libreoffice
checking for dvips... /usr/bin/dvips
checking for magick... /usr/local/bin/magick
checking for magick... /usr/local/bin/magick
checking for xterm... /usr/bin/xterm
checking for dot... dot
checking for hp2xx... hp2xx
checking for html2ps... html2ps
checking for ilbmtoppm... /usr/bin/ilbmtoppm
checking for ppmtoilbm... /usr/bin/ppmtoilbm
checking for JxrDecApp... JxrDecApp
checking for JxrEncApp... JxrEncApp
checking for lepton... lepton
checking for lp... /usr/bin/lp
checking for lpr... /usr/bin/lpr
checking for gimp... /usr/bin/gimp
checking for magick... /usr/local/bin/magick
checking for avconv... avconv
checking for ffmpeg... (cached) avconv
checking for avconv... avconv
checking for ffmpeg... (cached) avconv
checking for mrsidgeodecode... mrsidgeodecode
checking for mv... /bin/mv
checking for pcl6... pcl6
checking for gsx... no
checking for gsc... no
checking for gs... /usr/bin/gs
checking for rm... /bin/rm
checking for rsvg-convert... rsvg-convert
checking for inkscape... /usr/bin/inkscape
checking for potrace... /usr/bin/potrace
checking for fig2dev... /usr/bin/fig2dev
checking for dwebp... /usr/bin/dwebp
checking for cwebp... /usr/bin/cwebp
checking for curl... /usr/bin/curl
checking for gxps... gxps
checking for Apple fonts directory... not found!
checking for Dejavu fonts directory... not found!
checking for Ghostscript fonts directory... /usr/share/fonts/type1/gsfonts/
checking for URW-base35 fonts directory... not found!
checking for Windows fonts directory... not found!
checking for gnutar... no
checking for gtar... no
checking for tar... tar
checking for perl... perl
checking for rpmbuild... no
checking for rpm... no
checking for 7za... 7za
checking for zip... zip
-------------------------------------------------------------
checking for Ghostscript...
checking for Ghostscript version... 9.26
checking for gs color device... png16m
checking for gs alpha device... pngalpha
checking for gs CMYK device... pamcmyk32
checking for gs mono device... pbmraw
checking for gs PDF writing device... pdfwrite
checking for gs PS writing device... ps2write
checking for gs EPS writing device... eps2write
-------------------------------------------------------------
Update ImageMagick configuration
checking that generated files are newer than configure... done
checking that generated files are newer than configure... done
configure: creating ./config.status
config.status: creating common.shi
config.status: creating config/configure.xml
config.status: creating config/delegates.xml
config.status: creating config/ImageMagick.rdf
config.status: creating config/MagickCore.dox
config.status: creating config/MagickWand.dox
config.status: creating config/Magick++.dox
config.status: creating config/type-apple.xml
config.status: creating config/type-dejavu.xml
config.status: creating config/type-ghostscript.xml
config.status: creating config/type-urw-base35.xml
config.status: creating config/type-windows.xml
config.status: creating config/type.xml
config.status: creating ImageMagick.spec
config.status: creating Magick++/bin/Magick++-config
config.status: creating MagickCore/ImageMagick.pc
config.status: creating Magick++/lib/Magick++.pc
config.status: creating MagickCore/MagickCore-config
config.status: creating MagickCore/MagickCore.pc
config.status: creating MagickCore/version.h
config.status: creating Makefile
config.status: creating magick.sh
config.status: creating PerlMagick/check.sh
config.status: creating PerlMagick/default/Magick.pm
config.status: creating PerlMagick/Makefile.PL
config.status: creating PerlMagick/default/Makefile.PL
config.status: creating PerlMagick/quantum/Makefile.PL
config.status: creating PerlMagick/quantum/quantum.pm
config.status: creating PerlMagick/quantum/quantum.xs
config.status: creating PerlMagick/quantum/typemap
config.status: creating utilities/animate.1
config.status: creating utilities/compare.1
config.status: creating utilities/composite.1
config.status: creating utilities/conjure.1
config.status: creating utilities/convert.1
config.status: creating utilities/display.1
config.status: creating utilities/identify.1
config.status: creating utilities/ImageMagick.1
config.status: creating utilities/import.1
config.status: creating utilities/magick.1
config.status: creating utilities/magick-script.1
config.status: creating utilities/mogrify.1
config.status: creating utilities/montage.1
config.status: creating utilities/stream.1
config.status: creating MagickWand/MagickWand-config
config.status: creating MagickWand/MagickWand.pc
config.status: creating config/config.h
config.status: config/config.h is unchanged
config.status: executing MagickCore/magick-baseconfig.h commands
config.status: creating MagickCore/magick-baseconfig.h - prefix MAGICKCORE for config/config.h defines
config.status: MagickCore/magick-baseconfig.h is unchanged
config.status: executing depfiles commands
config.status: executing libtool commands
config.status: executing default commands
config.status: executing magick.sh.in commands
config.status: executing MagickCore-config.in commands
config.status: executing MagickWand-config.in commands
config.status: executing Magick++-config.in commands
config.status: executing PerlMagick/check.sh.in commands
configure:
==============================================================================
ImageMagick 7.0.10-29 is configured as follows. Please verify that this
configuration matches your expectations.

Host system type: x86_64-pc-linux-gnu
Build system type: x86_64-pc-linux-gnu

               Option                        Value
------------------------------------------------------------------------------
Shared libraries  --enable-shared=yes		yes
Static libraries  --enable-static=yes		yes
Build utilities   --with-utilities=yes		yes
Module support    --with-modules=no		no
GNU ld            --with-gnu-ld=yes		yes
Quantum depth     --with-quantum-depth=16	16
High Dynamic Range Imagery
                  --enable-hdri=yes		yes

Install documentation:				yes

Memory allocation library:
  JEMalloc          --with-jemalloc=no		no
  TCMalloc          --with-tcmalloc=no		no
  UMem              --with-umem=no		no

Delegate library configuration:
  BZLIB             --with-bzlib=yes		yes
  Autotrace         --with-autotrace=no		no
  DJVU              --with-djvu=yes		no
  DPS               --with-dps=yes		no
  FFTW              --with-fftw=yes		no
  FLIF              --with-flif=yes		no
  FlashPIX          --with-fpx=yes		no
  FontConfig        --with-fontconfig=yes	yes
  FreeType          --with-freetype=yes		yes
  Ghostscript lib   --with-gslib=no		no
  Graphviz          --with-gvc=yes		no
  HEIC              --with-heic=yes             yes
  JBIG              --with-jbig=yes		no
  JPEG v1           --with-jpeg=yes		yes
  JPEG XL           --with-jxl=yes    no
  LCMS              --with-lcms=yes		no
  LQR               --with-lqr=yes		no
  LTDL              --with-ltdl=yes		yes
  LZMA              --with-lzma=yes		no
  Magick++          --with-magick-plus-plus=yes	yes
  OpenEXR           --with-openexr=yes		no
  OpenJP2           --with-openjp2=yes		yes
  PANGO             --with-pango=yes		no
  PERL              --with-perl=no		no
  PNG               --with-png=yes		yes
  RAQM              --with-raqm=yes		no
  RAW               --with-raw=yes 	   	no
  RSVG              --with-rsvg=no		no
  TIFF              --with-tiff=yes		no
  WEBP              --with-webp=yes		yes
  WMF               --with-wmf=yes		no
  X11               --with-x=			yes
  XML               --with-xml=yes		yes
  ZIP               --with-ziplib=yes		no
  ZLIB              --with-zlib=yes		yes
  ZSTD              --with-zstd=yes		no

Delegate program configuration:
  GhostPCL          None			pcl6 (unknown)
  GhostXPS          None			gxps (unknown)
  Ghostscript       None			gs (9.26)

Font configuration:
  Apple fonts       --with-apple-font-dir=default
  Dejavu fonts      --with-dejavu-font-dir=default	none
  Ghostscript fonts --with-gs-font-dir=default		/usr/share/fonts/type1/gsfonts/
  URW-base35 fonts  --with-urw-base35-font-dir=default	none
  Windows fonts     --with-windows-font-dir=default	none

X11 configuration:
  X_CFLAGS        =
  X_PRE_LIBS      =  -lSM -lICE
  X_LIBS          =
  X_EXTRA_LIBS    =

Options used to compile and link:
  PREFIX          = /usr/local
  EXEC-PREFIX     = /usr/local
  VERSION         = 7.0.10
  CC              = gcc
  CFLAGS          = -I/usr/include/libxml2   -I/usr/include/libpng16 -I/usr/include/openjpeg-2.3  -I/usr/include/freetype2 -I/usr/include/libpng16 -I/usr/include/freetype2 -I/usr/include/libpng16 -I/usr/include/freetype2 -I/usr/include/libpng16  -fopenmp -Wall -g -O2 -mtune=haswell -fexceptions -pthread -DMAGICKCORE_HDRI_ENABLE=1 -DMAGICKCORE_QUANTUM_DEPTH=16
  CPPFLAGS        =  -DMAGICKCORE_HDRI_ENABLE=1 -DMAGICKCORE_QUANTUM_DEPTH=16
  PCFLAGS         =
  DEFS            = -DHAVE_CONFIG_H
  LDFLAGS         =
  LIBS            =     -lfreetype  -ljpeg    -lpng16 -lz      -lfontconfig -lfreetype -lheif -lwebpmux -lwebpdemux -lwebp -lwebp   -lXext -lXt   -lSM -lICE -lX11   -lbz2  -lopenjp2    -lxml2  -lz -lz  -lltdl   -lm    -lpthread
  CXX             = g++
  CXXFLAGS        = -g -O2 -pthread
  FEATURES        = DPC HDRI Cipher OpenCL OpenMP
  DELEGATES       = bzlib mpeg fontconfig freetype heic jng jpeg openjp2 png ps webp x xml zlib
==============================================================================

```
<!-- markdownlint-restore -->
</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

Call `make` to compile & test Image Magick.

```console
make
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see make command in Image Magick.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ make
make  all-am
make[1]: Entering directory '/home/torrocus/heif/ImageMagick'
  CC       utilities/magick.o
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-accelerate.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-animate.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-annotate.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-artifact.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-attribute.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-blob.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-cache.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-cache-view.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-channel.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-cipher.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-client.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-coder.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-color.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-colormap.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-colorspace.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-compare.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-composite.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-compress.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-configure.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-constitute.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-decorate.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-delegate.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-deprecate.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-display.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-distort.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-distribute-cache.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-draw.lo
MagickCore/draw.c:1324:26: warning: ‘DrawBoundingRectangles’ defined but not used [-Wunused-function]
 static MagickBooleanType DrawBoundingRectangles(Image *image,
                          ^~~~~~~~~~~~~~~~~~~~~~
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-effect.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-enhance.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-exception.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-feature.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-fourier.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-fx.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-gem.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-geometry.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-histogram.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-identify.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-image.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-image-view.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-layer.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-linked-list.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-list.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-locale.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-log.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-magic.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-magick.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-matrix.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-memory.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-mime.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-module.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-monitor.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-montage.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-morphology.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-opencl.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-option.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-paint.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-pixel.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-policy.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-prepress.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-property.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-profile.lo
MagickCore/profile.c: In function ‘UpdateClipPath’:
MagickCore/profile.c:2394:5: warning: variable ‘in_subpath’ set but not used [-Wunused-but-set-variable]
     in_subpath;
     ^~~~~~~~~~
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-quantize.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-quantum.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-quantum-export.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-quantum-import.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-random.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-registry.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-resample.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-resize.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-resource.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-segment.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-semaphore.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-shear.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-signature.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-splay-tree.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-static.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-statistic.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-stream.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-string.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-thread.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-timer.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-token.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-transform.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-threshold.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-type.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-utility.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-version.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-visual-effects.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-vision.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-widget.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-xml-tree.lo
  CC       MagickCore/libMagickCore_7_Q16HDRI_la-xwindow.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-aai.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-art.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-ashlar.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-avs.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-bgr.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-bmp.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-braille.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-cals.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-caption.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-cin.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-cip.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-clip.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-cmyk.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-cube.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-cut.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-dcm.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-dds.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-debug.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-dib.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-dng.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-dot.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-dpx.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-fax.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-fits.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-gif.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-gradient.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-gray.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-hald.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-hdr.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-histogram.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-hrz.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-html.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-icon.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-info.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-inline.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-ipl.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-jnx.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-json.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-label.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mac.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-magick.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-map.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mask.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mat.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-matte.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-meta.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-miff.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mono.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mpc.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mpeg.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mpr.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-msl.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mtv.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-mvg.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-null.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-ora.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-otb.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-palm.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pango.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pattern.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pcd.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pcl.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pcx.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pdb.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pdf.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pes.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pgx.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pict.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pix.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-plasma.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pnm.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-ps2.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-ps3.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-ps.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-psd.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-pwp.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-raw.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-rgb.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-rgf.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-rla.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-rle.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-scr.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-screenshot.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-sct.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-sfw.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-sgi.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-sixel.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-stegano.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-sun.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-svg.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-tga.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-thumbnail.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-tile.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-tim2.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-tim.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-ttf.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-txt.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-uil.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-url.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-uyvy.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-vicar.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-vid.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-viff.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-vips.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-wbmp.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-wpg.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-xbm.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-xc.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-xcf.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-xpm.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-xps.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-xtrn.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-ycbcr.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-yuv.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-heic.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-jpeg.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-jp2.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-png.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-webp.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-x.lo
  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-xwd.lo
  CC       filters/MagickCore_libMagickCore_7_Q16HDRI_la-analyze.lo
  CCLD     MagickCore/libMagickCore-7.Q16HDRI.la
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-animate.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-compare.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-composite.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-conjure.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-convert.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-deprecate.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-display.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-drawing-wand.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-identify.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-import.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-magick-cli.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-magick-image.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-magick-property.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-magick-wand.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-mogrify.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-montage.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-operation.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-pixel-iterator.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-pixel-wand.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-script-token.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-stream.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-wand.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-wandcli.lo
  CC       MagickWand/libMagickWand_7_Q16HDRI_la-wand-view.lo
  CCLD     MagickWand/libMagickWand-7.Q16HDRI.la
  CCLD     utilities/magick
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Blob.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-BlobRef.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-CoderInfo.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Color.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Drawable.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Exception.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Functions.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Geometry.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Image.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-ImageRef.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Montage.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Options.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Pixels.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-ResourceLimits.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-SecurityPolicy.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Statistic.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-STL.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-Thread.lo
  CXX      Magick++/lib/libMagick___7_Q16HDRI_la-TypeMetric.lo
  CXXLD    Magick++/lib/libMagick++-7.Q16HDRI.la
cp -f MagickCore/ImageMagick.pc MagickCore/ImageMagick-7.Q16HDRI.pc
cp -f MagickCore/MagickCore.pc MagickCore/MagickCore-7.Q16HDRI.pc
cp -f MagickWand/MagickWand.pc MagickWand/MagickWand-7.Q16HDRI.pc
cp -f Magick++/lib/Magick++.pc Magick++/lib/Magick++-7.Q16HDRI.pc
make[1]: Leaving directory '/home/torrocus/heif/ImageMagick'
```
<!-- markdownlint-restore -->
</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

Here is the one line I missed on the first compilation.

```diff
+  CC       coders/MagickCore_libMagickCore_7_Q16HDRI_la-jpeg.lo
```

The next step is to install ImageMagick on my system.
Before installing it on my system,
I already had the ImageMagick version installed from Debian packages.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ identify --version
Version: ImageMagick 6.9.7-4 Q16 x86_64 20170114 http://www.imagemagick.org
Copyright: © 1999-2017 ImageMagick Studio LLC
License: http://www.imagemagick.org/script/license.php
Features: Cipher DPC Modules OpenMP
Delegates (built-in): bzlib djvu fftw fontconfig freetype jbig jng jpeg lcms lqr ltdl lzma openexr pangocairo png tiff wmf x xml zlib
```
<!-- markdownlint-restore -->

But don't worry.
Two versions will be available after installation.

Install compiled Image Magick in Linux system.

```console
sudo make install
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see the installation of Image Magick 7.x.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ sudo make install
[sudo] password for torrocus:
make  install-am
make[1]: Entering directory '/home/torrocus/heif/ImageMagick'
make[2]: Entering directory '/home/torrocus/heif/ImageMagick'
 /bin/mkdir -p '/usr/local/lib'
 /bin/bash ./libtool   --mode=install /usr/bin/install -c   MagickCore/libMagickCore-7.Q16HDRI.la MagickWand/libMagickWand-7.Q16HDRI.la Magick++/lib/libMagick++-7.Q16HDRI.la '/usr/local/lib'
libtool: install: /usr/bin/install -c MagickCore/.libs/libMagickCore-7.Q16HDRI.so.7.0.0 /usr/local/lib/libMagickCore-7.Q16HDRI.so.7.0.0
libtool: install: (cd /usr/local/lib && { ln -s -f libMagickCore-7.Q16HDRI.so.7.0.0 libMagickCore-7.Q16HDRI.so.7 || { rm -f libMagickCore-7.Q16HDRI.so.7 && ln -s libMagickCore-7.Q16HDRI.so.7.0.0 libMagickCore-7.Q16HDRI.so.7; }; })
libtool: install: (cd /usr/local/lib && { ln -s -f libMagickCore-7.Q16HDRI.so.7.0.0 libMagickCore-7.Q16HDRI.so || { rm -f libMagickCore-7.Q16HDRI.so && ln -s libMagickCore-7.Q16HDRI.so.7.0.0 libMagickCore-7.Q16HDRI.so; }; })
libtool: install: /usr/bin/install -c MagickCore/.libs/libMagickCore-7.Q16HDRI.lai /usr/local/lib/libMagickCore-7.Q16HDRI.la
libtool: warning: relinking 'MagickWand/libMagickWand-7.Q16HDRI.la'
libtool: install: (cd /home/torrocus/heif/ImageMagick; /bin/bash "/home/torrocus/heif/ImageMagick/libtool"  --silent --tag CC --mode=relink gcc -I/usr/include/libxml2 -I/usr/include/libpng16 -I/usr/include/openjpeg-2.3 -I/usr/include/freetype2 -I/usr/include/libpng16 -I/usr/include/freetype2 -I/usr/include/libpng16 -I/usr/include/freetype2 -I/usr/include/libpng16 -fopenmp -Wall -g -O2 -mtune=haswell -fexceptions -pthread -DMAGICKCORE_HDRI_ENABLE=1 -DMAGICKCORE_QUANTUM_DEPTH=16 -no-undefined -Wl,--version-script=./MagickWand/libMagickWand.map -version-info 7:0:0 -o MagickWand/libMagickWand-7.Q16HDRI.la -rpath /usr/local/lib MagickWand/libMagickWand_7_Q16HDRI_la-animate.lo MagickWand/libMagickWand_7_Q16HDRI_la-compare.lo MagickWand/libMagickWand_7_Q16HDRI_la-composite.lo MagickWand/libMagickWand_7_Q16HDRI_la-conjure.lo MagickWand/libMagickWand_7_Q16HDRI_la-convert.lo MagickWand/libMagickWand_7_Q16HDRI_la-deprecate.lo MagickWand/libMagickWand_7_Q16HDRI_la-display.lo MagickWand/libMagickWand_7_Q16HDRI_la-drawing-wand.lo MagickWand/libMagickWand_7_Q16HDRI_la-identify.lo MagickWand/libMagickWand_7_Q16HDRI_la-import.lo MagickWand/libMagickWand_7_Q16HDRI_la-magick-cli.lo MagickWand/libMagickWand_7_Q16HDRI_la-magick-image.lo MagickWand/libMagickWand_7_Q16HDRI_la-magick-property.lo MagickWand/libMagickWand_7_Q16HDRI_la-magick-wand.lo MagickWand/libMagickWand_7_Q16HDRI_la-mogrify.lo MagickWand/libMagickWand_7_Q16HDRI_la-montage.lo MagickWand/libMagickWand_7_Q16HDRI_la-operation.lo MagickWand/libMagickWand_7_Q16HDRI_la-pixel-iterator.lo MagickWand/libMagickWand_7_Q16HDRI_la-pixel-wand.lo MagickWand/libMagickWand_7_Q16HDRI_la-script-token.lo MagickWand/libMagickWand_7_Q16HDRI_la-stream.lo MagickWand/libMagickWand_7_Q16HDRI_la-wand.lo MagickWand/libMagickWand_7_Q16HDRI_la-wandcli.lo MagickWand/libMagickWand_7_Q16HDRI_la-wand-view.lo MagickCore/libMagickCore-7.Q16HDRI.la -lSM -lICE -lX11 -lgomp -lm )
libtool: install: /usr/bin/install -c MagickWand/.libs/libMagickWand-7.Q16HDRI.so.7.0.0T /usr/local/lib/libMagickWand-7.Q16HDRI.so.7.0.0
libtool: install: (cd /usr/local/lib && { ln -s -f libMagickWand-7.Q16HDRI.so.7.0.0 libMagickWand-7.Q16HDRI.so.7 || { rm -f libMagickWand-7.Q16HDRI.so.7 && ln -s libMagickWand-7.Q16HDRI.so.7.0.0 libMagickWand-7.Q16HDRI.so.7; }; })
libtool: install: (cd /usr/local/lib && { ln -s -f libMagickWand-7.Q16HDRI.so.7.0.0 libMagickWand-7.Q16HDRI.so || { rm -f libMagickWand-7.Q16HDRI.so && ln -s libMagickWand-7.Q16HDRI.so.7.0.0 libMagickWand-7.Q16HDRI.so; }; })
libtool: install: /usr/bin/install -c MagickWand/.libs/libMagickWand-7.Q16HDRI.lai /usr/local/lib/libMagickWand-7.Q16HDRI.la
libtool: warning: relinking 'Magick++/lib/libMagick++-7.Q16HDRI.la'
libtool: install: (cd /home/torrocus/heif/ImageMagick; /bin/bash "/home/torrocus/heif/ImageMagick/libtool"  --silent --tag CXX --mode=relink g++ -g -O2 -pthread -no-undefined -version-info 4:0:0 -o Magick++/lib/libMagick++-7.Q16HDRI.la -rpath /usr/local/lib Magick++/lib/libMagick___7_Q16HDRI_la-Blob.lo Magick++/lib/libMagick___7_Q16HDRI_la-BlobRef.lo Magick++/lib/libMagick___7_Q16HDRI_la-CoderInfo.lo Magick++/lib/libMagick___7_Q16HDRI_la-Color.lo Magick++/lib/libMagick___7_Q16HDRI_la-Drawable.lo Magick++/lib/libMagick___7_Q16HDRI_la-Exception.lo Magick++/lib/libMagick___7_Q16HDRI_la-Functions.lo Magick++/lib/libMagick___7_Q16HDRI_la-Geometry.lo Magick++/lib/libMagick___7_Q16HDRI_la-Image.lo Magick++/lib/libMagick___7_Q16HDRI_la-ImageRef.lo Magick++/lib/libMagick___7_Q16HDRI_la-Montage.lo Magick++/lib/libMagick___7_Q16HDRI_la-Options.lo Magick++/lib/libMagick___7_Q16HDRI_la-Pixels.lo Magick++/lib/libMagick___7_Q16HDRI_la-ResourceLimits.lo Magick++/lib/libMagick___7_Q16HDRI_la-SecurityPolicy.lo Magick++/lib/libMagick___7_Q16HDRI_la-Statistic.lo Magick++/lib/libMagick___7_Q16HDRI_la-STL.lo Magick++/lib/libMagick___7_Q16HDRI_la-Thread.lo Magick++/lib/libMagick___7_Q16HDRI_la-TypeMetric.lo MagickCore/libMagickCore-7.Q16HDRI.la MagickWand/libMagickWand-7.Q16HDRI.la )
libtool: install: /usr/bin/install -c Magick++/lib/.libs/libMagick++-7.Q16HDRI.so.4.0.0T /usr/local/lib/libMagick++-7.Q16HDRI.so.4.0.0
libtool: install: (cd /usr/local/lib && { ln -s -f libMagick++-7.Q16HDRI.so.4.0.0 libMagick++-7.Q16HDRI.so.4 || { rm -f libMagick++-7.Q16HDRI.so.4 && ln -s libMagick++-7.Q16HDRI.so.4.0.0 libMagick++-7.Q16HDRI.so.4; }; })
libtool: install: (cd /usr/local/lib && { ln -s -f libMagick++-7.Q16HDRI.so.4.0.0 libMagick++-7.Q16HDRI.so || { rm -f libMagick++-7.Q16HDRI.so && ln -s libMagick++-7.Q16HDRI.so.4.0.0 libMagick++-7.Q16HDRI.so; }; })
libtool: install: /usr/bin/install -c Magick++/lib/.libs/libMagick++-7.Q16HDRI.lai /usr/local/lib/libMagick++-7.Q16HDRI.la
libtool: install: /usr/bin/install -c MagickCore/.libs/libMagickCore-7.Q16HDRI.a /usr/local/lib/libMagickCore-7.Q16HDRI.a
libtool: install: chmod 644 /usr/local/lib/libMagickCore-7.Q16HDRI.a
libtool: install: ranlib /usr/local/lib/libMagickCore-7.Q16HDRI.a
libtool: install: /usr/bin/install -c MagickWand/.libs/libMagickWand-7.Q16HDRI.a /usr/local/lib/libMagickWand-7.Q16HDRI.a
libtool: install: chmod 644 /usr/local/lib/libMagickWand-7.Q16HDRI.a
libtool: install: ranlib /usr/local/lib/libMagickWand-7.Q16HDRI.a
libtool: install: /usr/bin/install -c Magick++/lib/.libs/libMagick++-7.Q16HDRI.a /usr/local/lib/libMagick++-7.Q16HDRI.a
libtool: install: chmod 644 /usr/local/lib/libMagick++-7.Q16HDRI.a
libtool: install: ranlib /usr/local/lib/libMagick++-7.Q16HDRI.a
libtool: finish: PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:/sbin" ldconfig -n /usr/local/lib
----------------------------------------------------------------------
Libraries have been installed in:
   /usr/local/lib

If you ever happen to want to link against installed libraries
in a given directory, LIBDIR, you must either use libtool, and
specify the full pathname of the library, or use the '-LLIBDIR'
flag during linking and do at least one of the following:
   - add LIBDIR to the 'LD_LIBRARY_PATH' environment variable
     during execution
   - add LIBDIR to the 'LD_RUN_PATH' environment variable
     during linking
   - use the '-Wl,-rpath -Wl,LIBDIR' linker flag
   - have your system administrator add LIBDIR to '/etc/ld.so.conf'

See any operating system documentation about shared libraries for
more information, such as the ld(1) and ld.so(8) manual pages.
----------------------------------------------------------------------
 /bin/mkdir -p '/usr/local/bin'
  /bin/bash ./libtool   --mode=install /usr/bin/install -c utilities/magick '/usr/local/bin'
libtool: install: /usr/bin/install -c utilities/.libs/magick /usr/local/bin/magick
 /bin/mkdir -p '/usr/local/bin'
 /usr/bin/install -c MagickCore/MagickCore-config MagickWand/MagickWand-config Magick++/bin/Magick++-config '/usr/local/bin'
/bin/bash ./config/mkinstalldirs /usr/local/bin
cd /usr/local/bin ; \
magick=`echo "magick" | sed 's,^.*/,,;s/$//;s,x,x,;s/$//'`; \
for name in animate compare composite conjure convert display identify import magick-script mogrify montage stream ; \
do \
  target=`echo "$name" | sed 's,^.*/,,;s/$//;s,x,x,;s/$//'`; \
  rm -f $target ; \
  ln -s $magick $target ; \
done
 /bin/mkdir -p '/usr/local/include/ImageMagick-7/MagickCore'
 /usr/bin/install -c -m 644 MagickCore/MagickCore.h MagickCore/animate.h MagickCore/annotate.h MagickCore/artifact.h MagickCore/attribute.h MagickCore/blob.h MagickCore/cache.h MagickCore/cache-view.h MagickCore/channel.h MagickCore/cipher.h MagickCore/client.h MagickCore/coder.h MagickCore/color.h MagickCore/colormap.h MagickCore/colorspace.h MagickCore/compare.h MagickCore/composite.h MagickCore/compress.h MagickCore/configure.h MagickCore/constitute.h MagickCore/decorate.h MagickCore/delegate.h MagickCore/deprecate.h MagickCore/display.h MagickCore/distort.h MagickCore/distribute-cache.h MagickCore/draw.h MagickCore/effect.h MagickCore/enhance.h MagickCore/exception.h MagickCore/feature.h MagickCore/fourier.h MagickCore/fx.h MagickCore/gem.h MagickCore/geometry.h MagickCore/histogram.h MagickCore/identify.h MagickCore/image.h MagickCore/image-view.h MagickCore/layer.h '/usr/local/include/ImageMagick-7/MagickCore'
 /usr/bin/install -c -m 644 MagickCore/linked-list.h MagickCore/list.h MagickCore/locale_.h MagickCore/log.h MagickCore/magic.h MagickCore/magick.h MagickCore/magick-config.h MagickCore/magick-type.h MagickCore/matrix.h MagickCore/memory_.h MagickCore/method-attribute.h MagickCore/methods.h MagickCore/mime.h MagickCore/module.h MagickCore/monitor.h MagickCore/montage.h MagickCore/morphology.h MagickCore/nt-base.h MagickCore/opencl.h MagickCore/option.h MagickCore/paint.h MagickCore/pixel.h MagickCore/pixel-accessor.h MagickCore/policy.h MagickCore/prepress.h MagickCore/profile.h MagickCore/property.h MagickCore/quantize.h MagickCore/quantum.h MagickCore/random_.h MagickCore/registry.h MagickCore/resample.h MagickCore/resize.h MagickCore/resource_.h MagickCore/segment.h MagickCore/semaphore.h MagickCore/shear.h MagickCore/signature.h MagickCore/splay-tree.h MagickCore/static.h '/usr/local/include/ImageMagick-7/MagickCore'
 /usr/bin/install -c -m 644 MagickCore/statistic.h MagickCore/stream.h MagickCore/string_.h MagickCore/studio.h MagickCore/timer.h MagickCore/token.h MagickCore/transform.h MagickCore/threshold.h MagickCore/type.h MagickCore/utility.h MagickCore/version.h MagickCore/vision.h MagickCore/visual-effects.h MagickCore/widget.h MagickCore/xml-tree.h MagickCore/xwindow.h '/usr/local/include/ImageMagick-7/MagickCore'
 /bin/mkdir -p '/usr/local/include/ImageMagick-7/MagickCore'
 /usr/bin/install -c -m 644 MagickCore/magick-baseconfig.h '/usr/local/include/ImageMagick-7/MagickCore'
 /bin/mkdir -p '/usr/local/include/ImageMagick-7/MagickWand'
 /usr/bin/install -c -m 644 MagickWand/MagickWand.h MagickWand/animate.h MagickWand/compare.h MagickWand/composite.h MagickWand/conjure.h MagickWand/convert.h MagickWand/deprecate.h MagickWand/display.h MagickWand/drawing-wand.h MagickWand/identify.h MagickWand/import.h MagickWand/magick-cli.h MagickWand/magick-image.h MagickWand/magick-property.h MagickWand/method-attribute.h MagickWand/mogrify.h MagickWand/montage.h MagickWand/operation.h MagickWand/pixel-iterator.h MagickWand/pixel-wand.h MagickWand/stream.h MagickWand/wandcli.h MagickWand/wand-view.h '/usr/local/include/ImageMagick-7/MagickWand'
 /bin/mkdir -p '/usr/local/etc/ImageMagick-7/'
 /usr/bin/install -c -m 644 config/colors.xml config/delegates.xml config/log.xml config/mime.xml config/policy.xml config/quantization-table.xml config/thresholds.xml config/type.xml config/type-apple.xml config/type-dejavu.xml config/type-ghostscript.xml config/type-urw-base35.xml config/type-windows.xml '/usr/local/etc/ImageMagick-7/'
 /bin/mkdir -p '/usr/local/share/ImageMagick-7'
 /usr/bin/install -c -m 644 config/english.xml config/francais.xml config/locale.xml '/usr/local/share/ImageMagick-7'
 /bin/mkdir -p '/usr/local/lib/ImageMagick-7.0.10/config-Q16HDRI'
 /usr/bin/install -c -m 644 config/configure.xml '/usr/local/lib/ImageMagick-7.0.10/config-Q16HDRI'
/bin/bash ./config/mkinstalldirs /usr/local/share/doc/ImageMagick-7
/usr/bin/install -c -m 644 ./index.html /usr/local/share/doc/ImageMagick-7
/usr/bin/install -c -m 644 ./images/affine.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/annotate.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/arc.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/atop.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/background.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/black.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/bluebells_clipped.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/bluebells_darker.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/bluebells_lin.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/bluebells_log.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/button.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/color-thresholding.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/color-thresholding-gray.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/color-thresholding-hsv.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/color-thresholding-hsv-rgb.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/color-thresholding.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/color-thresholding-rgb.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/configure.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/convex-hull-barn-closure.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/convex-hull-barn.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/convex-hull-blocks-closure.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/convex-hull-blocks.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/convex-hull.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/cylinder_shaded.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/difference.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/examples.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/frame.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/fuzzy-magick.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/gaussian-blur.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/granite.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/imade_art2.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/ImageMagick.ico /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/label.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/litecoin.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/logo.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/logo.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/logo-sm-flop.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/logo-sm-fx.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/logo-sm.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/montage.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/mountains-clahe.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/mountains-equalize.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/mountains.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/navy.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/objects.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/objects.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/objects.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/over.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/piechart.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/radial-gradient.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/reconstruct.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/red-ball.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/red-circle.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/right.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/rose.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/rose-over.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/rose.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/rose.pnm /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/rose-sigmoidal.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/script.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/smile.gif /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/sponsor.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/sprite.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/t-shirt.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/wand.ico /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/wand.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/white-highlight.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/wizard.jpg /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/wizard.png /usr/local/share/doc/ImageMagick-7/images
/usr/bin/install -c -m 644 ./images/patterns/bricks.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/checkerboard.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/circles.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/crosshatch30.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/crosshatch45.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/crosshatch.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/fishscales.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray0.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray100.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray10.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray15.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray20.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray25.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray30.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray35.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray40.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray45.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray50.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray55.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray5.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray60.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray65.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray70.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray75.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray80.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray85.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray90.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/gray95.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/hexagons.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/horizontal2.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/horizontal3.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/horizontal.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/horizontalsaw.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/hs_bdiagonal.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/hs_cross.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/hs_diagcross.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/hs_fdiagonal.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/hs_horizontal.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/hs_vertical.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/left30.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/left45.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/leftshingle.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/octagons.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/right30.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/right45.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/rightshingle.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/smallfishscales.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/vertical2.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/vertical3.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/verticalbricks.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/verticalleftshingle.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/vertical.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/verticalrightshingle.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./images/patterns/verticalsaw.png /usr/local/share/doc/ImageMagick-7/images/patterns
/usr/bin/install -c -m 644 ./www/advanced-unix-installation.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/advanced-windows-installation.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/animate.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/api.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/architecture.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/binary-releases.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/changelog.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/cipher.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/cite.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/clahe.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/color.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/color-management.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/color-thresholding.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/command-line-options.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/command-line-processing.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/command-line-tools.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/compare.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/compose.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/composite.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/conjure.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/connected-components.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/contact.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/convert.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/convex-hull.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/defines.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/develop.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/display.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/distribute-pixel-cache.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/download.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/escape.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/examples.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/exception.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/export.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/favicon.ico /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/formats.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/fx.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/gradient.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/high-dynamic-range.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/history.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/identify.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/ImageMagickObject.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/import.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/index.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/install-source.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/jp2.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/license.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/links.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/magick-core.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/magick.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/magick++.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/magick-script.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/magick-vector-graphics.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/magick-wand.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/miff.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/mirror.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/mogrify.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/montage.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/motion-picture.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/opencl.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/openmp.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/perl-magick.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/porting.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/quantize.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/resources.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/search.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/security-policy.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/sitemap.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/stream.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/support.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/wand.png /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/webp.html /usr/local/share/doc/ImageMagick-7/www
/usr/bin/install -c -m 644 ./www/assets/magick.css /usr/local/share/doc/ImageMagick-7/www/assets
/usr/bin/install -c -m 644 ./www/assets/magick.js /usr/local/share/doc/ImageMagick-7/www/assets
/usr/bin/install -c -m 644 ./www/api/animate.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/annotate.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/attribute.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/blob.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/cache.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/cache-view.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/channel.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/cipher.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/color.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/colormap.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/colorspace.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/compare.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/composite.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/constitute.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/decorate.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/deprecate.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/display.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/distort.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/draw.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/drawing-wand.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/effect.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/enhance.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/exception.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/feature.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/fourier.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/fx.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/histogram.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/image.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/Image++.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/image-view.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/layer.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/list.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/magick++-classes.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/magick-deprecate.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/magick.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/magick-image.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/magick-property.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/magick-wand.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/memory.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/mime.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/module.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/mogrify.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/monitor.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/montage.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/morphology.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/paint.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/pixel-iterator.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/pixel-wand.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/profile.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/property.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/quantize.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/registry.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/resize.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/resource.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/segment.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/shear.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/signature.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/statistic.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/stream.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/transform.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/version.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/api/wand-view.html /usr/local/share/doc/ImageMagick-7/www/api
/usr/bin/install -c -m 644 ./www/source/analyze.c /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/coder.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/colors.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/configure.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/contrast.c /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/core.c /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/delegates.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/english.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/examples.pl /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/francais.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/incantation.msl /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/locale.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/log.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/magic.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/mgk.c /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/mime.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/piechart.mvg /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/piechart.svg /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/policy.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/quantization-table.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/thresholds.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/type-apple.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/type-dejavu.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/type-ghostscript.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/type-urw-base35.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/type-windows.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/type.xml /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/source/wand.c /usr/local/share/doc/ImageMagick-7/www/source
/usr/bin/install -c -m 644 ./www/Magick++/Blob.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Cache.fig /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Cache.png /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Cache.svg /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/ChangeLog.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/CoderInfo.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Color.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Documentation.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Drawable_example_1.png /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Drawable.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Enumerations.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Exception.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/FormatCharacters.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Future.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Geometry.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/ImageDesign.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Image.fig /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Image.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Image++.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/ImageMagick.png /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Image.png /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/index.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Install.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/magick.css /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Magick++.png /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Montage.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/montage-sample-framed.jpg /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/NEWS.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/PixelPacket.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Pixels.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/Quantum.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/README.txt /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/right_triangle.png /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/STL.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/thumbnail-anatomy-framed.fig /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/thumbnail-anatomy-framed.jpg /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/thumbnail-anatomy-plain.fig /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/thumbnail-anatomy-plain.jpg /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/thumbnail-sample-framed.jpg /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/thumbnail-sample-plain.jpg /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/Magick++/TypeMetric.html /usr/local/share/doc/ImageMagick-7/www/Magick++
/usr/bin/install -c -m 644 ./www/api/MagickCore/animate_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/animate_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/animate_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/animate-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/animate-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/annotate_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/annotate_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/annotate_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/annotated.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/api_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/api_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/artifact_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/artifact_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/artifact_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/blob_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/blob_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/blob_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/blob-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/blob-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/cache_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/cache_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/cache_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/cache-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/cache-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/cache-view_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/cache-view_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/cache-view_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/classes.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/client_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/client_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/client_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/coder_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/coder_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/coder_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/color_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/color_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/color_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/color-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/color-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/colorspace_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/colorspace_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/colorspace_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/colorspace-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/colorspace-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/compare_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/compare_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/compare_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/composite_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/composite_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/composite_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/composite-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/composite-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/compress_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/compress_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/compress_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/configure_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/configure_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/configure_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/constitute_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/constitute_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/constitute_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/decorate_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/decorate_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/decorate_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/delegate_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/delegate_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/delegate_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/deprecate_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/deprecate_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/deprecate_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/dir_b44b349db36f8365f5234e57d3038770.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/dirs.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/display_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/display_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/display_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/display-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/display-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/distort_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/distort_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/distort_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/doxygen.css /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/doxygen.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/draw_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/draw_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/draw_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/draw-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/draw-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/effect_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/effect_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/effect_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/enhance_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/enhance_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/enhance_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/exception_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/exception_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/exception_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/exception-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/exception-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/files.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2blank.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2doc.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2folderclosed.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2folderopen.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2lastnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2link.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2mlastnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2mnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2node.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2plastnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2pnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ftv2vertline.png /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x61.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x62.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x63.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x64.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x65.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x66.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x67.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x68.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x69.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x6b.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x6c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x6d.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x6e.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x6f.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x70.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x71.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x72.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x73.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x74.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x75.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x76.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x77.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x78.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x79.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_0x7a.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_func.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x61.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x62.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x63.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x64.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x65.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x66.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x67.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x68.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x69.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x6b.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x6c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x6d.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x6e.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x6f.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x70.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x71.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x72.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x73.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x74.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x75.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x76.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x77.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x78.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x79.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars_0x7a.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/functions_vars.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/fx_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/fx_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/fx_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/fx-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/fx-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/gem_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/gem_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/gem_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/geometry_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/geometry_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/geometry_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x61.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x62.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x63.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x64.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x65.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x66.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x67.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x68.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x69.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x6a.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x6b.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x6c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x6d.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x6e.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x6f.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x70.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x71.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x72.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x73.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x74.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x75.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x76.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x77.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x78.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x79.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_0x7a.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x61.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x62.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x63.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x64.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x65.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x66.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x67.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x68.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x69.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x6b.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x6c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x6d.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x6e.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x6f.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x70.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x71.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x72.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x73.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x74.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x75.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x76.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x77.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x78.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs_0x79.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_defs.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_enum.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x62.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x63.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x64.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x65.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x66.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x67.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x68.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x69.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x6a.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x6b.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x6c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x6d.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x6e.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x6f.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x70.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x71.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x72.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x73.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x74.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x75.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x76.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x77.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x78.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x79.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval_0x7a.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_eval.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x62.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x63.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x64.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x65.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x66.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x67.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x68.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x69.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x6a.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x6b.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x6c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x6d.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x6e.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x6f.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x70.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x71.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x72.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x73.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x74.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x75.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x76.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x77.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x78.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x79.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func_0x7a.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_func.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_type.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/globals_vars.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/hashmap_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/hashmap_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/hashmap_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/identify_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/identify_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/identify_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/image_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/image_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/image_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ImageMagick_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/ImageMagick_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/image-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/image-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/index.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/layer_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/layer_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/layer_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/list_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/list_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/list_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/locale_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/locale___8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/locale___8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/log_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/log_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/log_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/mac_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/mac_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/mac_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magic_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magic_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magic_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magick_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magick_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magick_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magick-config_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magick-config_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/MagickCore_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/MagickCore_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magick-type_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/magick-type_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/main.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/matrix_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/matrix_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/matrix_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/memory_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/memory___8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/memory___8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/methods_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/methods_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/mime_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/mime_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/mime_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/mime-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/mime-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/module_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/module_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/module_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/monitor_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/monitor_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/monitor_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/montage_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/montage_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/montage_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/nt-base_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/nt-base_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/nt-base_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/nt-feature_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/nt-feature_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/nt-feature_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/option_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/option_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/option_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/paint_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/paint_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/paint_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/pixel_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/pixel_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/pixel_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/pixel-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/pixel-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/prepress_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/prepress_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/prepress_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/PreRvIcccm_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/PreRvIcccm_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/PreRvIcccm_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/profile_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/profile_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/profile_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/property_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/property_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/property_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/quantize_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/quantize_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/quantize_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/quantum_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/quantum_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/quantum_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/quantum-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/quantum-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/random_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/random___8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/random___8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/registry_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/registry_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/registry_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resample_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resample_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resample_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resize_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resize_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resize_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resize-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resize-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resource_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resource___8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/resource___8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/segment_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/segment_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/segment_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/semaphore_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/semaphore_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/semaphore_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/shear_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/shear_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/shear_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/signature_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/signature_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/signature_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/splay-tree_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/splay-tree_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/splay-tree_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/static_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/static_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/static_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/statistic_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/statistic_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/statistic_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/stream_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/stream_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/stream_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/stream-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/stream-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/string_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/string___8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/string___8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__AffineMatrix.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__Ascii85Info.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__BlobInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__CacheInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__CacheMethods.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__CacheView.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ChannelStatistics.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ChromaticityInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__Cluster.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__CoderInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ColorInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ColorPacket.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ConfigureInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ContributionInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__CubeInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__DataSegmentInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__DelegateInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__dirdesc.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/structdirent.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__DIR.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__DiversityPacket.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__DoublePixelPacket.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__DrawInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__EdgeInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ElementInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ElementReference.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__EntryInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ErrorInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__EventInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ExceptionInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ExtentPacket.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__FrameInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__FxInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__GeometryInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__GhostscriptVectors.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__GradientInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__HandlerInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__HashmapInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/structHuffmanTable.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ile3.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ImageAttribute.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__Image.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ImageInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__IntervalTree.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__LinkedListInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__LocaleInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__LogInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__LongPixelPacket.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MagicInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MagickInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MagickPixelPacket.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MedianListNode.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MedianPixelList.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MedianSkipList.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MemoryInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MimeInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ModuleInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__MontageInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__NexusInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__NodeInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__Nodes.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__NTMEMORYSTATUSEX.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__OptionInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__PathInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__PixelPacket.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__PointInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__PolygonInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__PrimaryInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__PrimitiveInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ProfileInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__QuantizeInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__QuantumInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__QuantumState.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__RandomInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__RealPixelPacket.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__RectangleInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__RegistryInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ResampleFilter.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ResizeFilter.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ResourceInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__SegmentInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/structSemaphoreInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__SignatureInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__SplayTreeInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__StopInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__StreamInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__StringInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ThresholdMap.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__Timer.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__TimerInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__TokenInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__TypeInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__TypeMetric.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ViewInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__XImportInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__XMLTreeInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__XMLTreeRoot.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__XWidgetInfo.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/struct__ZeroCrossing.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/studio_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/studio_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/tab_b.gif /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/tab_l.gif /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/tab_r.gif /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/tabs.css /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/threshold_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/threshold_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/threshold_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/timer_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/timer_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/timer_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/token_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/token_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/token_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/transform_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/transform_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/transform_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/tree.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/type_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/type_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/type_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/utility_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/utility_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/utility_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/version_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/version_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/version_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/vms_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/vms_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/vms_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/widget_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/widget_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/widget_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/xml-tree_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/xml-tree_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/xml-tree_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/xwindow_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/xwindow_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/xwindow_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/xwindow-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickCore/xwindow-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickCore
/usr/bin/install -c -m 644 ./www/api/MagickWand/animate_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/animate_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/animate_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/annotated.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/classes.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/compare_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/compare_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/compare_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/composite_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/composite_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/composite_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/conjure_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/conjure_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/conjure_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/convert_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/convert_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/convert_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/deprecate_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/deprecate_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/deprecate_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/dir_101f7ac0a894e32543a314e85b2e1524.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/dirs.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/display_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/display_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/display_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/doxygen.css /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/doxygen.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/drawing-wand_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/drawing-wand_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/drawing-wand_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/drawtest_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/files.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2blank.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2doc.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2folderclosed.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2folderopen.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2lastnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2link.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2mlastnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2mnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2node.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2plastnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2pnode.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/ftv2vertline.png /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/functions.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/functions_vars.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x61.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x62.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x63.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x64.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x65.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x67.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x69.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x6d.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x6e.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x6f.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x70.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x71.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x72.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x73.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x74.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x75.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x77.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_0x78.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_defs.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_enum.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_eval.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x63.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x64.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x67.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x69.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x6d.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x6e.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x70.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x72.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func_0x73.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_func.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_type.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/globals_vars.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/identify_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/identify_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/identify_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/import_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/import_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/import_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/index.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-image_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-image_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-image_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-property_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-property_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-property_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-wand_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick__wand_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-wand_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/MagickWand_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick__wand_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-wand_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/MagickWand_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-wand-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/magick-wand-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/main.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/mogrify_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/mogrify_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/mogrify_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/mogrify-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/mogrify-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/montage_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/montage_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/montage_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/pixel-iterator_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/pixel-iterator_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/pixel-iterator_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/pixel-wand_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/pixel-wand_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/pixel-wand_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/pixel-wand-private_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/pixel-wand-private_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/stream_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/stream_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/stream_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/struct__CompositeOptions.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/struct__DrawingWand.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/struct__DrawVTable.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/struct__MagickWand.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/struct__PixelIterator.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/struct__PixelWand.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/studio_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/studio_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/tab_b.gif /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/tab_l.gif /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/tab_r.gif /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/tabs.css /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/tree.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/wand_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/wand_8h.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/wand_8h-source.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
/usr/bin/install -c -m 644 ./www/api/MagickWand/wandtest_8c.html /usr/local/share/doc/ImageMagick-7/www/api/MagickWand
 /bin/mkdir -p '/usr/local/share/doc/ImageMagick-7'
 /usr/bin/install -c -m 644 LICENSE ChangeLog NEWS.txt '/usr/local/share/doc/ImageMagick-7'
 /bin/mkdir -p '/usr/local/include/ImageMagick-7/Magick++'
 /usr/bin/install -c -m 644 Magick++/lib/Magick++/Blob.h Magick++/lib/Magick++/CoderInfo.h Magick++/lib/Magick++/Color.h Magick++/lib/Magick++/Drawable.h Magick++/lib/Magick++/Exception.h Magick++/lib/Magick++/Functions.h Magick++/lib/Magick++/Geometry.h Magick++/lib/Magick++/Image.h Magick++/lib/Magick++/Include.h Magick++/lib/Magick++/Montage.h Magick++/lib/Magick++/Pixels.h Magick++/lib/Magick++/ResourceLimits.h Magick++/lib/Magick++/SecurityPolicy.h Magick++/lib/Magick++/Statistic.h Magick++/lib/Magick++/STL.h Magick++/lib/Magick++/TypeMetric.h '/usr/local/include/ImageMagick-7/Magick++'
 /bin/mkdir -p '/usr/local/include/ImageMagick-7'
 /usr/bin/install -c -m 644 Magick++/lib/Magick++.h '/usr/local/include/ImageMagick-7'
 /bin/mkdir -p '/usr/local/share/man/man1'
 /usr/bin/install -c -m 644 MagickCore/MagickCore-config.1 MagickWand/MagickWand-config.1 Magick++/bin/Magick++-config.1 utilities/ImageMagick.1 utilities/animate.1 utilities/compare.1 utilities/composite.1 utilities/conjure.1 utilities/convert.1 utilities/display.1 utilities/identify.1 utilities/import.1 utilities/magick.1 utilities/magick-script.1 utilities/mogrify.1 utilities/montage.1 utilities/stream.1 '/usr/local/share/man/man1'
 /bin/mkdir -p '/usr/local/lib/pkgconfig'
 /usr/bin/install -c -m 644 MagickCore/ImageMagick.pc MagickCore/MagickCore.pc MagickCore/ImageMagick-7.Q16HDRI.pc MagickCore/MagickCore-7.Q16HDRI.pc MagickWand/MagickWand.pc MagickWand/MagickWand-7.Q16HDRI.pc Magick++/lib/Magick++.pc Magick++/lib/Magick++-7.Q16HDRI.pc '/usr/local/lib/pkgconfig'
make[2]: Leaving directory '/home/torrocus/heif/ImageMagick'
make[1]: Leaving directory '/home/torrocus/heif/ImageMagick'
```
<!-- markdownlint-restore -->
</p>
</details>
<!-- markdownlint-disable-next-line MD033 -->
<br>

After installation, I check the Image Magick version.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ identify --version
Version: ImageMagick 7.0.10-29 Q16 x86_64 2020-09-13 https://imagemagick.org
Copyright: © 1999-2020 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI OpenMP(4.5)
Delegates (built-in): bzlib fontconfig freetype heic jng jp2 jpeg ltdl png webp x xml zlib
```
<!-- markdownlint-restore -->

Access to the previous version is possible by adding suffix `-im6`.
So the `identify` command from version 6.x is available from `identify-im6`.

### Reload configuration

Now it's time to configure dynamic linker run-time bindings.
Just run `ldconfig` command as root.

```console
sudo ldconfig
```

### Uninstall Image Magick

There may be times when you want to revert to the previous version
of Image Magick.

```console
sudo make uninstall
```

<!-- markdownlint-disable-next-line MD033 -->
<details>
<!-- markdownlint-disable-next-line MD033 -->
<summary>
Click here to see uninstall call.
</summary>
<!-- markdownlint-disable-next-line MD033 -->
<p>

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 -->
```console
$ sudo make uninstall
[sudo] password for torrocus:
 ( cd '/usr/local/include/ImageMagick-7/MagickCore' && rm -f MagickCore.h animate.h annotate.h artifact.h attribute.h blob.h cache.h cache-view.h channel.h cipher.h client.h coder.h color.h colormap.h colorspace.h compare.h composite.h compress.h configure.h constitute.h decorate.h delegate.h deprecate.h display.h distort.h distribute-cache.h draw.h effect.h enhance.h exception.h feature.h fourier.h fx.h gem.h geometry.h histogram.h identify.h image.h image-view.h layer.h linked-list.h list.h locale_.h log.h magic.h magick.h magick-config.h magick-type.h matrix.h memory_.h method-attribute.h methods.h mime.h module.h monitor.h montage.h morphology.h nt-base.h opencl.h option.h paint.h pixel.h pixel-accessor.h policy.h prepress.h profile.h property.h quantize.h quantum.h random_.h registry.h resample.h resize.h resource_.h segment.h semaphore.h shear.h signature.h splay-tree.h static.h statistic.h stream.h string_.h studio.h timer.h token.h transform.h threshold.h type.h utility.h version.h vision.h visual-effects.h widget.h xml-tree.h xwindow.h )
 ( cd '/usr/local/include/ImageMagick-7/MagickCore' && rm -f magick-baseconfig.h )
 ( cd '/usr/local/include/ImageMagick-7/MagickWand' && rm -f MagickWand.h animate.h compare.h composite.h conjure.h convert.h deprecate.h display.h drawing-wand.h identify.h import.h magick-cli.h magick-image.h magick-property.h method-attribute.h mogrify.h montage.h operation.h pixel-iterator.h pixel-wand.h stream.h wandcli.h wand-view.h )
 ( cd '/usr/local/bin' && rm -f magick )
 ( cd '/usr/local/bin' && rm -f MagickCore-config MagickWand-config Magick++-config )
 ( cd '/usr/local/etc/ImageMagick-7/' && rm -f colors.xml delegates.xml log.xml mime.xml policy.xml quantization-table.xml thresholds.xml type.xml type-apple.xml type-dejavu.xml type-ghostscript.xml type-urw-base35.xml type-windows.xml )
 ( cd '/usr/local/share/ImageMagick-7' && rm -f english.xml francais.xml locale.xml )
 ( cd '/usr/local/lib/ImageMagick-7.0.10/config-Q16HDRI' && rm -f configure.xml )
 ( cd '/usr/local/share/doc/ImageMagick-7' && rm -f LICENSE ChangeLog NEWS.txt )
 /bin/bash ./libtool   --mode=uninstall rm -f '/usr/local/lib/libMagickCore-7.Q16HDRI.la'
libtool: uninstall: rm -f /usr/local/lib/libMagickCore-7.Q16HDRI.la /usr/local/lib/libMagickCore-7.Q16HDRI.so.7.0.0 /usr/local/lib/libMagickCore-7.Q16HDRI.so.7 /usr/local/lib/libMagickCore-7.Q16HDRI.so /usr/local/lib/libMagickCore-7.Q16HDRI.a
 /bin/bash ./libtool   --mode=uninstall rm -f '/usr/local/lib/libMagickWand-7.Q16HDRI.la'
libtool: uninstall: rm -f /usr/local/lib/libMagickWand-7.Q16HDRI.la /usr/local/lib/libMagickWand-7.Q16HDRI.so.7.0.0 /usr/local/lib/libMagickWand-7.Q16HDRI.so.7 /usr/local/lib/libMagickWand-7.Q16HDRI.so /usr/local/lib/libMagickWand-7.Q16HDRI.a
 /bin/bash ./libtool   --mode=uninstall rm -f '/usr/local/lib/libMagick++-7.Q16HDRI.la'
libtool: uninstall: rm -f /usr/local/lib/libMagick++-7.Q16HDRI.la /usr/local/lib/libMagick++-7.Q16HDRI.so.4.0.0 /usr/local/lib/libMagick++-7.Q16HDRI.so.4 /usr/local/lib/libMagick++-7.Q16HDRI.so /usr/local/lib/libMagick++-7.Q16HDRI.a
rm -f /usr/local/share/doc/ImageMagick-7/index.html
for dir in images images/patterns www www/assets www/api www/source www/Magick++ www/api/MagickCore www/api/MagickWand ; do \
  rm -f -r /usr/local/share/doc/ImageMagick-7/$dir ; \
done
cd /usr/local/bin ; \
for name in animate compare composite conjure convert display identify import magick-script mogrify montage stream ; \
do \
  target=`echo "$name" | sed 's,^.*/,,;s/$//;s,x,x,;s/$//'`; \
  rm -f $target ; \
done
 ( cd '/usr/local/include/ImageMagick-7/Magick++' && rm -f Blob.h CoderInfo.h Color.h Drawable.h Exception.h Functions.h Geometry.h Image.h Include.h Montage.h Pixels.h ResourceLimits.h SecurityPolicy.h Statistic.h STL.h TypeMetric.h )
 ( cd '/usr/local/include/ImageMagick-7' && rm -f Magick++.h )
 ( cd '/usr/local/share/man/man1' && rm -f MagickCore-config.1 MagickWand-config.1 Magick++-config.1 ImageMagick.1 animate.1 compare.1 composite.1 conjure.1 convert.1 display.1 identify.1 import.1 magick.1 magick-script.1 mogrify.1 montage.1 stream.1 )
 ( cd '/usr/local/lib/pkgconfig' && rm -f ImageMagick.pc MagickCore.pc ImageMagick-7.Q16HDRI.pc MagickCore-7.Q16HDRI.pc MagickWand.pc MagickWand-7.Q16HDRI.pc Magick++.pc Magick++-7.Q16HDRI.pc )
```
<!-- markdownlint-restore -->
</p>
</details>

## Using HEIF in Ruby

Run gem install command.

```console
gem install mini_magick
```

Or add the gem to Gemfile.

```ruby
gem 'mini_magick'
```

```ruby
require 'mini_magick'

image = MiniMagick::Image.open('example.heic')
image.type # => "HEIC"
image.format = "jpeg"
image.write('output.jpg')
```

It looks like everything is working.
Another successful day in the developer's life.
Hope this helps someone.
