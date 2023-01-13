---
title: "Reducing image size"
draft: false
summary: "What are the tradeoffs when trying to optimize image size"
date: 2023-01-03 14:00:00
author: "Danilo Jesic"
authorlink: "https://www.linkedin.com/in/djesic-613732152/"

---

Would a smaller image size reduce the total energy required to run it?

We have some images that contain an environment for running Puppeteer that we use for testing.  
They are based of off an Ubuntu base image and include a browser and Puppeteer installed via npm.

We started with the assumption that reducing the image size would require less energy  
from users that download the image from Docker Hub and this tradeoff would have a  
compounding effect for successive downloads.

One of the possible approaches to reducing the size of our images was to change the base image  
away from Ubuntu and towards something that still met the requirements for our dependencies  
but at a smaller size, causing us to consider Alpine.

Because Alpine uses a different package manager `apk`, and has difference to  
what Ubuntu's `apt` has to offer, we needed to make sure that our image is still functional.  
This involved a little bit of trial and error to see what dependencies are required to get  
a browser with a GUI run from a container based off of an Alpine image.

The results were similar for our two images where our efforts were focused;  

- The image with Puppeteer running in Chrome was 200MB smaller (1200MB -> 1000MB)
  + but it required 15 more seconds of build time (70s -> 95s).
- The image with Puppeteer running in Firefox was 200MB smaller (1000MB -> 800MB)
  + but it required 15 more seconds of build time (70s -> 95s).

- What is the calculation for waging network transfer savings vs. build times?  
TODO

This does not however mean that Alpine is a silver bullet for slimmer images.  
A prominent pitfall to avoid is using Alpine for Python based projects,  
as there are no wheels (way in which Python packages are bundled) for Alpine,  
resulting in packages needing to be built from source and drastically increasing build times.

- What are future improvements that we could do?
