---
title: "Reducing image size"
draft: false
summary: "What are the tradeoffs when trying to optimize image size"
date: 2023-02-17 14:00:00
author: "Danilo Jesic"
authorlink: "https://www.linkedin.com/in/djesic-613732152/"

---

Would a smaller image size reduce the total energy required to run it?

We have made images that contain an environment for running Puppeteer that we use for testing.  
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
a browser with a GUI running from a container based off of an Alpine image.

An optimization for building docker images is making sure that it is built using [buildkit](https://docs.docker.com/build/buildkit/).  
On our machine it was enabled by default, but in case it is not the default, you can specify it as:

```sh
DOCKER_BUILDKIT=1 docker build
```

Using `perf` to run the `docker build` command, we have insight into how much energy
the build process uses for our images, clearing the cache in between individual builds:

```sh
perf stat -a -e power/energy-pkg/,power/energy-gpu/,power/energy-psys/,power/energy-ram/ docker build -f puppeteer_firefox.Dockerfile -t new_firefox .
```

new image firefox:

```txt
 Performance counter stats for 'system wide':

            811.18 Joules power/energy-pkg/                                           
             45.60 Joules power/energy-gpu/                                           
          2,006.65 Joules power/energy-psys/                                          
            123.19 Joules power/energy-ram/                                           

     125.500807313 seconds time elapsed
```

old image firefox:

```txt
 Performance counter stats for 'system wide':                                                                                                                                            

          1,041.44 Joules power/energy-pkg/                                           
             60.38 Joules power/energy-gpu/                                           
          2,518.51 Joules power/energy-psys/                                          
            152.80 Joules power/energy-ram/                                           

     154.869966307 seconds time elapsed
```

new image chrome:

```txt
 Performance counter stats for 'system wide':                                                                                                                                            
                                                                                                                                                                                         
            478.01 Joules power/energy-pkg/                                           
             39.18 Joules power/energy-gpu/                                           
          1,427.71 Joules power/energy-psys/                                          
             90.32 Joules power/energy-ram/                                           

     101.184184127 seconds time elapsed
```

old image chrome:

```txt
 Performance counter stats for 'system wide':

            851.33 Joules power/energy-pkg/                                           
             54.58 Joules power/energy-gpu/                                           
          2,258.76 Joules power/energy-psys/                                          
            137.30 Joules power/energy-ram/                                           

     147.018825714 seconds time elapsed
```

The results were similar for our two images where our efforts were focused;  

- The image with Puppeteer running in Chrome was ~600MB smaller (1650MB -> 1070MB)
  + and it required ~45 less seconds of build time (147s -> 101s).
- The image with Puppeteer running in Firefox was ~150MB smaller (1000MB -> 870MB)
  + and it required ~30 less seconds of build time (154s -> 125s).

Docker images get compressed before being uploaded, and we can replicate the compression by using
`docker save` and then running `gzip` which resulted in:

- Firefox image: 347MB -> 282MB
- Chrome image: 552MB -> 350MB

- What is the calculation for waging network transfer savings vs. build times?

Using the formula for calculating the [CO2 cost of the network transfer](https://www.green-coding.berlin/co2-formulas/#gigabytes-to-kwh)

TODO

This does not however mean that Alpine is a silver bullet for slimmer images.  
A prominent pitfall to avoid is using Alpine for Python based projects,  
as there are no wheels (way in which Python packages are bundled) for Alpine,  
resulting in packages needing to be built from source and drastically increasing build times.

- What are future improvements that we could do?

TODO
