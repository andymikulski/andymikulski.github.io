---
layout: dev-post
title: "UTPS: Foliage"
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


>[Serenity Forge](https://serenityforge.com/) is a small indie studio based out of Boulder, CO, specializing in visually stunning game aesthetics (such as [The King's Bird](https://store.steampowered.com/app/812550/The_Kings_Bird/)).


<!-- # About

In an unannounced park sim, the player would be given procedurally-generated sections of land, complete with walkable paths and predefined areas for building rollercoaster rides. I was responsible for creating the procedural systems for the game, such as:

- Terrain mesh creation
- World pathway planning
- Buildable area "discovery"
- Foliage placement + planting
- World-traversing AI agents

A large majority of the terrain generation is driven through [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise), followed up by some [flow fields](https://en.wikipedia.org/wiki/Vector_field) for path finding and agent traversal. A `GameSeed` class allows us to recreate a game's environment, paths, etc by altering the internal random number generator's seed value when the game first starts. -->

---

# Foliage

A foliage manager class is responsible for not only determining where to place the bits of grass and trees, but also for actually creating and placing the meshes along the world surface.

#### Foliage Distribution

The FoliageManager uses a [Poisson-Disc](https://www.jasondavies.com/poisson-disc/) algorithm to generate a list of points inside a given rect which are mostly uniform. See this example from wikipedia:

![Poisson-Disc example output](https://i.imgur.com/B4fyuyu.jpg)

When using the `PlantTrees` or `PlantGrass` methods, a set of several poisson-disc results are calculated and stored. This means that the poisson algorithm only has to run a handful of times at the start of the game. The Poisson values can be reused across chunks/sections, as they merely provide a 2D distribution and do not interact with terrain height or anything of that nature.


##### Trees

There are a few tree types, and they are distributed across the world in such a way that similar trees are mostly grouped together, but also slightly mix together. The below image shows three types of trees and how those types are clumped together, but still mix with other types. This is achieved through sampling a Perlin noise value and checking if it falls within certain arbitrary ranges.

![Tree distribution pattern](https://i.imgur.com/C8qiceM.jpg)

After getting the Poisson arrangement determined, some prefabs are spawned in world space and then placed on the world (assuming the given point of land not too steep, and not under water or on a mountain).

##### Grass

Grass placement operates similar to tree placement. However, where trees only save one Poisson value set, grass saves _five_ value sets to choose from. This prevents the (unlikely) event of a player recognizing the same distribution pattern across chunks/sections.

<video src="https://i.imgur.com/ZNjLrRY.mp4" loop controls ></video>
<label>Way more grass than we need. This was an earlier test to see how many blades we could render before hitting performance issues. On PC, it clocked in around 300k+ individual blades. On Switch, it was... far fewer.</label>

![Shadowed grass](https://i.imgur.com/3eSgyTK.jpg)
