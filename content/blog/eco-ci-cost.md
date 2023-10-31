---
title: "The Carbon Cost of Testing Pipelines"
date: 2023-10-30
draft: false
author: "Dan Mateas"
authorlink: "https://www.linkedin.com/in/dan-mateas-693634105/"
---


The carbon costs of running software can creep up on us. Individual processes may have small footprints, but as these processes become repeatable and automated these costs compound over time. CI pipeline processes are a good example of this, as they are often run daily, on a per-commit basis, or as parts of complex matrices with a lot of repitition. This is a common and good software development practice to follow to make sure you have a healthy and maintainable codebase - but what are the carbon consequences of this action? This is the question we are exploring today. 

To do this, we forked four different popular open source repositories, picked one of their testing workflows, and integrated [Eco-CI](https://github.com/green-coding-berlin/eco-ci-energy-estimation) to measure that workflow. Eco-CI is our GitHub/Gitlab plugin which measures the CPU-utilization of a pipeline while its running, detects underlying hardware specs of the virtual machine, and based on this information estimates the energy usage of the CI job. It is easy to integrate into any linux-based CI Github/Gitlab job. Here is an example of how we implemented it into the django tests workflow:

```yaml
 javascript-tests:
    runs-on: ubuntu-latest
    name: JavaScript tests
    steps:
      - name: Eco-CI Init
        uses: green-coding-berlin/eco-ci-energy-estimation@main
        with:
          task: start-measurement

      - name: Checkout
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
          cache-dependency-path: '**/package.json'
      - run: npm install
      - run: npm test

      - name: Eco-CI Measurement
        uses: green-coding-berlin/eco-ci-energy-estimation@main
        with:
          task: get-measurement
          label: 'npm tests'

      - name: Eco-CI Results
        uses: green-coding-berlin/eco-ci-energy-estimation@main
        with:
          task: display-results

```

We had to make a few small adjustments to some of the workflows to accommodate this, for example only running jobs for Linux machines (as Eco-CI is Linux only currently), and in some cases reducing workflows with many parallel jobs to a single selected job, simply so we do not run out of minutes on our GitHub public runner. We ran these tests workflows once a day for the last few months to gather data. Here I have selected a period of one month to look at (from September 20th - October 20th), and gathered the data for the **total energy** used for each repository. From there I have converted the mJ used into gCO2e. Let's take a look at the data.

{{< rawhtml >}}
<style>
  table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
  }

  th, td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }
</style>
<table>
  <caption><b>Estimated Energy used by forked workflows between Sept. 20 - Oct. 20:</b></caption>
  <thead>
    <tr>
      <th>Repository (link to tested workflow) </th>
      <th>Total Energy Used (mJ)</th>
      <th>gCO2e emitted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/green-coding-berlin/django/blob/main/.github/workflows/schedule_tests.yml">django</a></td>
      <td><a href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin/django&branch=main&workflow=60545072">130,938,955</a></td>
      <td><b>16.07</b></td>
    </tr>
    <tr>
      <td><a href="https://github.com/green-coding-berlin/curl/blob/master/.github/workflows/linux.yml">curl</a></td>
      <td><a href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin/django&branch=main&workflow=60545072">922,088,200</a></td>
      <td><b>113.21</b></td>
    </tr>
    <tr>
      <td><a href="https://github.com/green-coding-berlin/flask/blob/main/.github/workflows/tests.yaml">flask</a></td>
      <td><a href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin/flask&branch=main&workflow=61371506">79,174,102</a></td>
      <td><b>9.72</b></td>
    </tr>
    <tr>
      <td><a href="https://gitlab.com/green-coding-berlin/eco-ci/openmw/-/blob/master/.gitlab-ci.yml">openmw</a></td>
      <td><a href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin/eco-ci/openmw&branch=master&workflow=47121734">2,788,046,795</a></td>
      <td><b>342.31</b></td>
    </tr>
  </tbody>
</table>
<br/>
{{< /rawhtml >}}

To go from mJ to gCO2e, we used the formulas that can be found on [this page here](https://www.green-coding.berlin/co2-formulas/). You can read more details as to the why there, but in general the conversion goes like this:

```
mJ -> J -> kWH -> gCO2e
mJ / 1000 = J
J / 3600 / 1000 = kWh
kWh * 442 = gCO2e

so:
(mJ / 1000  / 3600 / 1000) * 442 = gCO2e
```

Of course, these numbers are just based on the samples that we measured and ran outselves once a day. In their original repositories, these workflows ran quite a bit more often and extensively. A good example of this is the curl workflow. This is the [original workflow file](https://github.com/curl/curl/blob/master/.github/workflows/linux.yml) on curl's repository. You can see that this workflow runs 19 parallel jobs, building curl with a variety of different protocols and then running its test suite.

{{< rawhtml >}}
<div style="display: flex; justify-content: center;">

<div style="flex: 1; margin: 10px;">
<figure>
    <img class="ui large image" src="/img/blog/curl_cost_multijobs.webp" alt="All Curl Jobs" loading="lazy">
</figure>
</div>

</div>
{{< /rawhtml >}}

Since we didn't measure the full workflow, we have to make an approximation for the full workflow. It will be a back-of-the-envelope type estimate, but we can scale the number we measured up to all the jobs and runs that actually happened on the curl repository. The job we measured (libressl) takes about an hour, where the full workflow uses about 600 minutes total. Additionally, in the curl repository this workflow runs on a per-push basis. [Here you can see](https://github.com/curl/curl/actions/workflows/linux.yml?query=created%3A%3C2023-10-21&created%3A%3E2023-09-20) all the runs during the Sep.20 - Oct 20 period. Ignoring all the skipped runs, it amounts to 582 runs total. Since the energy total that we calculated was based on 31 runs, our total energy estimated would be (measured energy * 10) * (582/31) = **21254.26 gCO2e**. 

My apologies to the maintainers of curl - I'm not trying to call you out specifically, just looking at a real-world example of the carbon cost of a complete, complex, and well-built (from an automation perspective) CI suite.

Doing the same calculation for all the repositories measured above, we have:
```
curl: (113.21 * 10) * (582/31) = 21254.26 gCO2e
django: (16.07 * 4.6) * (24/31) = 57.23 gCO2e
flask: (9.72 * 1.2 ) * (17/ 31) = 6.40  gCO2e
openmw: (342.31 * 1.5) * (178/31) = 2948.28 gCO2e
```


We have also used [this calculator](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator) to put these numbers in some real-world contexts: the amount of miles driven by an average car to also emit this amount of gas, and the amount of carbon used to charge a smartphone from empty to full, and equivalent CO2 emissions from gallons of gasoline used. This helps make these values feel more palpable. Our final estimation of the total gCO2e for each repository for their testing workflow is as follows : 

{{< rawhtml >}}
<style>
  table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
  }

  th, td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }
</style>
<table>
  <caption><b>Total Estimated Carbon Cost of Testing Workflow for a Month</b></caption>
  <thead>
    <tr>
      <th>Repository</th>
      <th>Estimated gCO2e consumed </th>
      <th>Miles Driven by Car</th>
      <th>Smartphones Charged to Full</th>
      <th>Gallons of Gasoline Consumed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>django</td>
      <td><b>57.23</b></td>
      <td>0.147</td>
      <td>7</td>
      <td>0.006</td>
    </tr>
    <tr>
      <td>curl</td>
      <td><b>21,254.26</b></td>
      <td>54.5</td>
      <td>2,585</td>
      <td>2.4</td>
    </tr>
    <tr>
      <td>flask</td>
      <td><b>6.40</b></td>
      <td>0.016</td>
      <td>0.779</td>
      <td>0.0007</td>
    </tr>
    <tr>
      <td>openmw</td>
      <td><b>2,948.28</b></td>
      <td>7.6</td>
      <td>359</td>
      <td>0.332</td>
    </tr>

  </tbody>
</table>
<br/>
{{< /rawhtml >}}

As we can see there's a very wide range here - and the first and immediate pattern I see is in how often these workflows are run. For django and flask - these workflows ran less than once a day. For openmw and curl, they're on a per push basis. As usual our advice is generally to run pipelines only when really needed - running test suites per pull-request as oppossed to per-push is a good start, and often achieves the same level of quality control. While we do not want people to stop testing their software, we would simply like to shed some light on the impacts, start a discussion, and hopefully make people a bit more aware and attentive as to which processes they put on an automation and why. 