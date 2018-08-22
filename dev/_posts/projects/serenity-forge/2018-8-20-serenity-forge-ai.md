---
layout: dev-post
title: "UTPS: Park Guest AI"
permalink: /dev/serenity-forge/ai/
blog: dev
project: serenity-forge
projectName: Serenity Forge
isPasswordProtected: true
inDev: false
tech:
  - Unity
  - C#
thumbnail: https://i.imgur.com/iSG9yJGl.jpg
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

# AI Agents

![AI agent snapshot](https://i.imgur.com/iSG9yJG.jpg)

Park guests roam the paths walking from section to section.


## Path-Only Fields

After getting the path layouts, another set of flow fields are generated:

![Path-only flow field](https://i.imgur.com/jrde0B5.jpg)

An obvious issue shown here is that the fields direct guests towards the edge of the walkways. This makes sense, as the flow fields find the shortest path for agents to traverse. However, this produces undesirable results: it looks unrealistic, agents can actually fall _off_ of the path, and when combined with some of the grouping/slowing AI causes issues like conga lines:

<video src="https://i.imgur.com/Q0bGYyd.mp4" loop controls ></video>
<label>Conga!</label>

Or going from a large group into single-file along a narrower path:

<video src="https://i.imgur.com/kSPwQc7.mp4" loop controls ></video>
<label>AI agents turn red as their speed is reduced (due to someone slowing down in front of them). Here, a group of agents have hit a traffic jam, due to pathing. (Ignore the part where they're wading through water.)</label>

One explored solution was to simply change the `cost` of the flow fields such that edges of paths are to be avoided when possible.


### Grouping and Stopping Behavior

![Some buddies having a chat.](https://i.imgur.com/adcFSV3.jpg)

