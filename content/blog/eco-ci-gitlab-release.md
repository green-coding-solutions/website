---
title: "Eco-CI: Now with Gitlab pipelines support"
date: 2023-06-27
draft: false
author: "Dan Mateas"
authorlink: "https://www.linkedin.com/in/dan-mateas-693634105/"
---

We are happy to announce a major update to our Eco-CI tool, a plugin designed to estimate and reduce the energy consumption of continuous integration pipelines. Previously available exclusively for GitHub Actions, we are excited to announce the integration of Eco-CI with GitLab pipelines. We hope this will encourage Gitlab developers to measure their carbon emissions and make informed decisions regarding sustainable software processes.

Link to Release: [Eco-CI Energy Estimation v2](https://github.com/green-coding-berlin/eco-ci-energy-estimation/releases/tag/v2)

To use Eco-CI with gitlab pipelines, we provide the following template file which can be included in your gitlab-ci.yml configuration: https://github.com/green-coding-berlin/eco-ci-energy-estimation/blob/main/eco-ci-gitlab.yml

You can include the raw file remotely like thus:

```yaml
include:
  remote: 'https://raw.githubusercontent.com/green-coding-berlin/eco-ci-energy-estimation/main/eco-ci-gitlab.yml'
```
\
and use its functionality within jobs by calling the various scripts and exporting the eco-ci-output.txt artifact:

```yaml
Ubuntu_GCC_preprocess:
  extends: .Ubuntu_Image
  stage: build
  script:
    - !reference [.initialize_energy_estimator, script]
    - !reference [.start_measurement, script]

    - CI/ubuntu_gcc_preprocess.sh     # your pipeline code here

    - export ECO_CI_LABEL="Ubuntu_GCC_preprocess"
    - !reference [.get_measurement, script]
    - !reference [.display_results, script]
  artifacts:
    paths:
      - eco-ci-output.txt
```
\
To see your energy results, you can check the artifacts for each job, or check the job log.

{{< rawhtml >}}
<div style="display: flex; flex-wrap: wrap; justify-content: center;">

<div style="flex: 1; margin: 10px;">
<figure>
    <img class="ui large image" src="/img/blog/eco_ci_gitlab_release_2.webp" alt="Eco CI Energy Estimation output" loading="lazy">
    <figcaption>Eco-CI output in jobs log</figcaption>
</figure>
</div>

<div style="flex: 1; margin: 10px;">
<figure>
    <img class="ui large image" src="/img/blog/eco_ci_gitlab_release_3.webp" alt="Eco CI Energy Estimation output" loading="lazy">
    <figcaption>Eco-CI output in artifacts</figcaption>
</figure>
</div>

</div>
{{< /rawhtml >}}

\
We are currently also exploring further methods to output this information to developers. Full instructions on how to use Eco-CI with GitLab pipelines are available in the [ReadMe](https://github.com/green-coding-berlin/eco-ci-energy-estimation/blob/main/README.md#gitlab).

### Front End

We have improved the front end we provide on [our website](https://metrics.green-coding.berlin/ci-index.html) where you can see the results over time of your pipelines. There is now an index page where you can see your projects, along with others that have sent us run data:

{{< rawhtml >}}
<figure style="float: center;  margin: 10px;">
    <img class="ui huge image" src="/img/blog/eco_ci_gitlab_release_1.webp" alt="Eco CI Energy Estimation output" loading="lazy">
    <figcaption>The Eco-CI index page</figcaption>
</figure>
{{< /rawhtml >}}

{{< rawhtml >}} The individual CI Runs pages now support GitLab projects as well and has features which we outlined in our previous <a href="/blog/gmt_v015_released/">eco-ci article</a>{{< /rawhtml >}}.

## Open Source Projects we're monitoring
As part of our goal to encourage green coding practices, and understand what features / wishes a developer working on real-world projects with a green coding mindset would want, we decided to fork some popular open source repositories and integrate the Eco-CI into their existing workflows. This gives us insight on how easy it is to use, what features are missing, what real-world edge cases don't work, and how valuable the information we provide actually is and what we can do to improve it. 

Currently we have forked and integrated three github projects: [Django](https://github.com/green-coding-berlin/django), [Flask](https://github.com/green-coding-berlin/flask), and [curl](https://github.com/green-coding-berlin/curl), as well as one Gitlab project, [OpenMW](https://gitlab.com/green-coding-berlin/eco-ci/openmw). Our plan is to pretend that we are sustainability engineers for these projects, keep them in sync, track their carbon footprint, and see what we can improve on with this information.

Doing this has already begun to generate some ideas for us, so be on the lookout for new features in the coming weeks!


### Bugfixes / Misc Features
This version of Eco-CI also comes with some bugfixes/misc minor features, including:
- Corrected RAM values leading to more accurate estimations (you may see slightly higher energy estimations for your pipelines than before)
- Duration and source (gitlab/github) are now sent to our API and displayed in the front-end
- Corrected juggling of python virtual environments, if the CI pipeline was already using virtual environments
- Some visual front end adjustments