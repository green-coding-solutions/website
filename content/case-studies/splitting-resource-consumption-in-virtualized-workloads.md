---
title: "CPU Utilization - A useful metric?"
draft: false
summary: "In this case study we will look at the ubiquitous metric CPU utilization and how helpful it is in evaluating
code performance or energy consumption"
date: 2023-06-26 11:00:00
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"

---

In the Green Software niche very often the question comes up: "How can I measure the energy of a virtualized workload"

Here *virtualized workload* can be a *docker container*, a single process or a classical VM.

Other tools have solved this with their own approaches (Kepler for containers, Scaphandre for processes) with their respective downsides. (See our article [CPU Utilization - A useful metric?]({{< relref path="case-studies/cpu-utilization-usefulness" >}}))

We have argued in the past already that the resource splitting approach by a divisor like CPU time only works in DVFS-fixed systems. Otherwise the output is plain bogus.

However in this article we want to explore an even deeper issue: What happens if your workloads trigger load that your measurement mode does NOT attribute to the workload itself?

Such a discrepancy can occur if for instance you trigger an event that will be asynchronously processed. Thus if you only look at the CPU time of the process itself (even when you include kernel time) it will not be mapped.
Linux has the famous *kernel workers* that for instance handle such events.

A classic case is if you use a HID device and the input has to be processed separately.

So what is the use case we have encountered:
- We have made a Blue Angel use case with a web based application in a client-server setup
- The server was a classic web server serving a HTTP based frontend
- The client was a browser. We automated it via Playwright.

## Insights


### Testing Playwright in headed mode with Wayland window server

- https://metrics.green-coding.io/stats.html?id=3d3df2a9-3040-47a8-aca4-5a42d79d8497
- System at 55.24 %
- Browser at 25.44%
- Difference incl. all other containers > 25%

So what is happening here? Is it maybe because we are running in a container and are binding to the `/tmp/.X11-unix` socket which gets funneled to *Wayland* through the *XWayland* bridge?

### Testing Playwright in headed mode with X window server

- No difference
- Measurement missing

### Testing with Playwright in Headless mode

- https://metrics.green-coding.io/stats.html?id=4fda9bf1-aeaf-4eff-9351-6f37589f7fb9
- System at 24.76%
- Browser at 21.04%
- Difference incl. all other containers < 1%

So what now. Is maybe the headed mode of Playwright somehow broken?
Or is it because we are running inside a container?
Maybe we try Puppeteer and and even Selenium ...

### Testing with Playwright in Headed mode on the host OS

- https://metrics.green-coding.io/stats.html?id=befd28e4-8cfe-43c4-a857-20d2cd870daf
- System at 50.54%
- Browser at 24.11%
- Difference incl. all other containers > 25%

No ... thats not it. The problem still persists

Is it maybe Firefox? Maybe Chrome does not have the problem?

### Testing with Playwright in Headed mode on the host OS

- https://metrics.green-coding.io/stats.html?id=35203a0f-cb06-4c5d-b720-11d99f52bb9e
- System at 49.19%
- Browser at 22.09%
- Difference incl. all other containers > 25%

No ... thats not it. The problem still persists

Ok ... on to trying Puppeteer and Selenium.

### Testing with Puppeteer in Headed mode

- https://metrics.green-coding.io/stats.html?id=458318f2-1605-4ac0-9b07-062198969441
- System at 29.95%
- Browser at 14.59%
- Difference incl. all other containers > 10%

Ok ... better. But still quite a gap. Seems the library is just all in all more efficient but still has the same problem.

### Testing with Selenium in Headed mode

- https://metrics.green-coding.io/stats.html?id=9e5db107-7f6a-46b7-a599-f299811f2e7e
- System at 47.91%
- Browser at 21.30%
- Difference incl. all other containers > 25%

Ok ... We are back to ground zero :) 
So although Selenium claims to have very native interaction it still has this overhead issue.

Hmm ... maybe we try ACTUAL native? Why not connect a keyboard and a mouse and actually input stuff ourselves?

### Testing with manual input through Keyboard and Mouse

- https://metrics.green-coding.io/stats.html?id=ad17c272-46cc-459c-910c-b5245f92cf66
- System at 28.47%
- Browser at 9.77%
- Difference incl. all other containers > 15%

What we see is that using Firefox directly and not having it automated is all in all quite more efficient. However the overhead remains.

Processing HID devices in Linux is still quite a beast. Especially when you have a bit of an older machine as the Blauer Engel requires it (> 5 years old).

The relevant workers are nicely displayed here:

```top
top - 10:04:01 up  1:46,  4 users,  load average: 3.25, 2.25, 1.68
Tasks: 252 total,   3 running, 249 sleeping,   0 stopped,   0 zombie
%Cpu(s): 30.0 us, 26.9 sy,  0.0 ni, 43.1 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :  15856.7 total,   10725.4 free,   3412.9 used,   3375.7 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.  12443.8 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                                                
21050 root      20   0       0      0      0 R  98.3   0.0   1:58.73 kworker/u16:0+events_unbound                                            
 1073 gc        20   0 4940932 417160 144780 S  74.5   2.6  11:30.90 gnome-shell                                                             
29763 gc        20   0 3267936 438520 214496 S  32.8   2.7   1:14.33 firefox-bin                                                             
 1437 gc        20   0 2711920 106404  91340 R  19.9   0.7   3:08.50 Xwayland                                                                 
28085 gc        20   0 2587948 166148 120164 S   0.7   1.0  13:13.67 Isolated Web Co                                                          
  636 root      20   0  724828 134080   9480 S   0.1   0.8   0:30.31 sysbox-mgr                                                               
  735 polkitd   20   0  384060  10400   7728 S   0.3   0.1   0:00.55 polkitd                                                                  
    1 root      20   0   22552  13504   9280 S   0.0   0.1   0:01.61 systemd                                                                   
    2 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kthreadd       
```

Noticable is the kernel worker *kworker/u16:0+events_unbound* and also quite high consuming *gnome-shell* process.
For the latter the browser is doing some rendering via the CPU (seen bc the command string contains some `llvmpipe` part) and this is quite expensive. If you do rendering on the GPU this will not be present.


### Using VMs

So how this this get better if we use VMs?

We should isolate the workload bc we are also giving it a kernel, right?


#### Anomaly in top

#### Better view in htop


#### How much overhead does the VM produce?
- Put VM in separate cgroup and log that in GMT
- Calculate the Overhead

===> Is there still a kernel worker thread?!?!