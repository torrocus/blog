---
categories: development
date: 2020-07-08 09:30:00 +0200
excerpt: Changing default Markdown converter
lang: en
layout: post
title: How to increase Markdown conversion speed in Jekyll?
---

Jekyll uses Kramdown to convert Markdown by default.
Kramdown was written in pure Ruby.
I love Ruby as a programming language.
But I'm aware that the alternative solution written in C will be faster.

## Change Kramdown to CommonMark in Jekyll

For Markdown conversion an alternative solution to Kramdown is CommonMark.
Jekyll has a dedicated gem called [jekyll-commonmark][jekyll-commonmark].
This gem uses the [cmark-gfm][cmark-gfm] library implemented in C.

Add a gem `jekyll-commonmark` to the group :jekyll_plugins in Gemfile
```ruby
gem 'jekyll-commonmark'
```

In my opinion, it's better to use the source directly from GitHub.
```ruby
gem 'jekyll-commonmark', github: 'jekyll/jekyll-commonmark'
```
The `jekyll-commonmark` gem on RubyGems is not up to date.
And I noticed that this gem in version 1.3.1 incorrectly colors the source code syntax.

After adding to Gemfile, call `bundle install`.
If the gem installation was successful, the configuration needs to be improved.

In the file `_config.yml` find key `markdown`.
Change the value of this key from `kramdown` to `CommonMark`.
Remember that the `markdown` key is not required.
If this key is not present, it defaults to `kramdown`.
In this case, create the key `markdown` with the value `CommonMark` to override the default value.

It's a good practice to set up the gem itself.
CommonMark has options and extensions.

Part of the configuration file `_config.yml`
```yaml
markdown: CommonMark
commonmark:
  extensions:
    - autolink
    - strikethrough
    - table
    - tagfilter
    - tasklist
  options:
    - FOOTNOTES
    - GITHUB_PRE_LANG
    - SMART
    - STRIKETHROUGH_DOUBLE_TILDE
    - UNSAFE
```

This blog also uses this configuration.

### CommonMark advantage

The first and indisputable advantage of CommonMark is of course the processing speed.

### CommonMark disadvantage

However, I also see disadvantages.
Using markdown with CommonMark, you cannot add HTML attributes such as id or class.
Kramdown allowed the following markdown:
```markdown
{:.commonmark-vs-kramdown}
**CommonMark** is faster than **Kramdown**.
```

Kramdown parsed the above code to the following HTML:
```html
<p class="commonmark-vs-kramdown">
  <strong>CommonMark</strong> is faster than <strong>Kramdown</strong>.
</p>
```

Unfortunately CommonMark parses it like this:
```html
<p>{:.commonmark-vs-kramdown}
<strong>CommonMark</strong> is faster than <strong>Kramdown</strong>.</p>
```

I can live with it and use HTML in problematic places.
But surely attribute handling would be a big, positive change for CommonMark.
Maybe in the future...

{:.commonmark-support-html-classes}
This is my test for **CommonMark** on a living organism.
If you don't see the `{:.commonmark-support-html-classes}` text at the beginning of the paragraph,
then CommonMark supports this functionality or I have given up I have changed the markdown parser.

---

### Simple dictionary

#### Extensions

+ **autolink**      - Automatically converts the URL to an anchor tag.
+ **strikethrough** - Provides strikethrough support.
+ **table**         - Provides table conversion.
                      Tables drawn with ASCII characters are converted to HTML tags.
+ **tagfilter**     - Disables unsafe tags.
                      Filters tags like:
                      `<iframe>`, `<noembed>`, `<noframes>`, `<plaintext>`,
                      `<script>`, `<style>`, `<textarea>`, `<title>`, `<xmp>`.
                      These tags change the way HTML is interpreted.
                      That's why they are escapes.
                      During conversion for filtered tags, `<` is converted to `&lt;`.
+ **tasklist**      - Provides item list support.
                      You can create lists of varying depths.
                      The list can be numbered (using numbers: 1, 2, 3, etc.).
                      Or an unnumbered list (using the characters: +, -, *, etc.).

#### Options
+ **FOOTNOTES**       - Parse footnotes.
                        Footnotes can be placed anywhere.
                        It's good practice to include footnotes at the end of the file.
+ **GITHUB_PRE_LANG** - This option sets the `data-lang` attribute on the `<pre>` tag.
                        By default, the `data-lang` attribute is in the `<code>` tag.
+ **SMART**           - Use smart punctuation.
                        The smart option converts ASCII characters to typographic characters.
                        Three dots `...` (period) are converted to ellipses (...).
                        Text in 'single' and "double" quotation marks have a starting and ending tag.
                        Depending on the number of dashes, different characters are used.
                        Single dash -, double dash --, triple dash ---, quad dash ----.
+ **STRIKETHROUGH_DOUBLE_TILDE** - Strikethrough only with two tildes.
                                   This means that it is `~~stricked text~~` and it's `~not stricked text~`.
                                   Using a single tilde for strikethrough is deprecated and is not recommended.
                                   A single tilde should be used for subscript.
                                   Similar behavior with double tildes is in Redcarpet.
+ **UNSAFE**          - Allows inserting plain HTML.

#### Options that I don't use
Options available in the documentation.
I haven't tested them in detail.

+ **FULL_INFO_STRING**              - Include full info strings of code blocks in separate attribute
+ **HARDBREAKS**                    - Treat `\n` as hardbreaks (by adding `<br/>`).
+ **LIBERAL_HTML_TAG**              - Support liberal parsing of inline HTML tags.
+ **NOBREAKS**                      - Translate `\n` in the source to a single whitespace.
+ **SOURCEPOS**                     - Include source position in rendered HTML.
+ **TABLE_PREFER_STYLE_ATTRIBUTES** - Use style instead of align for table cells
+ **VALIDATE_UTF8**                 - Replace illegal sequences with the replacement character `U+FFFD`.

[cmark-gfm]: https://github.com/github/cmark-gfm
[commonmarker]: https://github.com/gjtorikian/commonmarker
[jekyll-commonmark]: https://github.com/jekyll/jekyll-commonmark
[kramdown]: https://github.com/gettalong/kramdown
[redcarpet]: https://github.com/vmg/redcarpet

[smart-dashes]: https://github.com/gjtorikian/commonmarker/blob/master/ext/commonmarker/inlines.c#L577
[smart-period]: https://github.com/gjtorikian/commonmarker/blob/master/ext/commonmarker/inlines.c#L603
[smart-quote-double]: https://github.com/gjtorikian/commonmarker/blob/master/ext/commonmarker/inlines.c#L543
[smart-quote-single]: https://github.com/gjtorikian/commonmarker/blob/master/ext/commonmarker/inlines.c#L540
[tagfilter]: https://github.github.com/gfm/#disallowed-raw-html-extension-
