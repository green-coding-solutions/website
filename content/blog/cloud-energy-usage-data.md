---
title: "Energy and power usage data in the cloud"
date: 2023-08-15
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

Getting power usage data in cloud is a tough topic and one of the reasons projects such as [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/) exist.
Typically cloud vendors, especially hyperscalers, do neither supply energy consumption data of the whole machine from PDUs
or similar, nor do they provide access to CPU internal energy data like for instance RAPL.

Especially for RAPL there are historical and security reasons. One of such, Platypus, we have looked into a bit more detail 
with special regards to migitation mechanisms provided by Intel in our article [RAPL, SGX AND ENERGY FILTERING - INFLUENCES ON POWER CONSUMPTION
](https://www.green-coding.berlin/case-studies/rapl-and-sgx/). 

No cloud provider to our knowledge provides direct energy data of the machine. The only known thing are the 
carbon reports by hyperscalers that show you the emissions for your services. 

Emissions however may vary strongly, as they have another layer of complexity on top of the electricity:
- PUE of the datacenter
- Cooling
- carbon intensity of the grid
- etc.

So if you wanna do optimizations based on carbon your approaches may be futile, as too many variables may change at a time.
Even if your numbers go down you wouldn't know if it was due to your effort.

Therefore energy is what we focus on, since this is directly entangled with the hardware
and not so quickly subject to change (Servers have 4-5 years lifetime).

## Getting energy data directly

Very few vendors allow this and actually the only one we know that provides direct access to IPMI for tenants in it's
cloud offerings is [Blockheating](https://blockheating.com/). Here you get bare metal machines with also access to IPMI.

If you do not know what IPMI is and how to read the data, check out our [Metrics Provider for IPMI](https://docs.green-coding.berlin/docs/measuring/metric-providers/psu-energy-ac-ipmi-machine/) in the [Green Metrics Tool](https://www.green-coding.berlin/projects/green-metrics-tool/).

A new project by the Green Software Foundation is also focussing on making this data available for users: [Real Time Energy and Carbon Standard for Cloud Providers](https://github.com/Green-Software-Foundation/real-time-cloud)

## Using estimation models

If you cannot measure you have to estimate. We have written a prior [blog article](https://www.green-coding.berlin/blog/specpower-model-with-xgboost-open-sourced/) about how this can be done with an 
easy machine learning model and provided an [extensive documentation on Github](https://github.com/green-coding-berlin/spec-power-model) how to discover the needed input parameters.

However sometimes you need auxillary information like more details about the hypervisor and also which machine specific registers (MSRs) are accessible
on the machine as you might want to leverage some MSRs to provide more information about the machine.

A project that tries to leverage information here is [MSR Cloud Tools](https://github.com/brendangregg/msr-cloud-tools) from Brandon Gregg

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

## Checking MSRs directly

First you should check which hypervisor you are on to get a broad idea what to expect. Hyper-V, XEN etc. typically 
block similar registers by default, so this should be the starting point.

The easisest way to do this is to read from `dmidecode` or use the tool `virt-what`.

Secondly you need to know which CPU you are on to read the RAPL registers.

`cat /proc/cpuinfo` is the way to go.

- In Intel machines try the standard Intel Energy Register for the CPU-Package.
`sudo rdmsr -d 0x611`

For AMD this register will differ.

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

In the following you find the compiled list of the hypervisors and the readable registers we found in Github Shared runners, 
AWS and Hetzner.

## Github Shared Runner (Linux free)

#### Hypervisor
```
$ sudo virt-what
hyper-v
```

#### Readable MSRs
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

## Hetzner CX11
- Server type: [CX11](https://www.hetzner.com/de/cloud)
- CPU: Intel

### Hypervisor
```
$ sudo dmidecode | grep -i -e manufacturer -e product -e vendor
    Vendor: Hetzner
    Manufacturer: Hetzner
    Product Name: vServer
    Manufacturer: KVM
    Product Name: Standard PC (i440FX + PIIX, 1996)
    Manufacturer: QEMU
    Manufacturer: QEMU
    Manufacturer: QEMU

$ sudo grep -i -e virtual -e vbox -e xen /var/log/dmesg  # or /var/log/kern.log
[    0.030839] kernel: Booting paravirtualized kernel on KVM
[    2.562089] kernel: input: VirtualPS/2 VMware VMMouse as /devices/platform/i8042/serio1/input/input4
[    2.564923] kernel: input: VirtualPS/2 VMware VMMouse as /devices/platform/i8042/serio1/input/input3
[    5.039192] systemd[1]: Detected virtualization kvm.

$ sudo virt-what
kvm
```

## AWS - t2.micro / m5.metal - Amazon Linux 2023
- CPU: Intel
- Virtualization: HVM
- Root device Type: ems
- ENA enabled: True


### Hypervisor
```
$ sudo grep -i -e virtual -e vbox -e xen /var/log/dmesg  # or /var/log/kern.log
-> Log file not present / readable

$ sudo dmidecode | grep -i -e manufacturer -e product -e vendor
    Vendor: Xen
    Manufacturer: Xen
    Product Name: HVM domU
    Manufacturer: Xen
    Manufacturer: Intel
    Manufacturer: Not Specified

$ sudo virt-what
    xen
    xen-hvm
    aws    

```

### Readable MSRs

**Not possible as MSR tools could not be installed**

## AWS - t2.micro - Ubuntu Server 22.04 LTS (HVM)
- CPU: Intel
- Virtualization: HVM
- Root device Type: ems
- ENA enabled: True

### Hypervisor
```
$ sudo dmidecode | grep -i -e manufacturer -e product -e vendor
Vendor: Xen
    Manufacturer: Xen
    Product Name: HVM domU
    Manufacturer: Xen
    Manufacturer: Intel
    Manufacturer: Not Specified

$ sudo grep -i -e virtual -e vbox -e xen /var/log/dmesg  # or /var/log/kern.log
[    0.000000] kernel: DMI: Xen HVM domU, BIOS 4.11.amazon 08/24/2006
[    0.000000] kernel: Hypervisor detected: Xen HVM
[    0.000000] kernel: Xen version 4.11.
[    0.000000] kernel: platform_pci_unplug: Netfront and the Xen platform PCI driver have been compiled for this kernel: unplug emulated NICs.
[    0.000000] kernel: platform_pci_unplug: Blkfront and the Xen platform PCI driver have been compiled for this kernel: unplug emulated disks.
[    0.030363] kernel: ACPI: RSDP 0x00000000000EA020 000024 (v02 Xen   )
[    0.030368] kernel: ACPI: XSDT 0x00000000FC00C780 000054 (v01 Xen    HVM      00000000 HVML 00000000)
[    0.030374] kernel: ACPI: FACP 0x00000000FC00C440 0000F4 (v04 Xen    HVM      00000000 HVML 00000000)
[    0.030381] kernel: ACPI: DSDT 0x00000000FC003940 008A7E (v02 Xen    HVM      00000000 INTL 20090123)
[    0.030391] kernel: ACPI: APIC 0x00000000FC00C540 0000D8 (v02 Xen    HVM      00000000 HVML 00000000)
[    0.030394] kernel: ACPI: HPET 0x00000000FC00C690 000038 (v01 Xen    HVM      00000000 HVML 00000000)
[    0.030397] kernel: ACPI: WAET 0x00000000FC00C6D0 000028 (v01 Xen    HVM      00000000 HVML 00000000)
[    0.030401] kernel: ACPI: SSDT 0x00000000FC00C700 000031 (v02 Xen    HVM      00000000 INTL 20090123)
[    0.030404] kernel: ACPI: SSDT 0x00000000FC00C740 000033 (v02 Xen    HVM      00000000 INTL 20090123)
[    0.039044] kernel: Booting paravirtualized kernel on Xen HVM
[    0.039914] kernel: xen: PV spinlocks enabled
[    0.058854] kernel: xen:events: Using 2-level ABI
[    0.058991] kernel: xen:events: Xen HVM callback vector for event delivery is enabled
[    1.109476] kernel: clocksource: xen: mask: 0xffffffffffffffff max_cycles: 0x1cd42e4dffb, max_idle_ns: 881590591483 ns
[    1.117673] kernel: Xen: using vcpuop timer interface
[    1.117682] kernel: installing Xen timer for CPU 0
[    1.349992] kernel: xen: --> pirq=16 -> irq=9 (gsi=9)
[    1.692302] kernel: xen:balloon: Initialising balloon driver
[    1.783096] kernel: clocksource: Switched to clocksource xen
[    1.831423] kernel: xen: --> pirq=17 -> irq=8 (gsi=8)
[    1.831472] kernel: xen: --> pirq=18 -> irq=12 (gsi=12)
[    1.831513] kernel: xen: --> pirq=19 -> irq=1 (gsi=1)
[    1.831551] kernel: xen: --> pirq=20 -> irq=6 (gsi=6)
[    1.831605] kernel: xen: --> pirq=21 -> irq=4 (gsi=4)
[    2.242895] kernel: xen: --> pirq=22 -> irq=28 (gsi=28)
[    2.243082] kernel: xen:grant_table: Grant tables using version 1 layout
[    2.375368] kernel: xen_netfront: Initialising Xen virtual ethernet driver
[    3.593651] systemd[1]: Detected virtualization xen.

$ sudo virt-what
xen
xen-hvm
```

### Readable RAPL registers

Reading RAPL register:
```$ sudo modprobe msr && sudo rdmsr -d 0x611
0 
```
This indicates RAPL is blocked.

### Other readable MSRs


We have not repeated the definition for the registers here. Please look above or look for details in the [Intel documentation](https://cdrdv2.intel.com/v1/dl/getContent/671200).
```
- Register 0x0: 255
- Register 0x6: 64
- Register 0x10: 603403482639
- Register 0x1b: 4276096256
- Register 0x34: 496
- Register 0x35: 786456
- Register 0x3a: 1
- Register 0x3e: 1
- Register 0x53: 14
- Register 0x54: 1
- Register 0x8b: 313532612608
- Register 0x95: 1
- Register 0xce: -2308108226295568384
- Register 0xe2: 33794
- Register 0xe3: 301989888
- Register 0xe4: 66580
- Register 0xe7: 6383874673055843
- Register 0xe8: 7211909653676921
- Register 0xfe: 1288
- Register 0x13a: 17179869184
- Register 0x13c: 1
- Register 0x174: 16
- Register 0x175: -9223369837831532544
- Register 0x176: -9223372035506313168
- Register 0x178: 1
- Register 0x179: 16780290
- Register 0x198: 27655294425856
- Register 0x199: 7680
- Register 0x19b: 3
- Register 0x19c: 2285568000
- Register 0x1a0: 8722569
- Register 0x1a1: 4294708328
- Register 0x1a2: 5507584
- Register 0x1aa: 4194304
- Register 0x1ad: 1953184666628136478
- Register 0x1ae: 1953184666628070171
- Register 0x1af: 6939
- Register 0x1b1: 2285568000
- Register 0x1c6: 3
- Register 0x1e1: 6
- Register 0x1f0: 116
- Register 0x1f2: 2080374790
- Register 0x1f3: 4227860480
- Register 0x1f8: 1
- Register 0x1f9: 1
- Register 0x1fa: 124041
- Register 0x1fc: 688128088
- Register 0x200: 4026531840
- Register 0x201: 70368475744256
- Register 0x250: 434041037028460038
- Register 0x258: 434041037028460038
- Register 0x259: 72340172838076673
- Register 0x268: 434041037028460038
- Register 0x269: 434041037028460038
- Register 0x26a: 434041037028460038
- Register 0x26b: 434041037028460038
- Register 0x26c: 434041037028460038
- Register 0x26d: 434041037028460038
- Register 0x26e: 434041037028460038
- Register 0x26f: 434041037028460038
- Register 0x277: 290206224317088006
- Register 0x282: 1073741826
- Register 0x283: 1073741826
- Register 0x285: 1073741826
- Register 0x286: 1073741826
- Register 0x287: 1073741826
- Register 0x288: 1073741826
- Register 0x289: 1073741826
- Register 0x28a: 1073741826
- Register 0x28b: 1073741826
- Register 0x28c: 1073741826
- Register 0x28d: 1073741826
- Register 0x28e: 1073741826
- Register 0x28f: 1073741826
- Register 0x290: 1073741826
- Register 0x291: 1073741825
- Register 0x292: 1073741825
- Register 0x293: 1073741825
- Register 0x294: 1073741826
- Register 0x2e7: 9
- Register 0x2ff: 3078
- Register 0x300: 2147516160
- Register 0x345: 12996
- Register 0x3f6: 65535
- Register 0x3f8: 322630040963928
- Register 0x3f9: 23796185160
- Register 0x3fc: 37494421238871576
- Register 0x3fd: 373946010480
- Register 0x400: -9223372036854775807
- Register 0x404: -9223372036854775807
- Register 0x408: 15
- Register 0x40c: 15
- Register 0x410: 127
- Register 0x414: 2155806733
- Register 0x418: 3
- Register 0x41c: 63
- Register 0x41f: 134
- Register 0x420: 63
- Register 0x423: 134
- Register 0x424: 127
- Register 0x428: 127
- Register 0x42c: 127
- Register 0x430: 127
- Register 0x434: 127
- Register 0x438: 127
- Register 0x43c: 127
- Register 0x440: 127
- Register 0x444: 16777215
- Register 0x445: 9007199254740992
- Register 0x447: 128
- Register 0x448: 16777215
- Register 0x449: 9007199254740992
- Register 0x44b: 128
- Register 0x44c: 16777215
- Register 0x44d: 9007199254740992
- Register 0x44f: 128
- Register 0x450: 2155806733
- Register 0x601: 4525677906756720
- Register 0x603: 6192449489476636
- Register 0x606: 658947
- Register 0x60d: 890380772649432
- Register 0x610: 2116010129064896
- Register 0x614: 13237570274591680
- Register 0x61c: 13229804944425068
- Register 0x620: 3102
- Register 0x621: 30
- Register 0x622: 1
- Register 0x648: 24
- Register 0x649: 68688140655985600
- Register 0x64a: 68688140654608384
- Register 0x64c: 24
- Register 0x690: 3305160960
- Register 0x702: 12
- Register 0x710: 196608
- Register 0x71d: 3095117578
- Register 0x720: 196608
- Register 0x72a: 196608
- Register 0x734: 196608
- Register 0x73e: 196608
- Register 0x790: 1
- Register 0x803: 327700
- Register 0x808: 16
- Register 0x80a: 16
- Register 0x80d: 1
- Register 0x80f: 511
- Register 0x832: 65536
- Register 0x833: 65536
- Register 0x834: 65536
- Register 0x835: 67328
- Register 0x836: 1024
- Register 0x837: 254
- Register 0xc80: 1073741824
- Register 0xc8b: 393216
- Register 0xc8c: 168128522485365423
- Register 0xc90: 1048575
- Register 0xc91: 1048575
- Register 0xc92: 1048575
- Register 0xc93: 1048575
- Register 0xe00: 196608
- Register 0xe05: 64
- Register 0xe10: 196608
- Register 0xe15: 64
- Register 0xe20: 196608
- Register 0xe25: 64
- Register 0xe30: 196608
- Register 0xe35: 64
- Register 0xe40: 196608
- Register 0xe45: 64
- Register 0xe50: 196608
- Register 0xe55: 64
- Register 0xe60: 196608
- Register 0xe65: 64
- Register 0xe70: 196608
- Register 0xe75: 64
- Register 0xe80: 196608
- Register 0xe85: 64
- Register 0xe90: 196608
- Register 0xe95: 64
- Register 0xea0: 196608
- Register 0xea5: 64
- Register 0xeb0: 196608
- Register 0xeb5: 64

```

## AWS - m5.metal - Ubuntu Server 22.04 LTS (HVM)
- CPU: Intel
- Virtualization: HVM
- Root device Type: ems
- ENA enabled: True

### Hypervisor
```
$ sudo dmidecode | grep -i -e manufacturer -e product -e vendor
    Vendor: Amazon EC2
    Manufacturer: Amazon EC2
    Product Name: m5.metal
    Manufacturer: Amazon EC2
    Product Name: Not Specified
    Manufacturer: Amazon EC2
    Manufacturer: Kingston
    ...

$ sudo grep -i -e virtual -e vbox -e xen /var/log/dmesg  # or /var/log/kern.log
[    1.185093] kernel: Booting paravirtualized kernel on bare hardware

$ sudo virt-what
aws
```

### Readable RAPL register

Reading RAPL register:
```$ sudo modprobe msr && sudo rdmsr -d 0x611
128867107
```
This indicates RAPL is working!

### Other readable MSRs

We have not repeated the definition for the registers here. Please look above or look for details in the [Intel documentation](https://cdrdv2.intel.com/v1/dl/getContent/671200).

As you can see however it is almost double the amount of readable registers than in non-bare-metal instances.

```
- Register 0: 4095
- Register 0x6: 64
- Register 0x10: 144923609306526
- Register 0x1b: 4276096256
- Register 0x20: 5369942582412474524
- Register 0x21: 1255018246419400495
- Register 0x22: -6317074202862438934
- Register 0x23: 1237677046228116370
- Register 0x34: 1760
- Register 0x35: 1572912
- Register 0x3a: 1048581
- Register 0x3e: 1
- Register 0x48: 1
- Register 0x4e: 2
- Register 0x4f: -1693716087593370223
- Register 0x54: 1
- Register 0x55: 256
- Register 0x56: 1507328
- Register 0x59: 1
- Register 0x5f: 134152195
- Register 0x63: 7
- Register 0x64: 31
- Register 0x8b: 360344058167558144
- Register 0xbb: 52588043428700029
- Register 0xc4: 65535
- Register 0xce: -1983712023615744
- Register 0xe2: 33794
- Register 0xe3: 421527552
- Register 0xe4: 66836
- Register 0xe7: 143575448931431
- Register 0xe8: 143576992792209
- Register 0xfe: 11530
- Register 0x102: 2
- Register 0x10a: 699563
- Register 0x110: 1
- Register 0x118: 458
- Register 0x122: 3
- Register 0x128: -2050234112
- Register 0x129: 3221241801
- Register 0x12a: 294160520
- Register 0x13a: 17179869184
- Register 0x13c: 1
- Register 0x150: 133143986176
- Register 0x152: 268875170
- Register 0x154: 193
- Register 0x155: 193
- Register 0x156: 193
- Register 0x157: 193
- Register 0x174: 16
- Register 0x175: -9223369837831532544
- Register 0x176: -9223372035040745424
- Register 0x178: 1
- Register 0x179: 251661332
- Register 0x17f: 128
- Register 0x198: 27960237103360
- Register 0x199: 8960
- Register 0x19b: 3
- Register 0x19c: 2285436928
- Register 0x1a0: 8716425
- Register 0x1a1: 4294716804
- Register 0x1a2: 6097408
- Register 0x1a3: 190971903
- Register 0x1a5: 65535
- Register 0x1aa: 4206656
- Register 0x1ad: 2242546461803815203
- Register 0x1ae: 2024390091656922114
- Register 0x1b0: 6
- Register 0x1b1: 2285305856
- Register 0x1b2: 3
- Register 0x1c6: 3
- Register 0x1d9: 16384
- Register 0x1e1: 6
- Register 0x1f0: 116
- Register 0x1f2: 3087007750
- Register 0x1f3: 4160751616
- Register 0x1f9: 1
- Register 0x1fb: 224
- Register 0x1fc: 688128088
- Register 0x200: 6
- Register 0x201: 70093866272768
- Register 0x202: 274877906950
- Register 0x203: 70231305226240
- Register 0x204: 412316860422
- Register 0x205: 70367670437888
- Register 0x206: 3221225472
- Register 0x207: 70367670437888
- Register 0x208: 2952790016
- Register 0x209: 70368677070848
- Register 0x250: 434041037028460038
- Register 0x258: 434041037028460038
- Register 0x277: 290206224317088006
- Register 0x280: 1073741825
- Register 0x281: 1073741825
- Register 0x282: 1073741825
- Register 0x283: 1073741825
- Register 0x285: 1073741825
- Register 0x286: 1073741825
- Register 0x287: 1073741825
- Register 0x288: 1073741825
- Register 0x289: 1073741825
- Register 0x28a: 1073741825
- Register 0x28b: 1073741825
- Register 0x28c: 1073741825
- Register 0x28d: 1073741825
- Register 0x28e: 1073741825
- Register 0x28f: 1073741825
- Register 0x290: 1073741825
- Register 0x291: 1073741825
- Register 0x292: 1073741825
- Register 0x293: 1073741825
- Register 0x2e7: 9
- Register 0x2ff: 3072
- Register 0x300: -2050234112
- Register 0x30a: 281465054746875
- Register 0x345: 13253
- Register 0x38d: 176
- Register 0x38f: 30064771087
- Register 0x392: -8589934592
- Register 0x3f6: 65535
- Register 0x3f7: 2048
- Register 0x3f9: 426593419750
- Register 0x3fd: 496568522900
- Register 0x400: 4095
- Register 0x404: 15
- Register 0x408: 15
- Register 0x40c: 31
- Register 0x410: 127
- Register 0x414: 2151612447
- Register 0x418: 3
- Register 0x41c: 65533
- Register 0x41f: 134
- Register 0x420: 65533
- Register 0x423: 134
- Register 0x424: 4290248191
- Register 0x427: 128
- Register 0x428: 4290248191
- Register 0x42b: 128
- Register 0x42c: 4290248191
- Register 0x42f: 128
- Register 0x430: 2151612447
- Register 0x434: 67108863
- Register 0x438: 67108863
- Register 0x43c: 67108863
- Register 0x440: 67108863
- Register 0x444: 67108863
- Register 0x448: 67108863
- Register 0x44c: 2151612447
- Register 0x480: 61365942969434116
- Register 0x481: 1095216660502
- Register 0x482: -9221683178471809394
- Register 0x483: 144115183781113343
- Register 0x484: 1125895611879935
- Register 0x485: 1879359975
- Register 0x486: 2147483681
- Register 0x487: 4294967295
- Register 0x488: 8192
- Register 0x489: 7825407
- Register 0x48a: 46
- Register 0x48b: 170996044056756224
- Register 0x48c: 16497077600577
- Register 0x48d: 1095216660502
- Register 0x48e: -9221683178471711090
- Register 0x48f: 144115183781113339
- Register 0x490: 1125895611879931
- Register 0x491: 1
- Register 0x4c4: 65535
- Register 0x4d0: 1
- Register 0x561: 127
- Register 0x600: -9223369837831630848
- Register 0x601: 2147485688
- Register 0x603: 6192449489147671
- Register 0x606: 658947
- Register 0x608: 4196098
- Register 0x60d: 8042148375
- Register 0x610: 993821073901200
- Register 0x611: 147523042
- Register 0x614: 4237655287531152
- Register 0x615: 3613262447
- Register 0x618: 2147483648
- Register 0x619: 98927161
- Register 0x61c: -4223490453602610
- Register 0x620: 3096
- Register 0x621: 24
- Register 0x622: 1
- Register 0x637: 1449488196225
- Register 0x648: 25
- Register 0x649: 75450824361510544
- Register 0x64a: 75450824361510544
- Register 0x64b: 2147483648
- Register 0x64c: 2147483648
- Register 0x64e: 92351318912
- Register 0x64f: 3758096384
- Register 0x6e0: 144951532283964
- Register 0x702: 26
- Register 0x71d: 4168002429
- Register 0x770: 1
- Register 0x771: 118233379
- Register 0x772: 2147548928
- Register 0x774: 8995
- Register 0x777: 4
- Register 0x790: 1
- Register 0x803: 17170453
- Register 0x808: 16
- Register 0x80a: 16
- Register 0x80d: 1
- Register 0x80f: 511
- Register 0x82f: 249
- Register 0x830: 563087392377083
- Register 0x832: 262380
- Register 0x833: 250
- Register 0x834: 1024
- Register 0x835: 67328
- Register 0x836: 1024
- Register 0x837: 254
- Register 0xa01: 395288576
- Register 0xa40: 196608
- Register 0xa45: 45925850401
- Register 0xa48: 140668768878592
- Register 0xa49: 140668768878592
- Register 0xa4a: 140668768878592
- Register 0xa4b: 140668768878592
- Register 0xa58: 196608
- Register 0xa60: 196608
- Register 0xa65: 46026894820
- Register 0xa68: 140668768878592
- Register 0xa69: 140668768878592
- Register 0xa6a: 140668768878592
- Register 0xa6b: 140668768878592
- Register 0xa78: 196608
- Register 0xa80: 196608
- Register 0xa85: 46130277905
- Register 0xa88: 140668768878592
- Register 0xa89: 140668768878592
- Register 0xa8a: 140668768878592
- Register 0xa8b: 140668768878592
- Register 0xa98: 196608
- Register 0xaa0: 196608
- Register 0xaa5: 62724719646
- Register 0xaa8: 140668768878592
- Register 0xaa9: 140668768878592
- Register 0xaaa: 140668768878592
- Register 0xaab: 140668768878592
- Register 0xab8: 196608
- Register 0xb01: 67020492813
- Register 0xb03: 595968
- Register 0xb05: 53050653
- Register 0xb07: 1157120
- Register 0xb08: 48121811551
- Register 0xb09: 55594872189
- Register 0xb0a: 46556358240
- Register 0xb0b: 46559622289
- Register 0xb0c: 46563102507
- Register 0xb0d: 46566287113
- Register 0xb0e: 46569658761
- Register 0xb0f: 46572714680
- Register 0xb18: 46601193639
- Register 0xb19: 46604614177
- Register 0xb1a: 46607865710
- Register 0xb1b: 46610874472
- Register 0xb1c: 46613920819
- Register 0xb1d: 46616952802
- Register 0xb1e: 46619992516
- Register 0xb1f: 46623645612
- Register 0xb28: 46652051849
- Register 0xb29: 46655074441
- Register 0xb2a: 46658255786
- Register 0xb2b: 46661718489
- Register 0xb2c: 46664785878
- Register 0xb2d: 46667918104
- Register 0xb2e: 46671157639
- Register 0xb2f: 46674630615
- Register 0xb30: 7542967
- Register 0xb32: 75493123
- Register 0xb34: 1200656
- Register 0xb36: 122782549
- Register 0xb38: 2478338282
- Register 0xb39: 31739630220
- Register 0xb3a: 2468081382
- Register 0xb3b: 31739343680
- Register 0xb3c: 2500138793
- Register 0xb3d: 31781372034
- Register 0xb3e: 2480900182
- Register 0xb3f: 31750841684
- Register 0xc80: 1073741824
- Register 0xc8b: 1536
- Register 0xc8c: 1375093236579302063
- Register 0xc90: 2047
- Register 0xc91: 2047
- Register 0xc92: 2047
- Register 0xc93: 2047
- Register 0xc94: 2047
- Register 0xc95: 2047
- Register 0xc96: 2047
- Register 0xc97: 2047
- Register 0xc98: 2047
- Register 0xc99: 2047
- Register 0xc9a: 2047
- Register 0xc9b: 2047
- Register 0xc9c: 2047
- Register 0xc9d: 2047
- Register 0xc9e: 2047
- Register 0xc9f: 2047
- Register 0xe00: 196608
- Register 0xe05: 512
- Register 0xe06: 51
- Register 0xe10: 196608
- Register 0xe15: 512
- Register 0xe16: 51
- Register 0xe20: 196608
- Register 0xe25: 512
- Register 0xe26: 51
- Register 0xe30: 196608
- Register 0xe35: 512
- Register 0xe36: 51
- Register 0xe40: 196608
- Register 0xe45: 512
- Register 0xe46: 51
- Register 0xe50: 196608
- Register 0xe55: 512
- Register 0xe56: 51
- Register 0xe60: 196608
- Register 0xe65: 512
- Register 0xe66: 51
- Register 0xe70: 196608
- Register 0xe75: 512
- Register 0xe76: 51
- Register 0xe80: 196608
- Register 0xe85: 512
- Register 0xe86: 51
- Register 0xe90: 196608
- Register 0xe95: 512
- Register 0xe96: 51
- Register 0xea0: 196608
- Register 0xea5: 512
- Register 0xea6: 51
- Register 0xeb0: 196608
- Register 0xeb5: 512
- Register 0xeb6: 51
- Register 0xec0: 196608
- Register 0xec5: 512
- Register 0xec6: 51
- Register 0xed0: 196608
- Register 0xed5: 512
- Register 0xed6: 51
- Register 0xee0: 196608
- Register 0xee5: 512
- Register 0xee6: 51
- Register 0xef0: 196608
- Register 0xef5: 512
- Register 0xef6: 51
- Register 0xf00: 196608
- Register 0xf05: 512
- Register 0xf06: 51
- Register 0xf10: 196608
- Register 0xf15: 512
- Register 0xf16: 51
- Register 0xf20: 196608
- Register 0xf25: 512
- Register 0xf26: 51
- Register 0xf30: 196608
- Register 0xf35: 512
- Register 0xf36: 51
- Register 0xf40: 196608
- Register 0xf45: 512
- Register 0xf46: 51
- Register 0xf50: 196608
- Register 0xf55: 512
- Register 0xf56: 51
- Register 0xf60: 196608
- Register 0xf65: 512
- Register 0xf66: 51
- Register 0xf70: 196608
- Register 0xf75: 512
- Register 0xf76: 51
- Register 0xf80: 196608
- Register 0xf85: 512
- Register 0xf86: 51
- Register 0xf90: 196608
- Register 0xf95: 512
- Register 0xf96: 51
- Register 0xfa0: 196608
- Register 0xfa5: 512
- Register 0xfa6: 51
- Register 0xfb0: 196608
- Register 0xfb5: 512
- Register 0xfb6: 51

```

## Beware the truthiness

Cloud providers change the returned values of system calls directly in the Hypervisor.

So what you are getting in return from for instance a `CPUID` syscall might not be
what the CPU is really capable of ([Details](https://security.stackexchange.com/questions/220357/fake-output-of-cpuid-instruction) )

So as so often feature probing is more helpful than settings probing.

## Find out if your CPU is overprovisioned

Overprovisioning means that the vCPU you are having is not actually assigned to you fully.

This is very important as even if you have the possibility of deriving any energy metric it might be that you are mal-
attributing due to over-provisioning.

An example would be: A 12 thread machine, which would normally be able to have 12 vCPUs hosts actually 
24 clients. Every vCPU is here assigned to two clients in parallel.

One way to check that for instance is to look at the **steal** time of the CPU.

When looking at `/proc/stat` in Linux steal is the 3rd last entry. If this value is != 0
then this indicates that CPU time was assigned to somebody else also using same vCPU.

```bash
$ cat /proc/stat
cpu  12965 116 1692 22801 532 0 71 0 0 0
...................................^ this is steal
```

The official text from the RHEL documentation:

> Steal time is the amount of CPU time needed by a guest virtual machine that is not provided by the host. Steal time occurs when the host allocates these resources elsewhere: for example, to another guest.

We do not know how the support or possibility is for hypervisors to fake this value for the guest, but as a general rule of thumb you should never trust
any values that you get in a VM in the cloud.

## White Hat alternative

What you technically can do though is to probe your cpu for features like first 
starting with `cat /proc/cpuinfo` and looking only for true values. 
Then looking at the speed and flags and try to derive the model from there.


Or you can do feature probing to run custom code and see how your processor behaves.

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

This is to be done in a future post.
