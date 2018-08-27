---
layout: dev-post
title: "TPS: Terrain Generation"
permalink: /dev/serenity-forge/terrain/
blog: dev
project: serenity-forge
projectName: Serenity Forge
isNestedPost: true
inDev: false
tech:
  - Unity
  - C#
thumbnail: https://i.imgur.com/v9cVqxDl.png
# demo: /assets/peg/
# github: https://github.com/andymikulski/work-work
---

# Terrain Mesh Generation

In order to obtain an "infinite" landscape, a large majority of the terrain generation is driven through [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise), and some procedural path generation using some [flow fields](https://en.wikipedia.org/wiki/Vector_field). A `GameSeed` class allows us to recreate a game's environment, paths, etc by altering the internal random number generator's seed value when the game first starts.

The world-building class handles rendering chunks of the world using [Marching Cubes](https://en.wikipedia.org/wiki/Marching_cubes) based on generated perlin values. Essentially, the generated noise serves as a heightmap across the world. The marching cubes algorithm is performed for each chunk, checking against the height/noise values provided by our perlin-based height functions, and generating a mesh accordingly.

## Terrain Design Features

In order to achieve a certain design aesthetic, the terrain generation requires the ability to be tuned and adhere to a set of rules when generating the world. The below screenshot demonstrates some terrain features we were interested in for the world:

![Non-smoothed terrain example](https://i.imgur.com/v9cVqxD.png)
<label>This (pre-smoothed) terrain demonstrates a number of landmass features: lakes/ponds, wide hills, and steep stone pillars. These features are controlled all through code and can be adjusted by hand (i.e. hardcoded values) or could even fluctuate based on the current game seed.</label>

An important note is that since the terrain generation essentially treats the perlin noise values as a heightmap, there is no way to create "layered" terrain. That is, we could not create terrain featuring caves or overhangs. This did not affect the game design, and actually made programming a bit easier as the world could be regarded as a simple 2D plane - see [plots 'n' paths](/dev/serenity-forge/paths-n-plots/#plot-discovery) for an example.


##### Water, Ponds, and Lakes

The water is a very simple trick - a plane is fixed to move with the camera but remains at a constant "sea level." This value is later referenced in code to quickly determine if a location is underwater or not. The plane's shader is responsible for handling the stylized water reflection and general look, so it's essentially set-and-forget.

<!-- # - insert pool party here - -->

##### Mountains

Mountains are simply different sets of posterized perlin noise combined together, and then added into the generic 'terrain height' noise value.

Depending on the type of mountain, an arbitrary threshold is applied so noise values below a certain threshold are ignored (thus, flat), and then any remaining noise values are scaled to create tall mountains.

![Pointy mountains](https://i.imgur.com/kUwYC0vh.png)
<label>Pointy mountains filter most of the perlin noise, but scales the remaining values to tall heights, creating steep elevation gains.</label>

![Wide mountains](https://i.imgur.com/zQb4lpbh.png)
<label>Wide mountains take a similar approach, however filter fewer values and therefor gain a wider/hilly appearance.</label>

In code, the final height for any given terrain is the combination of the above mountain functions, plus the base terrain formula. This allows us to take the "2D world" approach mentioned earlier, as we can easily generate the height for any point in the world through a function call.


#### Terrain Smoothing

![Smoothing example](https://i.imgur.com/BQOJTY2.png)

After the chunk has been marched, a pass is done across all of its vertices, setting the `y` position according to the genereated height for that world point. This essentially smooths out the topography of the terrain mesh while utilizing the verticess created by marching cubes.

Note that this would not be possible if our terrain was not driven by Perlin values - smoothing chunk edges becomes a challenge on its own without the affordance of the 2D noise values. In earlier attempts at terrain smoothing, it was found that smoothing terrain cross chunks became quite an issue:

![Early chunk smoothing attempt](https://i.imgur.com/hw7R7xdh.png)
<label>This early iteration shows the main problem which lead to a system rewrite: smoothing terrain across chunks proved difficult, as edge vertices between chunks would not align. This image shows an attempt at 'stitching' chunk vertices together, without success.</label>

>An interesting thing to note is that marching cubes creates a mesh with duplicate vertices, and the mesh must be "welded" (or converted to share vertices) in order for smoothing to look good. Welding the mesh also allows for normal sharing, which gives a "smoother" look to the landscape's lighting and shader effects. Shown here is the 'default' output compared to after sharing vertices.
>![Duplicate vs shared vertices](https://i.imgur.com/mEtPUgz.png)


### Handoff to Path/Plot systems

Once the initial terrain is generated, the [paths and plots systems](/dev/serenity-forge/paths-n-plots/) take over to handle creating paths through the world and plant trees/grass throughout the world.

---

### Screenshots

<video preload="none" poster="https://i.imgur.com/0WsdyP8l.png" src="https://i.imgur.com/0WsdyP8.mp4" loop controls ></video>
<label>During terrain generation, different materials can be applied to the world based on whether that piece of land is outside an arbitrary area. This easily communicates to the player the boundary of the playable space, and gives context to the world (that is, it's not just floating in space somewhere).</label>


<video preload="none" poster="https://i.imgur.com/ywKO8DNl.png" src="https://i.imgur.com/ywKO8DN.mp4" loop controls ></video>
<label>Playing with the world sea level. The shader takes care of handling the visual issues (such as the 'foam' effect around the edge of the water), and the terrain generation code acknowledges the sea level when creating paths and laying foliage.</label>

![Bad chunk smoothing example](https://i.imgur.com/v5059etl.png)
<label>An example of an early attempt at chunk smoothing. Notice that despite the individual chunks looking generally smooth, none of the chunk edges align, essentially creating unsightly gaps in the terrain.</label>