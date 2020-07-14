---
categories: tips
date: 2020-07-11 23:55:00 +0200
description: How to add README.md to GitHub Profile? What features are supported and which are not?
excerpt: Let's fun! How to create a secret GitHub repository?
image: /assets/images/special-github-repository/twitter_image.png
lang: en
layout: post
title: Create a special repository in your GitHub Profile 🔨
---

Who doesn't like riddles or secrets?
As a programmer, I like all _Easter eggs_ and associated mystery.
GitHub probably also likes such games.

I noticed that my friend's profile on GitHub looks different from mine.
I took a closer look at this.
It turned out that GitHub introduced a secret, special repository.
For a special repository to be displayed in the user profile, two conditions must be met.

## The name of your special repository

The message that appears on GitHub after discovering the secret looks something like this:

> You found a secret! **USERNAME/USERNAME** is a ✨ _special_ ✨ repository that you can use to add a
> `README.md` to your GitHub profile. Make sure it’s public and initialize it with a **README** to get
> started.

To clarify, **USERNAME** is your GitHub username.
Your secret GitHub repository has the same name.

In my case, after entering my username as the repository name, the message looked exactly like this:

---

You found a secret! **torrocus/torrocus** is a ✨ _special_ ✨ repository that you can use to add a
`README.md` to your GitHub profile. Make sure it’s public and initialize it with a **README** to get
started.

---

### You found a secret!

Because this is a secret, the above message appears if and only if
the repository name is exactly as the GitHub username.

![Animation revealing a special repository][animation-about-secret-repo]

## README file in your special repository

Before pressing the **Create repository** button, it's worth checking the checkbox like below.

[✓] Initialize this repository with a README

Then, when creating the repo, the first commit with the README.md file will be created.
The content of this file is as follows:

**README.md**
```
### Hi there 👋

<!--
**torrocus/torrocus** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
```

And it gives the effect as in the screenshot below:

![After create secret repository][image-after-create-secret-repo]

## Features of the special repository

In most cases, the README file in this "secret repo" behaves like any other markdown file.
For now, I'm still testing the features of this repository.
I noticed the following properties.

### Interpretation of markdown syntax

+ Support headers (six levels of section headings)
  ```markdown
  # Header with <h1> tag
  ## Header with <h2> tag
  ### Header with <h3> tag
  #### Header with <h4> tag
  <!-- Headlines below are much smaller than normal text -->
  ##### Header with <h5> tag
  ###### Header with <h6> tag
  ```
+ Support for emphasis text and its combinations
  * **bold text**,
  * _italic text_,
  * ~~stricken text~~
  * **bold and _italic text_**
  * _italic and **bold text**_
+ List support:
  * ordered list
  * unordered list
+ Support for tables in ASCII format
+ Support blockquotes
  ```markdown
  Benjamin Franklin said:
  > Three may keep a secret if two of them are dead.
  ```
+ Automatic linking for URLs.
  Using the correct URL in the text will create a link.
+ Support a code snippet in the body of the text.
  Here is the inline code `print("You found a secret!");`.
+ Code block display support.
+ Support for different types of images (JPG, PNG, GIF, SVG).
  For images to display correctly, they must have an absolute path.
  `https://raw.githubusercontent.com/torrocus/torrocus/master/IMAGE`
+ Support `<details>` and `<summary>` tags.
  You can make the profile more interactive.
  ```markdown
  <details open>
    <summary>Technologies</summary>
    <p>...</p>
  </details>
  ```
+ The displayed README.md file on the GitHub Profile is responsive.
  The maximum ASCII Art width can be 115 characters wide.
  The content should be in `<pre>` tags.
  But if it is to display well on mobile, it should be as wide as 55 characters.
  Empirically checked.

Using only the above functionalities may be sufficient.
But a demanding GitHub user will notice several problems.

#### **Not supported** features

+ Doesn't support some HTML tags like `<small>`.
  Tags that are not converted will appear as text.
+ JavaScript tags are displayed as text and are not interpreted.
+ Doesn't support username @mentions.
  This is strange because this function is often used on GitHub.
  Maybe in the future, this will change.
+ Doesn't support inline SVG.
  This image is not displayed.
  Instead of inline, provide the full, absolute path to SVG.
+ Doesn't support Base64 images.

#### Image support

Images are displayed when I give the full path to them.
The code in Markdown looks something like this:
```markdown
![ALT TEXT](https://raw.githubusercontent.com/torrocus/torrocus/master/IMAGE)
```

GitHub converted the above Markdown code to HTML as follows:
```html
<a target="_blank"
   rel="noopener noreferrer"
   href="https://raw.githubusercontent.com/torrocus/torrocus/master/IMAGE">
  <img alt="ALT TEXT"
       src="https://raw.githubusercontent.com/torrocus/torrocus/master/IMAGE">
</a>
```

GitHub replaced the image to a link with the image.
Fortunately, I can use HTML directly with `<img>` tag.
In that case it's possible to overwrite the link associated with the image.

I treat it as an experiment and fun, so I don't have any special expectations.


[animation-about-secret-repo]: {{ 'assets/images/special-github-repository/create-secret-repository.gif' | relative_url }}
[image-after-create-secret-repo]: {{ 'assets/images/special-github-repository/after-create-secret-repository.png' | relative_url }}
[github-html-blocks]: https://github.github.com/gfm/#html-blocks

