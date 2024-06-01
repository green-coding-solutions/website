---
title: "Scale your CPU according to the Grid intensity"
date: 2024-02-21
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/eco-cpu.webp"
---

In the age of digital revolution, our reliance on technology is ever-increasing, but so is our carbon footprint. Amidst this tech boom, a pressing question arises: how can we leverage technology to combat, rather than contribute to, climate change?

While discussing some features of the [Green Metrics Tool](https://www.green-coding.io/projects/green-metrics-tool/) we talked about how to get the best results in measuring software and how to avoid the scaling governor, distorting results, most CPUs ship with. This technology is intended for the user space to give the cpu hints on how it should operate in respect to power. This is something we see quite often in mobile computers, that are more performant when plugged in and scale "down" energy usage when on battery power. But why not use this scaling to save power when the grid has a high carbon intensity?

[Carbon intensity](https://en.wikipedia.org/wiki/Emission_intensity) refers to the amount of CO2 emissions produced per unit of electricity consumed. This varies significantly across different energy sources; renewable sources like wind and solar power have a much lower carbon intensity compared to fossil fuels. By using real-time data from electricitymaps.com, we can identify when our electricity is greenest and adjust our energy consumption accordingly.

The core of this program lies in its ability to adjust your computer's CPU scaling governor based on the real-time carbon intensity of your electricity grid. Utilizing the API from [electricitymaps.com](https://electricitymaps.com), the program fetches the current carbon intensity of your grid. Depending on this data, it toggles between power save and performance states to optimize energy usage without compromising on your computing needs.

This is relevant for you personal computer but also can also be used for your servers. Requests might take a tiny bit longer to respond but you can save huge amounts of energy.

Setting up the program is straightforward, you can download the source from:

[https://github.com/green-coding-solutions/carbon-intensity-cpu](https://github.com/green-coding-solutions/carbon-intensity-cpu)

and run the `install.sh` script. This will install a systemd timer that runs every hour and updates your CPU. You can configure your preferences in a file located at `/etc/eco-cpu.conf` or directly through command-line parameters. This includes specifying the desired power save and performance states, as well as providing geographical coordinates to fetch accurate grid data. For those concerned about privacy, there's an option to manually set your location instead of automatic detection through [ipinfo.io](https://ipinfo.io). Currently this is only supported on Linux but could be ported to MacOS quite easily. We strongly recommend to also set the electricitymaps token as they give us the data for free! So get your token under [Electricity Maps API Portal](https://api-portal.electricitymaps.com/)

Adopting this program not only contributes to a reduction in your carbon footprint but also offers tangible benefits such as lower energy bills and extended hardware lifespan. By operating your CPU in a power save mode during periods of high carbon intensity, you're directly supporting the shift towards renewable energy. Additionally, this initiative can play a small but significant role in promoting grid stability by reducing demand during peak times.
