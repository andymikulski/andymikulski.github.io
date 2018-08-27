---
layout: dev-post
title: "TPS: Paths and Plots"
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

# World pathway planning

After generating the base terrain, paths must be placed through the world leading park guests from one section of the park to another. Guests don't really need to do much other than wander, so there is not much complexity there. The real challenge is in generating decent-looking pathways through the world which don't look "robotic." Using some flow fields, I was able to achive some decent path layouts running through the world.

---

There are a couple elements involved in how paths are determined through the world:

> A **portal** is a doorway/connection to another _section_ of the world. These are basically anchor points in the world which we build paths from, and tell the wandering guest AI to wander towards.
>
> A **flow field** (or **vector field**) is a 2D map of arrows pointing towards a particular target (see [this image example](https://i.imgur.com/ct5SiV4.jpg)). After calculating the field, an AI agent can be placed anywhere within that field and can effectively navigate to the target.

Each step in the path planning process is outlined below.

#### 1. Portal Placement

Four portals are placed on the edge of the given section, one for each side. A portal will aim to never be too close to another, though is not placed if the chosen piece of land has water or mountains.

> These portals are also useful in that they can later be used to transfer guests to different park sections, they provide a logical spawn point for new AI agents, etc.

#### 2. Generate Flow Fields

The `FlowFieldManager` class handles both generating flow fields for sections and storing those fields for later lookup. Given a section, the FFM uses the positions of the portals as targets when generating flow fields. For each portal, the manager:

- Calculates a cost field for the given terrain by flood-filling an array and noting each node's collective distance from start point (the current portal). Mountains are given the max cost possible, which creates fields that properly avoid them.
- Calculates the actual flow field by iterating over each cost node and pointing that node towards its neighbor with the lowest distance towards the target.

By the end of this process, four flow fields are generated, each one leading to a different section portal.

<a href="https://i.imgur.com/lNeCLdV.png" target="_blank" rel="noopener">![Example flow field](https://i.imgur.com/0DDJJMd.png)</a> <!-- lNeCLdV -->
<label>A visual representation of a generated flow field. After an agent is spawned into the world, it simply checks against this field to determine which direction it should be facing, and moves forward. The agent will reach its destination from (almost) anywhere within the flow field. [Click](https://i.imgur.com/lNeCLdV.png) for a larger example.</label>


#### 3. Simulate Flow Field Agent

Once the section's flow fields have been calculated, an AI agent is created (in memory, _not_ in world space) and simulates traversing the flowfield. By starting the agent at a portal and targeting another portal, it inherently generates direct path spanning from one section edge to another.

As the agent moves across the world, its positions are tracked, and that trail in turn becomes the path actually placed in the world. Each section is guaranteed to have at least one intersection, though there is an element of randomness applied to which portals are connected leading to some variation.


<img src="https://i.imgur.com/E8fZ98T.jpg" height="500" />
<label>Here are a few examples of paths laid out using this virtual agent approach. Ideally there would be a bit more space around mountains/lakes, though that is a matter of simply adjust node weights during the cost field stage.</label>

#### 4. Generate Paths using Marching Cubes

Using the path data collected from the simulated agents, a Marching Cubes algorithm produces the final path mesh for the section. Vertices are altered according to the underlying terrain height, in order to slightly follow the terrain.


---

# Plot Discovery

Plot creation ties directly into section path planning. After the proper paths have been found for the section, the remaining non-path areas of the map are 'discovered' and used for ride plots. To discover plots, an algorithm flood fills the map/array until each cell is full, tracking when a new/unconnected area of land has been found.

The image below demonstrates what the 2D representation of the section looks like after placing paths and identifying a handful of plots (indicated by varying colors):

<img src="https://i.imgur.com/DulwZin.jpg" height="500" alt="Plots found after determing path placement" />

Once plots are found, grids are spawned in world space accordingly, to denote to the player that those areas are for placing rides:

<img src="https://i.imgur.com/cBnJohu.jpg" height="500" alt="Example distribution" />

# Plot Validation

This general discovery approach works pretty well, though as with all procedural generation, there were some weird quirks for some seeds. For instance, in the below screenshot, there is a small section of a generated plot which is just a little bit _weird._

<img src="https://i.imgur.com/CUNyyoW.jpg" height="500" />
<label>For design purposes, we wanted control over plots so they looked a bit more contained and 'natural,' as if a human had designed the layout. This plot is an example of a generally fine, but incorrect plot layout.</label>

Beyond unexpected shapes, occassionally a plot would not have enough area to actually be built on. In order to use a bit of math on whether not a plot was buildable, the plots are converted from their 2D map/array representation into appropriate `Polygon` classes. The Polygon class handles calculating a shape's perimeter distance, its area, etc. This allowed us to simply filter out plots that were too small to be built on.

In order to determine how "strange" the polygon shape was, I relied on using some formulas that are actually used to determine the [degree of gerrymandering in a given political district](https://en.wikipedia.org/wiki/Polsby-Popper_Test), which I thought was pretty neat. The following graphic gives a quick visual summary of how the Polsby-Popper formula can be used in our situation:

![Example distribution](https://i.imgur.com/DMxap8q.jpg)
<label>Image by Daniel McGlone from his post [Measuring District Compactness in PostGIS](https://www.azavea.com/blog/2016/07/11/measuring-district-compactness-postgis/).</label>

Using a handful of rules based on the polygon area, Polsby-Popper measure, and Schwartzberg score, we are able to quickly determine if a plot is able to be built on, or if it matches the general design aesthetic/compactness we were aiming for. Invalid plots can be filled using the [Foliage Manager](/dev/serenity-forge/foliage/) to produce areas that look a bit more 'environmentally interesting':

![Example scenery filling](https://i.imgur.com/W9wmpMX.jpg)



### Handoff to Foliage + AI systems

From here, the [Foliage Manager](/dev/serenity-forge/foliage) and [AI Manager](/dev/serenity-forge/ai) begin working in tandem to wrap up the world generation and prepare it for the player to enter the game.
