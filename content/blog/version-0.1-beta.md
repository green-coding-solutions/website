---
title: "Version 0.1-beta released"
date: 2022-06-27
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"

---


Today we have have released the `0.1-beta` version of our [Green Metrics Tool](https://github.com/green-coding-berlin/green-metrics-tool/releases/tag/v0.1-beta)

{{< rawhtml >}}
<img src="/img/blog/green-metrics-dashboard.webp" alt="Green Metrics Dashboard" loading="lazy" style="max-width: 800px; width: 80%; display: block; margin-left: auto; margin-right: auto; margin-bottom: 15px;">
{{< /rawhtml >}}

{{< rawhtml >}}
<img src="/img/blog/green-metrics-boxed.webp" alt="Green Metrics Dashboard" loading="lazy" style="max-width: 800px; width: 80%; display: block; margin-left: auto; margin-right: auto; margin-bottom: 15px;">
{{< /rawhtml >}}

Version `0.1-beta` is considered a non-production version.

We are currently working on the falsification of our energy measurements with public 
energy measurement databases.

Also we will add functionality to compare measurements directly in the frontend as 
well as a better install script to quickstart the tool.

The biggest part of work currently for us is the documentation which we are working
on.

This release contains following Measurement Providers:
- Intel RAPL (CPU Package) to measure energy of processor
- CPU of Container
- Memory of container


## API

If you want to query the Open Data of our tool go to the [self-documenting API](https://api.green-coding.io)

## Measurements of the tool

On our [Metrics Dashboard](https://metrics.green-coding.io/) you can find already some measurements we did on 
a copy of the [The Green Web Foundation](https://www.thegreenwebfoundation.org/) website.

Here we compare the energy consumption of a Wordpress version against a static version.
- Static: https://metrics.green-coding.io/stats.html?id=a57a7f97-be18-4a77-b7fe-ae0d76b5e4dd
- Wordpress: https://metrics.green-coding.io/stats.html?id=619e720e-f2fc-42fa-9786-c13cb4d9fb72

An example on how to recreate these dashboards and also dive into the raw data to 
answer more detailed questions we provide [Example Jupyter Notebooks](https://metrics.green-coding.io/data-analysis.html)


**Please subscribe to our Newsletter to stay tuned when we release the Documentation and subsequent versions**