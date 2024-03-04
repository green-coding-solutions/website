---
title: "Progress on energy measurements"
date: 2022-06-13
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"

---


Today we have pushed the first beta of our metrics providers for full OS
Intel RAPL readings.

{{< rawhtml >}}
<img src="/img/blog/metrics-tool-rapl-reading.webp" alt="Metrics Tool RAPL Reading" loading="lazy" style="max-width: 600px; width: 80%; display: block; margin-left: auto; margin-right: auto; margin-bottom: 15px;">
{{< /rawhtml >}}

You can see the full details of our demo runs with the static version of the
Green Website Foundation Page in our [Green Metrics Tool Measurements Overview](https://metrics.green-coding.io/index.html)

All metrics providers are made in a UNIX-style philosphy, which means they provide
very conscise and scoped functionality, but can be chained through redirecting
their output.

For the moment we are working on the documentation. If you want to have an early
look be sure to check out the [development branch](https://github.com/green-coding-solutions/green-metrics-tool/tree/rapl-and-cgoup-reader)

Also we have made progress on getting the prototype for the DC Measurements
working and are now coding the Linux metrics providers to read directly from
the NI DAQ USB-6009 capture card.

{{< rawhtml >}}
<img src="/img/blog/dc-power-readings-prototype-workplace.webp" alt="DC Power readings prototype workplace" loading="lazy" style="max-width: 600px; width: 80%; display: block; margin-left: auto; margin-right: auto; margin-bottom: 15px;">
{{< /rawhtml >}}


This post is just a small update and we will provide details and documentation soon.

