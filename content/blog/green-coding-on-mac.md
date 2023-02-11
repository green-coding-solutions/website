---
title: "Green Coding on Mac"
date: 2023-02-11
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
---

# Green Coding on Mac

When we started with the [Green Metrics Tool (GMT)](/projects/green-metrics-tool) we set out to develop tooling to enable developers, decision makers and the wider public to measure and see the impact software is having on the environment. 

This has lead us to develop great software but till today this was limited to Linux machines exclusively. As discussed in my previous blog article ****[Containers on macOS for the Green Metrics Tool](/blog/containers-on-macos-for-gmt/)** its pretty much impossible to get reliable measurements because of the way docker works on macOS. In this respect we will run into the same problems when porting to Windows at some stage. So we ware limited to Linux machines to get good results and hence this is what we focused on at the beginning. 

But loads of developers, including myself, use a MacBook and switching to Linux for the sake of just developing (not measuring) is cumbersome and at the end of the day is not done. So we decided to take the best of both worlds.

## Running the GMT on Mac

It is now possible to run the GMT on your Mac and also get some measurements that correlate to the actual impact but are in no way reliable or correct. To get correct measurements you can update your git repo with the `usage_scenario.yml` and the run it on our [GMT cloud runner](https://metrics.green-coding.berlin).

{{< rawhtml >}}
<img class="ui floated right rounded bordered image" src="/img/blog/gmt-cloud-runner.webp" alt="Green Metrics Tool cloud runner dashboard" loading="lazy">
{{< /rawhtml >}}

This will run the job on our cluster with loads of additional sensors so you can get good, correct and reliable results which isn’t possible on macOS. But you can do all your development work, debugging and initial testing on Mac and use the tooling you prefer. 

This removes the burden for the developer to set up a correct measurement environment. There is a detailed description on how to install the GMT on an Mac in the documentation: [https://docs.green-coding.berlin/docs/installation/installation-mac](https://docs.green-coding.berlin/docs/installation/installation-overview/) 

Under the hood the Green Metrics Tool uses the `powermetrics` tool to collect all the metrics of the containers. However it brushes them nicely up visually, collects auxillary data and aggregates them up as you are used from the Green Metrics Tool on Linux.

## Why is the measurement flagged as invalid?

{{< rawhtml >}}
<img class="ui floated right rounded bordered image" src="/img/blog/gmt-on-mac-measurement.webp" alt="Green Metrics Tool cloud runner dashboard" loading="lazy">
{{< /rawhtml >}}

When you have installed the GMT and look at the results on the metrics dashboard you will get a message that your measurement has been marked as invalid. This is because all the values are good guesses at most and in the worst case can be totally wrong. Normally they give you quite a good indication on what is going on but especially if you are running multiple docker containers that are not part of the GMT results will not reflect what you are trying the benchmark. So hence we markt the test as invalid so that it is clear right away. 

## How can I restrict measurements?

In some cases it might make sense to only allow certain platforms for runs. Because we run docker to abstract the program that is measured it should run in most cases but there is still the option to restrict projects to certain hardware platforms. This is done using the `architecture:` key in the `usage_scenario.yml` so if you want to only allow a measurement on Linux your config file could look like:

```yaml
name: Only run on Linx
author: Tester Mc Demo
version: 1
architecture: linux

services: ...

flow: ...
```

You could also set `darwin` to just restrict to macOS / OS X systems but we strongly discourage this.