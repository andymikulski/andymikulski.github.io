---
layout: dev-post
title: Peg Solitaire
permalink: /peg-solitaire/
blog: dev
project: peg-solitaire
isProject: true
inDev: false
tech:
  - TypeScript
thumbnail: https://i.imgur.com/gL5lM7Jh.jpg
demo: /assets/peg/
github: https://github.com/andymikulski/peg-solitaire
---

<!-- >**Development time** ~30-35 hours over three days
> -->
>**Engine** Written from scratch in TypeScript
>
>**Concept** [Peg Solitaire](https://en.wikipedia.org/wiki/Peg_solitaire)-style game which players must jump over pegs to clear the game board.


<video poster="https://i.imgur.com/o0O3sdvh.png" preload="none" src="https://i.imgur.com/o0O3sdv.mp4" loop controls ></video>

### About

As part of a programming challenge, I was tasked with recreating a peg solitaire game. Peg solitaire is a game you've probably played before:

1. You must jump each peg over another peg, but only if there is an open space.
2. Each peg you jump over must be removed from the game.
3. You win if only one peg is left.

<img src="https://i.imgur.com/cSewvc3.jpg" />

Given the time constraint of three days, and self-assigning the task of building the game from scratch, I'm very happy with the result! I tackled a lot of technical challenges that probably weren't really meant to be touched on, but ultimately it was a very fulfilling learning experience. The game itself is enjoyable, too, and I feel I made the right choice in secondary mechanics.


### Mechanics

Outside of the standard peg solitaire rules outlined above and the 'peg jump' mechanic, I added a handful of secondary mechanics to the game. These mechanics work with helping/hindering board clearing and affording the user more points, which in turn leads the user to play differently than they might play normal peg solitaire.

<video src="https://i.imgur.com/RS1zw7p.mp4" loop controls ></video>
<label><b>Strong pegs.</b> Some pegs require multiple jumps to be removed from the board. This affects gameplay in that players now have a greater challenge in clearing the board, but also a greater opportunity for points.</label>

<video src="https://i.imgur.com/deKBRQU.mp4" loop controls ></video>
<label><b>Exploding pegs.</b> When a user jumps an explosive peg, the immediate surrounding area is (mostly) destroyed. Strong pegs take 1 damage. This mechanic aids in clearing the board, but at about half the value of clearing the area 'manually'.</label>

<video src="https://i.imgur.com/SJ1gcoB.mp4" loop controls ></video>
<label><b>Checkers bonus.</b> Using the same selected peg for multiple jumps results in a point bonus for each consecutive jump made with that peg. I'd consider this more of a tertiary mechanic as it's not super integral to the game, but keeps things interesting for point-centric players.</label>

---

### Engine

The 'engine' for the game was written from scratch in TypeScript, which was a fun challenge to tackle. I wanted to build the entire experience within canvas, simply more as a challenge to myself than anything. Prior to this game, I had done a bit of canvas work (see: demos from other blog posts), so I felt prepared for the most part. At the end of the project, the only third-party package used in the code was for a psuedo-random number generator, which was pretty cool.

#### VCR's and the Rendering Pipeline

The `VCR` (or **V**irtual **C**anvas **R**enderer) is a primary component in the game engine. Essentially, VCR's are responsible for creating off-screen canvas instances and holding them in memory. Game objects (such as the score or time displays) each have their own personal VCR, dedicated to drawing whatever is needed for that instance. The game timer, for instance, has a VCR with which it prints text to on each tick of the game clock.

Another component in the system, the `RenderingPipeline`, handles printing each game object to the main output canvas. Each game object simply passes the image of their VCR to the pipeline's rendering context with appropriate positioning, reducing draw calls while keeping the stage as up to date as possible.

<video src="https://i.imgur.com/xraNtsC.mp4" loop controls ></video>
<label>Here, each square represents a separate game object entity, responsible for updating its opacity in sync with the game clock. Each entity has its own VCR which renders off-screen when updated, but prints to the pipeline's context when called to do so.</label>

An interesting feature of using VCR's in this manner is that it's quite trivial to set up a cached render (or a [flyweight](https://en.wikipedia.org/wiki/Flyweight_pattern)-esque pattern). For instance, the Peg game objects all pretty much look the same, so there's no need to redraw each one individually on each frame. By using a shared/static VCR, the visual display for each peg is rendered once and then simply re-printed during the draw call. This optimization was actually a huge boon to performance early on in development.

> VCR's also offer support for [double buffering](https://en.wikipedia.org/wiki/Multiple_buffering#Double_buffering_in_computer_graphics), though that feature isn't used in this game.

### Asset Management

Having only a few days to put this game together, I decided to simply pass the asset loading off to the browser. The game only has a few assets to load: a couple webfonts, and a few sounds. Most of these files are not mission critical to the player, either, which is great; I didn't need to hold the game up to load assets.

Ideally, the Asset Manager would handle listening for `onload` events and all that, showing progress until the game is sufficiently loaded. For the purposes of getting the game out the door on time, I simply cut the 'preloading' corner, but in the future I won't be so lucky.

<!--
### UI interactions

One unexpected technical challenge I encountered in the process of writing the game from scratch was the UI and click interactions.

- UI interactions were the worst part
  - essentially uses AABB's to test point intersection when mouse clicks on screen
  - components are responsible for binding/unbinding their events when they enter/leave the stage
  - technically it is possible to overlap bound areas (e.g. a modal button takes the event over something in the bg), but this isn't used anywhere
  - abuse javascript's ability to effectively pass by reference so technically if a button/UI element moves, the AABB moves with it
    - (this is not used)
  - no capability to detect mouseenter/mouseleave
  - ultimately the UI bits should have been passed off to the DOM/CSS, but needed click interactions for game pieces anyway

<img src="https://i.imgur.com/gTya9Vb.jpg" />
<label>Here, button hitboxes are shown in dark grey. Notice the 'y' descender is outside of the hit area - one of the many problems with rolling my own UI system. I fixed this particular problem by simply shrinking the text to fit inside the bounding box!</label>
-->

---

# [Play the Game]({{ page.demo }})

<div><button style="margin: 0 auto 1.5em; display: block; padding: 1em; font-size: 1em" id="load-demo">Load Game</button></div>
<script>
const button = document.querySelector('#load-demo');
button.addEventListener('click', function(){
	button.parentNode.innerHTML = `
	<iframe src="{{ page.demo }}"></iframe>
	<label style="width: 400px">
    Use mouse clicks to select pegs and jump others.
	</label>
	`;
});
</script>

<div style="font-size: 12px; text-align: center;"><a href="{{ page.demo }}" target="_blank">Open in new page</a></div>

---

# Screenshots

<div class="screenshots">
	<div>
		<img style="height: 400px; width: auto; margin: 0 auto;" src="https://i.imgur.com/lcupcb5h.jpg" />
		<label>Sample gameplay screenshot, demonstrating a few twists such as explosive pegs and strong pegs.</label>
	</div>
	<div>
		<video height="400" src="https://i.imgur.com/gs1Kf7X.mp4" loop controls></video>
		<label>Recording of early development. Notice there's no checkers bonus or  'quake' effect yet implemented - this was during the playtesting phase before moving onto effects and polish.</label>
	</div>
	<div>
		<video height="400" src="https://i.imgur.com/aACsdJH.mp4" loop controls></video>
		<label>The initial style was a little ambiguous for players. Specifically, the yellow styling for empty slots didn't look like an empty slot. This was fixed after some playtests.</label>
	</div>
</div>
