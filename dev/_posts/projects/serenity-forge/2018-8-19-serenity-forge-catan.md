---
layout: dev-post
title: "Catan, Playtable Edition"
permalink: /dev/serenity-forge/catan/
blog: dev
project: serenity-forge
projectName: Serenity Forge
isNestedPost: true
inDev: false
tech:
  - Unity
  - C#
thumbnail: https://i.imgur.com/oDrfHzZl.jpg
# demo: /assets/peg/
# github: https://github.com/andymikulski/work-work
---

# About Catan

[Settlers of Catan](https://en.wikipedia.org/wiki/Catan) is a popular board game, wherein 2-4 players assume the roles of settlers, each attempting to build and develop settlements/cities while trading and acquiring resources (to build more settlements/cities).

![Settlers of Catan](https://i.imgur.com/0t1epSBh.png)
<label>The complete set of the Settlers of Catan board game. Image via [Catan.com](https://www.catan.com/).</label>

At [Serenity Forge](/dev/serenity-forge/), we worked on an Android-based tablet edition of the game. Up to 4 players could share a device (or use their cell phones as controllers), play on a virtual board, and use on-device interactions to trade and play cards.

Joining the project near the end of its life, my particular role for the project was to essentially implement a designed user interface (replacing old programmer art), wire that UI up to the game internals, and then polish/QA/bugfix the rest. Below, you can see some examples of the user interactions I worked on.

# Examples

<video preload="none" poster="https://i.imgur.com/oDrfHzZh.png" src="https://i.imgur.com/oDrfHzZ.mp4" loop controls ></video>
<label>Basic gameplay example. I was responsible for implementing the UI and 'fun' interactions (e.g. rolling dice, animated shaders, animated card).</label>

<video preload="none" poster="https://i.imgur.com/beah5JIh.png" src="https://i.imgur.com/beah5JI.mp4" loop controls ></video>
<label>More user interactions. Here, players can drag 3D models from their 'player mats' onto the board, highlighting valid settlement areas. I was responsible for the drag interactions, as well as the tutorial text cards that show up ("You must place a settlement..").</label>

<video preload="none" poster="https://i.imgur.com/dNleOreh.png" src="https://i.imgur.com/dNleOre.mp4" loop controls ></video>
<label>My role on the project included adding visual effects and adding general 'juice' to the game.</label>


<video preload="none" poster="https://i.imgur.com/51qqoCRh.png" src="https://i.imgur.com/51qqoCR.mp4" loop controls ></video>
<label>Demonstrating the simple resource trading mechanic. As the game was played on a shared tablet, many UI interactions were meant to be performed via tapping or dragging.</label>
