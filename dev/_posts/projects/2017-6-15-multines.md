---
layout: dev-post
title: MultiNES
permalink: /dev/multines/
blog: dev
project: multines
isProject: true
tech:
  - node
  - websockets
  - nes6
thumbnail: http://i.imgur.com/iMrsbeH.png
github: https://github.com/andymikulski/multines
# demo: https://multines.neocities.org/
inDev: true
---

>**Development time (to date)** ~40 hours
>
>**Technology** Node, WebSockets, [nES6](/dev/nes6)
>
>**Concept** Multiplayer NES for the web.

# About

Users take turns playing classic NES games with each other in real time. A Node server handles creating lobbies, handling player joins/leaves, accepting client connections via WebSockets. Players' games are kept in sync using a frame lockstep method.

<img src="https://i.imgur.com/lpH2z8m.png" />
<label>All four games are in sync with each other and the server instance. No gamestates are transmitted, just game inputs using ensured delivery.</label>

My first attempt at MultiNES was the realization of a simple idea I had: if each person ran their own emulator instance, one could simply communicate the input events and keep all emulators in sync! In terms of code, it's simple to capture inputs, fire them over a websocket, and sync gamestates every few seconds so all connected users stay in sync. It was an experiment that sounded like fun, so I dove into it.

After [creating nES6](/dev/nes6), I put together a simple proof of concept. And while the _mildly adequate at best_ approach sounded fine on paper, the glaring design flaws were immediately apparent.

### Proof of Concept

<video src="https://i.imgur.com/OWe3xBX.mp4" height="500" loop controls></video>
<label>As a player inputs controls on one side, the other receives them and executes immediately. Game states diverge within moments of starting.</label>

Generally, the abundant issues could be boiled down to the fact the inputs were inaccurately timed across emulator instances.

As P1 would play, their local inputs would be transmitted as soon as they were entered, and the audience would consume those inputs on their own local emulator as soon as they were received. In concept, it should work: buttons pressed here means buttons pressed there! In reality, it just.. doesn't.

### Well.. Concept proofed!

After a handful of (local) multiplayer tests, I continued to build the MultiNES dream, despite the fact that gameplay was pretty unstable; I could always rebuild the server piece later. The client MVP was relatively simple anyway, and consisted of three things:

 - A local emulator 'streaming' the current player's gameplay.
 - A chatroom for players and the audience to hang out while watching the game.
 - A queue for players to take turns 'sharing the controller.'

<img src="http://i.imgur.com/iMrsbeH.jpg" height="500" />
<label>Users can enter the queue to play next, or chat from the audience.</label>

The site consisted of a Node server serving a simple React SPA. An IRC chat is embedded in the page, and there are a handful of buttons for FAQs and getting in line to play. The glory is the playing the emulator; extra features weren't worth the MVP.

To alleviate the issue of P1's game diverging from the audience, the audience members would be sent periodic savestates from P1's game. This allowed the game to "correct itself" for the audience, and the main player felt the game was perfectly fine and playable.

After a few tries with friends over far distances (read: outside localhost), it was clear that this approach was not very fun, and therefor unaccepatble. The server needed more work.


### New Hotness

After the project had collected some dust, I brushed it off and implemented a new server architecture. There were a few ideas I wanted to test out, which worked to great success in this situation. Discussion and explanation on all of these features (and more) can be found in [Multiplayer Game Programming](https://smile.amazon.com/Multiplayer-Game-Programming-Architecting-Networked-ebook/dp/B0189RXWJQ), which inspired me with the key ideas to get MultiNES working.

<a href="https://smile.amazon.com/Multiplayer-Game-Programming-Architecting-Networked-ebook/dp/B0189RXWJQ" target="_blank"><img src="https://i.imgur.com/W2takeW.png" height="350" /></a>

#### Ensured Messages

One feature in the new design was to ensure messages/packets had been properly emitted to, and received by, the client websocket connections. A simple connection manager handles sending/receiving "acknowledgement" packets, and resends messages after a period until the client has declared that it was received. This setup is essential for this scenario, as games would differ if actions are dropped.

The server also assigns a tracking counter to each client, incrementing the counter when sending messages to the client. The client tracks the counter locally, and uses this to determine if they have gotten a message out of sync. Got message 83 when you were expecting 82? That's fine, the client will acknowledge 83 and hold onto it until the desired packet is sent. Once the proper packet is received, the client then processes each 'future' packet received while waiting.

A simple system which ultimately became transparent with the right abstraction. It was easy to test, as well; simply tell clients to _not_ acknowledge packets at random, and the server will resend as expected.


#### Server Instance

A key component to multiplayer architecture is to run a copy of the game on the server, and use it as the 'one source of truth.' MultiNES needed the same. With nES6's headless rendering, the Node server could run the 'same' emulator instance as its clients. Easy setup.

#### Input Frame Timestamps

A main advantage to using an instance on the server is the ability to tap into the emulator's frame counter. As clients send inputs to the server, the server checks what its current local frame count is. That frame number is then attached to the input as it is broadcast to all clients. The clients receive the message and fire the input when their local emulator reaches the frame number provided. With the host a little ahead of the clients (based on latency), actions are executed in sync across clients, and emulators _always_ stay in sync.

#### Frame Locksteps

To compensate for lag or slow emulators running below 60fps, a variation on frame locksteps were implemented. Clients phone home with their current local frame count, and if the server determines the client is too far behind, other players are paused. Once the client has caught up, the game resumes. This is useful to keep games in sync, though I'd like to remove the need for it entirely by simply working on nES6's performance, and not need the safety net at all.


### Current Status

At the moment, I'd like to refine the server a bit more before attempting to create "MultiNES 2: The Search for More Legal Grey Areas". Expect a few blog posts in the near future (and an update to this page) as I continue developing the project!
