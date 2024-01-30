---
title: "Eco CI project - Github Action for Greener CI pipelines"
date: 2023-01-12 19:00:00
draft: false
author: "Dan Mateas"
---

{{< infobox >}}
    You do not know about our Eco-CI project yet? Than read up here about it: <a href="/projects/eco-ci">Eco-CI project</a>
{{< /infobox >}}


One question we've been tinkering around with here at Green Coding Solutions is how can we make CI pipelines around the world a little bit greener.

We have noticed the constantly rising popularity of [Github Actions](https://github.com/features/actions) and its use in various CI jobs such as automated tests. We use it ourselves for this reason in [our open-source repository](https://github.com/green-coding-berlin/green-metrics-tool/actions). One nice feature of github actions is its marketplace where you can find and use publically published "Actions" in your workflow.

So we asked ourselves, what kind of Action should exist that would help make our (and others') automated test runs a bit greener?

Well when it comes to saving carbon/energy in a CI, there's two main strategies to take: run it only when necessary, and run it when the energy grid is using low-carbon sources. We have created our own action to help with the former, with planned features for the latter.

An oft-utilized strategy for running CI pipelines, especially those that take a long time, is to run them daily overnight. We usually set this up and just leave it running perpetually. However, if there were no commits made since the last run, then this is entirely unneeded and wasteful. Our Action aims to give you the information so that you can skip these jobs.

[👉 Eco CI Activity Checker in the Github Marketplace](https://github.com/marketplace/actions/eco-ci-activity-checker)

Here's an example of the Action in action:
```
jobs:
  check_commits:
    runs-on: ubuntu-latest
    name: Check latest commit
    outputs:
      recent_dev_commit: ${{ steps.check_dev_commits.outputs.recent_commit }}
    steps:
      - id: check_dev_commits
        uses: green-coding-berlin/eco-ci-activity-checker@v1
        with:
         repo: 'green-coding-berlin/green-metrics-tool'
         branch: 'dev'
         time-unit: 'day'
         time-value: '1'
```

So this job runs before our main workflow, and checks if the workflow is even needed, which sets a flag (`recent_dev_commit`).

The required arguments are the repository to check, which branch to check activity on (you can give it `${{ github.ref_name }}`` to automatically pass the branch that triggered this workflow)

It also takes some optional arguments of `time-unit` and `time-value`, to define the time period of how far back you want to check for commits. By default this is the **24 hours**, but you can give it any strings that can be parsed by Unix's date command:
`date --date '${{ inputs.time-value }} ${{ inputs.time-unit }} ago'`

Then later on in our workflow, we simply make the *main* job conditional on the output as such:
```
  run-tests-dev:
    needs: check_commits
    if: ${{ needs.check_commits.outputs.recent_dev_commit == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          ref: 'dev'
          submodules: 'true'

      - name: 'Setup, Run, and Teardown Tests'
        uses: ./.github/actions/gmt-pytest
```

Additionally, we can also check if a particular workflow has been already triggered. This is useful if for example, your automatic builds also can be triggered manually. To do this, you must pass in the id of the workflow as an optional parameter `workflow-id` (which you can find out via an api call at `curl https://api.github.com/repos/{repo-owner}}/{repo-name}}/actions/workflows`). This will set a second output flag, `recent_workflow_run`, to true if it also ran in that last time period.

Your use case on how to utilize these flags my vary depending on your workflow, but you should have the information necessary to make a greener decision!

[👉 Eco CI Activity Checker in the Github Marketplace](https://github.com/marketplace/actions/eco-ci-activity-checker)
