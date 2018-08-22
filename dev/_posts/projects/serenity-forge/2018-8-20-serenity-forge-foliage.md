---
layout: dev-post
title: "TPS: Foliage"
permalink: /dev/serenity-forge/foliage/
blog: dev
project: serenity-forge
projectName: Serenity Forge
isPasswordProtected: true
inDev: false
tech:
  - Unity
  - C#
thumbnail: https://i.imgur.com/3eSgyTKl.jpg
# demo: /assets/peg/
# github: https://github.com/andymikulski/work-work
---

# Foliage

A foliage manager is responsible for determining placement of trees/blades of grass on various sections of terrain. By 'default,' grass and trees are spawned sporadically throughout the world, though invalid plots also plant thick forests of trees, as seen here:

# -- insert screenshot of trees + grass distribution --

#### Foliage Distribution

The FoliageManager uses a [Poisson-Disc](https://www.jasondavies.com/poisson-disc/) algorithm to generate a list of points inside a given rect which are mostly uniform. Here's this example from wikipedia:

![Poisson-Disc example output](https://i.imgur.com/B4fyuyu.jpg)


At the beginning of the game, a set of several poisson-disc results are calculated, and when planting trees or grass across the world the algorithm results are already stored. The Poisson values can be reused across chunks/sections, as they merely provide a 2D distribution and do not interact with terrain height or anything of that nature. By caching a handful of different sets of results, we eliminate the chance that a user will recognize the same pattern being repeated for placed grass/trees.


##### Trees

There are a few tree types, and they are distributed across the world in such a way that similar trees are mostly grouped together, but also slightly mix together. The below image shows three types of trees and how those types are clumped together, but still mix with other types. This is achieved through sampling a Perlin noise value and checking if it falls within certain arbitrary ranges.

![Tree distribution pattern](https://i.imgur.com/C8qiceM.jpg)

After getting the Poisson arrangement determined, some prefabs are spawned in world space and then placed on the world (assuming the given point of land not too steep, and not under water or on a mountain).

##### Grass

Grass placement operates similar to tree placement, though requires a bit of mesh combining in order to achieve stable framerates. Each chunk's grass blades are combined into a single mesh after being placed, which allows us to display many thousand blades of grass without a noticable drop in FPS.

<video src="https://i.imgur.com/ZNjLrRY.mp4" loop controls ></video>
<label>Way more grass than we need. This was an earlier test to see how many blades we could render before hitting performance issues. On PC, it clocked in around 300k+ individual blades. On Switch, it was... far fewer.</label>

![Shadowed grass](https://i.imgur.com/3eSgyTK.jpg)
<label>Grass with altered mesh sizes and shadows! Looks neat, but costs a lot of frames on the Switch. You can also notice some anamolies in the grass which were later corrected.</label>

Perlin noise drives a majority of the 'real-world' grass placement, as well as general scaling of grass (blades near the edge of a patch of grass will be shorter than in the center). For the most part, each section maybe has about ~10k blades of grass at any given time, so filtering via noise values has been great for performance.


##### "Manual" Placement

In some instances (such as [invalid plots](/dev/serenity-forge/paths-n-plots/#plot-validation)), the Foliage Manager may be called upon to Poisson-Disc an area of land before planting some trees. This is a matter of handing over a `Polygon` to the Foliage Manager, at which point it handles the rest. Below is an example of 'manually' planted trees in plots that were too small for building:

!["Manually" planted trees for an invalid plot](https://i.imgur.com/W9wmpMX.jpg)
<label>Example screenshot showing some trees which were grouped and planted together over some invalid plots. Check out the devblog on the [plots](/dev/serenity-forge/paths-n-plots/#plot-validation) for more information.</label>