---
layout: dev-post
title: "Facing Challenges: Overloaded Users"
permalink: /dev/3dms/facing-challenges
blog: dev
project: 3dms
projectName: 3D Minesweeper
description: "Exploring a core concept of 3D Minesweeper to prevent overwhelming players with information."
thumbnail: http://i.imgur.com/4mj7E2V.png
---

# Facing Challenges: Tackling User Overload in 3DMS

A major issue learned while playtesting [3DMS](/dev/3dms) was players had an issue mentally connecting all the attached nodes when examining a region. For instance, the a square node at the center of a 3x3x3 grid has **26** node connections. This is a _lot_ to expect the user to manage, especially when considering the amount of information the player must remember regarding the neighboring contexts, as well.

<video src="https://i.imgur.com/Jls6jp7.mp4" height="500" loop autoPlay controls></video>
<label>This visually demonstrates the 'adjacent' nodes for the current selection.</label>

In the above video, we can see that visual isolation greatly helps the player focus on the immediate playing area. The issue, though, is the neighboring contexts. A block with a `6` count on the edge of a context means the player must switch between two (or more) contexts in order to determine the information they need to make a move. This not only makes for boring gameplay, but the game is also inherently difficult. Boring + difficult = no good.

>When I refer to 'contexts', I'm speaking about the immediately adjacent area surrounding a node. A "neighboring context" would be the surrounding nodes of a neighboring point. Essentially, each possible 'section' is considered a context.

### Face-ing the problem

After some playtesting and gathering player feedback, I had a problem: the game was too hard. Across the board, players mention the difficulty in tracking what nodes are connected. Some suggest drawing lines to denote connections, which I consider.

After kicking around a few options, I decided to explore an idea surrounding the nodes' 3D faces. My experiment was simple: it's hard to visually identify which nodes are connected, so what if the nodes themselves could indicate their connections?

<img src="https://i.imgur.com/4mj7E2V.png" height="500"  />

Here, we see a [dodecahedron](https://en.wikipedia.org/wiki/Dodecahedron) (12-sided 3D solid) surrounded by other dodecs. What's happening here is the central node spawns new nodes based on the _normals of each of its faces_. Basically, it finds where each face is looking, and then spawns a node there. This is how connections are created and visually established by the player.

<video class="fast" src="https://i.imgur.com/jEIMW7o.mp4" height="500" loop autoPlay controls></video>
<label>Each node face is looking at one of the neighbors of that node. Here, connections to the central node are highlighted orange.</label>

The above video is an example testing the approach around a single node using dodecahedrons. A few things are immediately apparent, the greatest of which is that this idea simply doesn't work. While it sounds reasonable on paper, in reality the player is bombarded with information they must _actively ignore_, which surprisingly takes a lot of energy. It's also difficult for players to visually map where each face leads. That's not even considering what the game looks like _without_ these helper connections:

<img src="https://i.imgur.com/k6AWyCt.png" height="500" />

#### You can stop there.

Going further, if we apply the idea to other [Platonic solids](https://en.wikipedia.org/wiki/Platonic_solid), the results only lead to strange playing field layouts and further player confusion. Observe this field of octahedra:

<video class="fast" src="https://i.imgur.com/WnVvk85.mp4" height="500" loop autoPlay controls></video>

While visually it seems a bit clearer, that's simply due to the fact there are fewer elements on screen. It's very difficult to determine which nodes are connected, even with the connection nodes highlighted.

#### No, really, we're done here.

We can extrapolate on this idea and use [Archimedean solids](https://en.wikipedia.org/wiki/Archimedean_solid), but...

<img src="https://i.imgur.com/cjivXzF.png" height="500"  />
<label>Cuboctahedrons.</label>


#### I assure you, there is no need to continue.

I think we're done here. The polyhedron approach didn't quite work, and the user is still a little bit overloaded while playing. This trip wasn't totally wasted, though. While experimenting and coding up the above approach, I stumbled on a potential mechanic:

<img src="https://imgur.com/yhru0JG.png" height="500" />

I think this is an interesting setup to consider. Perhaps the user has to solve each node's "surface nodes" before being allowed to unlock the node? Maybe it's some sort of recursive nightmare where there are ALWAYS subnodes to solve? I'm not sure. My thoughts on this start wandering into mechanics that aren't necessarily "3D Minesweeper," but maybe that's not a bad thing. We will see.

---

### Final Thoughts

This was an interesting experiment, and I don't feel like it's quite over. I'm doubtful as to whether this particular mechanic is suitable for MineSweeper, but I definitely feel there is potential there to some degree. One key issue that this approach doesn't solve is the fact that the player must take into account the neighboring contexts while in-game. Perhaps there needs to be a bit more overt "HEY THIS IS CONNECTED TO THAT" signalling in the game, but that's an experiment for another time.