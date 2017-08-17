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
thumbnail: http://i.imgur.com/iMrsbeH.jpg
---

# Multiplayer NES on the web.

Users take turns playing classic NES games with each other in real time. Games are synced via a node server and web sockets.

<video src="https://i.imgur.com/OWe3xBX.mp4" loop controls></video>
<span>Early sync test. You can see that one gets ahead of the other after some time.</span>

# View Source

You can find the git repository for MultiNES [here](https://github.com/andymikulski/multines)!

# Play It

You can find the beta website [here](https://multines.neocities.org/)!


# Project Details

- **Development time (to date)** ~2 Months
- **Platform** Browser
- **Team** Solo

# About

- [online nes with multiplayer, like 'twitch plays nes' or something]
- [chatroom + queue so people can watch, comment, take turns playing]
- [uses socket.io to transfer ROM data, inputs, stats, etc]
- [kinda buggy, needs more server-side work]

# Postmortem

- [game is smooth for players, but not for viewers]
- [need/ed more emphasis on server design]
- [not using any auth doesn't really work - no way to tie into chatroom etc]
- [no two player support, even though nes6 can do it]

#### In the future...

- [spend time actually, y'know, planning the thing]


# Screenshots

![MultiNES](http://i.imgur.com/iMrsbeH.jpg)
<span>Working prototype!</span>

<img src="http://i.imgur.com/WIxBPI1.jpg" />
<span>Sometimes, game memory states are not correctly communicated to the client on startup.</span>
