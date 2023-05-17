---
title: "Eco CI"
date: 2023-01-15 19:00:00
publishDate: 2023-01-15
draft: false
icon: "leaf"
---

Eco CI is the internal name for a project where we create small tools to make CI pipelines more transparent
in terms of their energy usage and also develop small tools that can save energy / CO2 in the pipeline.

Our current work focuses on Github Actions, one of the biggest free continous integration platforms to date.

By integrating our custom Github Actions and Github Apps into your testing workflow you get an automated estimation about the 
energy cost of the workflow run.

## Github Actions - Energy estimation

Github Actions runs on Microsoft Azure VMs. In these VMs are direct measurement with something like RAPL is sadly not possible.

We are using our work from our [Cloud Energy project](/projects/cloud-energy) to estimate the energy used by these Azure VMs.

The result is an easily integrateable Github Action where you get the energy in Joules for the CI run. It is 
also possible to get only results for part of the CI run.


{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/projects/github-actions-energy.webp" loading="lazy">
  <figcaption>Github Actions energy estimation</figcaption>
</figure>
{{< /rawhtml >}}


{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/blog/eco-ci.webp" loading="lazy">
  <figcaption>Eco-CI feature demo in Green Metrics Tool</figcaption>
</figure>
{{< /rawhtml >}}


 

{{< rawhtml >}} 
<a class="ui labeled button" href="https://github.com/green-coding-berlin/eco-ci-energy-estimation">
    <div class="ui button">
        <i class="code branch icon"></i>
    </div>
    <span class="ui basic label">
        Github Repository
    </span>
</a>
<a class="ui labeled button" href="https://github.com/marketplace/actions/eco-ci-energy-estimation">
    <div class="ui button">
        <i class="shopping bag icon"></i>
    </div>
    <span class="ui basic label">
        Github Marketplace
    </span>
</a>
<a class="ui labeled button" href="https://github.com/green-coding-berlin/green-metrics-tool/actions/runs/4720202654">
    <div class="ui button">
        <i class="eye icon"></i>
    </div>
    <span class="ui basic label">
        Live preview on Github Actions
    </span>
</a>
<a class="ui labeled button" href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin%2Fgreen-metrics-tool&branch=dev&workflow=45267392">
    <div class="ui button">
        <i class="chartline icon"></i>
    </div>
    <span class="ui basic label">
        Our CI Energy Cost monitoring
    </span>
</a>


{{< /rawhtml >}}

--- 

## Github Action - Eco CI Activity Checker

The Eco CI Activity Checker was designed for CI workflows that run on a scheduled basis.

Often these run happen even if there was not even a single commit in the last ex. 24 hours, or even if there 
was a manual run triggered just a couple minutes before the run.

The Eco CI Activity checker skips the test run then and thus saves energy and CO2.

{{< rawhtml >}} 
<a class="ui labeled button" href="/blog/eco-ci-activity-checker-released/">
    <div class="ui button">
        <i class="book icon"></i>
    </div>
    <span class="ui basic label">
        Blog arcticle
    </span>
</a>
<a class="ui labeled button" href="https://github.com/green-coding-berlin/eco-ci-activity-checker">
    <div class="ui button">
        <i class="code branch icon"></i>
    </div>
    <span class="ui basic label">
        Github Repository
    </span>
</a>
<a class="ui labeled button" href="https://github.com/marketplace/actions/eco-ci-activity-checker
">
    <div class="ui button">
        <i class="shopping bag icon"></i>
    </div>
    <span class="ui basic label">
        Github Marketplace
    </span>
</a>
{{< /rawhtml >}}


---

## What is to come for the Eco-CI project?

A second savings can be had by re-scheuling jobs that are not time-sensitive to times when the electric grid. This is a planned feature that will be devloped soon as a seperate action.

Also hanging and idling VMs are currently tackled in on of our projects to turn them down and stop wasting idle power 
Cloud VMs.

Stay tuned on our [blog](/blog) also for updates on this project!

