---
layout: dev-post
title: Profamity
description: Command-line tool used to detect profanity in text files.
permalink: /dev/profamity/
blog: dev
project: profamity
tech:
  - Javascript
  - Node
thumbnail: https://i.imgur.com/vnHrBlQl.png
github: https://github.com/andymikulski/profamity
---

# Profanity linter

Node-based CLI tool which finds variations of profane words within a set of given files and throws errors accordingly. Useful for preventing debug statements and unprofessional comments from being committed to git!

<img style="max-width: 600px;" src="https://i.imgur.com/vnHrBlQ.png" />

---

# About

- Reports the line number and number of occurrences of detected profanity.
- Helps prevent committing those classic `console.log('wtffff');` debugging comments!
- Can detect number/letter substitution (e.g. `H3110` is parsed as `hello`)
- Several command line options are available:
<img style="max-width: 600px;" src="https://i.imgur.com/kRAJTTG.png" />

# Technical Details

- Uses an array of 'bad words', unless provided with another set.
  - This array is base64-encoded, to prevent profane language from appearing in other repos that have profamity as a dependency.
- Builds a set of regular expressions based on the given 'bad words'.
  - A set of letter/number substitutions are used to prevent leetspeak.
  - This also lets us detect repeated letters (like `thissssss`)
- For each file, loops over each line and checks if any of the regex's match.

Pretty simple!

# Name Origin

<iframe style="display: block; margin: 0 auto;" width="560" height="315" src="https://www.youtube.com/embed/hpigjnKl7nI" frameborder="0" allowfullscreen></iframe>
