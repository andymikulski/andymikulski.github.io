---
layout: dev-post
title: "Dynamic Splitscreen"
permalink: /splitscreen
blog: dev
description: "Using Voronoi-like partitions to create a shape-shifting splitscreen mechanic."
tech:
  - algorithms
  - javascript
thumbnail: https://i.imgur.com/q0Pevav.png
demo: /assets/splitscreen
---


<video preload="none" poster="https://i.imgur.com/hNGE4hVh.png" src="https://i.imgur.com/hNGE4hV.mp4" loop controls></video>

For the past several weekends, I've been working to recreate the "dynamic splitscreen" (or "voronoi splitscreen") effect demonstrated by [Squirrel Eiserloh](https://www.eiserloh.net/bio/)'s 2016 GDC talk [Juicing Your Cameras With Math](https://www.youtube.com/watch?v=tu-Qe66AvtY).

<!-- <iframe style="min-width: 0; min-height: 0; width: 560px; height:315px;" width="560" height="315" src="https://www.youtube.com/embed/tu-Qe66AvtY?rel=0" frameborder="0" allow="none; encrypted-media" allowfullscreen></iframe>
<label>Math for Game Programmers: Juicing Your Cameras With Math, GDC 2016 talk by Squirrel&nbsp;Eiserloh</label> -->

Ultimately, the approach I landed on didn't use the Voronoi algorithm, but the effect is dang close. As I build all of my weekend projects from scratch, I decided to settle on supporting only two players, since I already had to work on building cameras, stencil buffers, etc. I will write a blog post about my experience building those cameras from scratch at some point in the near future.

<video preload="none" poster="https://i.imgur.com/2foyNJth.png" src="https://i.imgur.com/2foyNJt.mp4" loop controls></video>
<label>Part of the 'initial development' for this project was to program 2D orthographic cameras, then rendering them to arbitrary polygons on the screen. These cameras are all tracking the same object as it moves through space - notice the minimap in the corner (albeit with incorrect offsets).</label>

---

### How it works

The high-level gist of the approach is to find the formula for the perpendicular line between two players, and then use that formula to determine how to split the screen. From there, some calculations are done to offset the camera's focal point, and bada bing we're set.

<img src="https://i.imgur.com/FHq6Zsl.png" />
<label>Shown here in green is the perpendicular line between both players, which is used to determine where the screen edges should be split.</label>

Using the perpendicular formula to determine the screen splits, we have in hand the clipping polygons for each camera. Upon getting a new clipping polygon, the camera will then calculate the [centroid](https://en.wikipedia.org/wiki/Centroid) of the polygon, which essentially becomes the camera's focal point.

<video preload="none" poster="https://i.imgur.com/UWWY3PBh.png" src="https://i.imgur.com/UWWY3PB.mp4" loop controls></video>
<label>Two cameras are shown here looping through a set of clipping polygons. The green squares represent the polygon centroids, and therefor also represent the camera's focal point. Here, the cameras track the same object moving through space.</label>

At this point, we have cameras that can split and focus on players, which is great. However, since each player is at the center of their respective cameras, there is a disconnect and slightly jarring jank as the players merge together.

<video preload="none" poster="https://i.imgur.com/1cLib3Hh.png" src="https://i.imgur.com/1cLib3H.mp4" loop controls></video>
<label>Everything looks like it's working, but there is a slight jank when the two cameras merge back into one. That's no good.</label>

<img src="https://imgur.com/q0Pevav.png" />
<label>In a perfect world, the two red dashed lines would be straight across the cut when the players are close together.</label>

The key to solving the disorienting screen jank is to simply adjust the camera's focal point pffset as the players move closer/farther apart. As players move closer to one another, the cameras will position themselves to reflect the position of their player as they would appear on the shared camera.

<video preload="none" poster="https://i.imgur.com/zFV8XlKh.png" src="https://i.imgur.com/zFV8XlK.mp4" loop controls></video>
<label>As players move farther apart, the cameras will center on top of their player, otherwise they will adjust to create a seamless merge. (Note there is still some slight jank in this gif - turned out I needed to stop lerping the camera positions.)</label>

---

# [Demo]({{ page.demo }})

<iframe src="{{ page.demo }}"></iframe>
<label>WASD keys to move.</label>
