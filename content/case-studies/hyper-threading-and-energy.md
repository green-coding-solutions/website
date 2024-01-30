---
title: "Hyper-Threading and energy - Processor energy configuration series - Part 1"
draft: false
date: 2022-10-06
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

{{< infobox >}}
    This arcticle is part of a multi-part series. Be sure to check out / stay tuned for the other parts!
    In this series we look at processor configuration options either from the OS side or directly
    in MSRs of the CPU and their effect on the power draw of the CPU.
{{< /infobox >}}

Hyper-Threading is the branded name from Intel for a technology called Simultaneous Multi-Threading (SMT).

SMT is basically active in every modern Intel or AMD CPU.
On Linux it's status can be checked in `/sys/devices/system/cpu/smt/active` and changed
by setting `/sys/devices/system/cpu/smt/control` to either *off* or *forceoff*.
    - off seemed to be enough in our cases. The OS might maybe turn it back on again
    - Using forceoff is safer, but needs a reboot to reactivate

On macOS this can be set in the NVRAM settings:
    - Boot into macOS Recovery
    - https://support.apple.com/en-gb/HT210108
    - nvram boot-args="cwae=2"
    - nvram SMTDisable=%01
    - Reset NVRAM to reset settings

SMT is generally a technology that optimizes multi tasking.
It basically offloads scheduling from the OS to the CPU, which can technically do
it quicker and in turn provides the OS with more cores than are phsically available.

The question that arises for someone who is doing research in software energy consumption is:
- How much energy / power does Hyper-Threading / SMT need to provide it's functionality?
- What are the drawbacks of SMT?
- Should I turn SMT off when when energy is my primary concern?

## Energy test



Our test machine is a MacBook Pro 13" 2015 model with a Intel Core i7-5557U CPU @ 3.1 GHz.

According to `/proc/cpuinfo` this chip has 2 physical cores (found by looking at max. **core id** number) and 4 threads
(found by looking at max. **processor** number).

Looking at **flags** we see that **ht** is a feature, which corresponds to Hyper-Threading.

In order to have a first glimpse at the energy characterisitcs of this feature we are using 
`sysbench`, which you can just install through **aptitude** on **Ubuntu 22.04**.

The command we ran in `sysbench` is:

```bash
sudo perf stat -a -e power/energy-pkg/,power/energy-ram/ sysbench --cpu-max-prime=10000 --threads=X --test=cpu run
```

The command always runs for **10 s** fixed. What we modified during the runs is the **--threads** argument
as seen in the following table.

### Results table

{{< table class="ui table" >}}
|    Threads    |  HT Off - Events | HT Off - Energy [J] | HT off - mJ / Ops | HT On - Events | HT On - Energy [J] | HT On - mJ / Ops |
|:-----------:|:----------:|:----------:|:---------:|:--------:|:--------:|:--------:|
| Idle | 0,00 | 29,18 | - | 0,00 | 29,18 | - |
| 1 | 11.601,00 | 106,83 | 9,21 | 11.564,00 | 107,5 | 9,30 
| 2 | 22.922,00 | 160,40 | 7,00 | 23.049,00 | 163,92 | 7,11 
| 3 | 22.924,00 | 161,87 | 7,06 | 29.063,00 | 183,51 | 6,31 
| 4 | 22.900,00 | 161,58 | 7,06 | 34.895,00 | 204,22 | 5,85 
| 5 | 22.908,00 | 162,76 | 7,10 | 34.931,00 | 199,66 | 5,72 
| 6 | 22.902,00 | 162,16 | 7,08 | 34.972,00 | 202,81 | 5,80 
{{</ table >}}

### Graph
{{< rawhtml >}}
<img class="ui huge rounded bordered image" src="/img/blog/hyper-threading-energy-graph.webp" alt="Hyper-Threading energy graph" loading="lazy">
{{< /rawhtml >}}
\
As seen in the charts and the table Hyper-Threading on our Intel CPU on the test bench
is always able to deliver more operations per 10 seconds, while the energy cost is not rising as quickly.
So the result is: **Energy cost per operation drops when using Hyper-Threading while also retaining and even increasing throughput**.

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

Did we miss something? Please shoot us an email to [info@green-coding.io](mailto:info@green-coding.io)