---
categories: experiments
date: 2023-12-13 15:00:00 +0200
excerpt: >
  How do you mark a Haml file with the magic comment
  # frozen_string_literal: true.
  Is it even possible?
lang: en
last_modified_at: 2023-12-14 15:00:00 +0200
layout: post
title: Can we use frozen_string_literal in Haml? WTF?
---

One of the Rails developers on LinkedIn (Ruby on Rails group) asked a
[non-silly question](https://www.linkedin.com/feed/update/urn:li:activity:7140300572573724673):

> Potentially silly question, I am not ashamed of not knowing this...
> How do you mark a Haml file with the magic comment
> `# frozen_string_literal: true.`
> Is it even possible?
>
> -- <cite>Rob Lacey</cite> <!-- markdownlint-disable-line MD033 -->

My initial thought was that it's impossible.
Haml is a templating language for creating HTML.
Therefore, there is no need to add a Ruby magic comment to it.
This is where I could end this discussion.

## Experiment

I wouldn't be myself if I didn't conduct a short experiment.
I think we can use RuboCop, which has the
[Style/FrozenStringLiteralComment cop](https://docs.rubocop.org/rubocop/cops_style.html#stylefrozenstringliteralcomment).

**Disclaimer!**
I openly admit that what I'm doing here is for the purpose of mental exercise.

For this experiment, my environment looked like this:

```console
$ ruby --version
ruby 3.2.2 [x86_64-linux]
$ rubocop --version
1.59.0
$ haml-lint --version
haml-lint 0.52.0
```

I created a simple, yet not empty, Haml file.

```console
echo "Seeking a new Ruby on Rails project" > hire_me.haml
```

I'll note that a valid Haml file doesn't have to include HTML tags.
I also emphasize that I used only letters and spaces here,
without special characters and punctuation.
This is a unique case,
but it will allowed me to experiment from start to finish.
In short, I wanted to avoid characters interpreted by Haml,
such as hash, dot, and percent.

Here is the `hire_me.haml` file:

```haml
Seeking a new Ruby on Rails project
```

BTW I shared this article with the question author - Rob Lacey.
I also received a response from him in an
[article](https://dev.to/braindeaf/how-do-you-test-frozenstringliteral-in-ruby-84e)
form.
So I allow myself a small clarification.

The initial file (the one above) is a valid Haml-formatted file.
I verified this by using a [Haml linter](https://github.com/sds/haml-lint).

```console
$ haml-lint hire_me.haml

1 file inspected, 0 lints detected
```

I ran RuboCop on this file.

```console
$ rubocop hire_me.haml --only Style/FrozenStringLiteralComment
Inspecting 1 file
C

Offenses:

hire_me.haml:1:1: C: [Correctable] Style/FrozenStringLiteralComment:
                     Missing frozen string literal comment.
Seeking a new Ruby on Rails project
^

1 file inspected, 1 offense detected, 1 offense autocorrectable
```

I noticed that RuboCop allows for auto-correction of this file.
Why not give it a try?
The fact that it is possible doesn't necessarily mean
that the result will be a valid Haml file.
That's the essence of a true experiment.

```console
$ rubocop hire_me.haml -A
Inspecting 1 file
C

Offenses:

hire_me.haml:1:1: C: [Corrected] Style/FrozenStringLiteralComment:
                     Missing frozen string literal comment.
Seeking a new Ruby on Rails project
^
hire_me.haml:2:1: C: [Corrected] Layout/EmptyLineAfterMagicComment:
                     Add an empty line after magic comments.
Seeking a new Ruby on Rails project
^

1 file inspected, 2 offenses detected, 2 offenses corrected
```

It wasn't flagged as a safe auto-correction, but it doesn't matter,
~~and it's correct~~ because this process was successful.

I checked the content of the file after the correction.

```console
$ cat hire_me.haml
# frozen_string_literal: true

Seeking a new Ruby on Rails project
```

And I rerun RuboCop on the file.

```console
$ rubocop hire_me.haml --only Style/FrozenStringLiteralComment
Inspecting 1 file
.

1 file inspected, no offenses detected
```

It seems that using the magic comment like `# frozen_string_literal: true`
in a Haml file is possible, and RuboCop is satisfied with it.

However, **I agree with Rob Lacey** that the result is not a valid Haml file.

> I see where you're going with this.
> Rubocop must know how to fix this.
> The problem is that # frozen_string_literal: true is not valid Haml.

```console
$ haml-lint hire_me.haml
hire_me.haml:0 [E] Syntax: hire_me.haml - Illegal element:
                           classes and ids must have values.

1 file inspected, 1 lint detected
```

Continuing further,
I commented out the line with the Ruby magic comment according to Haml syntax.

```console
$ cat hire_me.haml
-# frozen_string_literal: true

Seeking a new Ruby on Rails project
```

After making the change, I ensured that the Haml file syntax is correct.

```console
$ haml-lint hire_me.haml

1 file inspected, 0 lints detected
```

And what does RuboCop think about it?

```console
$ rubocop hire_me.haml --only Style/FrozenStringLiteralComment
Inspecting 1 file
F

Offenses:

hire_me.haml:3:9: F: Lint/Syntax: unexpected token tIDENTIFIER
(Using Ruby 3.2 parser; configure using TargetRubyVersion parameter, under AllCops)
Seeking a new Ruby on Rails project
        ^

1 file inspected, 1 offense detected
```

As you can see, RuboCop is not happy about it.
Rob also mentioned this in his article:

> His theory was Rubocop must know how to solve this. Sadly.
>
> ```haml
> # frozen_string_literal: true
> SOMETHING
> ```
>
> Is not valid Haml.

As I mentioned before, I know this is not a valid Haml file.
If I understood Rob correctly,
I also believe that RuboCop should not suggest auto-correction in such a case.
However, we need to remember that RuboCop is just a tool.
The programmer makes the final decisions.
Just because we can, doesn't necessarily mean we should.
Personally, I would exclude all Haml files from RuboCop analysis.

```yaml
# .rubocop.yml

AllCops:
  Exclude:
    - '**/*.haml'
```

I'm just expressing my opinion.
~~But I don't have the full context of the issue,
so I might be missing something.~~
I think I now better understand the context of what Rob meant
when asking his question.
Rob wants to leverage the behavior provided by `frozen_string_literal`
so that the same strings in templates (Haml, Slim, Erb)
are the same object in memory.
I think this expectation makes a lot of sense.
How to achieve this?
That is a much deeper and another question.

Thank you to Rob, the question author, for inspiring this little experiment.
