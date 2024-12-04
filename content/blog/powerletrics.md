---
title: "Alpha release of PowerLetrics"
date: 2024-12-03
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/greenkernel.webp"

---

Measuring the resource consumption of software is quite a complex topic. When we started working on the [Green Metrics Tool](https://www.green-coding.io/products/green-metrics-tool/) we couldn't imagine the ride this would take us on. From studying the Linux Kernel to building out own [cluster](https://metrics.green-coding.io/request.html). While this is needed to get accurate readings this is often too much overhead for a quick check what is going on. So we started to think about what such a tool needed to do. While I was developing our power logging solution for macOS, the [PowerHog](https://www.green-coding.io/products/power-hog/) I really came to like the simplicity of the macOS [powermetrics](https://firefox-source-docs.mozilla.org/performance/powermetrics.html) program. You can just fire it up and get per process energy metrics. You could pipe it into sed/awk and get fairly good data really easily. Even Windows has something similar. So does no tool like this exists under Linux?

We were really lucky to get funding from the [Green Screen Coalitions Catalyst Fund](https://greenscreen.network/en/blog/announcing-the-new-catalyst-fund-awardees/) to do exactly this.

I am really happy to reale the alpha version of our powermetrics to port to Linux. Hence we call it power**l**etrics.

[https://github.com/green-kernel/powerletrics](https://github.com/green-kernel/powerletrics)

![How it looks](https://raw.githubusercontent.com/green-kernel/powerletrics/refs/heads/main/Screenshot.png "PowerLetrics in action")

## Install

You can just do :

```bash
$ sudo apt-get install bpfcc-tools linux-headers-$(uname -r) || sudo dnf install bcc
$ pip install powerletrics
$ powerletrics
```

and this should do all the heavy lifting for you. Please see the repos page for more details.

This is only the first step in in giving you a simple toolset so see per process energy metrics on Linux.

We would love to get your feedback and improve on this release.

And yes we also have a little server you can start with

```bash
powerletrics -s
```

![How the HTML server looks](https://raw.githubusercontent.com/green-kernel/powerletrics/refs/heads/main/Screenshot_Server.png "PowerLetrics bundled HTML server")
