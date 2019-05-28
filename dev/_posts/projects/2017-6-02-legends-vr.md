---
layout: dev-post
title: LOTHT&#58; VR
permalink: /dev/lotht/
blog: dev
project: lotht
isProject: true
tech:
  - Unity
  - C#
  - VRTK
inDev: true
thumbnail: https://i.imgur.com/G9RjuA1h.jpg
---

>**Development time (to date)** ~20 hours
>
>**Technology** Unity, VRTK, Blender
>
>**Concept** VR obstacle course on a classic Nickelodeon game show.

# About

An **unofficial** virtual reality recreation of the [temple run](https://www.youtube.com/watch?v=7cHJ8xaGmMg#t=20s) segment of the Nickelodeon game show [Legends of the Hidden Temple](https://en.wikipedia.org/wiki/Legends_of_the_Hidden_Temple).

Check out a quick proof of concept walkthrough on Twitch [here](https://www.twitch.tv/videos/158444071):

<iframe style="display: block; margin: 0 auto; width: 100%;" src="https://player.twitch.tv/?video=v158444071&autoplay=false" frameborder="0" allowfullscreen="true" scrolling="no" height="480" width="620"></iframe>
<label>A quick <a href="https://www.twitch.tv/videos/158444071" target="_blank">stream</a> of the proof of concept walk-through.</label>

As my first adventure into VR, I was interested in exploring an idea that, simply, would be really cool to check out. Since I'm perpetually attempting to relive in my childhood, I decided to play with the idea of recreating [Legends of the Hidden Temple](https://en.wikipedia.org/wiki/Legends_of_the_Hidden_Temple), specifically the final challenge of running through the temple.

<img src="https://i.imgur.com/RehNAPI.png" />
<label>Some images from the Nickelodeon show. Note the Steps of Knowledge and Temple Games were not included in the scope of the game.</label>

In the Temple Run, two players must run through a series of rooms containing puzzles. As a player enters a room, they must then solve that room's puzzle to move on. If they make it to the prize and out in time, they win a bunch of stuff. There are some other factors, but that's the gist of what you need to know for this game adaptation.

<video class="slow" src="https://i.imgur.com/T07jvut.mp4" loop controls></video>
<label><a href="https://legends.wikia.com/wiki/The_Chamber_of_the_Sacred_Markers" target="_blank">Chamber of the Sacred markers</a>, using donuts as props. Here, players must arrange donuts on a wall to match a random sequence on the opposite wall.</label>

Room-scale VR is a perfect medium for this type of game; small rectangular rooms, lots of grabbing stuff and walking around, not much artifical locomotion is necessary. The prototype (shown below) managed to capture a sliver of the total game, but that sliver shows a huge amount of promise.

### Aesthetic

A key piece of this project is the desire to recreate the _game show experience_, not just simply create a series of puzzle rooms. A few key UX choices were in order to ensure a 'game show' feeling: studio lighting, game music is played via speakers, etc. Ideally, we could get an appearance by Kirk Fogg, but that's a stretch.

<video class="slow" src="https://i.imgur.com/amJaSWV.mp4" loop controls></video>
<label>In this short clip, you can see the use of 'stage lights' in the direction of the camera crews and audience members, as well as strategically placed spotlights. Small details such as this really enhance the feeling you're on the show.</label>


### About the Prototype

The prototype is built using Unity and the [Virtual Reality Toolkit](https://vrtoolkit.readme.io/). The neat thing is the ability to target multiple devices from Vives to Daydreams, and many of the VRTK components can build on each other quite well.

For the temple layout, the [Legends Wikia](https://legends.wikia.com) offered an immense amount of material to research through. From temple layouts to individual rooms, it has been indispensable in finding "first hand" information while rebuilding the layout.

<img src="https://i.imgur.com/mKw8sDf.png" />
<label><a href="https://legends.wikia.com/wiki/Temple_Layout_XV" target="_blank">Temple Layout XV</a>, the (general) design used when laying out the prototype. This image helped generally guide the level layout and design.</label>

#### A Note on Obstacles

Temple Layout XV features a handful of obstacles that simply don't work well in a VR context. For instance, in one case you're meant to grab a rope and swing across a gap. In VR, this experience would be weird at best and nauseating at worst. As a result, the temple layout has been adapted slightly for some challenges better suited for VR. For instance, the [Pit of the Pendulum](https://legends.wikia.com/wiki/The_Pit_of_the_Pendulum) was somewhat replaced with the [Wall&nbsp;Climb](https://legends.wikia.com/wiki/The_Wall_Climb).


<img src="https://i.imgur.com/faJHzER.jpg" />
<label>Originally, the player would need to swing across this gap while holding a rope. A rock-climbing wall is pretty simple in VR, and an acceptable room switch for the layout.</label>

---

## Current Status

This project has been slow going, however is still underway. No release dates or milestones have been decided, and for the most part the project is on the back burner for the team. Check back soon for updates and blog posts!

<!-- ## Team

The team working towards developing this consists of a few friends from [RIT](https://rit.edu/):

- Myself, developer
- [Sean Vickery](https://www.linkedin.com/in/seanvickery), artist
- [Alex Rainone](https://twitter.com/alexrain1), artist -->
