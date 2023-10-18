---
categories: deployment
date: 2020-06-21 16:00:00 +0200
excerpt: Deployment automation on GitHub Pages
lang: en
last_modified_at: 2021-12-07 10:00:00 +0200
layout: post
title: Building site based on Jekyll 4.2 using GitHub Actions
---

Today I decided to check feature [GitHub Actions][github-actions].
My goal is to prepare configuration for GitHub Actions and publish a site based
on [Jekyll][jekyll] 4.2

## GitHub Pages uses Jekyll 3.9

I'm adding this part because I forgot the reasons for my decision.
I maintain several Jekyll-based websites / blogs.
It's time to update Ruby on one of the blogs.
Edit `.ruby-version` file, then run `bundle install`.
And finally, run jekyll server: `jekyll s`.
It's failed, a message popped up:

<!-- markdownlint-capture -->
<!-- markdownlint-configure-file { "MD013": { "line_length": 150 } } -->
```text
jekyll 3.9.0 | Error:  no implicit conversion of Hash into Integer
/home/torrocus/.rvm/gems/ruby-3.0.0@blog/gems/pathutil-0.16.2/lib/pathutil.rb:502:in `read': no implicit conversion of Hash into Integer (TypeError)
```
<!-- markdownlint-restore -->

Googling the phrase
"jekyll 3.9.0 | Error:  no implicit conversion of Hash into Integer"
leads me to a simple conclusion:
**Jekyll 3.9 is not compatible with Ruby 3.**

The solution is to update Jekyll to at least 4.x.
However, here comes another problem.
**GitHub Pages doesn't support Jekyll 4.x.**
Current supported versions can be found on the [GitHub official dependency page][github-pages-dependency-versions].

In short, as long as GitHub Pages is using Jekyll 3.9,
neither Jekyll nor Ruby will be able to be updated.
The solution to this problem is to use GitHub Actions with Jekyll 4 or later.

## GitHub Actions step by step for Jekyll

To use GitHub Actions, you need to create the folder `.github/workflows`.
Inside this folder will be the GitHub Actions configuration.
Each file is responsible for a separate GitHub Actions workflow.
There are already actions at GitHub that help build a website based on Jekyll.

For the Jekyll build to go correctly, you need a JEKYLL_PAT key.
To generate the key go to **Settings** in your GitHub profile.
Then go to **Developer settings** and then go to [Personal access tokens][github-personal-access-tokens].
Click **Generate new token** button and confirm your GitHub password.
Fill out the form **New personal access token** as follows:

- Note: _GitHub Actions_
- Select checkbox _public_repo_
- Click **Generate token**

A new GitHub API key will appear, so copy it.
You have to paste it elsewhere, so if you lose it, you have to repeat the process.

Now go to the repository **Settings** and go to the **Secrets** settings.
Click the **New secret** button
and fill in the **Secrets / New secret** form as below:

- Name: JEKYLL_PAT
- Value: _paste the copied GitHub Actions key here_
- Click **Add secret**

Settings on the GitHub side are almost ready.
Now you need to prepare the configuration on the repository side.

Configuration file `.github/workflows/deployment.yml`:

```yaml
{% raw %}name: deployment

on:
  push:
    branches:
      - master

jobs:
  github-pages:
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v2

    - uses: actions/cache@v1
      with:
        path: vendor/bundle
        key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
        restore-keys: |
          ${{ runner.os }}-gems-

    - uses: helaili/jekyll-action@2.0.3
      env:
        JEKYLL_PAT: ${{ secrets.JEKYLL_PAT }}{% endraw %}
```

After doing git commit and git push, the GitHub Actions process should start.
The process workflow can be viewed in the tab **Actions**.
The name of this process is _deployment_
(see the value of the key **name** in `.github/workflows/deployment.yml` file).
After selecting the process name (in this case _deployment_) and commit name,
you can see the GitHub Action process workflow.

```text
▶ ✓ Set up job
▶ ✓ Build helaili/jekyll-action@2.0.3
▶ ✓ Run actions/checkout@v2
▶ ✓ Run actions/cache@v1
▶ ✓ Run helaili/jekyll-action@2.0.3
▶ ✓ Post Run actions/cache@v1
▶ ✓ Post Run actions/checkout@v2
▶ ✓ Complete job
```

If everything is green, it means that the whole process was successful.
If any step fails, you need to read the detailed information for that step.
A good practice is to add a badge to the README file.

```markdown
![Build and deploy](https://github.com/USER/REPO/workflows/WORKFLOW/badge.svg)
```

Where **USER** is the username,
**REPO** is the GitHub repository name
and **WORKFLOW** is the name of the GitHub Action process.
Below is a preview of passing and failing badges.

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD013 MD033 -->
<svg xmlns="http://www.w3.org/2000/svg" width="142" height="20">
  <defs>
    <linearGradient id="workflow-fill" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop stop-color="#444D56" offset="0%"></stop>
      <stop stop-color="#24292E" offset="100%"></stop>
    </linearGradient>
    <linearGradient id="state-fill" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop stop-color="#34D058" offset="0%"></stop>
      <stop stop-color="#28A745" offset="100%"></stop>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <g font-family="&#39;DejaVu Sans&#39;,Verdana,Geneva,sans-serif" font-size="11">
      <path id="workflow-bg" d="M0,3 C0,1.3431 1.3552,0 3.02702703,0 L92,0 L92,20 L3.02702703,20 C1.3552,20 0,18.6569 0,17 L0,3 Z" fill="url(#workflow-fill)" fill-rule="nonzero"></path>
      <text fill="#010101" fill-opacity=".3">
        <tspan x="22.1981982" y="15">deployment</tspan>
      </text>
      <text fill="#FFFFFF">
        <tspan x="22.1981982" y="14">deployment</tspan>
      </text>
    </g>
    <g transform="translate(92)" font-family="&#39;DejaVu Sans&#39;,Verdana,Geneva,sans-serif" font-size="11">
      <path d="M0 0h46.939C48.629 0 50 1.343 50 3v14c0 1.657-1.37 3-3.061 3H0V0z" id="state-bg" fill="url(#state-fill)" fill-rule="nonzero"></path>
      <text fill="#010101" fill-opacity=".3">
        <tspan x="4" y="15">passing</tspan>
      </text>
      <text fill="#FFFFFF">
        <tspan x="4" y="14">passing</tspan>
      </text>
    </g>
    <path fill="#959DA5" d="M11 3c-3.868 0-7 3.132-7 7a6.996 6.996 0 0 0 4.786 6.641c.35.062.482-.148.482-.332 0-.166-.01-.718-.01-1.304-1.758.324-2.213-.429-2.353-.822-.079-.202-.42-.823-.717-.99-.245-.13-.595-.454-.01-.463.552-.009.946.508 1.077.718.63 1.058 1.636.76 2.039.577.061-.455.245-.761.446-.936-1.557-.175-3.185-.779-3.185-3.456 0-.762.271-1.392.718-1.882-.07-.175-.315-.892.07-1.855 0 0 .586-.183 1.925.718a6.5 6.5 0 0 1 1.75-.236 6.5 6.5 0 0 1 1.75.236c1.338-.91 1.925-.718 1.925-.718.385.963.14 1.68.07 1.855.446.49.717 1.112.717 1.882 0 2.686-1.636 3.28-3.194 3.456.254.219.473.639.473 1.295 0 .936-.009 1.689-.009 1.925 0 .184.131.402.481.332A7.011 7.011 0 0 0 18 10c0-3.867-3.133-7-7-7z"></path>
  </g>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="135" height="20">
  <defs>
    <linearGradient id="workflow-fill-failing" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop stop-color="#444D56" offset="0%"></stop>
      <stop stop-color="#24292E" offset="100%"></stop>
    </linearGradient>
    <linearGradient id="state-fill-failing" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop stop-color="#D73A49" offset="0%"></stop>
      <stop stop-color="#CB2431" offset="100%"></stop>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <g font-family="&#39;DejaVu Sans&#39;,Verdana,Geneva,sans-serif" font-size="11">
      <path id="workflow-bg-failing" d="M0,3 C0,1.3431 1.3552,0 3.02702703,0 L92,0 L92,20 L3.02702703,20 C1.3552,20 0,18.6569 0,17 L0,3 Z" fill="url(#workflow-fill-failing)" fill-rule="nonzero"></path>
      <text fill="#010101" fill-opacity=".3">
        <tspan x="22.1981982" y="15">deployment</tspan>
      </text>
      <text fill="#FFFFFF">
        <tspan x="22.1981982" y="14">deployment</tspan>
      </text>
    </g>
    <g transform="translate(92)" font-family="&#39;DejaVu Sans&#39;,Verdana,Geneva,sans-serif" font-size="11">
      <path d="M0 0h40.47C41.869 0 43 1.343 43 3v14c0 1.657-1.132 3-2.53 3H0V0z" id="state-bg-failing" fill="url(#state-fill-failing)" fill-rule="nonzero"></path>
      <text fill="#010101" fill-opacity=".3">
        <tspan x="5" y="15">failing</tspan>
      </text>
      <text fill="#FFFFFF">
        <tspan x="5" y="14">failing</tspan>
      </text>
    </g>
    <path fill="#959DA5" d="M11 3c-3.868 0-7 3.132-7 7a6.996 6.996 0 0 0 4.786 6.641c.35.062.482-.148.482-.332 0-.166-.01-.718-.01-1.304-1.758.324-2.213-.429-2.353-.822-.079-.202-.42-.823-.717-.99-.245-.13-.595-.454-.01-.463.552-.009.946.508 1.077.718.63 1.058 1.636.76 2.039.577.061-.455.245-.761.446-.936-1.557-.175-3.185-.779-3.185-3.456 0-.762.271-1.392.718-1.882-.07-.175-.315-.892.07-1.855 0 0 .586-.183 1.925.718a6.5 6.5 0 0 1 1.75-.236 6.5 6.5 0 0 1 1.75.236c1.338-.91 1.925-.718 1.925-.718.385.963.14 1.68.07 1.855.446.49.717 1.112.717 1.882 0 2.686-1.636 3.28-3.194 3.456.254.219.473.639.473 1.295 0 .936-.009 1.689-.009 1.925 0 .184.131.402.481.332A7.011 7.011 0 0 0 18 10c0-3.867-3.133-7-7-7z"></path>
  </g>
</svg>
<!-- markdownlint-restore -->

In most cases, the above instructions should allow you to build
static websites based on Jekyll on GitHub Actions.
This blog also uses this configuration.

---

### Possible problems

There have been various problems recently.

#### Could not read Password

Your Jekyll site is working locally.
You used GitHub Actions to build it, but finally got this message:

```text
fatal: could not read Password for 'https://***@github.com': No such device or address
```

This means that you need to reset the GitHub Actions token.

### Simple dictionary

- **JEKYLL_PAT** - Jekyll Personal Access Token

[github-actions]: https://github.com/features/actions
[github-pages-dependency-versions]: https://pages.github.com/versions/
[github-personal-access-tokens]: https://github.com/settings/tokens
[jekyll]: https://jekyllrb.com/
