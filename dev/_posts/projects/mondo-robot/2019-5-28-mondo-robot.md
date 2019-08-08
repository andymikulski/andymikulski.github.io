---
layout: dev-post
title: Mondo Robot
permalink: /mondo-robot/
blog: dev
project: mondo-robot
projectName: Mondo Robot
isProject: true
inDev: false
tech:
  - JavaScript
  - Vue
  - Backbone.js
thumbnail: https://i.imgur.com/aYLMHVs.gif
dateRange: 2015 &ndash; 2019
description: WOOOOOOO
---


[Mondo Robot](https://mondorobot.com/) is a small digital service agency based in Boulder, CO, offering everything from brand redesigns to developed websites and applications for clients such as Coachella, Retül, and the Michael J. Fox Foundation. As both a full-time and contractual creative developer for MR, I've worked on the front-end for many projects, which you'll find below.

---

# MondoRobot.com (2019)
#### Page Transition Animations

For the redesign of their company website, I was tasked with working together with in-house designers to research and code dynamic page and menu transitions. Using SVG filters such as [feTurbulence](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence) and [feDisplacementMap](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap) in tandem with [CSS Masks](https://developer.mozilla.org/en-US/docs/Web/CSS/mask), I was able to take a vision exported from AfterEffects and convert it into functional Vue code.

<video src="https://i.imgur.com/aYLMHVs.mp4" height="500" loop controls></video>
<label>This demo video shows a few effects in action: blurring the hero video, using displacement and turbulence to get a wavy effect, and a masked interstitial image when opening the global navigation. The interstitial image of the [Flatirons rock formation](https://en.wikipedia.org/wiki/Flatirons) was created using an animated CSS mask and clever use of CSS property transitions.</label>

<video src="https://i.imgur.com/Pa4xCVh.mp4" height="500" loop controls></video>
<label>Here, the `feTurbulence` and `feDisplacement` filters are seen applied to the global navigation page links, including an exit mask animation when navigating to another page.</label>

<!-- <p>Unfortunately, the use of the SVG filters proved to require a strong machine to run at the desired framerate. As a result, the effects were stripped down for launch, but there is an ongoing effort to get these effects into the production site!</p> -->


---

# [LiquidDeath.com (2019)](/liquid-death)

Liquid Death Mountain Water is an extreme canned water brand. I was brought on to create the e-commerce site and "Sell Your Soul" promo functionality. You can [read more about the project here](/liquid-death).

<img src="https://i.imgur.com/Pu0frhD.jpg" height="400" />
<label>Shopify was used for the e-commerce piece of the site, paired with custom code to extend functionality for both end users and those who manage the site's back end.</label>

<video src="https://i.imgur.com/nCjRuTX.mp4" height="400" loop controls></video>
<label>Custom code was included in the site for the users to sell their soul for a free can of water. My duties included building out the functionality for users to digitally sign a legally-binding "soul contract."</label>

---

# MondoRobot.com (2015)
<p>For their previous site, I was tasked with creating an interesting 'page fold' transition animation between pages. Using CSS3 transforms (and a bit of math), I was able to create the effect shown above. After building a prototype, I was able to integrate the effect into the site's existing CoffeeScript/Angular codebase.</p>

<video src="https://i.imgur.com/AQAPtWF.mp4" height="500" loop controls></video>

---

# [WhistlerBlackcomb.com (2015)](https://web.archive.org/web/20150723233339/http://www.whistlerblackcomb.com/)

Mondo Robot was given the opportunity to revamp the iconic ski resort's outdated website, in which I was given responsibility over the entire front-end codebase. Using Sitecore as a back end, and jQuery in the front end (it _was_ 2015), we developed an entirely new site consisting of CMS-driven pages and API-driven data visualizations for trail status and weather conditions.

[Visit an archived copy of the site here.](https://web.archive.org/web/20150723233339/http://www.whistlerblackcomb.com/)

<img src="https://i.imgur.com/ed7cS8x.jpg" height="400" />
<label>Homepage as it existed when initially launched.</label>

---

# [The M.A.X. Ski Pass (2015)](https://web.archive.org/web/20151104184855/http://themaxpass.com/)


My first project with Mondo Robot! The M.A.X. Ski Pass offered customers a season ski pass with access to 20+ mountains across North America. Though essentially a single-page site, I was able to integrate some interesting animations and interactions, which was pretty exciting for a junior dev such as myself at the time.

[Visit an archived copy of the site here.](https://web.archive.org/web/20151104184855/http://themaxpass.com/)

<img src="https://i.imgur.com/AiI11nl.jpg" height="400" />

<video src="https://i.imgur.com/QJVl6rZ.mp4" height="400" loop controls></video>
<label>An example of an animations I was able to put into the site. This sort of 'fun' interaction would become a staple of my front-end development.</label>
