---
layout: dev-post
title: Gravity Assist
permalink: /dev/gravity-assist/
blog: dev
project: gravity-assist
isProject: true
tech:
  - Unity
  - C#
thumbnail: https://i.imgur.com/UF9FHkbh.jpg
demo: https://developer.cloud.unity3d.com/share/WJPjJOJq4M/
---


>**Development time (to date)** ~35 hours
>
>**Technology** Unity
>
>**Concept** Pilot a spaceship via short bursts and the gravitational pull of nearby celestial bodies.

A [gravity assist](https://en.wikipedia.org/wiki/Gravity_assist) is the use of a celestial body's gravitational field to alter a spacecraft's speed/path. In this game, you use gravity assists to navigate across a stretch of space, hopefully without exploding!

<video src="https://i.imgur.com/5NLf0mm.mp4" loop controls></video>

# About

As a child, I'd ask my brother Rick for game ideas. A particular idea stuck with him for several years, and when I'd ask for inspiration - he'd mention the "space game." He described the game as a ship using gravity wells and celestial bodies to navigate an area. I was unconvinced it'd be fun, citing level design issues and the pace the game would need to take to feel smooth.

After years of my brother offering his idea, I eventually dug into Unity, and knew my first game had to be the space game. The concept was generally simple, and I needed a project to learn Unity on, so I trekked forth.

>_Technically_, the game is more based on the [Oberth effect](https://en.wikipedia.org/wiki/Oberth_effect) (powered flybys) than the slingshot effect used for a gravitational assist, but if you don't tell anyone, neither will I!

### In the Beginning...

<video src="https://i.imgur.com/Rr269u7.mp4" loop controls></video>
<label>An early multi-body gravity test. The red wireframes are the area of influence for that body's gravity. Eventually, the use of 3D space was dropped to 2D, simplifying the simulation.</label>

An early design decision I made was to utilize 2D space and view the game from a 'flat' perspective. This eliminated a lot of daunting design questions, such as "how does a camera show the space while the player is orbiting a planet?" It also enabled physics simulations to be much simpler.

### Mechanics

The player's ship is controlled via the player's mouse, which in turn means both aiming the thrust direction and setting the thrust power is performed through one interaction. The UX is fairly simple.

After playtesting the basic concept, I added a slow motion effect while the player is determining their next jump. This allows for the player to have a bit stronger grasp on the flow of the game, as well as hitting key jumps.

The level design utilizes 'moons' (orbiting bodies) in a few places, which leads to interesting timed jump events. Admittedly, this mechanic could have been explored a bit further.

<video src="https://i.imgur.com/6HMYWRt.mp4" loop controls></video>
<label>Early style test demonstrating mechanics such as directional thrust, camera tracking, and particle emitters!</label>

### Where It Landed

The game is really hard. The code isn't super great. The level design is pretty meh. I learned a lot, and my brother liked it.

Considering this was my first attempt at building a "complete" game in Unity, I am pretty happy with the results. There are a huge number of things I would like to change or build differently. Realistically, the game requires a rewrite from the ground-up, but hey - it was my first try!

In the future, if I ever revisit this game, I'd like to work towards a mobile version as well as desktop. The simple mechanics would translate quite easily to a mobile/tablet context, and the levels are short enough that it could be considered a casual puzzle game.


<!-- https://imgur.com/a/i9LUp -->

<div class="screenshots">
	<div>
		<img src="https://i.imgur.com/UF9FHkb.jpg" />
		<label>Initial version of the title screen. Not much ends up changing!</label>
	</div>

	<div>
		<video src="https://i.imgur.com/Bx2W9jW.mp4" loop controls></video>
		<label>In-game tool to help level design. Ships fire off in several directions to easily map possible level solutions. Ultimately, it didn't really help much.</label>
	</div>

	<div>
		<video class="fast" src="https://i.imgur.com/kx6z3Qz.mp4" loop controls></video>
		<label>Experimenting with a sun mechanic, in which suns would grow larger/denser after absorbing smaller bodies nearby. This was more of a neat gif than anything.</label>
	</div>

	<div>
		<video src="https://i.imgur.com/ckeyjOo.mp4" loop controls></video>
		<label>Fun bug! Each ship that hits the sun spawns another, but does not get destroyed.</label>
	</div>

	<div>
		<video src="https://i.imgur.com/Y1Qy5Pp.mp4" loop controls></video>
		<label>Really ramping up the explosions! This is what happened when I learned about Unity's various rendering modes.</label>
	</div>
</div>
