---
title: "Energy use in the hyperscale cloud"
draft: true
---

This is a tough topic, as normal means like at home: Plugging the server into a wall meter, will not work.

No cloud provider to our knowledge provides direct energy data of the machine. The only known thing are the 
carbon reports by Hyperscalers that show you the emissions for your services. 

Emissions however may vary strongly, as they have another layer of complexity on top of the electricyity:
- PUE of the datacenter
- Cooling
- carbon intensity of the grid


So if you wanna do optimizations your approaches may be futile, as too many variables may change at a time.
Even if your numbers go down you wouldn't know if it was due to your effort.

Therefore energy is what we focus on, since this is directly entangled with the hardware
and not so quickly subject to change (Servers have 4-5 years lifetime).

## Checking RAPL energy registers directly

First you need to know which CPU you are on to read the RAPL registers.

`cat /proc/cpuinfo` is the way to go.

- In Intel machines try the standard Intel Energy Register for the CPU-Package
`sudo rdmsr -d 0x611`

It also might make sense to make sweep over all the registers you have available:
```bash
increment=0x1
handle=0x0

for((i=1;i<=65536;i++))
do
   handle=$(printf '%#x' $handle)
   echo $handle
   result=$(sudo rdmsr -d $handle)
#   result=$(echo 1)
   if [[ $result != "0" && $? == 0 ]]; then
        echo "Success!"
        echo $result
   else
        echo "Register not working."
   fi
   handle=$(($handle + $increment))
done
```

On the Hyper-V Hypervisor in Github actions we found the following registers to be working:

None of them seem to be helpful ... but this is our result:
```log
0x10 - IA32_TIME_STAMP_COUNTER- Timestamp Counter
Value: 12683520621703

0x1b - IA32_APIC_BASE - Interrupt controller
Value: 4276095232

0x3a - IA32_FEATURE_CONTROL
Value: 1 - Enable VMX inside SMX operation

0x8b - IA32_BIOS_SIGN_ID - BIOS Update Signature (R/W). Returns the microcode update signature following the execution of CPUID.01H. A processor may prevent writing to this MSR when loading guest states on VM entries or saving guest states on VM exits.
Value: -9223372032559808512

0xfe - IA32_MTRRCAP - This register describes memory range types and count supported by the implementation
Value: 1288

0x174 - IA32_SYSENTER_CS
Value: 16

0x175 - IA32_SYSENTER_ESP
Value: -9223369837831532544

0x176 - IA32_SYSENTER_EIP
Value: -9223372035141407840

0x179 - IA32_MCG_CAP - Global Machine Check Capability
Value: 16777217

0x1a0 - IA32_MISC_ENABLE
Value: 8716425
=> The Automatic Thermal Control Circuit Enable might be interesting ... but far fetched

0x200 - IA32_MTRR_PHYSBASE0 - Shared Memory
Value: 6

0x201 - IA32_MTRR_PHYSMASK0
Value: 70367670437888

0x202 - IA32_MTRR_PHYSMASK1
Value: 4294967302

0x203 - IA32_MTRR_PHYSMASK2
Value: 70300024702976

0x250 - IA32_MTRR_FIX64K_00000
Value: 434041037028460038

0x258 - IA32_MTRR_FIX16K_80000
Value: 434041037028460038

0x26c - IA32_MTRR_FIX4K_E0000
Value: 434041037028460038

0x26d - IA32_MTRR_FIX4K_E8000
Value: 434041037028460038

0x26e - IA32_MTRR_FIX4K_F0000
Value: 434041037028460038

0x26f - IA32_MTRR_FIX4K_F8000
Value: 434041037028460038

0x277 - IA32_PAT - Memory stuff
Value: 290206224317088006

0x2ff - IA32_MTRR_DEF_TYPE
Value: 3072
```

Note: If you are on Amazon EC2 some usful registers may actually be available.

Look at https://github.com/brendangregg/msr-cloud-tools for details on which to use 
and how.





## How to find out what hardware your are using

We ordered it from "easiest" to "hardest". Altough writing an email might not really 
scale, it usually gives you the best information most of the time.
- First find out the hypervisor you are on. This usually helps with narrowing down later: 
    + Through clocksource: `cat /sys/devices/system/clocksource/clocksource0/current_clocksource` or `cat /sys/bus/clocksource/devices/clocksource0/current_clocksource`
    + Or through 3rd party tool: `sudo apt-get install virt-what -y && sudo virt-what`
- Reading the docs from your provider and "knowing" which model you are on
- Querying the API from your cloud data center
- Running `dmidecode`
    + This is most often locked though and retuns something like "Hetzner vServer"
- Looking in `/sys/devices/virtual/dmi`
    + Typically also locked, just like `dmidecode
- lspci
- lshw
    + Reads from multiple locations. Sometimes can reveal more info than `dmidecode`, especially CPU and IDE controllers
- Using the boavizta API
    + Very nice API. Still in the lower part of the list, as it only has limited data
- `inxi -F`
- Crawling through `/var/log/dmesg`



## White Hat alternative

What you technically can do though is to probe your cpu for features like first 
starting with `cat /proc/cpuinfo`, looking at the speed and flags and try to 
derive the model from there.
Or to run custom code and see how your processor behaves.

But is this really worth the effort? Can't we just assume a "generic" CPU and try
to take it from there?

To our knowledge no. Machines may vary drastically in energy consumption given 
you change the underlying hardware.
We are easily talking numbers that are 2x bigger or smaller JUST for the CPU.


However just trying to abuse a feature is probably not a good call, as there seems
to be a reason that cloud vendors do not forward this information from the
hypervisor to the guest.
However, they technically can do so: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/manage/performance-monitoring-hardware

It might be unreasonable anxiety, but also bad experiences in the past.

The technique must somehow be "ok" with the cloud vendors to make it sustainable.

... At the moment we don't have a technique.

## Additional problems on SAAS platforms like heroku

On heroku dynos the `/sys` and `/dev` filesystem is severley limited.

MSRs are not forwarded and you cannot even tell which machine you are on.

Also cgroups information is not forwarded, so you cannot really tell how much CPU 
time you have been using.

Only `/proc/stat` is available with the information for all CPUs. In our test it was 7 CPUs.

Even if you were able to get the binary `rdmsr` on the system you probably could not execute it,
as it is always installed with a random user.
However if the user is always the same as during the install process it might just work ....
Neverthelesse the MSRs are not accessible.

So the only hope really lies in the fact that during installtime of the buildpack we can 
read more stuff than we can when entering the dyno.

We could then do an initial read on the MSRs ... but now read on exit ...
But could we maybe get the machine info from `dmidecode` or read `/var/log/dmesg` ?
