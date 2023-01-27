---
title: "Containers on macOS for the Green Metrics Tool"
date: 2023-01-27
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
---

Many of our developers work on macOS exclusively.
In order to create a nicer development experience, we are currently undergoing some work to port our Green Metrics Tool to macOS.

This post is an intro to the underlying container mechanics that we use on Linux and how they work on macOS.

# How docker works on arm Macs

While porting the Green Metrics Tool to mac I started wondering how docker actually works on mac. I have quite a good understanding on how it works under Linux as this seems to be the native docker environment but how does docker get onto mac and how does it actually run? While docker is normally quite good documentation wise I couldn’t find anything for this specific topic.

This is a quite high level overview and discussion and in no way complete.

## How does docker work under Linux.
{{< rawhtml >}}
<img class="ui large floated right rounded bordered image" src="/img/blog/linux-containers.webp" alt="Diagram of linux containers architecture" loading="lazy">
{{< /rawhtml >}}

First we need to discuss how docker works in it’s native environment, Linux. Docker uses features in the Linux kernel called [namespaces](https://en.wikipedia.org/wiki/Linux_namespaces), [cgroups](https://en.wikipedia.org/wiki/Cgroups) and many more. This technology enables processes to only see certain parts of resources previously allocated to them. Like this every docker process can be isolated from the rest of the operating system and only manage what has been allocated. The vita point is that the docker container basically runs in an isolated part of the Linux kernel. 

This is in contrast to “classical” virtualisation. Which builds a totally new operating system, incuding kernel etv, on top of the so called host system. 

 A super simplified view on how the Docker container is run



## So how does docker work on other systems.
{{< rawhtml >}}
<img class="ui large floated right rounded bordered image" src="/img/blog/macos-vm-containers.webp" alt="Diagram of macOS containers architecture" loading="lazy">
{{< /rawhtml >}}

Because docker can not rely on namespaces on other systems like Mac it needs to do a little trick. 

Just to mention it: Windows is a special case and will be discussed in another article once we port the Green Metrics Tool to windows (at some stage).

To run docker containers on Mac docker uses a virtual machine that runs Linux. So it adds a totally new operating system via virtualisation.


You can see this in the Docker desktop app which gives you the option to either use the new [virtualisation framework](https://developer.apple.com/documentation/virtualization) from apple or [qemu](https://www.qemu.org/). If you don’t know about apples virtualisation framework is is worth a read as it lets you spin up VMs with ease. 

Looking at your processes running on your host you can’t see any containers as they are encapsulated in the VM. The only thing you see is the VM as you can see from this line from `ps`

```bash
501 15207 15188   0  9:06PM ??         0:25.61 /Applications/Docker.app/Contents/MacOS/qemu-system-aarch64 -accel hvf -cpu host -machine virt,highmem=off -m 8092 -smp 4 -kernel /Applications/Docker.app/Contents/Resources/linuxkit/kernel -append page_poison=1 vsyscall=emulate panic=1 nospec_store_bypass_disable noibrs noibpb no_stf_barrier mitigations=off linuxkit.unified_cgroup_hierarchy=1    vpnkit.connect=tcp+bootstrap+client://192.168.65.2:52436/6bd3c43205d2e38a101ff4a22191af5bb947845a420aaad097305ef937474f33 vpnkit.disable=osxfs-data console=ttyAMA0 -initrd /Applications/Docker.app/Contents/Resources/linuxkit/initrd.img -serial pipe:/var/folders/dz/z2d2thkj76j2fxm_932w8qn80000gn/T/qemu-console2891520672/fifo -drive if=none,file=/Users/didi/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw,format=raw,id=hd0 -device virtio-blk-pci,drive=hd0,serial=dummyserial -netdev socket,id=net1,fd=3 -device virtio-net-device,netdev=net1,mac=02:50:00:00:00:01 -vga none -nographic -monitor none
```

An interesting point is that docker is using the Arm emulation binary `[qemu-system-aarch64](https://www.qemu.org/docs/master/system/target-arm.html)` as all containers I am running are build for arm. This might become a separate article in the future but for now the main points are that you can build containers for different architectures and docker will always try to use the one for the arch it is running on. It is however possible to run containers that are build for different architectures as we are running everything in a VM and qemu can pretty much emulate [anything](https://www.qemu.org/docs/master/system/targets.html). 

## So what does this mean for you as a user:

Docker on Mac will always be slower as running docker on Linux. Through adding the extra virtualisation layer it creates quite an overhead when running anything in docker. But the docker tool does quite a good job at hiding all the nifty details. 

## And for running the Green Metrics Tool on Mac:

The Green Metrics Tool (GMT) relies on Docker to isolate the single components that are needed to 

a) run the support infrastructure for measuring like DB and our Web frontend 

b) run the actual app in containers so we can measure the impact each piece of the app has

As on Mac everything is isolated in a VM that isn’t easy to connect to from the host and doesn’t expose detailed analytics we can only ever benchmark the whole VM or even the whole machine. Unfortunately this isn’t good enough to rely on the data to make any decisions. So the GMT will never be a trusted source on Mac whereas it will make the development flow a log easier as you can test your setup and then delegate it to a Linux machine for reliable results.

## Some interesting articles I found on the way:

- Shows how to replace the linuxkit vm with something you built yourself: [https://www.codeluge.com/post/setting-up-docker-on-macos-m1-arm64-to-use-debian-10.4-docker-engine/](https://www.codeluge.com/post/setting-up-docker-on-macos-m1-arm64-to-use-debian-10.4-docker-engine/)
- [https://zarinfam.medium.com/what-are-the-advantages-of-the-new-virtualization-framework-in-macos-big-sur-7685c3aca0f7](https://zarinfam.medium.com/what-are-the-advantages-of-the-new-virtualization-framework-in-macos-big-sur-7685c3aca0f7)
- [https://www.ginkgobioworks.com/2022/07/19/using-docker-on-apple-silicon/](https://www.ginkgobioworks.com/2022/07/19/using-docker-on-apple-silicon/)
- [https://earthly.dev/blog/using-apple-silicon-m1-as-a-cloud-engineer-two-months-in/](https://earthly.dev/blog/using-apple-silicon-m1-as-a-cloud-engineer-two-months-in/)