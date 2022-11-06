---
categories: security
date: 2020-09-04 14:00:00 +0200
excerpt: Secure password generator in Linux. Safe pronounceable password - dream or leak stream?
lang: en
layout: post
title: Generating password 🔑
---

## How to generate a secure password?

There are **no 100% secure passwords**.
Cracking any password is just a matter of time.
But as programmers, we can make it harder.

Daily I use Ubuntu.
The solutions provided will therefore apply to this environment.
But these solutions are available on various Linux distributions.

### Little improvisation

This way is to use Linux commands and a dictionary file.
The `shuf` command will randomize a few words.
And `tr` will remove the enters and this way we get a long password.
Long doesn't mean safe.

```console
$ shuf -n8 /usr/share/dict/words | tr -d '\n'
PentaxAlsopwigwamsunsureexplorationsupposedlyattiresignalling
```

This idea is taken from [Stack Overflow][stack-overflow].
I strongly advise against generating a password in this way.


### pwgen

Pwgen is a tool for automatic password generation.
Pwgen generates random, meaningless but pronounceable passwords.
The term pronounceable and a password of several dozen letters are in my opinion an oxymoron.
The generated passwords include only lowercase letters, or upper and lower case mixed, or digits.
For better memorization, capital letters and numbers are placed in the appropriate positions.
It gives the impression of constructed words.
The pwgen command with no parameters will generate 160 eight-characters passwords.
Usually, one password is needed.
Moreover, eight letters in a password are definitely not enough.

<details>
<summary>
Click here to see how to install pwgen.
</summary>
<p>
Installing pwgen:

```console
$ sudo apt install pwgen
```
</p>
</details>
<br>

To generate 1 password with 32 characters:

```console
$ pwgen 32 1
gugoqu0Ziu4unguori7Ehooroo4eic1o
```

Need more characters in your password?
No problem.

```console
$ pwgen 48 1
ahr6ejei4uithohloh9aib8IeY4zu4KaecuGheijo0IngooV
```

Even more password characters?
Your wish is my command.

```console
$ pwgen 64 1
eem1Aighehupuaphie5eo5Apah3baataegahxiec3quenaeMieH6eiMaj9hai0Oh
```


<details>
<summary>
Click here to see a pwgen parameter list.
</summary>
<p>

```console
$ pwgen -h
Usage: pwgen [ OPTIONS ] [ pw_length ] [ num_pw ]

Options supported by pwgen:
  -c or --capitalize
	Include at least one capital letter in the password
  -A or --no-capitalize
	Don't include capital letters in the password
  -n or --numerals
	Include at least one number in the password
  -0 or --no-numerals
	Don't include numbers in the password
  -y or --symbols
	Include at least one special symbol in the password
  -r <chars> or --remove-chars=<chars>
	Remove characters from the set of characters to generate passwords
  -s or --secure
	Generate completely random passwords
  -B or --ambiguous
	Don't include ambiguous characters in the password
  -h or --help
	Print a help message
  -H or --sha1=path/to/file[#seed]
	Use sha1 hash of given file as a (not so) random generator
  -C
	Print the generated passwords in columns
  -1
	Don't print the generated passwords in columns
  -v or --no-vowels
	Do not use any vowels so as to avoid accidental nasty words
```
</p>
</details>
<br>


Regarding security, I think it's worth reading the [Anarcat post][anarcat-about-passwords].
The author strongly advises against using pwgen.


### apg

APG means Automated Password Generator.

<details>
<summary>
Click here to see how to install apg.
</summary>
<p>
Installing apg:

```console
$ sudo apt install apg
```
</p>
</details>
<br>

`apg` uses two algorithms to generate passwords.
The first is based on an algorithm for generating pronounced passwords.
The second is an algorithm for generating passwords with random characters.
This first algorithm is outdated.
His vulnerabilities were discussed at the [National Computer Security Conference][nist-conf-1994].
This second algorithm has 35 configurable operating modes.

The apg command generates several passwords by default.

```
$ apg
^ovWiffAsdelv1 (CIRCUMFLEX-ov-Wiff-As-delv-ONE)
Opp\knis8 (Opp-BACKSLASH-knis-EIGHT)
tyob9Ok* (tyob-NINE-Ok-ASTERISK)
Igyat2orIct[ (Ig-yat-TWO-or-Ict-LEFT_BRACKET)
;ojWiuxCund4 (SEMICOLON-oj-Wi-ux-Cund-FOUR)
VuodecDis5op< (Vu-od-ec-Dis-FIVE-op-LESS_THAN)
```

To generate 1 password with 64 characters, type:

```console
$ apg -m 64 -n 1
AtnokFuvWapIllAwkugheidijviFasOrIzyictUnveyzMobavArdOkWockyiesBu
```

By adding the parameter `-a 0` you can use the first algorithm:

```console
$ apg -a 0 -m 64 -n 1
riWrovDisickuAbpoovhyijyatyicdoupIalneDrojeuvwochanVafJeucgutoob
```

And the parameter `-a 1` uses the second algorithm:

```
$ apg -a 1 -m 64 -n 1
zB;W&)dg(_1!{eZ@wBxkOO/x7<:DU5k]u3TW\aTgs.nK$rT\5"FKYBy(WKrpR-qA
```


<details>
<summary>
Click here to see a apg parameter list.
</summary>
<p>

```console
$ apg -h

apg   Automated Password Generator
        Copyright (c) Adel I. Mirzazhanov

apg   [-a algorithm] [-r file]
      [-M mode] [-E char_string] [-n num_of_pass] [-m min_pass_len]
      [-x max_pass_len] [-c cl_seed] [-d] [-s] [-h] [-y] [-q]

-M mode         new style password modes
-E char_string  exclude characters from password generation process
-r file         apply dictionary check against file
-b filter_file  apply bloom filter check against filter_file
                (filter_file should be created with apgbfm(1) utility)
-p substr_len   paranoid modifier for bloom filter check
-a algorithm    choose algorithm
                 1 - random password generation according to
                     password modes
                 0 - pronounceable password generation
-n num_of_pass  generate num_of_pass passwords
-m min_pass_len minimum password length
-x max_pass_len maximum password length
-s              ask user for a random seed for password
                generation
-c cl_seed      use cl_seed as a random seed for password
-d              do NOT use any delimiters between generated passwords
-l              spell generated password
-t              print pronunciation for generated pronounceable password
-y              print crypted passwords
-q              quiet mode (do not print warnings)
-h              print this help screen
-v              print version information
```
</p>
</details>
<br>

This solution is a bit outdated but still available in packages.


### diceware

Diceware creates memorizable passphrases from wordlists and various sources of randomness.

<details>
<summary>
Click here to see how to install diceware.
</summary>
<p>
Installing diceware:

```console
$ sudo apt install diceware
```
</p>
</details>
<br>

Running `diceware` generates a password that consists of 6 words (default).

```console
$ diceware
SlipsTrumpetSariWaxIdeaDare
```

Of course, the number of words in the password can be changed.

```console
$ diceware -n 10
SlamsZealWhoseTineLoomAnagramMossBrimBleatIsotope
```

An interesting option is the possibility of rolling real dice.
I used this option once.
As humans, I think we're too lazy.

```console
$ diceware -r realdice
Please roll 5 dice (or a single dice 5 times).
What number shows dice number 1?
...
What number shows dice number 5?
SoundLimaQuakeCaptainPrudeFrost
```

Such passwords are probably easier to remember.
Are these passwords more secure?
This is a matter for discussion.


<details>
<summary>
Click here to see a diceware parameter list.
</summary>
<p>

The diceware parameter list is as follows:

```console
$ diceware -h
usage: diceware [-h] [-n NUM] [-c | --no-caps] [-s NUM] [-d DELIMITER]
                [-r SOURCE] [-w NAME] [--dice-sides N] [-v] [--version]
                [INFILE]

Create a passphrase

positional arguments:
  INFILE                Input wordlist. `-' will read from stdin.

optional arguments:
  -h, --help            show this help message and exit
  -n NUM, --num NUM     number of words to concatenate. Default: 6
  -c, --caps            Capitalize words. This is the default.
  --no-caps             Turn off capitalization.
  -s NUM, --specials NUM
                        Insert NUM special chars into generated word.
  -d DELIMITER, --delimiter DELIMITER
                        Separate words by DELIMITER. Empty string by default.
  -r SOURCE, --randomsource SOURCE
                        Get randomness from this source. Possible values:
                        `realdice', `system'. Default: system
  -w NAME, --wordlist NAME
                        Use words from this wordlist. Possible values: `en',
                        `en_eff', `en_orig', `en_securedrop'. Wordlists are
                        stored in the folder displayed below. Default:
                        en_securedrop
  -v, --verbose         Be verbose. Use several times for increased verbosity.
  --version             output version information and exit.

Arguments related to `realdice' randomsource:
  --dice-sides N        Number of sides of dice. Default: 6

Wordlists are stored in /usr/lib/python2.7/dist-packages/diceware/wordlists
```
</p>
</details>
<br>

## Password manager

Most password managers have a password generation feature.
KeePassXC allows us to generate a password in the console.

Generate a password with 32 alphanumeric characters.

```console
$ keepassxc-cli generate --lower --upper --numeric --length 32
oQJHaq7WeuTMJpSrKb2FKvJKFkujYRgc
```

We can also generate a passphrase with 8 words.

```console
$ keepassxc-cli diceware --words 8
alphabet shape dictate blog faster comprised correct math
```

## Generating passwords in Ruby

One way is to use the SecureRandom library.

```ruby
require 'securerandom'
SecureRandom.alphanumeric(16)
```

The above Ruby code can be triggered from the command line.

Generating a 16-character password.

```console
$ ruby -e "require 'securerandom'; puts SecureRandom.alphanumeric(16)"
khcGT6LbcCHdW1xs
```

Generating a 32-character password.

```console
$ ruby -e "require 'securerandom'; puts SecureRandom.alphanumeric(32)"
XysKQb3CFaZxviWJUlPuEweLniIQt8J3
```

## Is it worth using password generators?

Yes of course.
Mainly because each of us has our own behavioral profile.
It's easier to crack a person than a strong password.


---

[anarcat-about-passwords]: https://anarc.at/blog/2017-02-18-passwords-entropy/
[diceware]: https://github.com/ulif/diceware
[nist-conf-1994]: https://csrc.nist.gov/publications/history/nissc/1994-17th-NCSC-proceedings-vol-1.pdf
[stack-overflow]: https://superuser.com/questions/237228/command-line-tool-to-generate-memorable-passwords
