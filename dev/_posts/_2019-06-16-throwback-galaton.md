---
layout: dev-post
title: "THROWBACK: Galaton"
permalink: /galaton
blog: dev
description: "examining an old thannggggg"
thumbnail: https://i.imgur.com/m3mZ1Lz.jpg
---

One of my favorite things about game programming is the accidental and emergent behavior that shows up as you're working a problem. With mechanics, this usually amounts to an unexpected bug and a funny post on Twitter. When working on visual code such as shaders, though, you stumble into a new territory: accidental generative art.

<video src="{{ site.baseurl }}/assets/videos/galaton-demo-240p.mp4" style="height: 420px" muted controls poster="https://i.imgur.com/m3mZ1Lz.jpg"></video>
<label>Gameplay demo. Video has been muted because it includes music (<a href="https://www.youtube.com/watch?v=kDWXD7TTU7s" target="_blank">Airbase by Anamanaguchi</a>).</label>

The term "generative art" typically reminds me of [Processing](https://processing.org/), a language and set of software used to programmatically create visual designs using primitive shapes, textures, etc. In this article, though, I'll be briefly examining a broken/inaccurate ray tracer as the source of our art - no `for` loops with repeating geometric shapes here.

In this post, I'll examine a handful of renderings I produced while working on a ray tracer of my own. I plan to post a technical overview of my renderer (with demo) in the near future. For now, let's take a quick look at how ray tracing actually works, and how it ties into our "art."
