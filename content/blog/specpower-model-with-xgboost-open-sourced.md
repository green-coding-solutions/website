---
title: "SPECPower model with XGBoost open sourced"
date: 2022-11-08
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

A detailed blog article is yet to come, but for everyone who follows our
blog only and not our repositories we wanted to highlight that we open sourced
the new XGBoost variant of the [SPECPower estimation model for cloud workloads on github](https://github.com/green-coding-solutions/spec-power-model).

I guess the most interesting parts are the charts, where you can see the
SPECPower data in comparsion to the a model by the [SDIA](https://www.sdialliance.org) formula and also our
old linear model as well as the XGBoost model.

## Summary excerpt

- We can see that the SDIA model in its current form cannot account for the idle state of the machine and thus always underestimates here
- The SDIA model underestimates 1-chip machines and greatly over-estimates 2-chip machines
- Taken into account that for 2-chip machines we only have SPECPower data at the moment and no real world data
- The linear model is good for parameter exploration, but delivers badly fitted results
- The XGBoost model is able to estimate a real world 1-chip machine and an out of sample 2-chip machine from SPECPower very nicely.
    + However it tends to under-estimate
- We see suprisingly no efficiency gain from applying the SPECPower BIOS settings but rather a smoothing of the curve.
    + The reason to that is currently unknown.

## Detailed Talk & Slides
Here are the slides to our talk, where we present the works on and performance of the model
at the PyData Nov'22 Meetup in Berlin.

[Download Slides]({{- "slides/PyData-Talk.pdf" | absLangURL -}})