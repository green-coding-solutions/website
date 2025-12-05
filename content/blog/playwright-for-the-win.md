---
title: "First-Class Playwright Support"
date: 2025-12-05
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/playwright.webp"
---

We’re excited to announce a new feature in the [Green Metrics Tool](https://github.com/green-coding-solutions/green-metrics-tool): **first-class Playwright support**.

[Playwright](https://playwright.dev/) is a widely used framework for end-to-end browser automation and testing. Many teams rely on it to ensure their web applications work as expected. Until now, running Playwright scripts with the Green Metrics Tool meant using the Docker Playwright container and manually mounting scripts. With this update, Playwright is now a **native usage scenario type**, making it far easier to measure the environmental impact of real browser interactions.

---

## Why Playwright?

Playwright has become a standard tool in modern testing pipelines. It allows developers to automate realistic user journeys across multiple browsers with minimal code. Since the Green Metrics Tool focuses on assessing software sustainability under real-world conditions, seamless Playwright integration was a natural next step.

---

## How It Works

The workflow is almost unchanged—except now you can define Playwright as a command type.
Previously, you could only use `console` commands. Now you can embed Playwright steps directly in your usage scenarios. Full details are in the [documentation](https://docs.green-coding.io/docs/measuring/measuring-websites/).

To make things easier to understand here is an example:

```yaml
  - name: "Go to home page simple"
    container: gcb-playwright
    commands:
      - type: playwright
        command: await page.goto("https://green-coding.io")
      - type: console
        command: sleep 5

```  

You no longer need a separate file with Playwright commands—just write them directly in your usage scenario. This keeps everything in one place and allows fine-grained energy measurements, for example seeing exactly what resources a page load consumes.

To make the commands work you need to use an include that provides all the magic in the background:
```yml
compose-file: !include-gmt-helper gmt-playwright-v1.1.0.yml
```

[Here](https://github.com/green-coding-solutions/green-metrics-tool/blob/c38c67e87782f9f1402ff5922182b961660d5be6/templates/website/usage_scenario.yml) here is a full example of a `usage_scenario.yml` file.

The way this works is that we start an inter process listener in the container that then gets the commands from the GMT similar to this:
```yml
    container: gcb-playwright
    commands:
      - type: console
        command: node /tmp/energy-tests/playwright-ipc.js --browser firefox
        note: Starting browser in background process with IPC
        detach: true
      - type: console
        command: until [ -p "/tmp/playwright-ipc-ready" ]; do sleep 1; done && echo "Browser ready!"
        shell: bash
        note: Waiting for website stepper loop to start by monitoring rendevous file endpoint
```
You can find the included listener code and services [here](https://github.com/green-coding-solutions/green-metrics-tool/blob/c38c67e87782f9f1402ff5922182b961660d5be6/templates/partials/gmt-playwright-v1.0.0.yml) - Double check as we constantly update the files and the version v1.0.0 might be outdated at the time of reading!

For a real example in action, check out the [Branch Magazine energy tests](https://github.com/green-coding-solutions/branch-magazine-energy-tests/tree/main).

---

Try it out and [share your feedback](https://github.com/green-coding-solutions/green-metrics-tool/discussions).
