---
layout: dev-post
title: MultiNES
permalink: /dev/multines/
blog: dev
project: multines
isProject: true
tech:
  - node
  - socket.io
  - nes6
thumbnail: http://i.imgur.com/iMrsbeH.png
github: https://github.com/andymikulski/multines
# demo: https://multines.neocities.org/
inDev: true
---

# Multiplayer NES for the web.

Users take turns playing classic NES games with each other in real time. Games are synced via a node server and web sockets.


<img src="http://i.imgur.com/iMrsbeH.jpg" height="500" />
<label>Users can enter the queue to play next, or chat from the audience.</label>

# About

- [online nes with multiplayer, like 'twitch plays nes' or something]
- [chatroom + queue so people can watch, comment, take turns playing]
- [uses socket.io to transfer ROM data, inputs, stats, etc]
- [kinda buggy, needs more server-side work]


<img src="https://i.imgur.com/lpH2z8m.png" />
<label>Later sync test utilizing a variant on lockstep frames. Everything's in sync, even RNG's!</label>

# Postmortem

- [game is smooth for players, but not for viewers]
- [need/ed more emphasis on server design]
- [not using any auth doesn't really work - no way to tie into chatroom etc]
- [no two player support, even though nes6 can do it]

# Screenshots

<div class="screenshots">
	<div>
		<img src="http://i.imgur.com/WIxBPI1.jpg" />
		<label>Sometimes, game memory states are not correctly communicated to the client on startup.</label>
	</div>
</div>
