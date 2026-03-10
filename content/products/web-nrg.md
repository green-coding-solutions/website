---
title: "webNRG"
date: 2026-03-10 10:00:00
publishDate: 2026-03-10
draft: false
icon: "lightning"
desc: "webNRG measures the energy consumption and carbon emissions of websites by combining network traffic analysis and real device power draw during rendering"
ordering: 9
---

webNRG is a free, open-source tool that measures the energy consumption and carbon emissions of websites. Unlike tools that only look at green hosting and network data, webNRG focuses on the two factors that are often overlooked: **network traffic energy** and **user-side rendering power**.

The tool combines both into a single score, graded from **A+ to F** using a Nutri-score-style system, making results instantly understandable for developers and non-engineers alike.

One of the key insights from building webNRG: a page that transfers 35× more data than another can still consume the same rendering energy. Network size and power consumption are only weakly correlated (0.49), which is why measuring both separately matters.

### How it works

- Submit your website URL for a one-time test or sign up for **weekly monitoring**
- webNRG measures energy over a 5-second window after initial page load
- Network traffic and CPU/rendering energy are tracked independently
- Results are benchmarked against idle power consumption with 25% incremental thresholds per grade
- Emissions are calculated based on a typical 10,000 users/month scenario

### Links

{{< button "lightning" "Try webNRG" "https://website-tester.green-coding.io/" >}}

{{< button "book" "Release blog article" "/blog/webnrg-released" >}}

<div class="clear"></div>
