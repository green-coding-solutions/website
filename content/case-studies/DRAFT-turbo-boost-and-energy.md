---
title: "Turbo Boost and energy - Processor energy configuration series - Part 2"
draft: false
date: 2023-03-02
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

- Turning ON deep c-states. This might increase startup-latency of some workloads, but since Cores can not only go into one fixed Turbo Boost frequency, but actually if only SOME cores go into a stronger Turbo Boost, then they can reach even higher frequencies! So if you have a workload that is single or low-threaded you can profit from extraordinary high frequencies that you might never see when all cores are always running on higher frequencies.
    - Source: https://www.vmware.com/explore/video-library/video-landing.html?sessionid=1686331461690001FeTn&videoId=6340661293112

{{< infobox >}}
    This arcticle is part of a multi-part series. Be sure to check out / stay tuned for the other parts!
    In this series we look at processor configuration options either from the OS side or directly
    in MSRs of the CPU and their effect on the power draw of the CPU.
{{< /infobox >}}

[Turbo Boost](https://en.wikipedia.org/wiki/Intel_Turbo_Boost) is the branded name from Intel for a technology called Dynamic Frequency and Voltage Scaling (DVFS).

DVFS is available in every modern Intel or AMD CPU. the name in AMD CPUs is [Turbo Core](https://en.wikipedia.org/wiki/AMD_Turbo_Core)

Turbo Boost can be checked through the linux subsystem, but also by querying the CPU registers directly.

You can find a script to check if Turbo Boost is on or off on your system in our [Github Tools](https://github.com/green-coding-berlin/tools/blob/main/turbo_boost.sh) repository.

Turbo Boost as a feature enables the processor to overshoot it's base frequency for a certain amount of time. This enables snappy responsiveness when instantaneous load happens.

The downside of the feature is that it uses often exponentially more energy and can be detremential to energy cost of the system as a whole.

The question that arises for someone who is doing research in software energy consumption is:
- How much energy / power does Turbo Boost / SMT need to provide it's functionality?
- What are the drawbacks of Turbo Boost?
- What speed achievements can I achieve?
- Should I turn Turbo Boost off when when energy is my primary concern?
- Does it help "running" to the completion of my calculation and then turn off? (Race to sleep)

## Energy test

Our test machine is a MacBook Pro 13" 2015 model with a Intel Core i7-5557U CPU @ 3.1 GHz.

According to `/proc/cpuinfo` this chip has 2 physical cores (found by looking at max. **core id** number) and 4 threads
(found by looking at max. **processor** number).

Looking at **flags** we see that **ht** is a feature, which corresponds to Hyper-Threading.

In order to have a first glimpse at the energy characterisitcs of this feature we are using 
`sysbench`, which you can just install through **aptitude** on **Ubuntu 22.04**.

The command we ran in `sysbench` is:

```bash
./turbo_boost.sh disable
sleep 180
perf stat -a -e power/energy-pkg/ sysbench --cpu-max-prime=10000 --threads=48 --test=cpu --events=300000 --time=0 run
./turbo_boost.sh enable
sleep 180
perf stat -a -e power/energy-pkg/ sysbench --cpu-max-prime=10000 --threads=48 --test=cpu --events=300000 --time=0 run
```

The command always runs for **10 s** fixed. What we modified during the runs is the **--threads** argument
as seen in the following table.

This is the result:

{{< table class="ui table" >}}
|    Turbo Boost On/Off  |  Blockheating (Time) | Blockheating (Energy) | MacBook Pro 13" (Time) |  MacBook Pro 13" (Energy) | Fujitsu TX1330 (Time) | Fujitsu TX1330 (Energy) |
|:-----------:|:----------:|:----------:|:---------:|:---------:|:---------:|:---------:|
| On | 10,13 s | 1635,11 J | 93,477 s | 1482,08 J | 68,1 s | 958,66 J |
| On | 10,13 s | 1636,11 J | 93,87 s | 1476,85 J | 68,34 s | 964,73 J |
| On | 10,14 s | 1640,56 J | 93,48 s | 1484,34 J | 68,36 s | 967,26 J |
| **AVG** | **10,13 s** | **1637,26 J** | **93,609 s** | **1481,09 J** | **68,26 s** | **963,55 J** |
| **STDDEV** | **0,0058** | **2,9013** | **0,226** | **3,8419** | **0,1447** | **4,4198** |
| **STDDEV %** | **0,057** | **0,1772** | **0,2415** | **0,2594** | **0,2119** | **0,4587** |
|   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |
| On | 8,76 s | 1744,58 J | 86,84 s | 1781,17 J | 49,122 s | 1315,72 J |
| On | 8,76 s | 1742,85 J | 87,26 s | 1782,25 J | 49,12 s | 1315,33 J |
| On | 8,77 s | 1747,99 J | 85,95 s | 1782,09 J | 49,09 s | 1313,75 J |
| **AVG** | **8,76 s** | **1745,14 J** | **86,68 s** | **1781,84 J** | **49,11 s** | **1314,93 J** |
| **STDDEV** | **0,0058** | **2,6154** | **0,6689** | **0,5829** | **0,0179** | **1,0432** |
| **STDDEV %** | **0,0659** | **0,1499** | **0,7717** | **0,0327** | **0,0365** | **0,0793** |
|   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |
| **Increase / Decrease** | **86,48 %** | **106,59 %** | **92,6 %** | **120,31 %** | **71,94 %** | **136,47 %** |




{{</ table >}}


An important question is however also: How does this compare in a real-world use-case? Will results be the same?

We picked the Unit-Tests of the Django project (https://github.com/green-coding-berlin/example-applications/tree/main/django_tests)
and run the tests with Turbo-boost off and on.

Important: If you have Turbo-Boost off and you have high loads on Hard-Disks the cut-off point when it makes sense to 
turn on / off Turbo Boost will occur earlier.

In a [Django Unit-Test run with Turbo Boost On](https://metrics.green-coding.io/stats.html?id=48bec2ad-7bb6-4278-bed9-4b4f9afa606e) we see that the CPU-Package power is at **21.3 W** and equates over
the runtime of **171 s** to an energy budget of **3645.30 J**.

For the [Django Unit-Test run with Turbo Boost Off](https://metrics.green-coding.io/stats.html?id=b93ad091-4c70-447b-a828-598672c96d6e) we see that the CPU-Package power is at **12.87 W** and equates over
the runtime of **218 s** to an energy budget of **2805.90 J**.

So even in this real-world scenarios we see here that Turbo-Boost is a detremential feature when looking at the CPU
Energy cost.
However, this is not the whole story.

When looking at energy costs you always have to expand the picture as much as you can:
- How much auxilliary devices are running that also consume power? 
    + HDDs
    + SDDs
    + RAM 
    + etc.

We see that the the CPU Package power dropped from 21.3 W -> 12.87 W (39.5 % reduction), but looking at the whole machine (*psu_power_ac_powerspy2_system*)
we see that the drop is not that significant 42.17 W -> 32.62 W (22.64 % reduction). 
This makes perfect sense, as the CPU is only a part of the whole machine and the other components still run and are 
not affected by Turbo Boost.

We see in this particular case, that the gain is still beneficial. The total energy (*psu_energy_ac_powerspy2_system*) for 
the Turbo Boost Off case is still lower (7113.10 J vs. 7215.67 J)

If you are however in a datacenter, where the system is maybe externally cooled AND the cooling could be turned off if the 
machine can also be turned off, then you would have a case where it would make sense to have Turbo Boost turned on
for this particular hardware setup.

So you always have to make the scope as wide as you reasonably can and include all parts you use energy for.

A


As seen in the charts and the table Hyper-Threading on our Intel CPU on the test bench
is always able to deliver more operations per 10 seconds.

The energy with Hyper-Threading turned on exceeds the total amount of the non-Hyper-Threading configuration
of the chip when using 3 cores or more.
This was not necessarily expected ... it could also have been that the chip somehow throttles the performance
but uses a constant energy budget..

The other interesting metric is the mJ / Ops metric. Here we can see that Hyper-Threading 
actually is more energy efficient per operation than running the system
only with physical cores.


## Discussion
The results are quite suprising as Hyper-Threading used to have a bit of a bad rep.

For instance [this article from Percona](https://www.percona.com/blog/2015/01/15/hyper-threading-double-cpu-throughput/) comes to the conclusion that Hyper-Threading has rather 
throttling features and typically is more suitable for low utilization workloads.

Also [Hyper-Threading has potential security issues](https://www.theregister.com/2019/10/29/intel_disable_hyper_threading_linux_kernel_maintainer/) although the current state 
and if it relevant in real world setups is not quite clear to us.

Another factor to keep into consideration is that Hyper-Threading by theory reduced the
latency of your system when a task is picked up.\
This makes perfect sense, as you introduce another scheduling layer.\
However since a normal Linux installation is anyway not real-time workload optimized 
this factor might not weigh very high.

All in all we are very suprised about how energy friendly the feature is and especially
for the typical server workloads that are rather multi-threaded and mostly idling.
Since Hyper-Threading seems to have no effect on idle CPUs this seems like a perfect fit.

Since Hyper-Threading is by default turned on, and also every server in the SPECPower database
has it turned on we see no reason to run benchmarks that should reflect CPU capabilities with 
Hyper-Threading turned off.




So what is the conclusion? Machines should be setup like this in on-premise environments.
Then, if it is time to buy a new machine, because the current amount of machines cannot handle the amount of tasks anymore
it should first be checked what the uptake of buying this machine is      

If you can somehow quantify the time that you are loosing in energy, than make a trade-off calculation.

If you would be buing new machines, then trade-off.

If you typically have long idle or even shutdown periods in between and there is no good reason why
the calculation should be faster (which is often the case for many tasks in a system) -> off



Did we miss something? Please shoot us an email to [info@green-coding.io](mailto:info@green-coding.io)