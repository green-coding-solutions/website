---
title: "Green Metrics Tool v0.15 & Eco-CI Upgrade"
date: 2023-05-17
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---


The long awaited feature to make comparisons with the Green Metrics Tool is finally live 🔥

Our measurement workflow now includes phases (Baseline, Idle, Installation, Boot, Runtime, Remove) which makes our tool compatible with the requirements specified by the [Blue Angel for Software](https://www.blauer-engel.de/en/productworld/resources-and-energy-efficient-software-products).

Having these phases in the measurement workflow is an essential first step towards a more real-life quantification of an application, as most of the cost of an application can actually be occuring in the installation phase for the containers or just simply starting / stopping them.

Looking at this broader picture is our first step towards a tooling for Software Lifecycle Analysis.

See the comparison in action here, where we compare the influence of [changing the database in a Nextcloud installation (swapping MariaDB for SQLite)](https://metrics.green-coding.io/compare.html?ids=284e0654-0193-41e8-afbf-36f38235dcdc,2767587e-2164-4fc2-bc99-56c13fbaaff4,97260fdc-01e8-44c3-b67c-417ff4e3d629,b7bb203a-d2c5-46a3-bf27-7d90d84da33e,fb6e3e27-6391-495b-8454-920fa922cfda)

{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/blog/gmt_015_compare_overview.webp" loading="lazy">
  <figcaption>Comparison in terms of energy</figcaption>
</figure>
{{< /rawhtml >}}


{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/blog/gmt_015_phases_overview.webp" loading="lazy">
  <figcaption>Phases Overview in terms of energy</figcaption>
</figure>
{{< /rawhtml >}}


Also our Eco-CI Tooling has been greatly upgraded and allows now for drilldown towards different CPUs, Labels and timeframes. Check out our [Eco-CI feature demo](https://metrics.green-coding.io/ci.html?repo=green-coding-berlin%2Fgreen-metrics-tool&branch=dev&workflow=55778655).

{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/blog/eco-ci.webp" loading="lazy">
  <figcaption>Eco-CI feature demo</figcaption>
</figure>
{{< /rawhtml >}}
