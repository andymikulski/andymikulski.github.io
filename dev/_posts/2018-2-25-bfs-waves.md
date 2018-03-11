---
layout: dev-post
title: "Breadth-first Waves"
permalink: /dev/waves
blog: dev
description: "Using the breadth-first search algorithm to imitate travelling sound waves."
tech:
  - algorithms
  - javascript
thumbnail: https://i.imgur.com/Aqb6Ul2.png
demo: /assets/waves
# github: https://github.com/andymikulski/marching-squares
---

<video src="https://i.imgur.com/TsYJOpZ.mp4" class="fast" loop controls autoPlay></video>
<label>A simple demonstration. When the player does something to make a sound, that 'sound' travels through space similar to physical sound waves.</label>

### A Brief Search Review

Two particularly simple algorithms used to search a 2D space include the [depth-first search](https://en.wikipedia.org/wiki/Depth-first_search) and [breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search).

The **depth-first search** starts at a point and begins traversing the graph. The algorithm tracks one path, advancing it until the target is reached or there are no movement options available. If there are no movement options, the search backs up the path until there is a neighboring node for the path to traverse. Eventually, it will traverse the entire graph, finding the destination in the process. The path, however, is quite long and windy:

<video src="https://i.imgur.com/2hw5PCk.mp4" loop controls autoPlay></video>
<label>Depth-first search. The direction the path prefers when travelling is implementation-dependent.</label>

The **breadth-first search** also starts at a point and begins traversing the graph. However, unlike DFS, this algorithm tracks multiple paths, incrementally advancing each until a path reaches the destination. This will return the shortest path between two points, which is great! It will also spend a lot of time looking in the wrong places, which is suboptimal for a search algorithm.

<video src="https://i.imgur.com/BClRjMN.mp4" loop controls autoPlay></video>
<label>Breadth-first search. Note how the plane is 'flooded' as the algorithm searches for its target.</label>

Neither of these algorithms are super great for searching the graph, since they're inefficient, and DFS doesn't even guarantee a short path. However, the BFS algorithm traverses the graph in a way that _looks_ how a physical wave would move.

>_If you want to keep going down the search algorithm rabbit hole, I suggest checking out the [Red Blob Games A* introduction](https://www.redblobgames.com/pathfinding/a-star/introduction.html)_.

---

### Breadth-first Waves

A neat affordance of the BFS algorithm is it mimics how physical [waves](https://en.wikipedia.org/wiki/Wave) would travel. When a physical wave passes through a slit, for instance, the wave 'fans out' and spreads in an arc on the other side of the slit. This is a hugely simplified model for our purposes, but the apparent effects are _generally_ the same.

<img src="https://i.imgur.com/6YH8jFn.gif" height="300" />
<label>Wave diffraction and the BFS algorithm both behave similarly when passing through slits by 'fanning out' the wave on the other side. <a href="https://en.wikipedia.org/wiki/Diffraction_formalism" target="_blank">Image via Wikipedia</a>.</label>

<img src="https://imgur.com/AX81PTW.gif" />
<label>BFS 'waves' diffract in a similar manner when passing through a slit.</label>

I know it's hard to tell, but those are actually two different gifs! They look so similar, it's hard to distinguish the two.

### Sound waves

Applying BFS to sound waves gives us a neat mechanic to play with. As players cause a ruckus, the sounds of their actions can travel semi-realistically and alert NPCs in the area. This adds a nice touch of realism to the AI; if a sound wave hits an NPC, the NPC can react based on the strength and/or direction of that wave. They could investigate what they heard, recognize the sound as gunfire and alert others, etc.

<video src="https://i.imgur.com/XUjzv7z.mp4" loop controls autoPlay></video>
<label>As a player walks, their steps create noise in a small radius. When a button is pressed, a larger 'explosion' happens and the sound wave travels further.</label>

### Sound materials

Taking our simplified wave model further, we can apply the idea of acoustic absorption. Essentially, as waves hit or pass through certain materials, we can alter their 'physical properties' accordingly. For instance, say you'd like glass to slightly 'muffle' the sound:

<video class="slow" src="https://i.imgur.com/7cwX3Mn.mp4" loop controls autoPlay></video>

Here, the 'glass' block simply diminishes the wave strength by an arbitrary amount as it passes through. The result is the sound wave ultimately does not travel very far, though it _does_ still pass through - NPCs near the window would still hear something. This is a simple example, but there's a huge amount of flexibility in these 'sound materials.' Properties such as reflection, amplification, and diffraction are trivial to implement.

---

### Waving Goodbye

We examined how the breadth-first search algorithm mimics travel patterns of physical waves. We looked at applying waves as a game mechanic, and potential features and extensions to that mechanic. Sound waves are an easy application, but this mechanic could be applied in a number of ways. Hopefully this gives you a few thoughts and ideas to play with on your own!

---

# [Demo]({{ page.demo }})

<iframe src="{{ page.demo }}"></iframe>
<label>WASD keys to move, Space to create sound wave.</label>
