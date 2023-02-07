---
title: "TDP and ACP for energy estimation in processors"
date: 2022-11-21
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

In the green software community we see very often that people use the [TDP of the processor](https://www.intel.com/content/www/us/en/support/articles/000055611/processors.html) 
as a metric to estimate how much energy the CPU will consume for a specific workload.

For instance the [SDIA use-phase estimation model](https://docs.google.com/spreadsheets/d/1uCQVs8mVgfu6fcQLEttDgfqPzhCm1yuf19_9RUDuU6w/edit#gid=1126994188) in it's current form uses this metric.

We have been using this metric in our machine learning model, where it serves as a very
good indicator of how much the total energy consumption of the system will be.

However lately I have stumbled over a [white paper from Intel](https://www.intel.com/content/dam/doc/white-paper/resources-xeon-measuring-processor-power-paper.pdf) where they discuss 
the TDP in quite some detail and even compare it to a metric from AMD that I was not aware
of: The ACP.

Notes summary:
- ACP is a measure by AMD for Opteron processors that gives the average power draw 
for the CPU while running a defined set of benchmarks (TPC Benchmark*-C, SPECcpu*2006, SPECjbb*2005, and STREAM).
- ACP value for Opteron processors is always lower than TDP
- TDP definitions from AMD and Intel are actually different!
    + **AMD:** TDP. Thermal Design Power. The thermal design power is the maximum power a processor can draw for a thermally significant period while running commercially useful software. The constraining conditions for TDP are specified in the notes in the thermal and power tables.
    + **Intel:** The upper point of the thermal profile consists of the Thermal Design Power (TDP) and the associated Tcase value. Thermal Design Power (TDP) should be used for processor thermal solution design targets. TDP is not the maximum power that the processor can dissipate. TDP is measured at maximum TCASE.

Later in the paper Intel then continues to compare two *identical* machines, where one
CPU is from AMD and one from Intel which have compareable TDPs.

The Intel machine does more operations AND achieves a lower power consumption. This although
the ACP from AMD would suggest that the CPU has a lower energy consumption.
- https://www.spec.org/power_ssj2008/results/res2011q1/power_ssj2008-20110209-00353.html
- https://www.spec.org/power_ssj2008/results/res2010q2/power_ssj2008-20100323-00242.html

{{< rawhtml >}}
<img class="ui big floated right rounded bordered image" src="/img/blog/tdp-vs-acp.webp" alt="TDP vs ACP on Opteron processors" loading="lazy">
{{< /rawhtml >}}


This comparison is a bit tricky, as when we look deeper into how the system is actually configured
 we do find many modifications in the BIOS that actually make the Intel CPU more energy efficient:
 - Maximum Memory Bus Frequency - 1066MHz
 - Intel Turbo Boost Technology - Disabled
 - Adjacent Sector Prefetch - Disabled
 - ...

So the comparisons are not really on equal terrain. However it has to be clearly noted 
that Intel nevertheless has the better performance per watt which is probably due 
to the more single workload focused architecture and higher base frequency.

It shows though that the TDP alone might be a confusing indicator if energy is your 
concern, as it heavily depends on how the processor architecture really is, how the workload
is and also how the CPU / system is configured.

**Important note:** The White Paper is from 2011 and when looking at the current site from
Intel regarding TDP their definition reads a bit differently: [Intel TDP landing page](https://www.intel.com/content/www/us/en/support/articles/000055611/processors.html)

It is unclear if the definition really changed or just the wording is a bit different due 
to a different author / department.

## Comparing TDPs and summary

However for both cases we can conclude that the TDP should be a proper indicator of an **average**
maximal consumption over a longer period of time. Spikes in power consumption for short durations can however be way higher.

Also TCase must be taken into account. This value is typically not given for AMD. For Intel
CPUs this concludes that your CPU might consume more when you are below TCase and less when above.

The issue outlined in the whitepaper though is that a TDP can not really used for a comparison
between different processor models.
The range of uncertainty where the real power consumption will lie in the end is so big
that easily a scenario like in the White Paper can happen, where one CPU has a lower TDP
than the other, but still shows higher average power consumption.

What however has not been not been done in the White Paper is that the comparison
does not take the different architecture, base frequency and core counts into account.

Our [XGBoost model](https://github.com/green-coding-berlin/spec-power-model) for instance respects this and the estimations here look a bit different:

- **AMD Opteron (TDP 95W), 2.2 GHz, 2 chips, 12 cores/chip, 16GB RAM**
- System Peak Power estimated: 241 W
- System Idle Power: 93 W

- **Intel Xeon X5675 (TDP 115W), 3.7 GHz, 2 chips, 6 cores/chip, 16GB RAM**
- System Peak Power estimated: 257 W
- System Idle Power: 46 W

As said before the overestimated peak power for the Intel is due to the tuning settings on Turbo Boost,
which is not reflected in the Training data always.

## Community call

If anyone out there has one of these Opteron processors running and they do support RAPL
we would be HIGHLY interested in some measurements to see how RAPL and the official AMD measurements correlate!

Please contact uns at [info@green-coding.berlin](mailto:info@green-coding.berlin)
