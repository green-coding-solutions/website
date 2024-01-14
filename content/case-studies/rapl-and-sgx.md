---
title: "RAPL, SGX and energy filtering - Influences on power consumption"
draft: false
summary: "In this case study we will look at the RAPL feature in modern processors and a security feature that can influence it's accuracy"
date: 2022-12-06 08:00:00
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"

---

RAPL stands for Running Average Power Limit. It is a power estimation feature in
modern x86 CPUs from Intel and AMD.

In the green software community it is extensively used in order to get accurate
energy measurements for the CPU and DRAM components.

Many papers have actually been looking at if the values of RAPL are accurate or not
as well in the domain of energy but also in the domain of time:

- [RAPL in Action: Experiences in Using RAPL for Power Measurements](https://dl.acm.org/doi/abs/10.1145/3177754)
    + Summary: (...) observations reveal that RAPL readings are highly correlated with plug power, promisingly accurate enough and have negligible performance overhead. Timings are sometimes inaccurate
- [Measuring Energy Consumption for Short Code Paths Using RAPL](https://dl.acm.org/doi/abs/10.1145/2425248.2425252)
    + Summary: Timing inaccuracies can be combated by aligning MSR synchronization with code start time
- [A Validation of DRAM RAPL Power Measurements](https://dl.acm.org/doi/abs/10.1145/2989081.2989088)
    + Summary: (...) the RAPL results match overall energy and power trends, usually by a constant power offset. The results match best when the DRAM is being heavily utilized, but do not match as well in cases where the system is idle, or when an integrated GPU is using the memory.
- [Validation of RAPL data on real server with an external power meter](https://medium.com/teads-engineering/building-an-aws-ec2-carbon-emissions-dataset-3f0fd76c98ac)
- [https://ieeexplore.ieee.org/abstract/document/7284406](https://ieeexplore.ieee.org/abstract/document/7284406)
    + Summary: Validation of RAPL accuracy

RAPL however has been nerfed recently through a discovered power-side-channel attack
coined [Platypus](https://platypusattack.com/)
Moritz Lipp showed that it is possible to read the current executed processor instructions
and also the memory layouts especially for data stored in the believed to be secure
memory enclave from Intel called [SGX](https://en.wikipedia.org/wiki/Software_Guard_Extensions)
SGX (Software Guard Extension) is a feature which allows the processor to create an
enclave in the memory that cannot be accessed even by code running in lower access
rings than the current code.


Intel has reacted directly with a [microcode update](https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/advisory-guidance/running-average-power-limit-energy-reporting.html) that results in distorting
the RAPL signal when SGX is enabled in the system.
Alternative to that the user may also set a register in the processor to activate
the so called *energy filtering* even when SGX is disabled.

Intel says that the actual RAPL data might be skewed by up to 50% of the original value.

{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/case-studies/RAPL-energy-filtering-Intel.webp">
  <figcaption>Intel energy filtering - <a href="https://www.intel.cn/content/www/cn/zh/developer/articles/technical/software-security-guidance/advisory-guidance/running-average-power-limit-energy-reporting.html">Source Intel</a></figcaption>
</figure>
{{< /rawhtml >}}


What we have not found so far is any script or data that reproduces this behaviour
and shows the distortion in action.

{{< rawhtml >}}
            </div>
         </div>
    </section><!-- end about -->
    <section class="single-page bg-one">
        <div class="section-one">
            <div class="title-one">What do we want to find out?</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <div class="ui segment inverted" id="research-question">
                    <h2 class="ui header">
                        <i class="graduation cap icon"></i>
                        <div class="content">
                            Research question
                            <div class="sub header">How to reproduce energy filtering on Intel CPUs and how does the distorted RAPL data look like?</div>
                        </div>
                    </h2>
                </div>
{{< /rawhtml >}}

{{< greenblock >}}
Finding an SGX enabled or energy filtering enabled machine
{{< /greenblock >}}

We first tried all the machines that we had lying around that according to Intel hat SGX
on the chip or activateable through Intel ME:

- Our Surface Book 1 and 2 have the capability according to Intel, but Microsoft custom BIOS cannot enable it:https://www.reddit.com/r/Surface/comments/7z1kmz/intel_sgx_extensions_arent_enabled_in_uefi_cant/
    + Also this list claims it is inactive in Surface Book 2 https://github.com/ayeks/SGX-hardware
- On our Fujitsu BIOS there was also now way to enable it, even after an update. Also Intel ME showed no option.
- We also tried multiple help articles from Intel, but nothing worked:
    + https://techlibrary.hpe.com/docs/iss/proliant_uefi/UEFI_Edgeline_103117/GUID-5B0A4E24-26B7-46CC-8A12-5C403A14B466.html
    + https://www.intel.com/content/www/us/en/support/articles/000087972/server-products/single-node-servers.html

- Intel says, that if the setting is not available in the BIOS then there is no help: https://community.intel.com/t5/Intel-Software-Guard-Extensions/Enabling-SGX-if-BIOS-doesn-t-provide-Settings/td-p/1256808

We then resorted to going to the cloud, as there are way more CPUs availabe to us
then we have at home.
Sadly (at least for our case :) ) [SGX is usually always disabled in cloud environments](https://tozny.com/blog/secure-computation-cloud-sgx/). AWS even rolls it's own
enclave called [Nitro Enclaves](https://aws.amazon.com/ec2/nitro/nitro-enclaves/).

However, if you rent a bare metal EC2 machine (either the .metal or the largest option)
you get access to the CPU registers and can set the energy filtering flag.

{{< whiteblock >}}
Checking and activating energy filtering
{{< /whiteblock >}}

It is suprisingly easy to turn energy filtering on. We have put all the scripts in our [Tools repository](https://github.com/green-coding-services/tools).

Here you find the [simple command line code](https://github.com/green-coding-services/tools/blob/main/check_energy_filtering_rapl.sh) (`sudo rdmsr -d 0xbc`) to check the register **0xbc** if energy filtering is active.
A *0* returned means it is off. A *1* returned means it is on.

By issueing a *wrmsr* command like that: `sudo wrmsr 0xbc 1` energy filtering can be turned on.

Also if you want to check if SGX is active we have copied the [C code to check for SGX](https://github.com/green-coding-services/tools/blob/main/test-sgx.c)
into our repository, which is originally from [ayeks](https://github.com/green-coding-services/tools/blob/main/test-sgx.c).

{{< greenblock >}}
Results: Looking at energy filtering signal distortion
{{< /greenblock >}}

The results show our runs by checking CPU RAPL energy consumption of **Package 0** and **Package 1** (we have a two chip machine)
on idle for **5 Minutes** with our [low overhead MSR RAPL checking reporter](https://github.com/green-coding-services/green-metrics-tool/tree/main/tools/metric_providers/cpu/energy/RAPL/MSR/system).

{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/case-studies/RAPL-ec2-m5.metal-p0-idle.webp">
  <figcaption>Package 0 RAPL in EC2 m5.metal on idle. Energy filering OFF</a></figcaption>
</figure>
<figure>
  <img class="ui huge rounded image" src="/img/case-studies/RAPL-ec2-m5.metal-p1-idle.webp">
  <figcaption>Package 1 RAPL in EC2 m5.metal on idle. Energy filering OFF</a></figcaption>
</figure>
<figure>
  <img class="ui huge rounded image" src="/img/case-studies/RAPL-ec2-m5.metal-p0-idle-energy-filtering.webp">
  <figcaption>Package 0 RAPL in EC2 m5.metal on idle. Energy filering ON</a></figcaption>
</figure>
<figure>
  <img class="ui huge rounded image" src="/img/case-studies/RAPL-ec2-m5.metal-p1-idle-energy-filtering.webp">
  <figcaption>Package 1 RAPL in EC2 m5.metal on idle. Energy filering ON</a></figcaption>
</figure>
{{< /rawhtml >}}


Raw data:
- [ec2_m5.metal_idle_p0_energy_filtering_off.csv](/files/ec2_m5.metal_idle_p0_energy_filtering_off.csv)
- [ec2_m5.metal_idle_p1_energy_filtering_off.csv](/files/ec2_m5.metal_idle_p1_energy_filtering_off.csv)
- [ec2_m5.metal_idle_p0_energy_filtering_on.csv](/files/ec2_m5.metal_idle_p0_energy_filtering_on.csv)
- [ec2_m5.metal_idle_p1_energy_filtering_on.csv](/files/ec2_m5.metal_idle_p1_energy_filtering_on.csv)


{{< whiteblock >}}
Summary
{{< /whiteblock >}}

We tested the system only on idle and as we can cleary see in the graphs the signal is (apart from three small outlier spikes) very close to the mean.

The distorted signal with *energy filtering* turned on is not only extremely noise and has a very high variance, it also has suprisingly a higher
mean than the non-filtered signale.

We would have expected that at least the mean over a longer period of time would stay the same ... but maybe 5 Minutes are not enough
to get a solid average.

The results are so strong in effect that even this setup, which allows only for qualitative conclusion is already sufficient to say that
an active *energy filtering* results in an unusable signal. Maybe even the average over a long time might not be of any use ... but this
needs further investigation.

The take away for us is to incorporate guard clauses in all our tools to check for this feature and abort any measurements with an error if active.