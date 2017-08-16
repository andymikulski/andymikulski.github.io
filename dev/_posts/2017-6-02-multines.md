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

# Concept

Multiplayer NES on the web.

#### But, why?

Fun challenge!

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
