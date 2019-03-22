---
layout: dev-post
title: LiquidDeath.com
permalink: /dev/liquid-death/
blog: dev
project: liquid-death
isProject: true
tech:
  - shopify
  - typescript
  - node
thumbnail: https://i.imgur.com/6FOFaFj.jpg
# github: https://github.com/andymikulski/liquid-death
demo: https://liquiddeath.com/
# inDev: true
---

>**Development time (to date)** ~2 Months
>
>**Technology** TypeScript, Node, [Shopify](https://shopify.com/)
>
>**Concept** E-Commerce site for extreme water brand, with a promotional deal to sell your soul.

# About

Liquid Death Mountain Water is canned water unlike any you've seen before. I was hired as a contractor to bring the e-commerce site to life, converting designed comprehensives into a Shopify storefront. Beyond the shopping experience, I also was tasked with creating the custom functionality for a promotion in which users would sell their soul for a free can of Liquid Death.

<div class="thumb-holder" style="overflow-y: auto; overflow-x: hidden; max-height: 50vh">
  <img src="https://i.imgur.com/04Q0xuF.jpg" style="max-width: 100%" />
</div>
<label>An example comp given by a designer, which I was tasked with coding into dynamic Shopify modules. The live site can be found at [LiquidDeath.com](https://liquiddeath.com/)</label>


### Shopify Integration

A majority of the development consisted of developing custom Shopify modules/blocks in order to allow a highly configurable, dynamic storefront. By providing section building blocks, the client is able to use Shopify's interface to create their own sections, without the need for a developer.


<img src="https://i.imgur.com/XRxjGCg.jpg" />
<label>In this screenshot of the 'Hero Module' interface, you can see the configurable settings, and on the right is the live preview of the custom module.</label>


<img src="https://i.imgur.com/Pu0frhD.png" style="max-height: 600px">
<label>Additional Shopify plugins such as [Bold Subscriptions](https://boldcommerce.com/subscriptions) were integrated into the product page to accommodate client needs.</label>

# Sell Your Soul

For the launch of the website, the client was interested in featuring a promotional deal in which users could trade their soul (by signing a legally binding contract) for a free can of Liquid Death. Utilizing TypeScript and a standalone Node server, I created an API service which accepted incoming soul data, generated discount codes, and saved signed contracts to an Amazon S3 instance.

<video src="https://i.imgur.com/nCjRuTX.mp4" poster="https://i.imgur.com/er60yLo.jpg" loop controls></video>
<label>Example interaction "signing" a contract.</label>

After signing their soul away and submitting their signature, users would be given a dynamically generated coupon code which they could use to redeem a free can of Liquid Death from the Shopify site. They would also be given a copy of their signed contract, which they could save or share on social media.
<img src="https://i.imgur.com/uAfTLDQl.jpg" style="height: 400px" />
<label>My soul contract! These images were saved into an AWS S3 bucket for later retrieval or sharing via social media. You can view the full-size image [here](https://i.imgur.com/uAfTLDQ.jpg).</label>


### Signatures

The animated signatures are a pretty standard SVG-based effect. By animating the `stroke-offset` of some SVG `text` elements, we are able to produce a dynamic 'handwritten' effect, utilizing any webfont.

<video src="https://i.imgur.com/WqJhzXj.mp4" loop controls autoplay></video>
<label>Signature "styles" can be swapped with any webfont. This is an example of one style candidate, which never made it out of testing.</label>

An early idea was to have users actually "write" their name into the contract. As the signed contracts were to be later shared on social media, I wanted to avoid having the typical 'random squiggle' for a signature. This experiment demonstrated writing out the user's name as they 'wrote' on the canvas, ensuring their final signature was always legible. Eventually, this experience was reduced to a simple animation, to maintain an 'official' feeling to the legal document.

<video src="https://i.imgur.com/SIa6yt5.mp4" loop controls autoplay></video>
<label>Here, you can see the example idea of 'writing' the name out, complete with a cursor trail to provide the feedback of actually marking the canvas with your cursor/finger.</label>
