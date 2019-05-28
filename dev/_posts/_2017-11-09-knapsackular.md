---
layout: dev-post
title: Knapsackular
permalink: /dev/knapsackular/
blog: dev
project: knapsackular
isProject: true
tech:
  - TypeScript
inDev: true
thumbnail: https://i.imgur.com/G9RjuA1l.jpg
---

# Value-based scheduling system

A [knapsack problem](https://en.wikipedia.org/wiki/Knapsack_problem)-based scheduler. Given a set of possible actions that day, determines user priorities and then creates a schedule that maximizes the perceived 'value' of each thing.

Basically, you tell it what you have to do and how long it will take, it asks you some questions, and then spits out a schedule that maximizes the use of your time.


---

# About

This was an idea I had while juggling a handful of work projects. While reading up on [algorithm design](https://www.springer.com/us/book/9781848000698), I realized the knapsack problem could be applied to scheduling fairly easily.

Searching the web, there are a few applications of the knapsack problem on scheduling. Another approach I'd like to investigate is the [Moore-Hodgson algorithm](https://en.wikipedia.org/wiki/Single-machine_scheduling), which focuses on action 'due dates'.

---

# Technical Details

- Priority is decided using a simple binary tree and asking the user if X is more valuable than Y.
- The schedule is determined via a [bounded knapsack algorithm](https://rosettacode.org/wiki/Knapsack_problem/Bounded), based on number of hours to schedule for.
