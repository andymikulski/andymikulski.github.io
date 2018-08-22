---
layout: dev-post
title: "UTPS: Paths and Plots"
permalink: /dev/serenity-forge/paths-n-plots/
blog: dev
project: serenity-forge
projectName: Serenity Forge
isPasswordProtected: true
inDev: false
tech:
  - Unity
  - C#
thumbnail: https://i.imgur.com/cBnJohul.jpg
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

---

# World pathway planning

After generating the base terrain, paths must be placed through the world leading park guests from one section of the park to another. This

There are a couple elements involved in how paths are determined through the world:

> A **portal** is a doorway/connection to another _section_ of the world. These are basically anchor points in the world which we build paths from, and tell the wandering guest AI to wander towards.
>
> A **flow field** (or **vector field**) is a 2D map of arrows pointing towards a particular target (see [this image example](https://i.imgur.com/ct5SiV4.jpg)). After calculating the field, an AI agent can be placed anywhere within that field and can effectively navigate to the target.

Each step in the path planning process is outlined below.

#### 1. Portal Placement

Four portals are placed on the edge of the given section, one for each side. A portal will aim to never be too close to another, though is not placed if the chosen piece of land has water or mountains.


#### 2. Generate Flow Fields

The `FlowFieldManager` class handles both generating flow fields for sections and storing those fields for later lookup. Given a section, the FFM uses the positions of the portals as targets when generating flow fields. For each portal, the manager:

- Calculates a cost field for the given terrain by flood-filling an array and noting each node's collective distance from start point (the current portal). Mountains are given the max cost possible, which creates fields that properly avoid them.
- Calculates the actual flow field by iterating over each cost node and pointing that node towards its neighbor with the lowest distance towards the target.

By the end of this process, four flow fields are generated, each one leading to a different section portal.

![Example flow field](https://i.imgur.com/lNeCLdV.jpg)
<label>A visual representation of a generated flow field. After an agent is spawned into the world, it simply checks against this field to determine which direction it should be facing, and moves forward. The agent will reach its destination from (almost) anywhere within the flow field.</label>


#### 3. Simulate Flow Field Agent

Once the section's flow fields have been calculated, an AI agent is created (in memory, _not_ in world space) and simulates traversing the flowfield. By starting the agent at a portal and targeting another portal, it inherently generates an 'optimal' path between those two portals.

As the agent moves across the world, its positions are tracked, and _that_ is how paths are determined in the world. Each path is guaranteed to have at least one intersection, as agents are told to go from East -> West and North -> South, and sometimes told to go from one portal to a neighbor (e.g. North -> East).


![Example paths generated from simulated agents](https://i.imgur.com/E8fZ98T.jpg])

#### 4. Generate Paths using Marching Cubes

Using the path data collected from the simulated agents, a Marching Cubes algorithm produces the final path mesh for the section. Vertices are altered according to the underlying terrain height, in order to slightly follow the terrain.


---

# Plot Discovery

Plot creation ties directly into section path planning. After the proper paths have been found for the section, the remaining non-path areas of the map are 'discovered' and used for ride plots. To discover plots, an algorithm flood fills the map/array until each cell is full, tracking when a new/unconnected area of land has been found.

The image below demonstrates what the 2D representation of the section looks like after placing paths and identifying a handful of plots (indicated by varying colors):

![Plots found after determing path placement](https://i.imgur.com/DulwZin.jpg)

Once plots are found, grids are spawned in world space accordingly, to denote to the player that those areas are for placing rides:

![Example distribution](https://i.imgur.com/cBnJohu.jpg)

# Plot Validation

- issue is that weird shaped/small plots aren't buildable
- created a `polygon` class which allowed us to use math against the shape of the plots
  - could get perimeter, area, etc
- used maths to calculate area and "compactness" of plots
  - ![Example distribution](https://i.imgur.com/DMxap8q.jpg)
	- https://www.azavea.com/blog/2016/07/11/measuring-district-compactness-postgis/
- this allowed us to invalidate certain plots and just throw some scenery there

![Weird plot shape](https://i.imgur.com/CUNyyoW.jpg)

![Example scenery filling](https://i.imgur.com/W9wmpMX.jpg)


