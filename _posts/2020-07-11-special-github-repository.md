---
categories: tips
date: 2020-07-11 23:55:00 +0200
excerpt: Let's fun! How to create a secret GitHub repository?
lang: en
layout: post
title: Create a special repository in your GitHub profile
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

Because this is a secret, above message appears if and only if
the repository name is exactly the same as the GitHub username.

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

For now, I'm still testing the features of this repository.
I noticed the following properties:

+ Support for different types of images (jpg, png, gif, svg).
  For images to display correctly, they must have an absolute path.
  `https://raw.githubusercontent.com/torrocus/torrocus/master/IMAGE`
+ Images are also links.
  ```html
  <a target="_blank"
     rel="noopener noreferrer"
     href="https://raw.githubusercontent.com/torrocus/torrocus/master/IMAGE">
  <img src="https://raw.githubusercontent.com/torrocus/torrocus/master/IMAGE">
  </a>
  ```

I treat it as an experiment and fun, so I don't have any special expectations.


[animation-about-secret-repo]: {{ 'assets/images/special-github-repository/create-secret-repository.gif' | relative_url }}
[image-after-create-secret-repo]: {{ 'assets/images/special-github-repository/after-create-secret-repository.png' | relative_url }}
