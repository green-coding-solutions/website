---
title: "When does it make sense to replace old hardware from a CO2 impact perspective"
date: 2024-07-26
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/hardware_replace.webp"

---
{{< image "/img/blog/15-years-hardware.webp" "medium" "right" >}}

A friend recently sent me a news headline in which a company is promoting that they will use their servers 15 years. While this initially sounds like a great idea, once you think about it, for a little while, you realize modern servers are far more energy efficient than old ones. This got me thinking, when is the point where the energy efficiency of the modern server outweighs the embodied carbon of the new machine. The more I thought about this the more I went down the rabbit hole. What if, the servers are powered with solar. How do I account for this? What are the servers doing? If the server is doing a lot of vector calculations a new one with a [H100](https://www.nvidia.com/en-us/data-center/h100/) card might make sense.  How are they cooled? A modern server will surely produce less heat for the same operation. So it really depends on so many factors in the specific case that a general statement is hard to make. But I still wanted to get some sort of feeling. So I broke it down to the following inputs for the new and old machine:

- Embodied Carbon
- Thermal Design Power (TDP) or Watt usage of the whole machine
- Average Utilisation
- Grid Intensity of Region

You also need to know how long you want to plan on using the old and new machines so you can spread the embodied carbon in relation. These were the factors I felt comfortable with in making an informed decision. I am totally aware that this oversimplifies a lot of the parameters but the aim of this project isn't to create a scientific value but to get a general feeling for when it makes sense to replace hardware taking the major factors into account.

## Embodied Carbon

Getting this value is incredibly hard and most manufactures don't even disclose it. While researching for our [HotCarbon24 paper](https://hotcarbon.org/assets/2024/pdf/hotcarbon24-final30.pdf) we tried to get the value for our graphics card which was close to impossible. There are multiple databases that publish guestimates but requesting the value from the manufacturer is something we should do more often. For the sake of this project you can use [https://db.resilio.tech/](https://db.resilio.tech/) which gives you an initial idea but is probably quite far of in some cases.

## Grid Intensity

The grid intensity is the amount of gCO2eq that are assumed to be emitted when producing 1kWh of electricity. This value is very hard to assume for a data center at a certain time as it hugely depends on exactly where there computer is located, the current weather, the time of the year, other consumers and many more factors. Also the grid intensity is bound to decrease over the next few years as more and more "cleaner" energy sources are connected to the grid.

In order to model the impact the energy has we needed to find some sort of comprise. For his we used the data from [enerdata](https://eneroutlook.enerdata.net/forecast-world-co2-intensity-of-electricity-generation.html) which gives you a projection into the future for certain regions for the world.

This also enables us to model what difference it would make to place a server in a different location which in some cases might be quite a viable solution. Especially with AI models there is no need for the data centers not to be placed next to regenerative energy sources.

Because of the grid intensity we also ask for the start date so we can get the correct values for the years.

## The solution

{{< image "/img/blog/hardware-replace-overview.webp" "huge" >}}

You can head to [hardware-checker.green-coding.io](hardware-checker.green-coding.io) to see the project. We added some example data initially so that you can start playing around instantly.

In this example you can see that it makes sense to replace the machine, which takes half of the energy, in 2032 so after 12 years. This is while assuming constant utilization which is normally not the case as modern CPUs are faster at handling the same computation. Feel free to play around with the values and see how the curve changes. Some learning I had while looking at the data is that it makes a huge difference where I place the machines. Also that utilization is key. Just having the machine run idle is a really bad idea.

So in conclusion, just letting your machine run for ever isn't bound to save CO2 in the long run. It depends on loads of factors.

Feel free to reach out for feedback or add your extension to the code on [GitHub](https://github.com/green-coding-solutions/hardware-replace-checker)
