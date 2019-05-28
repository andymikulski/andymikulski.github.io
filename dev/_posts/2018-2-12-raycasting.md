---
layout: dev-post
title: "Ray Casting"
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

If you search for [ray cast](https://www.google.com/search?q=ray+cast) you'll find the [Ray cast](https://www.imdb.com/title/tt0350258/fullcredits), which I think is pretty funny. Unfortunately, there is little to no overlap between Jamie Foxx and [actual ray casting](https://en.wikipedia.org/wiki/Ray_casting). I understand if you stop reading at this point, but here's an enticing gif to give you a gist of what ray casting can do:

<video src="https://i.imgur.com/nk4JX2i.mp4" loop controls ></video>

##### The Ray Who Cast Me

Say you're building an espionage game, and the goal is to get from point A to point B without alerting any guards. A key mechanic of the game is finding hiding places, and ensuring guards don't see you.

A naive approach would be to check a radius around each NPC and determine if the player is hidden from the NPC somehow (in a box, maybe). This approach would generally work, though after adding several new items or mechanics, maintaining how NPCs determine player visibility would become complex. Beyond that, using a simple radius-based approach eliminates the ability to work with mechanics like sneaking up behind NPCs. This is merely scratching the surface of problems with this approach. Consider:

- What if there is an obstacle between the player and the NPC? Does the NPC open fire? What if the obstacle is another NPC?
- What if you'd like to add reflective surfaces as a feature, which NPCs could use to spot the player?
- How would you efficiently identify the closest/furthest thing the NPC can see?

#### Enter Ray Casting

The approach is simple: emit a [ray](https://en.wikipedia.org/wiki/Line_(geometry)#Ray) for every angle of the NPC's field of view, and use what those rays collide with to determine what the NPC can or can't see. If a ray hits something it can't pass through, such as a wall, it stops. Is your player hiding behind a wall, or inside a box, or just around the corner? If the NPC's rays cant hit the player, the NPC can't see the player.

<img src="https://i.imgur.com/LWG1FNd.png" />
<label>Here, we see a NPC, its field of view, and four rays. The rays tell the NPC that walls exist, and how far away they are. This would be an example of a NPC with terrible vision. There are a lot of blind spots!</label>

<img src="https://i.imgur.com/NnMKjnT.png" />
<label>With more rays comes more information about the environment, which is great. As rays travel, they spread apart at farther distances, creating large blind spots with distance. The NPC can handle most things immediately around it, but has trouble accurately spotting things further away.</label>


<img src="https://i.imgur.com/skGJ31r.png" />
<label>As we 'fill' the field of view with rays, the collision data gains higher resolution, even for further distances. The NPC now has much better understanding of the area and much more accurate vision.</label>

Now players can sneak behind NPCs with lifelike stealth! With ray casting, NPCs become quite flexible. Perhaps you'd like an enemy with intentional blind spots, or maybe you'd like to change an NPC's field of view during the game. We also can tap into the distance a ray has travelled.

Let's say NPCs can see about 10 meters ahead of them before their vision starts failing, and completely falls off after 15m. Your player crosses a NPC's path about 12m away. With ray casting, your NPC can notice something at the edge of its field of view, use the distance to adjust its perception ("it's probably nothing" vs "hey that looked like..!"), and respond accordingly.

#### But wait, there's more!

The examples so far have been framed around vision and sight, but ray casting is useful far beyond determining visibility. Take projectiles, for instance. A bullet relates quite closely to a ray we would cast. Both travel in a straight line from an origin, both stop after hitting obstacles (maybe bouncing a little), and so on. The biggest difference is that bullets take some time to travel through space, where our casted rays move through space instantaneously.

> You could use instant rays for high-velocity weapons like rail guns or sniper rifles, whose projectiles require seemingly no time to travel through the air.

The benefit of using rays in this context is, again, the ability to tap into the distance the ray has travelled. A low-hanging idea is to use the distance travelled to reduce how much damage the bullet does.




<!-- Is your user in a box? NPCs would see it as exactly that: a box. This sounds basic, but imagine this: a NPC enters a room with 3-4 boxes, one of which your player is inside. The NPC, unaware of any box hijinks, simply sees the boxes and moves on to the next room. Riveting, I know. Stay with me.

Later, your player ambushes a NPC or two after hiding in some boxes, and the NPCs have now learned to not trust boxes. Now, when NPCs see a box, they could react appropriately. Maybe they check and open each box, or maybe they simply open fire on it. Suddenly, NPCs react dynamically to their environment, even if they have not seen a player nearby recently.

The end result is more realistic enemies and more dynamic gameplay, simply by changing how your NPCs perceive their environment. Not to mention the performance gains of seeing what's immediately in the NPC's area, versus maintaining lists of boxes, obstructions, interactables, and determining what the NPC is near and can interact with.
-->
<!--
> #### B-b-but you could still do that with the radius approach from above!
> Yep, you absolutely could make the above feature work using the simple `use-the-radius-around-the-NPC` approach. But, what happens if there is something between a box and a NPC? Does the NPC shoot the box anyway? Do you attempt to determine if anything is in the way? Ray casting offers a performant and intuitive way of handling these line of sight issues, on top of its other affordances. -->

---

## Visualizing Ray Casts

A common use case for ray casting is to simulate shadows. Makes sense, light acts in a similar way - a ray of light will travel until it hits something, emitting light onto the surfaces around it, sometimes bouncing around a little.

>Note this is a very simplistic light model, but it's close enough for our needs. For a deep dive into physical rendering, I suggest checking out [Computer&nbsp;Graphics:&nbsp;Principles&nbsp;and&nbsp;Practice](https://smile.amazon.com/Computer-Graphics-Principles-Practice-3rd/dp/0321399528).

Allowing our rays to affect their environment is relatively straight-forward: for each 'step' the ray takes while moving, tell the engine to draw a white pixel (or a white tile, in this case of this demonstration). The white pixel has its opacity based on the ray's current distance from the emitter, giving the visual effect of light diminishing as it travels further away:

<img src="https://i.imgur.com/q11eWPP.png" />
<label>As light travels further from the green dot, it appropriately lights up the underlying tile.</label>

#### Messing with Physics

The use of this ray-based lighting approach in a tiled environment has an interesting ramification. Simply put, there are more rays than available tiles, so several rays travel over the same tile. As a result, we can control how many rays can affect a tile's lighting, which ends up with some interesting results. Examine this screenshot where tiles are only allowed to be lit with one ray of light each:

<img src="https://i.imgur.com/TEdjJwP.png" />
<label>Tiles lit via the first ray they come into contact with.</label>

While we are given a pretty accurate representation of the player's line of sight, notice that there are some areas where shadows are jagged in such a way that doesn't look realistic. Allowing multiple rays to light multiple tiles presents us with the following:

<img src="https://i.imgur.com/PVS4Xs8.png" />
<label>Tiles lit via every ray they come into contact with.</label>

With multiple rays of light intersecting, we are presented with much more accurate shadows. Greater realism is achieved through the layering of light, and even the illusion of antialiasing gives a sense of gradation between light and dark. The ability to model physics in a simplified environment affords a lot of neat features and possibilities. One could implement light reflection based on collision angles, or diffraction based on the material of obstacle the ray hits, etc.

---

# [Demo]({{ page.demo }})

This demonstrates a few of the concepts listed above: ray casting, ray layering, identifying (and remembering) obstacles within the player's field of view. Play around with the settings in the control panel to get a sense of how the rays interact.

<iframe src="{{ page.demo }}"></iframe>
<label>WASD or Arrow Keys to move, mouse to aim. Fiddle with the settings in the top right to see how the light changes!</label>
