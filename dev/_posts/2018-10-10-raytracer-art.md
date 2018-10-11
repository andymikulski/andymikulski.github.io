---
layout: dev-post
title: "Ray Tracer Art"
permalink: /dev/ray-tracer-art
blog: dev
description: "Short examination of an inaccurate ray tracer as a source of generative art."
thumbnail: https://i.imgur.com/jUeqh4Uh.png
---

One of my favorite things about game programming is the accidental and emergent behavior that shows up as you're working a problem. With mechanics, this usually amounts to an unexpected bug and a funny post on Twitter. When working on visual code such as shaders, though, you stumble into a new territory: accidental generative art.

The term "generative art" typically reminds me of [Processing](https://processing.org/), a language and set of software used to programmatically create visual designs using primitive shapes, textures, etc. In this article, though, I'll be briefly examining a broken/inaccurate ray tracer as the source of our art - no `for` loops with repeating geometric shapes here.

In this post, I'll examine a handful of renderings I produced while working on a ray tracer of my own. I plan to post a technical overview of my renderer (with demo) in the near future. For now, let's take a quick look at how ray tracing actually works, and how it ties into our "art."

---

## About Ray Tracing

<img src="https://imgur.com/bAsZMqe.png" />
<label>A simple ray traced image demonstrating a two light sources and reflective materials. Ray traced images typically reflect a high degree of realism, at the cost of a long rendering time.</label>

Ray tracing - not to be confused with [casting](/dev/raycasting) - is a method for rendering 3D scenes with realistic lighting and shadows. Essentially, it is a simplified model of how light travels through space, and how our eyes see those rays.

Consider a ray of light travelling from the sun: the sun emits the ray, it travels through space to Earth, maybe it hits a few surfaces before eventually landing in your eyeball. That is essentially how we see - light bounces around and eventually lands in our eye. Ray tracing is a model of the same idea, but in reverse: instead of rays emitting from the sun, they emit from our eyes (or, our cameras, in this case).

<img src="https://i.imgur.com/yXEmWkL.jpg" />
<label>As the 'camera' sends out rays, an image is constructed based on what the rays hit, and the color of the material(s) hit by the ray. Image via [Wikipedia](https://en.wikipedia.org/wiki/Ray_tracing_(graphics)).</label>

As rays are emitted and collect light, a rasterized image is created, producing a somewhat realistic-looking render. As more rays are pushed out into the scene, more color data is collected about the scene, with the rendered image appearing even more realistic. As mentioned earlier, though, with more rays comes more processing time, so a fine balance must be struck.

 >If you're interested in ray tracing or writing your own ray tracer (which I highly recommend), you should dig into Peter Shirley's [Ray Tracing in One Weekend](https://archive.fo/dQe61) book which goes into deeper explanations with accompanying code.


## Render Quality and Artifacts

One interesting aspect of ray tracers is the ability to essentially enhance or degrade the quality of the render at will. By simply firing off a different amount of rays, the rendering can either gain a high fidelity appearance, or become grainy and full of noise.

<img src="https://imgur.com/uBf9V4p.png" />
<label>Though higher quality renders typically take much longer to render, the end result is a (generally) realistic rendering of the scene.</label>

<img src="https://imgur.com/kY9ExJk.png" />
<label>Low quality renders feature a bit more noise, as there is less data to 'smooth' the colors determined by the rays.</label>

Generally, the reason to degrade a rendering's quality is to simply increase the rendering speed. In this case, however, we can use the noise to emulate textures or even [stippling](https://en.wikipedia.org/wiki/Stippling). This stippled appearance with 'harsh pixels' actually adds an interesting layer of observation for the viewer. While an overall gradation of color can be seen across a surface, the 'stand out' pixels allows the viewer to determine the discrete colors that make up the whole.

<img src="https://imgur.com/0Sg2FDe.png" />
<label>Using degraded shadow rays produces this almost chalk-like effect. In retrospect, I wish I used a different color scheme, though you still can see a bit of the color reflections in some areas.</label>

## Broken Ray Tracing

At its heart, ray tracing is a simple model of how our vision works. It's interesting to consider, then, that bugs within a ray tracer act as almost windows into worlds where physics simply behaves differently than as we expect it to. The play of light and shadow is altered, which makes for visually interesting designs (if you're not looking for realism, at least).

<img src="https://imgur.com/VoxB4fl.png" />
<label>Here, light picks up too much color of reflected surfaces, which leads to interesting pops of color. This image also highlights how one could debug a ray tracer through lower-quality images; defects become quite apparent at lower 'densities'.</label>


Examining the role of reflections when determining 'bounce color' is also particularly interesting to note. In the image below, reflected colors are almost slightly hue-shifted based on the material of the reflector. Also note how shadows do not behave as expected - primarily, shadows gather at the base of the green ball/light on the right of the image. This is an example of how an inaccurate physics model can produce something in the uncanny valley of our expectations.

<img src="https://imgur.com/3zWm7cfh.png" />
<label><a href="https://imgur.com/3zWm7cf.png" target="_blank">View full size.</a></label>


One interesting thought is that due to the fact these were created as the engine was worked on, it'd be extremely difficult for me to actually _intentionally_ code renders of any of these given styles. As unique stills of the life cycle of a project, they probably don't matter much to others, but are the sort of thing that I will look back on in the future and really appreciate.

<img src="https://imgur.com/CkZEhpu.png" />


## Conclusion

This was just a brief look at some stills from my time working on a ray tracer for fun. Examining the stills to an artistic degree provokes thought into how light and color works all around us, while putting a new spin on the old adage of "it's not a bug, it's a feature!" In the near future, I plan to make another post regarding the deeper technical details of the engine (web workers!), so stay tuned for that.