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
---

# Multiplayer NES on the web.

Users take turns playing classic NES games with each other in real time. Games are synced via a node server and web sockets.

You can find the git repository for MultiNES [on github](https://github.com/andymikulski/multines). Want to try it? Check out the [beta website](https://multines.neocities.org/)!


<img src="http://i.imgur.com/iMrsbeH.jpg" height="500" />
<span>Users can enter the queue to play next, or chat from the audience.</span>

# About

- [online nes with multiplayer, like 'twitch plays nes' or something]
- [chatroom + queue so people can watch, comment, take turns playing]
- [uses socket.io to transfer ROM data, inputs, stats, etc]
- [kinda buggy, needs more server-side work]

<video src="https://i.imgur.com/OWe3xBX.mp4" loop controls></video>
<span>Early sync test. You can see that one gets ahead of the other after some time.</span>

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
