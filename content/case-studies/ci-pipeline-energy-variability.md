---
title: "Inherent variability in energy testing of CI pipelines"
date: 2023-09-03
draft: false
author: "Dan Mateas"
authorlink: "https://www.linkedin.com/in/dan-mateas-693634105/"
---

As we've been testing the energy use of various CI pipelines using [Eco-CI]({{< relref path="products/eco-ci" >}}), one thing we've noticed is that there is a large amount of variability in the results. Pipeline runs that we would expect to be more or less the same (same commit hash, running a few days in a row on the same cpu) can have wildly different results:

{{< rawhtml >}}
<figure>
  <img class="ui large rounded image" src="/img/blog/eco-ci-variability-1.webp" loading="lazy">
  <figcaption>Energy cost of a test pipeline on Github. y-axis is in mJ. Up to 30% difference.</a></figcaption>
</figure>

{{< /rawhtml >}}

Some amount of this is to be expected - using shared runners you don't have full control of your machine and don't really know what else could be running, and not all pipelines run in a fixed amount of steps. Still, this variability was higher than we expected, so we asked ourselves: what's the inherent variability that we must expect when energy testing ci pipelines? Can we find any explanation for this variability, and how to account for it when measuring CI pipelines? That's what we are exploring today.

{{< greenblock >}}
What do we want to find out?
{{< /greenblock >}}
{{< rawhtml >}}
                <div class="ui segment inverted" id="research-question">
                    <h2 class="ui header">
                        <i class="graduation cap icon"></i>
                        <div class="content">
                            Research question
                            <div class="sub header">How is the energy variance in hosted pipelines (Github/Gitlab) and can we use it for energy optimizations?</div>
                        </div>
                    </h2>
                </div>

{{< /rawhtml >}}

{{< whiteblock >}}
Setup
{{< /whiteblock >}}

First, we made a simple pipeline that should run in a relatively consistent amount of time/steps. All the pipeline does is install and runs sysbench:

```yaml
 - name: Install sysbench
        run: |
          sudo time apt install sysbench -y
          
      # Runs a single command using the runners shell
      - name: Running sysbench
        run: |
          time sysbench --cpu-max-prime=25000 --threads=1 --time=0 --test=cpu run --events=20000 --rate=0
```

\
\
We added [Eco-CI]({{< relref path="products/eco-ci" >}}) into this, and measured two distinct steps: first the installation process, and then running the sysbench command. We ran this many times over a few days and looked at the energy and time used, as well as the average cpu utilization for each step. We then calculated the mean and standard deviance for these values.

We also keep track which cpu each run is being done on. As a refresher, the ML model that [Eco-CI]({{< relref path="products/eco-ci" >}}) is based on identifies CPU model and utilization as the biggest contributing factors towards the energy use of servers. This means that comparing runs across different CPU's is unfair - one cpu model might inherently cost more energy for your run. While very interesting information in its own right, for the purposes of calculating variability we can only calculate the mean and standard deviance for each cpu seperately.

We also ran this pipeline on Gitlab, and gathered the same data. Gitlab hosted runners only have one cpu, so that simplifies things a bit.

So after gathering the data from both [Github](https://metrics.green-coding.io/ci.html?repo=dan-mm/test-repo-a&branch=main&workflow=66623622) and [Gitlab](https://metrics.green-coding.io/ci.html?repo=green-coding-berlin/ci-carbon-testing&branch=main&workflow=48163287) and calculating the statistics, here's the results we found, by platform/CPU:

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
  <thead>
    <tr>
      <th>Platform/CPU</th>
      <th>Step</th>
      <th>Energy Mean</th>
      <th>Energy Std.Dev (Value / %)</th>
      <th>Time Mean</th>
      <th>Time Std. Dev (value/%)</th>
      <th>Avg. Cpu. Utilization</th>
      <th> Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">Github / 8171M</td>
      <td>Install Step</td>
      <td>60.4 J</td>
      <td>36.4 J / 60%</td>
      <td>18s</td>
      <td>8s / 43%</td>
      <td>35%</td>
      <td>75</td>
    </tr>
    <tr>
      <td>Run Step</td>
      <td>380 J</td>
      <td>16.2 J / 4%</td>
      <td>86s</td>
      <td>4s / 4%</td>
      <td>48%</td>
      <td>75</td>
    </tr>
    <tr>
      <td>Full Pipeline</td>
      <td>440.9 J</td>
      <td>42.6 J / 10%</td>
      <td>104s</td>
      <td>9s / 9%</td>
      <td>42%</td>
      <td>75</td>
    </tr>
    <tr>
      <td rowspan="3">Github / 8272CL</td>
      <td>Install Step</td>
      <td>53.1 J</td>
      <td>55.6 J / 105%</td>
      <td>16s</td>
      <td>12s / 75%</td>
      <td>32%</td>
      <td>81</td>
    </tr>
    <tr>
      <td>Run Step</td>
      <td>327.7 J</td>
      <td>1.2 J / 0%</td>
      <td>74s</td>
      <td>1s / 1%</td>
      <td>48%</td>
      <td>81</td>
    </tr>
    <tr>
      <td>Full Pipeline</td>
      <td>380.8 J</td>
      <td>55.8 J / 15%</td>
      <td>90s</td>
      <td>12s / 13%</td>
      <td>40%</td>
      <td>81</td>
    </tr>
    <tr>
      <td rowspan="3">Github / E5-2673v4</td>
      <td>Install Step</td>
      <td>73.7 J</td>
      <td>55.5 J / 75%</td>
      <td>19s</td>
      <td>11s / 58%</td>
      <td>35%</td>
      <td>55</td>
    </tr>
    <tr>
      <td>Run Step</td>
      <td>404.1 J</td>
      <td>37.6 J / 9%</td>
      <td>85s</td>
      <td>8s / 9%</td>
      <td>48%</td>
      <td>55</td>
    </tr>
    <tr>
      <td>Full Pipeline</td>
      <td>477.9 J</td>
      <td>75.8 J / 16%</td>
      <td>104s</td>
      <td>15s / 15%</td>
      <td>42%</td>
      <td>55</td>
    </tr>
    <tr>
      <td rowspan="3">Github / E5-2673v3</td>
      <td>Install Step</td>
      <td>69.9 J</td>
      <td>3.8 J / 6%</td>
      <td>13s</td>
      <td>0s / 4%</td>
      <td>32%</td>
      <td>10</td>
    </tr>
    <tr>
      <td>Run Step</td>
      <td>594.8 J</td>
      <td>24.6 J / 4%</td>
      <td>85s</td>
      <td>3s / 4%</td>
      <td>48%</td>
      <td>10</td>
    </tr>
    <tr>
      <td>Full Pipeline</td>
      <td>664.8 J</td>
      <td>26.1 J / 4%</td>
      <td>98s</td>
      <td>4s / 4%</td>
      <td>40%</td>
      <td>10</td>
    </tr>
    <tr>
      <td rowspan="3">Github / 8370C</td>
      <td>Install Step</td>
      <td>48.4 J</td>
      <td>32.3 J / 67%</td>
      <td>16s</td>
      <td>8s / 48%</td>
      <td>32%</td>
      <td>52</td>
    </tr>
    <tr>
      <td>Run Step</td>
      <td>146.9 J</td>
      <td>0.4 J / 0%</td>
      <td>39s</td>
      <td>0s / 1%</td>
      <td>45%</td>
      <td>52</td>
    </tr>
    <tr>
      <td>Full Pipeline</td>
      <td>195 J</td>
      <td>32 J / 16%</td>
      <td>56s</td>
      <td>8s / 14%</td>
      <td>38%</td>
      <td>52</td>
    </tr>
    <tr>
      <td rowspan="3">Gitlab / EPYC_7B12</td>
      <td>Install Step</td>
      <td>10.6 J</td>
      <td>9.7 J / 92%</td>
      <td>5s</td>
      <td>3s / 51%</td>
      <td>53%</td>
      <td>196</td>
    </tr>
    <tr>
      <td>Run Step</td>
      <td>54.2 J</td>
      <td>3.8 J / 7%</td>
      <td>20s</td>
      <td>0s / 2%</td>
      <td>57%</td>
      <td>196</td>
    </tr>
    <tr>
      <td>Full Pipeline</td>
      <td>64.8 J</td>
      <td>6.4 J / 10%</td>
      <td>25s</td>
      <td>3s / 10%</td>
      <td>55%</td>
      <td>196</td>
    </tr>
  </tbody>
</table>
{{< /rawhtml >}}

{{< greenblock >}}
Analysis
{{< /greenblock >}}

There's a lot of numbers up there, but let's see if we can summarize some conclusions from this.

Looking at the entire pipeline as one overall energy measurement, we can see that the variability (standard deviation % of energy consumed) is large and spans a wide margin:  anywhere from **4% - 16%**. However when we break it down to installation / running steps, we notice a drastic split - the installation step consistently has a much wider variability (**6 - 105(!!)%**), while the run sysbench step has a much more narrow variability (**0-9%**).

Looking through the job logs for the installation step it becomes apparent that network traffic speeds accounts for quite a bit of this variability. Jobs whose package downloads were slower (even if they're the same packages) took an expectedly longer amount of time. This explains the time variability, and corresponding energy variability we see.

This highlights the importance of breaking down your pipeline when making energy estimations for the purposes of optimizing gains. You generally do not have much control over network speeds, though you can try to minimize network traffic. Fortunately, if we look at the energy breakdown, we can see that both the energy consumed and cpu utilization were lower across the board for the install steps. So while these sections have a large variability, they also account for a minority of the energy cost.

Looking at just the running steps, which accounts for the majority of the energy cost, we notice two things. First - the energy standard deviation % and time standard deviation % are almost identical in most cases (Gitlab's EPYC_7B12 being the odd one out, though the two numbers are still comparable). This means that we have a pattern here that the longer a job takes, we have a proportionally larger energy cost - which is what we would expect. 

We also notice that the baseline standard deviation we are calculating here seems to be very CPU dependent. Certain CPU's such as the **8370C** and **8272CL** seem to perform more consistently than others. Their standard deviation is very low - **0-1%**. 

Running these tests a few times over a few weeks, these patterns regarding CPU still held. 

{{< whiteblock >}}
Conclusions
{{< /whiteblock >}}

So what did we gather from this analysis, and how can we integrate this knowledge in our quest for energy optimizations? Generally speaking, when we analyze our pipelines over a period of time, we want to know if a change we've made has increased or decreased our energy usage. Big changes (such as ones that cause our pipelines to run twice as long) will have obvious impacts. However, if we want to optimize our pipelines without changing inherent functionality, then examinging the variability becomes important. We want to know if our small change made a real difference, and if the inherent variability is larger than the change's impact, then it becomes indistinguisable from noise.

With that in mind, what we measure in our pipelines is important. Any steps that include have network traffic, will have too high of an inherent variability for us to make a meaningful analysis. These steps have variability of upwards to **40-100%**, so unless the change is drastic enough to consistently cause your pipeline use double the energy of previous runs, any practical changes will be lost amongst the noise.

When we strip down to steps that are just local machine calculations , then we see the variability is much more managable. It is still very cpu dependant however. Here are the results summarized:

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
  <thead>
    <tr>
      <th>Platform/CPU</th>
      <th>Energy Variability</th>
      <th>Time Variability</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Github / 8272CL</td>
      <td>0%</td>
      <td>1%</td>
    </tr>
    <tr>
      <td>Github / 8370C</td>
      <td>0%</td>
      <td>1%</td>
    </tr>
    <tr>
      <td>Github / 8171M</td>
      <td>4%</td>
      <td>4%</td>
    </tr>
    <tr>
      <td>Github / E5-2673v3</td>
      <td>4%</td>
      <td>4%</td>
    </tr>
  </tbody>
    <tr>
      <td>Gitlab / EPYC_7B12</td>
      <td>7%</td>
      <td>2%</td>
    </tr>
    <tr>
      <td>Github / E5-2673v4</td>
      <td>9%</td>
      <td>9%</td>
    </tr>
  </tbody>
</table>
<br/>
{{< /rawhtml >}}

So if you want to measure the impact of optimziations on your pipelines, you have to pay attention to which CPU your workflow is running on. **Github runners on 8370C and 8272CL machines are the best to examine** to accurately see what impact your pipeline changes have. Any optimization should be accurately reflected on thse machines. For any changes that cause a **4%** or less energy use impact, examining pipeline runs on other machines may lead to inaccurate conclusions.

Obviously this is only an observed and snapshotted result, so this might change in the future unannounced. We have scheduled
to revisit this test in a couple of months to see if any changes happended.

In the meantime we are also very happy to link out to any reproductions of this test that can falsify if you get similar 
results to ours. 
