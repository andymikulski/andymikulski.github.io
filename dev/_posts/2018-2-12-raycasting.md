---
layout: dev-post
title: "Weekend Project: Ray Casting"
permalink: /dev/raycasting
blog: dev
description: "Determining line of sight and messing with light beams in the process."
tech:
  - algorithms
  - javascript
thumbnail: https://i.imgur.com/14AuKyZl.png
demo: /assets/raycasting
# github: https://github.com/andymikulski/marching-squares
---

This weekend's project was learning how to ray cast in 2D space, and effectively using the depth data to some capacity.

## What is ray casting?

If you search for [ray cast](https://www.google.com/search?q=ray+cast) you'll find the [Ray cast](http://www.imdb.com/title/tt0350258/fullcredits), which I think is pretty funny. Unfortunately, there is little to no overlap between Jamie Foxx and [actual ray casting](https://en.wikipedia.org/wiki/Ray_casting). I understand if you stop reading at this point, but here's an enticing gif to give you a gist of what ray casting can do:

<video src="https://i.imgur.com/nk4JX2i.mp4" loop controls autoPlay></video>

##### The Ray Who Cast Me

Say you're building an espionage game, and the goal is to get from point A to point B without alerting any guards. A key mechanic of the game is finding hiding places, and ensuring guards don't see you.

A naïve approach would be to check a radius around each guard and determine if the player is hidden via a box, camo, or a disguise. This would work for a while, though after adding several new items or mechanics, maintaining how guards determine player visibility could become complex. Beyond that, using a simple radius-based approach eliminates the ability to work with mechanics like sneaking up behind guards. Note that it's not impossible, but you quickly step into sticky territory.

#### Enter Ray Casting

The approach is simple: emit a [ray](https://en.wikipedia.org/wiki/Line_(geometry)#Ray) for every angle of the guard's field of view, and use what those rays collide with to determine what the guard can or can't see. If a ray hits something it can't pass through, such as a wall, it stops. Is your player hiding behind a wall, or inside a box, or just around the corner? If the guard's rays cant hit the player, the guard can't see the player.

<img src="https://i.imgur.com/kF0luuS.png" />
<label>Here, four rays are emitted from the guard's perspective. The guard knows where a handful of obstacles are, but there is not a ton of information for the guard to process.</label>

<img src="https://i.imgur.com/RB8MQ8i.png" />
<img src="https://i.imgur.com/FZaxamm.png" />
<label>As the number of rays increases, the collision data gains higher resolution. The guard now has much better understanding of the area and much more accurate vision.</label>



Now players can stalk guards or sneak past them with lifelike stealth! With ray casting, guards become quite flexible. Without the need to maintain lists of possible obstructions or special cases if the guard encounters a player in a certain state, adding behiavors to guards becomes much more dynamic. The ability to tap into the distance the ray has travelled is invaluable.

Let's say guards can see about 10 meters ahead of them before their vision starts failing them. Your player crosses a guard's path about 12m away. With ray casting, your guard can notice something at the edge of its field of view and investigate accordingly. Another example, perhaps a guard sees the player and fires a ray-casted bullet. The bullet could do less damage based on how far it's travelled, which is trivial until we want the bullets to ricochet or change direction. There are an endless number of uses for information that ray casting provides.

<!-- Is your user in a box? Guards would see it as exactly that: a box. This sounds basic, but imagine this: a guard enters a room with 3-4 boxes, one of which your player is inside. The guard, unaware of any box hijinks, simply sees the boxes and moves on to the next room. Riveting, I know. Stay with me.

Later, your player ambushes a guard or two after hiding in some boxes, and the guards have now learned to not trust boxes. Now, when guards see a box, they could react appropriately. Maybe they check and open each box, or maybe they simply open fire on it. Suddenly, guards react dynamically to their environment, even if they have not seen a player nearby recently. 

The end result is more realistic enemies and more dynamic gameplay, simply by changing how your guards perceive their environment. Not to mention the performance gains of seeing what's immediately in the guard's area, versus maintaining lists of boxes, obstructions, interactables, and determining what the guard is near and can interact with.
-->

> #### B-b-but you could still do that with the radius approach from above!
> Yep, you absolutely could make the above feature work using the simple `use-the-radius-around-the-guard` approach. But, what happens if there is something between a box and a guard? Does the guard shoot the box anyway? Do you attempt to determine if anything is in the way? Ray casting offers a performant and intuitive way of handling these line of sight issues, on top of its other affordances.

---

## Visualizing Ray Casts

A common use case for ray casting is to simulate shadows. Makes sense, light acts in a similar way - a ray of light will travel until it hits something, emitting light onto the surfaces around it, sometimes bouncing around a little. _Note this is a very simplistic model of light, but it's close enough for our needs. For a deep dive into physical rendering, I suggest checking out [Computer Graphics: Principles and Practice](https://smile.amazon.com/Computer-Graphics-Principles-Practice-3rd/dp/0321399528)_

In our demonstration, we'll use a grid-based renderer, which simplifies things even further. Allowing our rays to affect their environment is relatively straight-forward: for each 'step' the ray takes while moving, tell the engine to draw a white square with opacity based on the ray's current distance from the emitter. This gives us the visual effect of light diminishing as it travels further away, achieving a lightbulb or flashlight effect:

<img src="https://i.imgur.com/q11eWPP.png" />
<label>As light travels further from the green dot, it appropriately lights up the underlying tile.</label>

#### Messing with Physics

An interesting piece of using this ray-based lighting approach in a tiled environment means that multiple rays can affect the same tile, and we can control how many rays can combine on one tile. Examine this screenshot where tiles are only allowed to be lit with one ray of light each:

<img src="https://i.imgur.com/TEdjJwP.png" />
<label>Tiles lit via the first ray they come into contact with.</label>

While we are given a pretty accurate representation of the player's line of sight, notice that there are some areas where shadows are jagged in such a way that doesn't look realistic. Allowing multiple rays to light multiple tiles presents us with the following:

<img src="https://i.imgur.com/PVS4Xs8.png" />
<label>Tiles lit via every ray they come into contact with.</label>

With multiple rays of light intersecting, we are presented with much more accurate shadows. Greater realism is achieved through the layering of light and shadow, and even the illusion of antialiasing gives a sense of gradation between light and dark. The ability to model physics in a simplified environment affords a lot of neat features and possibilities. One could implement light reflection based on collision angles, or diffraction based on the material of obstacle the ray hits, etc.

---

# Demo

<iframe src="/assets/raycasting"></iframe>
<label>WASD or Arrow Keys to move, mouse to aim</label>