---
title: "Power measurement on macOS"
date: 2022-10-01
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

Last week we have been on the [SDIA event for sustainble software](https://sdialliance.org/landing/softawere-hackathon/) and held
a workshop on measuring the energy digital products.

We presented approchaes where you measure the energy either with tool like [Scaphandre](https://github.com/hubblo-org/scaphandre) or 
the [Green Metrics Tool](https://github.com/green-coding-berlin/green-metrics-tool) as well as approaches for restricted environments like the cloud.
Here the [SDIA DEF Model](https://knowledge.sdialliance.org/digital-environmental-footprint) and our [SPECPower linear model](https://github.com/green-coding-berlin/spec-power-model) where presented.

What the two former tools have in common though is that they are designed to work 
exclusively on Linux.
Reason for that being is that the RAPL interfaces are nicely integrated into the
linux kernel and readily readable from a virtual file endpoint.

The downside of it is, that it requires root to read this data on Linux.
This is also why the [Firefox 104 energy measurement](http://localhost:1313/blog/firefox-104-energy-measurements/) only works either on 
Windows or on a Mac M1, because here these interfaces are available in userland.

In the workshop we saw many participants with exclusively MacBooks either running 
M1 chips or Intel chips and thus we wanted to make a blog post with some info
on how to get measurement data on these setups.

### Finding processor - M1 or Intel

If you are unsure what processor you have run a `sysctl -a | grep -i cpu`

It will tell you your exact CPU model.

### Activity Monitor
- **[M1 and Intel]**

{{< rawhtml >}}
<img class="ui big floated right rounded bordered image" src="/img/blog/activity_monitor_macos.webp" alt="Activity monitor on macOS" loading="lazy">
{{< /rawhtml >}}

This is usually your first stop when trying to get some metrics out of your system.

The values to look at are **Energy Impact* and **12 hr Power**. Both are unfortunately
some custom and relative values that are not even comparable between two machines.

The just tell how much much energy the app is using compared to the device history 
of energy usage and other apps on the system.

We are unsure if you could even derive an absolute value from that with just this
data, but it would sure be a bit tedious.

### Intel Power Gadget
**[Intel only]**
{{< rawhtml >}}
<img class="ui rounded bordered image" src="/img/blog/Intel_Power_Gadget_macOS.webp" alt="Intel Power Gadget on macOS" loading="lazy">
{{< /rawhtml >}}
**https://www.intel.com/content/www/us/en/developer/articles/tool/power-gadget.html**

Probably the least known, but the one with the easiest UI.

Also it provides some nice tooling as it comes with a script that can start
and stop the application for logging.

Output is:
- RAPL data from PGK, Core and DRAM domains
    + Possibly more if your system supports it (PSY, GPU etc.)
- CPU Frequency
- Temperature
- Utilization

The command line tool can even execute a program and run collect all these metrics 
during its execution.

As well as RAPL on Linux it has the issue that RAPL metrics are system wide.
So even if you execute a `sleep` program, which would incur an insignificant energy 
draw, you might get high energy readings if some CPU intensive program is running 
in the background.


{{< rawhtml >}}
<img class="ui medium floated right rounded bordered image" src="/img/blog/Intel_Power_Gadget_Tests.webp" alt="Intel Power Gadget Tests" loading="lazy">
{{< /rawhtml >}}

It serves as a very nice introspection tool for your system energy draw though.

What we really liked is the functionality to run certain *tests*.
For instance turning off Intel SpeedStep and letting the core always run at max 
frequency, or testing for AVX-512 instructions in particular etc.

See details in the screenshot on the right.


### Syspower
**[Intel only]**
 a more programmatic approach is using the beautiful open source tool [syspower](https://github.com/s4y/syspower).

 One command. Output once per second. No configuration options.

The tools uses the macos userland API to read the RAPL values. Values are in Joules
and have to be converted to Watts to be comparable with Intel Power Gadget.


### powermetrics
**[M1 and Intel]**

{{< rawhtml >}}
<img class="ui big floated right rounded bordered image" src="/img/blog/powermetrics_macos.webp" alt="powermetrics macOS" loading="lazy">
{{< /rawhtml >}}

`powermetrics` comes pre-installed on macOS and can handle M1 and also Intel machines.

The output is mostly unified, but shows some differences on the M1 machines mainly due 
to the summary given at the end and also because the M1 has different types of cores.

`powermetrics` sadly also needs root access although the underlying APIs are technically 
readable from userland.

It can provide a lot of diagnostic output and is the only tool we know if you wanna
get energy readings on the M1 Macs.

### Directly reading the MSR registers (Intel)

On Intel machines the RAPL values come out of the MSR registers in the processor.

Reading these is done through the `rdmsr` instruction of the CPU.

Sadly this cannot be sent to the processor from userland, as it is a ring-0 instruction.

However if you ever where to write a kernel extension that does so, this code would 
issue the `rdmsr` instruction. You just have to read the energy register `0x611` with it:

```C
asm volatile("rdmsr":"=a"(lo),"=d"(hi):"c"(0x10));
```

In the linux world the kernel extension `modprobe msr` forwards this functionality
to a virtual file in the `/dev` directory. However we could not find a similar 
macOS kext that would do the same.

There is one installed alongside with Intel Power Gadget, but we could not find 
any documentation how to leverage that. It might be easily traceable though ...

If you know of any well documented 3rd partykext or even one that comes
with macOS please let us know: [info@green-coding.berlin](mailto:info@green-coding.berlin)