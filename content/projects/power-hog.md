---
title: "Power Hog"
date: 2023-9-20 19:00:00
publishDate: 2023-01-16
draft: false
icon: "piggy bank"
desc: "Power Hog offers tools for monitoring computer energy consumption, focusing on process analysis, central data collection for optimization, and CO2 data submission."
ordering: 5

---

The Power Hog offers a suite of tools designed to track your computer's energy consumption.
Currently the three primary objectives are:

1) Allow the user to analyze which processes uses how much energy and how this relates to the system.
2) Collect power usage data centrally to identify apps/ processes that could be optimized to save energy on a wider scale.
3) Enable the user to submit the data to a carbon database so that energy usage can be accounted to a project. Coming
   in version 0.3

Currently we only support MacOSX through the powermetrics [[1]]({{< relref path="blog/power-measurement-on-macos" >}}) tool!
More work is needed for Linux or Windows support.

For running the hog on your system there are two main parts.

The background script that collects all the data and sends it to a server. This is called the `power_logger`. More
information can be found here:

[https://github.com/green-coding-solutions/hog#power-logger](https://github.com/green-coding-solutions/hog#power-logger)

The app that gives you first insites on the data collected and more information on the hog on your system. Details
can be found here:

[https://github.com/green-coding-solutions/hog#the-desktop-app](https://github.com/green-coding-solutions/hog#the-desktop-app)

Detailed analytics can be done in the Green Metrics Tool dashboard. You can either use our server or hosts you own.

A full readme and documentation can be found in the GitHub repo.

{{< rawhtml >}}
<a class="ui labeled button" href="https://github.com/green-coding-solutions/hog/releases">
    <div class="ui button">
        <i class="arrow alternate circle down icon"></i>
    </div>
    <span class="ui basic label">
        Download
    </span>
</a>
<a class="ui labeled button" href="https://github.com/green-coding-solutions/hog/blob/main/README.md#the-power-hog">
    <div class="ui button">
        <i class="book icon"></i>
    </div>
    <span class="ui basic label">
        Documentation
    </span>
</a>
<a class="ui labeled button" href="https://github.com/green-coding-solutions/hog/">
    <div class="ui button">
        <i class="code branch icon"></i>
    </div>
    <span class="ui basic label">
        Github
    </span>
</a>
{{< /rawhtml >}}

---

## Screenshots

{{< rawhtml >}}
<img class="ui rounded bordered image" src="/img/projects/hog-power-logger.avif" alt="HOG Screenshot" loading="lazy" style="margin:auto;">
<br>
<img class="ui rounded bordered image" src="/img/projects/hog-mac-app.avif" alt="HOG Screenshot" loading="lazy" style="margin:auto;">
<br>
<img class="ui rounded bordered image" src="/img/projects/hog-website.avif" alt="HOG Screenshot" loading="lazy" style="margin:auto;">
<br>
{{< /rawhtml >}}
