---
title: "DevOps energy savings - Reducing image docker container size - Part I"
draft: false
summary: "What are the tradeoffs when trying to optimize image size of docker containers"
date: 2023-02-27 10:00:00
author: "Danilo Jesic"
authorlink: "https://www.linkedin.com/in/djesic-613732152/"

---

Would a smaller image size reduce the total energy required to run it? And what are the trade-offs for that?

We created images on [our Docker Hub](https://hub.docker.com/u/greencoding) that contain an environment for running [Puppeteer](https://github.com/puppeteer/puppeteer) that we use for testing.  
They are based of off an Ubuntu base image and include a browser and Puppeteer installed via npm.
- https://hub.docker.com/u/greencoding
- https://github.com/green-coding-berlin/example-applications/tree/main/puppeteer-firefox-chrome

We started with the assumption that reducing the image size would require less energy  
from users that download the image from Docker Hub, but also increase the build time.
And that this tradeoff would have a compounding effect for successive downloads.

One of the possible approaches to reducing the size of our images was to change the base image  
away from Ubuntu and towards something that still met the requirements for our dependencies  
but at a smaller size, causing us to consider [Alpine](https://www.alpinelinux.org/).

Because Alpine uses a different package manager `apk`, and has difference to  
what Ubuntu's `apt` has to offer, we needed to make sure that our image is still functional.  
This involved a little bit of trial and error to see what dependencies are required to get  
a browser with a GUI running from a container based off of an Alpine image. However, we are talking 10-15 Mins here!

Another optimization for building docker images is making sure that it is built using [buildkit](https://docs.docker.com/build/buildkit/).  
On our machine it was enabled by default, but in case it is not the default, you can specify it as:

```code
DOCKER_BUILDKIT=1 docker build
# or
export DOCKER_BUILDKIT=1
```
\
Using `perf` to run the `docker build` command, we have insight into how much energy
the build process uses for our images, clearing the cache in between individual builds:

```code
perf stat -a -e power/energy-pkg/,power/energy-psys/,power/energy-ram/ docker build -f puppeteer_firefox.Dockerfile -t new_firefox .
```
\
And these are the build results:

{{< table class="ui table" >}}
|    Image    |  power-pkg | power-psys | power-ram |   time   |
|:-----------:|:----------:|:----------:|:---------:|:--------:|
| Old Firefox | 1,041.44 J | 2,518.51 J |  152.80 J | 154.86 s |
|  Old Chrome |  851.33 J  | 2,258.76 J |  137.30 J | 147.01 s |
| New Firefox |  811.18 J  | 2,006.65 J |  123.19 J | 125.50 s |
|  New Chrome |  478.01 J  | 1,427.71 J |  90.32 J  | 101.18 s |
{{</ table >}}

The results were similar for our two images where our efforts were focused;  

- The image with Puppeteer running in Chrome was ~600MB smaller (1650MB -> 1070MB)
  + and it required ~45 less seconds of build time (147s -> 101s).
- The image with Puppeteer running in Firefox was ~150MB smaller (1000MB -> 870MB)
  + and it required ~30 less seconds of build time (154s -> 125s).

Docker images get compressed before being uploaded, and we can replicate the compression by using
`docker save` and then running `gzip` which resulted in:

- Firefox image: 347MB -> 282MB
- Chrome image: 552MB -> 350MB

This does not however mean that Alpine is a silver bullet for slimmer images.  
A prominent pitfall to avoid is using Alpine for Python based projects,  
as there are no wheels (way in which Python packages are bundled) for Alpine,  
resulting in packages needing to be built from source and drastically increasing build times.

Considering that the build time and compressed image size are decreased, this optimization resulted in a net energy reduction. 🎉

In an future blog post, we will highlight the case when the image optimization causes an increase in build time, but a reduction in image size and do a breakdown of the energy cost of the network transfer.
