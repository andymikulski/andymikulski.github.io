---
layout: dev-post
title: Gravity Assist
permalink: /dev/gravity-assist/
blog: dev
project: gravity-assist
isProject: true
tech:
  - unity
thumbnail: http://i.imgur.com/UF9FHkb.jpg
demo: https://developer.cloud.unity3d.com/share/WJPjJOJq4M/
---

# Concept

A [gravity assist](https://en.wikipedia.org/wiki/Gravity_assist) is the use of a celestial body's gravitational field to alter a spacecraft's speed/path.

In this game, you pilot a spaceship through short bursts of fuel and the gravitational pulls of the planets and moons around you.

<video src="https://i.imgur.com/5NLf0mm.mp4" loop controls></video>

>_Technically_, the game is more based on the [Oberth effect](https://en.wikipedia.org/wiki/Oberth_effect) (powered flybys) than the slingshot effect used for a gravitational assist.


# About

- [rick bugged me to make a game]
- [first unity project, figured why not]
- [interesting learning experience, but code is not great]

# Postmortem

- [the game is really hard]
- [falls into the trap of me playing it a lot so I'm good and think it's easier for others]
- [designing levels is really tough]
- [difficult to create reproducible paths to determine par]

#### In the future...

- [invest in some sort of level design tooling]
- [visual treatment could be way better]
- [mobile-friendly design/assets]

# Behind the Scenes

https://imgur.com/a/i9LUp

<div class="screenshots">
	<div>
		<img src="http://i.imgur.com/UF9FHkb.jpg" />
		<label>Initial version of the title screen. Not much ends up changing!</label>
	</div>

	<div>
		<video src="https://i.imgur.com/C7V1QIC.mp4" loop controls></video>
		<label>Early mechanics testing.<br />Demonstrates gravity, dragging the map/following the ship, and&nbsp;a&nbsp;test&nbsp;aesthetic.</label>
	</div>
	<div>
		<video src="https://i.imgur.com/kx6z3Qz.mp4" loop controls></video>
		<label>Another early gravity test. Here, suns grew larger with each consumed star.</label>
	</div>

	<div>
		<video src="https://i.imgur.com/ckeyjOo.mp4" loop controls></video>
		<label>Fun bug! Each ship that hits the sun spawns another, but does&nbsp;not&nbsp;get&nbsp;destroyed.</label>
	</div>

	<div>
		<video src="https://i.imgur.com/Bx2W9jW.mp4" loop controls></video>
		<label>In-game tool to help level design. Ships fire off in several directions to easily map possible level solutions.</label>
	</div>

	<div>
		<video src="https://i.imgur.com/Y1Qy5Pp.mp4" loop controls></video>
		<label>Really ramping up the explosions.</label>
	</div>
</div>
