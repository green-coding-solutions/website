---
title: "Estimating Cloud Energy Consumption with a Linear Model - Part 2"
draft: true
---
## Need to rework intro

Unfortuantely using the SPEC database has some limitations (which contributed to our decision to use a [linear model](https://en.wikipedia.org/wiki/Linear_regression)). We will explore these limitations - and how we designed our model - in the next part of this blog series.

We turned to some light machine learning to help with this and decided to create a [linear model](https://en.wikipedia.org/wiki/Linear_regression) that will take what (relevant) input you have regarding hardware setup, with cpu utilization as a bare minimum, and give you an energy reading based on. The hope is that the more information you have available and feed into our model, the more accurate your number would be.

As a side note: while accuracy is of course important, if your goal is to reduce your setup's carbon footprint, then consistency and iterative change is much more important. That is to say, even if your estimated footprint is off by some large percentage due to some assumptions, as long as you're measuring it in the same way and keeping the assumptions the same, you can still make qualitative and comparitive assessments. You can still be able to tell if a change you make has increased or decreased your overall carbon footprint, even if the exact numbers are a bit off. 

With that being said, let's explore how we trained and use our linear model. First, we needed some raw data to work with. When it comes to matching CPU model to energy used, there are two main approaches we can use. The first, as stated before, is to simply use its TDP. This is an official specification that correlates with the maximum draw a CPU is designed to use. It is not exact (CPU's can draw more, and usually draw less during real use), but in the absence of a measured number it is a consistent one we can use and know that we are in the right ballpark Note- some cloud setups use specialized CPU's whose specifications cannot be found from official sources. For those, we find it from other places such [cpu-world](https://www.cpu-world.com/CPUs/Xeon/Intel-Xeon%208275CL.html).

There is a second source of data we can use however in the [SPEC power database](https://www.spec.org/power_ssj2008/results/). This is an industry used and trusted set of benchmarks in which many different cloud setups were put under incrementally increasing loads and the power draw measured and recorded. This is fantastic for our purposes, and gives us a large data-set to work with. 
{{< rawhtml >}}
<img src="/img/blog/spec-example.webp" alt="Spec Power Example" loading="lazy" style="width: 80%; display: block; margin-left: auto; margin-right: auto; margin-bottom: 15px; margin-top: 15px">
{{< /rawhtml >}}
As a side note - in our initial testing we have found that models based only on the SPEC power database tend to under-estimate the real energy used by, while TDP-based estimations over-estimate. We believe that this is because TDP was never meant to be used as a real-world benchmark, and is suppossed to be closer to the upper limit of a CPU's draw. Conversly, we suspect that the cloud setups used in the SPEC benchmarks are optimized for energy efficiency. We see this in some of the flags set during runs. A second shortcoming of using the SPEC data set is that while we use cpu utilization and match it with their load%, that's not an entirely accurate comparioson. In the SPEC benchmarks, load does not just refer to the CPU load, but the entire load on the system. In the future we plan on buying and recreating some of these setups in-house to see how accurate the benchmarks are, or if they need some offset.

Both the Teads model and Cloud Carbon Footprint models above draw from the SPEC power database, using TDP as a fallback when there is no SPEC data available for a particular processor. We also use a similar approach, though we sought to improve upon this in a couple ways. First, we notice that all the models which use the SPEC power data set extrapolate linearly to some degree. The formulas they use often only use min/max wattage (corresponding the 0% and 100% load in SPEC), though Teads goes a bit further and also uses the measured value at 50% for their calculation. However this is not very reflective of reality though, as we can often see that the relationship between CPU-utilization and power is non-linear:
{{< rawhtml >}}
<div class="row" style="display:flex">
    <img src="/img/blog/non-lin-1.webp" alt="Non-Linear 1" loading="lazy" style="width: 33%; display: block; margin-left: auto; margin-right: auto; margin-bottom: 15px;">
    <img src="/img/blog/non-lin-2.webp" alt="Non-Linear 2" loading="lazy" style="width: 33%; display: block; margin-left: auto; margin-right: auto; margin-bottom: 15px;">
    <img src="/img/blog/non-lin-3.webp" alt="Non-Linear 3" loading="lazy" style="width: 33%; display: block; margin-left: auto; margin-right: auto; margin-bottom: 15px;">
</div>
{{< /rawhtml >}}

Since the spec data has numbers for incrementally increasing loads of 10% from 0-100, we scraped and used all the data points in the training of our model.

Additionally, our linear model uses both TDP and the spec power in its training. That is to say, instead of just using TDP as a backup, it will use both data points if available.

Now that we know what data we were going to use for our model, the work began. First we pulled all the SPEC power data from their website using wget and parsed through it with regexes. We had to drop some of the data we pulled as they were on shared hardware setups, meaning
## What did shared hardware mean exactly again? I don't want want to say something incorrect here

 After doing a hefty amount of data cleaning, we ended up with a dataset with the following columns:
Average Power (for each 10% incrementing load from 0-100), Cpu Make, Cpu Name, Turbo Boost capabilities, # Cpu Cores, # Cpu Chips, Cpu Threads, PSU Rating and Amount, Cpu Family, L3 Cache, L2 Cache, and TDP.
# check melt output

# Talk about Cpu Family and how we got it
# Talk about TDP and how we got it
## 1-2 sentences tops

# Talk about EDA and which columns showed up as relevant
Using python pandas, we then

# Show example usage of linear model
# Show how we envision it being used


## Extra
# SPEC load is not just CPU utilization, but full system load
# David Mytton inspiration




## Part 1:
Why we need a linear model to begin with?
What others have done - and they use SPEC Power, TDP 
-- This has some limitations/issues, that we will discuss in part 2

## Part 2:
Raw data- talk about TDP, SPEC , how others use it, and the limitations?
Design our model, improvements and remaining shortcomings
- comparitive results being important is nice to highlight here

## Part 3:
Our model in action and outlook?