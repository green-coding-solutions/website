---
title: "The cost of testing pipelines"
date: 2023-09-03
draft: true
author: "Dan Mateas"
authorlink: "https://www.linkedin.com/in/dan-mateas-693634105/"
---


We've asked ourselves, what is the cost in carbon of running tests and other CI workflows, especially in some real-world scenarios? To answer this, we've forked some popular open source repositories, added eco-ci to some of their workflows, and been monitoring their energy output. We've been looking at [curl](https://github.com/curl/curl), [django](https://github.com/django/django), and [flask](https://github.com/pallets/flask) on github, and [openmw](https://gitlab.com/OpenMW/openmw) on gitlab. For each of these we been measuring the workflow responsible for building and running tests. We've monitored these repositories for about a month and a half, running daily tests. 

Let's look at the results in a chart. We are specifically looking at the average energy and time of a pipeline run, and then the total energy and time taken by the pipeline over the entire testing period.

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
      <th>repo</th>
      <th>cpu</th>
      <th>avg. energy</th>
      <th>avg. time</th>
      <th>avg. cpu util</th>
      <th>Total Energy</th>
      <th>Total Time</th>
      <th>Joules/Pipeline Second</th>
      <th>Joules/second @100% util</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin/curl&branch=master&workflow=61395528">curl</a></td>
      <td>All Cpu's</td>
      <td>15736 J</td>
      <td>3417 s</td>
      <td>46%</td>
      <td>1274626 J</td>
      <td>276789 s</td>
      <td>4.6 J/s</td>
      <td>10</td>
    </tr>
    <tr>
      <td></td>
      <td>8370C</td>
      <td>12347 J</td>
      <td>3132 s</td>
      <td>45%</td>
      <td>283998 J</td>
      <td>72040 s</td>
      <td>3.9 J/s</td>
      <td>11.5</td>
    </tr>
    <tr>
      <td></td>
      <td>8171M</td>
      <td>16822 J</td>
      <td>3776 s</td>
      <td>47%</td>
      <td>218690 J</td>
      <td>49088 s</td>
      <td>4.4 J/s</td>
      <td>10.6</td>
    </tr>
    <tr>
      <td></td>
      <td>E5-2673v4</td>
      <td>18237 J</td>
      <td>3707 s</td>
      <td>47%</td>
      <td>328282 J</td>
      <td>66727 s</td>
      <td>4.9 J/s</td>
      <td>9.5</td>
    </tr>
    <tr>
      <td></td>
      <td>E5-2673v3</td>
      <td>25672 J</td>
      <td>3578 s</td>
      <td>--%</td>
      <td>128364 J</td>
      <td>17891 s</td>
      <td>7.1 J/s</td>
      <td>--</td>
    </tr>
    <tr>
      <td></td>
      <td>8272CL</td>
      <td>14331 J</td>
      <td>3229 s</td>
      <td>46%</td>
      <td>315289 J</td>
      <td>71043 s</td>
      <td>4.3 J/s</td>
      <td>10.6</td>
    </tr>
    <tr>
      <td><a href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin/django&branch=main&workflow=60545072">django</a></td>
      <td>All Cpu's</td>
      <td>2051 J</td>
      <td>383 s</td>
      <td>62%</td>
      <td>256473 J</td>
      <td>47910 s</td>
      <td>5.3 J/s</td>
      <td>11.6</td>
    </tr>
    <tr>
      <td></td>
      <td>8370C</td>
      <td>833 J</td>
      <td>163 s</td>
      <td>62%</td>
      <td>59200 J</td>
      <td>11596 s</td>
      <td>5.1 J/s</td>
      <td>12.1</td>
    </tr>
    <tr>
      <td></td>
      <td>8171M</td>
      <td>843 J</td>
      <td>170 s</td>
      <td>62%</td>
      <td>54808 J</td>
      <td>11022 s</td>
      <td>4.9 J/s</td>
      <td>12.6</td>
    </tr>
    <tr>
      <td></td>
      <td>E5-2673v4</td>
      <td>1093 J</td>
      <td>187 s</td>
      <td>62%</td>
      <td>54677 J</td>
      <td>9357 s</td>
      <td>5.8 J/s</td>
      <td>10.6</td>
    </tr>
    <tr>
      <td></td>
      <td>E5-2673v3</td>
      <td>1029 J</td>
      <td>133 s</td>
      <td>63%</td>
      <td>9269 J</td>
      <td>1198 s</td>
      <td>7.7 J/s</td>
      <td>8.1</td>
    </tr>
    <tr>
      <td></td>
      <td>8272CL</td>
      <td>902 J</td>
      <td>169 s</td>
      <td>62%</td>
      <td>78518 J</td>
      <td>14737 s</td>
      <td>5.3 J/s</td>
      <td>11.6</td>
    </tr>
    <tr>
      <td><a href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin/flask&branch=main&workflow=61371506">flask</a></td>
      <td>All Cpu's (minus 8171M)</td>
      <td>989 J</td>
      <td>239 s</td>
      <td>43%</td>
      <td>129588 J</td>
      <td>31271 s</td>
      <td>4.1 J/s</td>
      <td>10.4</td>
    </tr>
    <tr>
      <td></td>
      <td>8370C</td>
      <td>248 J</td>
      <td>71 s</td>
      <td>42%</td>
      <td>28571 J</td>
      <td>8113 s</td>
      <td>3.5 J/s</td>
      <td>12</td>
    </tr>
    <tr>
      <td></td>
      <td>8171M</td>
      <td>--</td>
      <td>--</td>
      <td>--%</td>
      <td>--</td>
      <td>--</td>
      <td>--</td>
      <td>--</td>
    </tr>
    <tr>
      <td></td>
      <td>E5-2673v4</td>
      <td>408 J</td>
      <td>91 s</td>
      <td>44%</td>
      <td>47782 J</td>
      <td>10700 s</td>
      <td>4.4 J/s</td>
      <td>10</td>
    </tr>
    <tr>
      <td></td>
      <td>E5-2673v3</td>
      <td>294 J</td>
      <td>45 s</td>
      <td>45%</td>
      <td>7648 J</td>
      <td>1163 s</td>
      <td>6.5 J/s</td>
      <td>6.9</td>
    </tr>
    <tr>
      <td></td>
      <td>8272CL</td>
      <td>367 J</td>
      <td>91 s</td>
      <td>43%</td>
      <td>45586 J</td>
      <td>11295 s</td>
      <td>4.0 J/s</td>
      <td>10.7</td>
    </tr>
    <tr>
      <td><a href="https://metrics.green-coding.berlin/ci.html?repo=green-coding-berlin/eco-ci/openmw&branch=master&workflow=47121734">openmw</a></td>
      <td>EPYC_7B12</td>
      <td></td>
      <td></td>
      <td>%</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
{{< /rawhtml >}}


Openmw data needs date splitting to get values, flask 8171M has a timeout outlier

One important thing to note is that for django and flask, the average energy and time numbers are less interesting than one may want. For curl and openmw, the entire pipeline runs in one job, and therefore on one cpu. But for django and flask however, the pipelines were split into different jobs which were handled by different cpus, without consistency between runs. As we know about the ML model underlying Eco-CI, and as we've talked about last time in our (article on variance)[link-to-variance], the CPU used makes a very big difference in the energy output. So looking at different jobs spread across different CPU's is comparing a bit apples to oranges.

[image of pipeline split into jobs/cpus] [curl / django]

However, there is some interesting information we can glean by looking at the total energy and time used.  Looking at the relationship between energy and time, we can for each pipeline, and even for each CPU, get a value for Joules per pipeline second spent. This is very nice actually, as it can give us an idea of what the cost is.


REAL WORLD: now that we have Watts (joules rate) - look at django/openmw FULL real world runs, and estimate a full final energy cost

Django - July - 6818 seconds
        - Seriously?

```python
import requests
from datetime import datetime, timedelta

repository = "django/django"
start_time = "2023-01-01T00:00:00Z"
end_time = "2023-08-01T00:00:00Z"

workflow_endpoint = f"https://api.github.com/repos/{repository}/actions/workflows"
response = requests.get(workflow_endpoint)
print(response.json())
workflows = response.json()["workflows"]

total_seconds = 0

for workflow in workflows:
    workflow_id = workflow["id"]
    pipeline_endpoint = f"https://api.github.com/repos/{repository}/actions/workflows/{workflow_id}/runs"
    response = requests.get(pipeline_endpoint)
    pipelines = response.json()["workflow_runs"]

    for pipeline in pipelines:
        pipeline_start_time = pipeline["created_at"]
        pipeline_end_time = pipeline["updated_at"]
        
        if start_time <= pipeline_start_time <= end_time:
            start_dt = datetime.strptime(pipeline_start_time, "%Y-%m-%dT%H:%M:%SZ")
            end_dt = datetime.strptime(pipeline_end_time, "%Y-%m-%dT%H:%M:%SZ")
            duration_seconds = (end_dt - start_dt).total_seconds()
            total_seconds += duration_seconds

print(f"Total seconds used: {total_seconds:.2f} seconds")
```


- [ ] Q: To do a further breakdown, we need to subdivide the energy measurements into jobs that ran per cpu. Will this actually give us any insight?

Conclusions:
On average, seems to be about ~5 Joules/s - or 1/20th of a 100W light bulb.
Higher CPU % 