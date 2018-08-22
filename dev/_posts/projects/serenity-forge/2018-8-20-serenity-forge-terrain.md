---
layout: dev-post
title: "UTPS: Terrain Generation"
permalink: /dev/serenity-forge/terrain/
blog: dev
project: serenity-forge
projectName: Serenity Forge
isPasswordProtected: true
inDev: false
tech:
  - Unity
  - C#
thumbnail: https://i.imgur.com/v9cVqxDl.jpg
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

A large majority of the terrain generation is driven through [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise), followed up by some [flow fields](https://en.wikipedia.org/wiki/Vector_field) for path finding and agent traversal. A `GameSeed` class allows us to recreate a game's environment, paths, etc by altering the internal random number generator's seed value when the game first starts.

# Terrain Mesh Generation

The `WorldController` class handles rendering chunks of the world using [Marching Cubes](https://en.wikipedia.org/wiki/Marching_cubes) based on the perlin noise values produced from `WonderPark.WorldBuilding.Utils.GenerateHeight`. Essentially, the generated noise serves as a heightmap across the world. The marching cubes algorithm is performed for each chunk, checking against the height/noise values provided by our perlin-based height functions, and generating a mesh accordingly.

>Note: Most code almost entirely regards the world as a flat 2D space seen from above. That is, a world space position of Vector3(5, 20, 34) would translate to Vector2(5, 34) in a majority of terrain-gen code. This allows a majority of the world-generating calculations to be handled with simpler 2D math, however limits terrain to not include caves or overhanging ledges.

##### Water, Ponds, and Lakes


![Non-smoothed terrain example](https://i.imgur.com/v9cVqxD.jpg)
<label>The above image shows a non-smooth terrain mesh featuring generated lakes, various types of mountains, and stone pillars.</label>

The water is a very simple trick - a plane is fixed to move with the camera but remains at a constant "sea level." This value is later referenced in code to quickly determine if a location is underwater or not. The plane's shader is responsible for handling the stylized water reflection and general look, so it's essentially set-and-forget.

##### Mountains

Mountains are generated simply through manipulating some Perlin noise, depending on whether it's a "pointy" mountain or a "wide" mountain. For pointy mountains, a threshold is applied so noise values below a certain threshold are ignored, and then any remaining noise values are scaled to create tall mountains.

![Pointy mountains](https://i.imgur.com/kUwYC0v.jpg)
<label>Pointy mountains filter most noise values, and then maps remaining values to real-world heights, creating very steep mountains/pillars</label>

![Wide mountains](https://i.imgur.com/zQb4lpb.jpg)
<label>Wide mountains take a similar approach, however have different 'valid' threshold and scaling values applied, thus taking on a 'larger' and more wide-spread landmass.</label>

In code, the final height for any given terrain is the combination of the above mountain functions, plus the base terrain formula. This allows us to take the "2D world" approach mentioned earlier, as we can easily generate the height for any point in the world through a function call.


#### Terrain Smoothing

![Smoothing example](https://i.imgur.com/BQOJTY2.jpg)

After the chunk has been marched, a pass is done across all of its vertices, setting the `y` position value according to the `GenerateHeight` result for that world point. What this does is essentially smooth out the topography of the terrain mesh while utilizing the verts created by marching cubes. (This would not be possible if our terrain was not driven by Perlin values.)

![Duplicate vs shared vertices](https://i.imgur.com/mEtPUgz.jpg)
<label>Marching cubes creates a mesh with duplicate vertices, and the mesh must be "welded" (or converted to share verticies) in order for smoothing to look good. Welding the mesh also allows for normal sharing, which gives a "smoother" look to the landscape's lighting and shader effects. Shown here is the 'default' output compared to after sharing vertices.</label>



