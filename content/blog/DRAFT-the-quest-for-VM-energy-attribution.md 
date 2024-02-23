---
title: "The quest for VM energy attribution"
draft: true
date: 2023-03-02
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

Nowadays most of the compute happens in virtualized systems. Cloud vendors have machines with many many cores and as a user you get the share that you are paying for.

In our research about energy consumption of software we often use bare-metal systems where the whole host is used to benchmark a software. See for instance our [Cluster]() with examples for the machines that we use.

We can answer many questions about software energy consumptions with these systems, such has how does the software perform over time, how strong is it affected by bloat, how does the energy profile compare do a different branch of the software and how much savings happen when a certain optimization is done.

However very often we get the question: "How will these values differ if I run the software in my cloud?"

Since cloud systems are virtualized and heavily restricted, four main problems have to be considered here:
- Cloud vendors do not allow to in-chip energy estimation systems like RAPL
- Cloud vendors do typically not open access to power metering facilities of the BMC like IPMI or similar
- Cloud vendors do typically not have nor not open access to external power-meters 
- Since you are running in a VM, even if all of the other three questions could be solved, how would you even attribute the energy?

In our [last post] we have looked at energy attribution mechanism that happen on the process / container level, which however are really only designed to work on bare-metal systems.
Especially since systems like [RAPL] are only for root users available on most of modern operating systems.

The easy answer would be: Well we just count *the work* that has been done by process and then we split the total energy of the systems according to the *share of work*.
An example for a technical implementation of this could be if you count the CPU instructions per process and for the whole sysytem you could make an attribution.

The same could technically work for a VM! However it would be very complex to have here all the edge cases covered and also the overhead has to be taken into consideration.
Also, to allow this, some forwarding mechanism has to be safely implemented in the VM.

All solvable problems though, but another question arises when thinking about this: Does it even make sense?

The question originates from the fact that many server machines out there are non-linear in their energy consumption per ratio of throughput [SPECpower](https://www.spec.org/power_ssj2008/results/res2023q3/power_ssj2008-20230619-01282.html)

So this would mean that the exact same piece of code on a system would have a very different energy profile if the total machine is loaded or unloaded. So drastically even that it might incur a 50% change or more.

Technically the same situation appears also if you have a software architecture with three components that utilizes a system to 50% and now you introduce extra functionality, add a fourth component and now *magically* the partial energy per throughput profile of the other three components increases or decreases.

So the question is: Does it even make any sense at all to at pieces of a software (processes) or at VMs?

