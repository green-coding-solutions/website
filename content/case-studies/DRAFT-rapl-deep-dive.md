---
title: "RAPL - Deep Dive - Estimating power on chip"
draft: true
summary: "In this case study we will look at the RAPL feature in modern processors which is capable of estimating power consumption of on-board devices such as the CPU, DRAM, GPU and more"
date: 2022-07-01 08:00:00
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"

---

RAPL stands for Running Average Power Limit. It is a power estimation feature in 
modern x86 CPUs from Intel and AMD.

Intel introduced it first for their SandyBridge architecture in XXXX.
-> Link to their paper.

The paper already advertises that the measurements are quite on par with the estimation.

It was improved in Haswell ... what exactly? Real source?


Wichtig: Energy information is measured by the SoC voltage regulator along with some calculated energy of unmonitored power domains. Typical energy reporting variation at high power, such as the SoC’s Thermal Design Power (TDP), is ~ 5-10%, but this depends on the OEM design and the calibration of the power monitoring circuit, which is board-design specific.   [Source](https://www.intel.cn/content/www/cn/zh/developer/articles/technical/software-security-guidance/advisory-guidance/running-average-power-limit-energy-reporting.html)


[According to Intel](https://01.org/blogs/2014/running-average-power-limit-%E2%80%93-rapl) this is the official definition:
> RAPL is not an analog power meter, but rather uses a software power model. This software power model estimates energy usage by using hardware performance counters and I/O models. Based on our measurements, they match actual power measurements.
> 
> 
{{< rawhtml >}}
    <img class="ui medium floated right rounded bordered image" src="/img/case-studies/avif.webp">
{{< /rawhtml >}}



- SGX is to consider, as it can skew the results greatly!



## RAPL architecture

- How it is implemented is unknown. However this post reveals a bit of information about it:
- It does not seem to be a real integrating circuit, but rather an estimation based on the voltage

General Die structure: [1]
- Intel architecture cores
- a ring interconnect
- a shared last-level cache (LLC)
- a system agent
- and processor graphics (on-die since Sandy Bridge. Before it was chipset)

RAPL has the advantage, that we get a ready made signal. No obeservation of hundreds of variable necessary


C-State request by OS might be overruled: "The entry and exit idle states also con- sume energy. Frequent C-state transition might cost more energy than the energy saved while in the deep sleep state." [1] & "If too-frequent entry and exit transitions to a deep C-state result in net performance or energy losses, the Demotion algorithm will override the operating system request and keep the cores at a higher power state." [1]

Additional structures
- QPI - Connection between multiple sockets


PCU is the main workhorse, as it contains the microcontroller to set CPU states ...?
Intel: " The PCU runs firmware that con- stantly collects power and thermal informa- tion, communicates with the system, and performs various power-management func- tions and optimization algorithms." [1]

PCU regulates the power.

Intel: "Sandy Bridge’s power performance control is performed primarily through **dynamic voltage and frequency scaling (DVFS).** When the operating system identifies a need for high performance, it issues a high P-state request. Whenever power and thermal headroom exist, the **PCU increases the voltage and frequency** to the highest point that is lower than or equal to the operating system request, that still meets all physical constraints. 
Sandy Bridge implements architectural power meters. It collects a set of architectural events from each Intel architecture core, the processor graphics, and I/O, and combines them with energy weights to predict the package’s active power consumption. Leakage information is coded into the die and is scaled with operating conditions such as voltage and temperature to provide the package’s total power consumption."

Takeaway: Original RAPL design uses only architectural events, but no real energy measurement.


### TODOD


- What is uncore and core?

- What is PP0 and PP1 -> This should be the two variable powerplanes mentioned in [1]? 
BUt where are the referenced?

Also read: https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/advisory-guidance/running-average-power-limit-energy-reporting.html

https://stackoverflow.com/questions/55956287/perf-power-consumption-measure-how-does-it-work

Interesting article: https://stackoverflow.com/questions/66989354/how-to-access-rapl-via-perf-with-rocket-lake

Another interesting article: https://stackoverflow.com/questions/55956287/perf-power-consumption-measure-how-does-it-work

https://www.kernel.org/doc/html/latest/power/powercap/powercap.html


#### What is difference between on-die and on-cpu ?


Uncore domain:


Psys domain

## Cost of operations
- AVX-512 costs more than other instructions. AVX-256 was introduced with Sandy Bridge.


### Haswell improvements

- Haswell introduced on chip voltage regulators per-core [2]
    + Before that the voltage regular was not on the die, but just communicated with from the PCU


Haswell has [3]

In subsequent microarchitectures Intel has tweaked power consumption multiple-times through enhanched
P-States / C-States and faster DVFS algorithms (Intel Speed Shift) [4], but 
no major impact on the RAPL interface is known to us.

An interesting update was the [Alder Lake](https://en.wikipedia.org/wiki/Alder_Lake) microarchitecture which features 
low power cores as well as performance cores, similar to the M1 processors from Apple.

For us it is currently unknown how the RAPL domains are reported here and if any 
improvement or even deterioration of the RAPL accuarcy happened through this microarchitecture update.


### RAPL on AMD

AMD provides no information on their RAPL implementation. **Voices in the internet** suggest
that it is only modeled, similar to the implementation for Sandy Bridge from Intel [5] [5.1] [5.2]

### Interfacing with RAPL

Often done through perf. Code is mostly supplied by Intel Engineers [6]


### Extending RAPL to use process level energy

[7]

TODO http://powerapi.org/

### Studies about Intel RAPL


Surface seems to not have it active: https://www.reddit.com/r/Surface/comments/7z1kmz/intel_sgx_extensions_arent_enabled_in_uefi_cant/

Also this was no help, as custom BIOS: 
- https://techlibrary.hpe.com/docs/iss/proliant_uefi/UEFI_Edgeline_103117/GUID-5B0A4E24-26B7-46CC-8A12-5C403A14B466.html
- https://www.intel.com/content/www/us/en/support/articles/000087972/server-products/single-node-servers.html

Intel says, that if the setting is not available in the BIOS then there is no help: https://community.intel.com/t5/Intel-Software-Guard-Extensions/Enabling-SGX-if-BIOS-doesn-t-provide-Settings/td-p/1256808


- Also this list claims it is inactive in Surface Book 2 https://github.com/ayeks/SGX-hardware

RAPL in Action: Experiences in Using RAPL for Power Measurements
Our observations reveal that RAPL readings are highly correlated with plug power, promisingly accurate enough and have negligible performance overhead
Timings are sometimes inaccurate
Measuring Energy Consumption for Short Code Paths Using RAPL
Timing inaccuracies can be combated by aligning MSR synchronization with code start time
A Validation of DRAM RAPL Power Measurements


What we see so far: https://metrics.green-coding.org/stats.html?id=0f0e89ab-f7f5-4bf8-a6ba-40efeeca50a7

## RAPL and SGX

SGX (Software Guard Extension) is a feature which allows the processor to create an 
enclave in the memory that cannot be accessed even by code running in lower access
rings than the current code.
This feature is suited for generating and storing cryptographic keys.

Platypus Side-Channel Attack

## Teads

Teads also found that the RAPL measurements match quite well with the powermeter measurements that they have done:

> We find that the RAPL results match overall energy and power trends, usually by a constant power offset. The results match best when the DRAM is being heavily utilized, but do not match as well in cases where the system is idle, or when an integrated GPU is using the memory.
[Teads validation of RAPL data on real server with an external power meter](
https://medium.com/teads-engineering/building-an-aws-ec2-carbon-emissions-dataset-3f0fd76c98ac)


## Validating RAPL against a power meter
-> Can I link an article not already here?!?!?! Don't I have written one already?

https://bugzilla.mozilla.org/show_bug.cgi?id=1774844

https://www.youtube.com/watch?v=iE54QXGaQW0

According to this page this seem rather only available in the surface book 2 ...? https://techcommunity.microsoft.com/t5/surface-it-pro-blog/surface-book-2-drivers-and-firmware-initial-release/ba-p/329002

and it is supposedly a "Maxim Power Meter"

https://techcommunity.microsoft.com/t5/surface-it-pro-blog/surface-book-2-drivers-and-firmware-initial-release/ba-p/329002


### Energy measurement tooling

When looking for other sensors that provide energy metrics it is typically a good practice
to look what other tools are out there and what sensors they try to interact with.

Some use RAPL. But some also have other approaches:

- Phornonix benchmarking suite
    + [List of all Sensors](https://github.com/phoronix-test-suite/phoronix-test-suite/tree/103ca536700ec7c10870343061f0901814e029ce/pts-core/objects/phodevi/sensors)
    + [CPU Power Sensor](https://github.com/phoronix-test-suite/phoronix-test-suite/blob/103ca536700ec7c10870343061f0901814e029ce/pts-core/objects/phodevi/sensors/cpu_power.php)
        * Using **ina3221x** I2C endpoint for NVIDIA Tegra chips
        * Using also RAPL as preferred
        * AMD Zenpower SVI2_P_SoC. Either via MSR or via linux kernel module
        * */sys/class/hwmon/* / *lm_sensors* CPU Power inputs *CPU Power* and *IO power*. At the momenty typically only for Ampere Ultra
    + [GPU Power Sensor](https://github.com/phoronix-test-suite/phoronix-test-suite/blob/103ca536700ec7c10870343061f0901814e029ce/pts-core/objects/phodevi/sensors/gpu_power.php)

- PowerJoular
- powertop
- Scaphandre
    + Has splitting!
- Intel Power Gadget [8]
    + Uses RAPL
- powerstat [8]
    + Maintained by Intel engineers
    + Uses RAPL
    + Can also use battery discharge information
    + Can connect to external power analyzers over serial
- perf_events
    + Uses RAPL
- Likwid [8]
    + Uses RAPL
- [pinpoint](https://github.com/osmhpi/pinpoint)
    + 3-channel INA3221 on NVIDIA Jetson TX2 boards
    + 3-channel INA3221 on NVIDIA Jetson AGX Xavier boards
    + Microchip MCP39F511N (for external power measurements)
    + RAPL on x86_64 platforms (Linux, FreeBSD, and macOS)
    + Nvidia GPUs on Linux (via NVIDIA Management Library)
    + Fujitsu A64FX CPUs on Linux (ARM based!)


[1] - POWER-MANAGEMENT ARCHITECTURE OF THE INTEL MICROARCHITECTURE CODE-NAMED SANDY BRIDGE - Intel, published by IEEE
[2] - https://ieeexplore.ieee.org/abstract/document/6803344
[3] - An Energy Efficiency Feature Survey of the Intel Haswell Processor, Hackenberg et. al
[4] - [ARS Technica report on power saving features in Intel Skylake processors](https://arstechnica.com/information-technology/2015/08/the-many-tricks-intel-skylake-uses-to-go-faster-and-use-less-power/)
[5] - Comparison of Energy Efficiency of processors. AMD might be only modeled (https://chipsandcheese.com/2022/07/07/alder-lakes-caching-and-power-efficiency/)
[5.1] - [HPC EFFICIENCY GURUS GRAPPLE WITH AMD’S RAPL](https://www.nextplatform.com/2021/08/09/hpc-efficiency-gurus-grapple-with-amds-rapl/)
[5.2] - [Energy Efficiency Aspects of the AMD Zen 2 Architecture](https://arxiv.org/pdf/2108.00808.pdf)
[6] - [Intel engineer patch for perf to support more energy measurement features of Alder Lake](https://lwn.net/Articles/851479/)
[7] - [Process-level Power Estimation in VM-based Systems](https://hal.inria.fr/hal-01130030)
[8] - [Luis Cruz good overview article of some energy measurement tools](https://luiscruz.github.io/2021/07/20/measuring-energy.html)