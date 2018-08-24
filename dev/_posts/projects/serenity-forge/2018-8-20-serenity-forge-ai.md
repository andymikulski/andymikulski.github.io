---
layout: dev-post
title: "TPS: Park Guest AI"
permalink: /dev/serenity-forge/ai/
blog: dev
project: serenity-forge
projectName: Serenity Forge
isPasswordProtected: true
inDev: false
tech:
  - Unity
  - C#
thumbnail: https://i.imgur.com/iSG9yJGl.png
# demo: /assets/peg/
# github: https://github.com/andymikulski/work-work
---

# AI Agents for Park Guests

<video preload="none" poster="https://i.imgur.com/s4OkAquh.png" src="https://i.imgur.com/s4OkAqu.mp4" loop controls ></video>
<label>_Very_ early AI agent test. Here, a few hundred agents randomly spawn into the world and make their way towards one of four goals (one for each edge). No pathfinding is calculated outside of the initial flow field calculations.</label>

After the park has determined the and created the [paths](/dev/serenity-forge/paths-n-plots/), the next step is to produce AI agents which traverse that path and walk about the world. Using the same `flow field` technique used for finding paths, we calculate the flow fields for the individual paths, and create agents which simply reference those flow fields to know which direction to be travelling.

For the most part, flow fields offer a lot of utility for little overhead, and added a really neat enhancement to the game world. Below, I will discuss how we use flow fields in tandem with the world paths, and dip a little into adding a bit of 'intelligence' to crowds.

#### Flow fields at a glance

Flow fields (or "vector fields") can be imagined as an array of arrows pointing towards a destination. When an AI agent is placed somewhere on that flow field, they simply follow the arrows until they reach their destination. Here is an example:

![Flow field example](https://i.imgur.com/G58gHS2l.png)
<label>Image from Leif Erkenbrach's <a href="http://leifnode.com/2013/12/flow-field-pathfinding/" target="_blank">Flow Field Pathfinding</a> blog post.</label>

This approach allows us to quickly calculate a handful of fields, and then simply reference them from the AI agents. Individual AI agents do not need to worry about finding a path; if they are on the flow field, they have a direction to travel. This approach starts to slow down when adding rigidbodies or any sort of 'group' interaction, mentioned below.


## Path-Only Fields

After getting the path layouts for the world, another set of flow fields are generated, only allowing traversal on the path:

<img src="https://i.imgur.com/jZQl63bh.png" height="550px" alt="Path-only flow field" />

An obvious issue shown here is that the fields sometimes direct guests towards the edge of the walkways. This makes sense, as the flow fields find the shortest path for agents to traverse. However, this produces undesirable results: it looks unrealistic, agents can actually fall _off_ of the path, and when combined with some of the grouping/slowing AI causes issues like conga lines and traffic jams. One explored solution was to simply change the `cost` of the flow fields such that edges of paths are to be avoided when possible, though ultimately was not a perfect solve.

<video preload="none" poster="https://i.imgur.com/Q0bGYydh.png" src="https://i.imgur.com/Q0bGYyd.mp4" loop controls ></video>
<label>Conga line! This is due to the agents falling off the path, and not knowing how to handle someone in front of them who is consistently slow.</label>



### Grouping and Stopping Behavior

The "grouping and stopping" behavior is the key to both the current system's flaws and its potential to be really, really neat. One key aspect explored was having agents detect obstacles in front of them, and slowing down their movement accordingly. This, combined with adding RigidBody components to agents, created somewhat realistic grouping and 'following' behavior.

In the below example, AI agents turn red as their speed is reduced (due to someone slowing down in front of them). The blue lines indicate the distance each agent checks ahead of them to determine if they should increase/decrease their speed. The green agents are explained further below.

<video preload="none" poster="https://i.imgur.com/kSPwQc7h.png" src="https://i.imgur.com/kSPwQc7.mp4" loop controls ></video>
<label>The blue lines indicate how far ahead each agent is checking for obstacles, dictated by that agent's current speed. If something is detected, the agents slow down (and turn red). Ignore the part where they're wading through water.</label>

Using this raycast approach works fairly well, however performance drops when adding 100+ AI agents at a time, which is not great. Adding further capabilities to the agents would only eat further into cycles used, so it was a bit desirable to squeeze as much performance out of the agents as possible.

One easy patch was to simply throttle the raycasts. Limiting the raycasts to every 0.1s - 0.3s produced acceptable framerates and decent AI interactions. However, there was the remaining issue of some agents colliding into one another before actually stopping, which comes across as unrealistic, and requires further work.

#### Stalemates and Gridlock

The 'stop if something is ahead' behavior works for a majority of cases. However, as time goes on, an increasing number of stalemates occur between two or more agents that happen to be facing each other. Essentially, the agents acknowledge something is ahead of them and stops accordingly, but neither agent then knows how to resolve the stalemate.

![Some buddies having a chat.](https://i.imgur.com/adcFSV3h.png)
<label>These agents just happened to be facing each other as they were heading to their destination. Now they're having a chat. This would be awesome, if it were intentional.</label>

![Forming a queue to talk to this guest.](https://i.imgur.com/ZQirZq6h.png)
<label>As more agents try to reach their destination, they inadvertently start to queue up in the stalemate.</label>

![Group hug.](https://i.imgur.com/ClshgWGh.png)
<label>Sometimes clusters form and create gridlock on the paths.</label>


### Patiently Waiting and Passing Others

One way to combat the issue of stalemates was to set up a "patience" system for agents, whereby they wait a moment for things to speed up before attempting to force their way forward. Essentially, the code sets a timer on agents that are below a certain speed threshold, and if that timer expires while the agent is _still_ moving slowly, it will attempt to speed forward.

The below example shows a test of many agents travelling the world with the 'patiently waiting' mechanic implemented. Agents who turn green have their timers activated - notice some of them continue at the normal speed, while others attempt to push past their obstacles, with mixed success.
<video preload="none" poster="https://i.imgur.com/a6xgQJDh.png" src="https://i.imgur.com/a6xgQJD.mp4" loop controls ></video>


## Programming for Large Groups

Creating AI behavior for 'realistic' interactions in a large group is a bit of a different challenge from handling a small number of agents. The issues of stalemates and gridlocks are amplified when increasing the number of agents, especially in intersections, and unrealistic interactions become quite apparent (as they appear more frequently, and are a bit more obvious to the player).

<video preload="none" poster="https://i.imgur.com/tX6BljNh.png" src="https://i.imgur.com/tX6BljN.mp4" class="kinda-fast" loop controls ></video>

As you can see in the above example, once the player 'inspects' an actual intersection, it is quite apparent that the crowd is not functioning realistically. Most agents just try to push past each other, and while that technically gets them past the stalemate scenario, it does not _look_ good. One idea worth exploring is grouping agents together in 'clusters' and then having specific AI controllers to essentially direct traffic within those clusters.



---

### Screenshots

<video preload="none" poster="https://i.imgur.com/Y5u0PaNl.png" src="https://i.imgur.com/Y5u0PaN.mp4" loop controls ></video>
<label>Example showing steering and just general AI behavior (albeit a bit buggy). The raycasts sweep back and forth due to a bug in how the agent's rotation is lerped between flow field cells. Coincidentally, the game design called for all the park guests to be blind hockey players, so this prototype was actually pretty spot on.</label>


<video preload="none" poster="https://i.imgur.com/1KsVGozl.png" src="https://i.imgur.com/1KsVGoz.mp4" loop controls ></video>
<label>Bug in the flow field calculation lead to this interesting pattern, which all agents in the world travel across. Technically, they still make it to their destination!</label>
