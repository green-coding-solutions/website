---
title: "Increasing docker stats resolution"
date: 2022-01-13 19:00:00
draft: false
author: "Arne Tarara"
---

The initial preview version of the Green Metrics Tool had only one Reporter:
`asd` [docker stats](https://docs.docker.com/engine/reference/commandline/stats/).

This command line tool that comes shipped with the Docker CLI on Ubunutu
has the capability of giving the following values directly to **STDOUT**:
- CPU %
- Memory Used
- Net IO
- Disk IO

While being very nice and clean to read it had the problem that the time resolution
was only 1 s.
So how could we get the same values but with a higher resolution?

- Starting point documentation


- What are Jiffies?


- Where are Docker runtime metrics stored?

When running Docker in rootless mode the [official documentation](https://docs.docker.com/config/containers/runmetrics/#find-the-cgroup-for-a-given-container) says they are stored in
**/sys/fs/cgroup/system.slice/docker-<longid>.scope/** on **cgroup v2**, **systemd** driver.

cgroups v1 should not be used, as this does not support delegation of cpu, meminfo etc.
[Source](https://rootlesscontaine.rs/how-it-works/cgroups/)

Container runtimes mainly use systemd of cgroupfs for delegation.
On the Ubuntu system we use systemd is the default and according to some
documentation it is discouraged to change to cgroupfs as this might come into conflict
with other tools that we support, which have this as a default.
Kubernetes for example uses [systemd as the default](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/configure-cgroup-driver/).

If you want to follow along in this post and want to check out what your container runtime
uses run **docker info** and it will tell you the cgroup driver and also your container
runtime if unsure.

Getting back on track: If you run containers in rootless mode however then the infos reside in
a different location: /sys/fs/cgroup/user.slice/user-$(id -u).slice/user@$(id -u).service/docker-ID.scope/
[Source](https://rootlesscontaine.rs/getting-started/common/cgroup2/)


For details on the fields https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html is the best resource