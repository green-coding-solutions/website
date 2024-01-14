---
title: "Green Metrics measurement tool open sourced"
date: 2022-02-25
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

We are happy to announce the first prototype of our tool for measuring resource
usage.

The tool is fully open sourced under MIT license and can be used and copied
by anyone for any purpose.

All code is available on Github: https://github.com/green-coding-berlin/green-metrics-tool

&nbsp;
## About the tool
The tool can run and measure a software by spinning up the needed containers with
their respective services and then getting their dedicated usage metrics.

The simplest example would be a command line application for linux in python
that does some mathematical calculations.

In order for the tool to know what to do a "usage_scenario.json" file must
be defined that specifies which containers to run, which files to copy into
the container and what commands to send to the command line application inside the
container.

A more realistic example could be a machine learning model inside a container
or even a landscape of couple of microservices in dedicated containers consisting
of a MySQL Database, a Memcached Server, an Apache Webserver to serve and
load test a webshop.
In the latter case the usage_scenario.json would include all the container
setups as well as a typical usage case how a user will interct with the webshop.

&nbsp;

## Demo
To get a first glimpse and see some visual output we are hosting an instance of the
tool at https://metrics.green-coding.io/request.html

Here you can input your contact data and a repository URL. Please note that the
repository must contain a usage_scenario.json in a correct format and
currently only supports command line applications.

To test the flow of the green metric tool we provide a ready made demo software
that you can test: [https://github.com/green-coding-berlin/green-metric-demo-software](Github Repository for the Demo software)

After submitting a URL your software will be tested in 5-15 minutes, depeding on
the current queue. A link to the result page will be sent via e-mail.

If you would like to see some results of the demo repository right away just
go to: https://metrics.green-coding.io/

`
&nbsp;


## Documentation
The current documentation for the available fields in the prototype is found directly
in the [https://github.com/green-coding-berlin/green-metric-demo-software](Github Repository for the Demo software)


## Project timeline

We plan to integrate web-service / websites testing with URL flows soon.

Here you can input a classical web-request-flow like known from tools like selenium
that mimics a typical web user.

In the long run also desktop applications and different architectures like Windows and macOS will be supported.