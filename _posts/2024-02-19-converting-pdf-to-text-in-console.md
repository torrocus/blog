---
categories: development
date: 2024-02-19 20:00:00 +0200
excerpt: >
  Explore multiple PDF-to-text conversion methods.
  Discover advantages and limitations.
lang: en
layout: post
title: Extracting text from PDF files in the console
---

PDF files can be generated in many different ways.
Over the years, **PDF** (Portable Document Format) has become a standard.
📄
Its popularity stems from its ability to preserve the original layout
and formatting of text, graphics, forms, tables, and other elements.
This preservation happens regardless of the device or operating system used.
Typically, PDF files are 'read-only,' requiring special software for editing.

From time to time,
I come across the necessity of analyzing the content within PDF files.
Being a programmer, I automate this process, conducting it within the console.
I chose to delve deeper into this issue, exploring numerous options and tools.
My intention is to continuously enhance this article
by incorporating additional methods, provided they are deemed compelling.

## pdftotext

The `pdftotext` is a popular command-line tool
for extracting text from PDF files.
It's available as part of software packages like Poppler or Xpdf
and works on various platforms, including Linux, macOS, and Windows.
It's user-friendly and offers customizable options for tailoring text extraction
to individual needs.

```console
$ pdftotext -v
pdftotext version 22.02.0
Copyright 2005-2022 The Poppler Developers - http://poppler.freedesktop.org
Copyright 1996-2011 Glyph & Cog, LLC
```

Example of converting a PDF file to text:

<!-- markdownlint-disable MD014 -->
```console
$ pdftotext input.pdf output.txt
```
<!-- markdownlint-enable MD014 -->

By default, pdftotext does a good job of parsing PDF files.
However, it's not perfect.
Columns in tables are interpreted as separate elements
and aren't aligned properly.
Long sentences are split into separate lines.
Decorations leave non-alphanumeric characters.

But pdftotext has a very interesting option:

```console
$ pdftotext --help
Usage: pdftotext [options] <PDF-file> [<text-file>]
  -layout              : maintain original physical layout
```

### pdftotext with layout

Here's how to invoke it:

<!-- markdownlint-disable MD014 -->
```console
$ pdftotext -layout input.pdf output.txt
```
<!-- markdownlint-enable MD014 -->

The `-layout` option in the pdftotext is used to preserve the original page layout.
pdftotext attempts to maintain the document's structure,
including text arrangement, table columns, decorations, and graphics.
This option doesn't always work perfectly.

## ebook-convert

The `ebook-convert` is a command-line tool provided by the Calibre software.
It is used for converting e-book files from one format to another.
With ebook-convert, users can convert various e-book formats
such as EPUB, MOBI, PDF, and more.
Additionally, it offers options to customize the conversion process,
including adjusting the layout, adding metadata, and converting images.

```console
$ ebook-convert --version
ebook-convert (calibre 5.37.0)
Created by: Kovid Goyal <kovid@kovidgoyal.net>
```

Example of use:

```console
$ ebook-convert input.pdf output.txt
1% Converting input to HTML...
InputFormatPlugin: PDF Input running
on input.pdf
pdftohtml log:
Page-1
Parsing all content...
Generating default TOC from spine...
34% Running transforms on e-book...
Merging user specified metadata...
Detecting structure...
Auto generated TOC with 0 entries.
Flattening CSS and remapping font sizes...
Source base font size is 12.00000pt
Removing fake margins...
Cleaning up manifest...
Trimming unused files from manifest...
Creating TXT Output...
67% Running TXT Output plugin
Converting XHTML to TXT...
TXT output written to output.txt
Output saved to output.txt
```

This tool handles long sentences better.
You can see the continuity of context.
However, unfortunately, tables give it trouble,
similar to pdftotext without the layout option.

The set of options is limited.
I regret that there isn't an option similar to `-layout` like in pdftotext.

## pdftohtml

The pdftohtml is used to convert PDF files to HTML code.
It is also part of the Poppler package, similar to pdftotext.
This tool is used to create web versions of PDF documents.
It preserves the document structure and formatting of text, graphics, and other elements.

```console
$ pdftohtml -v
pdftohtml version 22.02.0
Copyright 2005-2022 The Poppler Developers - http://poppler.freedesktop.org
Copyright 1999-2003 Gueorgui Ovtcharov and Rainer Dorsch
Copyright 1996-2011 Glyph & Cog, LLC
```

By default, after convert PDF,
we will receive several HTML files with graphic files.
However, I found a few options that simplified this structure:

```console
$ pdftohtml --help
Usage: pdftohtml [options] <PDF-file> [<html-file> <xml-file>]
  -s                    : generate single document that includes all pages
  -i                    : ignore images
  -noframes             : generate no frames
```

Here's an example of the command I used:

```console
$ pdftohtml -i -s -noframes input.pdf output.html
Page-1
```

Generally, this requires further analysis.
This is not the final process.
We have an HTML file, not text.
It seems to me that pdftotext -layout is better in this respect.
I haven't noticed any significant benefit from the fact
that the output is HTML.
I think the algorithm is just the same.
But we're halfway through the conversion.

In a further step I can use `pdfreflow` and then `htmltotext`.

## abiword

AbiWord is a free text editor you can use on many different computers,
like Windows, macOS, and Linux.
It is a tool for editing text documents that offers functions similar to other
popular text editing programs such as Microsoft Word or LibreOffice Writer.
AbiWord supports many file formats,
including OpenDocument (odt), Microsoft Word (docx), Rich Text Format (rtf),
and many others.
AbiWord also allows to convert a PDF file.

```console
$ abiword --version
3.0.5
```

Here's a simple way to use it:

<!-- markdownlint-disable MD014 -->
```console
$ abiword --to=txt input.pdf
```
<!-- markdownlint-enable MD014 -->

The size of this package and its dependencies is a disadvantage.
Since I don't use abiword on a daily basis,
I had to install the program specially.

<!-- markdownlint-disable MD013 -->
```console
$ sudo apt install abiword
[sudo] password for torrocus: 
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  abiword-common abiword-plugin-grammar libabiword-3.0 libchamplain-0.12-0 libchamplain-gtk-0.12-0 libgoffice-0.10-10 libgoffice-0.10-10-common liblink-grammar5
  libloudmouth1-0 libots0 libtelepathy-glib0 libtidy5deb1 libwmf0.2-7 libwv-1.2-4 link-grammar-dictionaries-en minisat
Suggested packages:
  link-grammar-dictionaries-all
The following NEW packages will be installed:
  abiword abiword-common abiword-plugin-grammar libabiword-3.0 libchamplain-0.12-0 libchamplain-gtk-0.12-0 libgoffice-0.10-10 libgoffice-0.10-10-common
  liblink-grammar5 libloudmouth1-0 libots0 libtelepathy-glib0 libtidy5deb1 libwmf0.2-7 libwv-1.2-4 link-grammar-dictionaries-en minisat
0 upgraded, 17 newly installed, 0 to remove and 0 not upgraded.
Need to get 12,0 MB of archives.
After this operation, 47,7 MB of additional disk space will be used.
Do you want to continue? [Y/n]
```
<!-- markdownlint-enable MD013 -->

The resulting files are not perfect.
AbiWord completely failed to handle the table.
Long sentences were broken up similarly to more primitive tools.
I didn't notice any advantage over the competition.

## Other tools 🛠️

I still have other ideas:

- pdf2ps -> ps2ascii
- pdf2line (Haskell package)
- podofotextextract (PoDoFo package)

So the topic is still open.
I'll come back to this soon.
