---
categories: tips
date: 2023-12-13 15:00:00 +0200
excerpt: >
  How do you mark a Haml file with the magic comment
  # frozen_string_literal: true.
  Is it even possible?
lang: en
layout: post
title: Can we use frozen_string_literal in Haml? WTF?
---

One of the Rails developers on LinkedIn (Ruby on Rails group) asked a
[non-silly question](https://www.linkedin.com/feed/update/urn:li:activity:7140300572573724673):

> Potentially silly question, I am not ashamed of not knowing this...
> How do you mark a Haml file with the magic comment
> `# frozen_string_literal: true.`
> Is it even possible?

My initial thought was that it's impossible.
Haml is a templating language for creating HTML.
Therefore, there is no need to add a Ruby magic comment to it.

I wouldn't be myself if I didn't conduct a short experiment.
I think we can use RuboCop, which has the
[Style/FrozenStringLiteralComment cop](https://docs.rubocop.org/rubocop/cops_style.html#stylefrozenstringliteralcomment).

For this experiment, my environment looked like this:

```console
$ ruby --version
ruby 3.2.2 [x86_64-linux]
$ rubocop --version
1.59.0
```

I created a simple, yet not empty, Haml file.

```console
echo "Seeking a new Ruby on Rails project" > hire_me.haml
```

I'll note that a valid Haml file doesn't have to include HTML tags.
Here is the `hire_me.haml` file:

```haml
Seeking a new Ruby on Rails project.
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
and it's correct.

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
Just because we can, doesn't necessarily mean we should.
Personally, I would exclude all Haml files from RuboCop analysis.

```yaml
# .rubocop.yml

AllCops:
  Exclude:
    - '**/*.haml'
```

Of course, this decision is not within my jurisdiction.
I'm just expressing my opinion.
But I don't have the full context of the issue, so I might be missing something.
Nevertheless, I thank the author of the question for inspiring this little experiment.
