---
title: "Estimating Cloud Energy Consumption with a Linear Model - Part 1"
draft: false
date: 2022-09-27
author: "Dan Mateas"
authorlink: "https://www.linkedin.com/in/dan-mateas-693634105/"
---

{{< infobox >}}
    This arcticle is part of a multi-part series. Be sure to check out / stay tuned for the other parts!
{{< /infobox >}}

A big goal for us here is at how to measure the energy/carbon use of cloud services.

{{< rawhtml >}}
<img class="ui big floated right image" src="/img/blog/aws_carbon_dashboard.webp" alt="AWS Carbon dashboard" loading="lazy">
{{< /rawhtml >}}

There already exists proprietary energy consumption dashboards for [Microsoft Azure](https://appsource.microsoft.com/en-us/product/power-bi/coi-sustainability.emissions_impact_dashboard), [Google](https://cloud.google.com/carbon-footprint), and [Amazon](https://aws.amazon.com/blogs/aws/new-customer-carbon-footprint-tool/) products. These generally use billing, hardware, and market data, alongside data center efficiency information, to provide emissions data. While they seem robust and a fantastic step in the right direction - there are some shortcomings with these tools. A big one is the lack of transparency - these numbers don't have much way to be verified.\
Another problem is that the data is only available with 1-3 months latency, which is not really suitable for any actionable insights, given todays fast iteration cycles on software releases.

Our goal therefore, is to try to make an open source generalized tool that can be used to estimate the usage on (ideally) any cloud setup.

Starting this, we quickly come across a very fundamental issue: the information we can query from a cloud system itself can be very limited. Normally, we would measure the energy used via reading an energy register such as RAPL, but very often these registers are not exposed, or give null-value data because of security concerns.

Since we cannot measure energy used directly, the best course of action is to use a mathematical model to estimate the emissions based on the hardware setup. However, even this approach has some hurdles to overcome. In some cloud setups, the information you can find out about the system can be so limited that you don't even know the exact CPU model! This is especially problematic since we have found that in most server setups, the CPU is what draws 65-80% of the power in a system (for compute workloads without GPU aid). 

With these problems in mind - we wanted to create a model that can be used to give a carbon estimation based on what information you *do* have about your machine.

Other folks have already worked on models over at [Teads](https://medium.com/teads-engineering/building-an-aws-ec2-carbon-emissions-dataset-3f0fd76c98ac) and [Cloud Carbon Footprint (CCF)](https://www.cloudcarbonfootprint.org/docs/methodology). These models try to make either an energy or carbon estimation based on some key factors such as CPU model, utilization rate, region, RAM, and virtual host capacity. 

Both of these models leverage an open data set called [SPEC Power](https://www.spec.org/power_ssj2008/results/) and also work from  [Etsy Cloud Jewels](https://www.etsy.com/codeascraft/cloud-jewels-estimating-kwh-in-the-cloud). 
SPECPower is an industry-used and trusted set of benchmarks in which many different cloud setups were put under incrementally increasing loads and the power draw measured and recorded. 
They look up your CPU in the dataset to find an estimated wattage. 
In the case where the model is not in the data set, they use the Thermal Design Power ([TDP](https://en.wikipedia.org/wiki/Thermal_design_power)) to get a wattage estimation.

An addition to these three models from Teads, CCF and Etsy Cloud Jewels is the work from [Greenpixie](https://greenpixie.com/blog/cloud-emission-calculation-methodology-AWS).
Their model is mainly focused on AWS, like Teads is. But additionaly it provides information for services like AWS Aurora and AWS Lambda. Other services like DynamoDB etc. are not included though.

While all these models are great and if you run on EC2 exclusively the Teads for instance might be the best out there, they lack the insight of real time measurements and good tooling.
Also they only work in specific scenarios and are not multi-service by design, as for instance a native linux command line tool would be.

Coming back to our approach of modelling the pure compute energy consumption: Unfortunately using the SPEC database has some limitations (which contributed to our decision to start estimating the data with a [linear model](https://en.wikipedia.org/wiki/Linear_regression)). We will explore these limitations - and how we designed our model - in the next part of this blog series. In further series we will then look at the construction of a multi-cloud command line tool that can stream a live calculated power rating to for instance Prometheus or similar.