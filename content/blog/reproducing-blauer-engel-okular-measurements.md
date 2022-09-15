---
title: "Reproducting the Blauer Engel für Software measurements for Okular"
date: 2022-09-15
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"

---

In the past we have joined the [Workshop around the Blauer Engel](https://www.oeko.de/forschung-beratung/projekte/pr-details/weiterentwicklung-des-umweltzeichen-blauer-engel-fuer-software-erweiterung-des-geltungsbereiches-um-server-client-anwendungen-und-applikationen-fuer-mobilie-endgeraete) (with the Öko Institut e.V. as the host this year)
and also some of the [regular meetings from the KDE Eco Team](https://eco.kde.org/blog/).

Since we have our DC measurements ready and just recently received our copy of the [GUDE 1202-1 AC Power meter](https://gude-systems.com/produkte/expert-power-control-1202/) we thought it 
would be very interesting to reproduce the measurements of the first Software that 
received the Blauer Engel certificate so far: The free PDF viewer [Okular](https://www.blauer-engel.de/en/products/kde-okular) from KDE.

## Disclaimer
In this post we will be mostly looking at the measurement part of the Blauer Engel, which 
however is really a minor part of what is relevant to get the label.

The label itself is really more of a sustainability label in terms of the lifecycle of the software. This means 
the software should be uninstallable, it should not lead to planned obsolescence, run on 5+ years old machines, 
export data to standard formats to prevent lock-in etc.

To get the Blauer Engel label NO minimum software performance metrics are enforced. This is planned for future iterations.

## Official measurement data

All the data from the measurements is available are in the [Blue Angel Application repository](https://invent.kde.org/teams/eco/blue-angel-application) from the KDE Eco Team.

The system used is a :
- Fujitsu Esprimo P958 from 2019
- Intel i5-8500 (6 Cores @ 3.0 GHz) 
    + TDP 65 W
- 16 GB RAM (DDR4, 2666 MHz)
- SSD M2 SATA 512 GB (6 Gbit/s)
- Intel UHD Graphics 630
- LAN GigaBit
- OS: Ubuntu 20.04.1


The most relevant piece for the usage data is probably the [Annex 1](https://invent.kde.org/teams/eco/blue-angel-application/-/blob/master/applications/okular/de-uz-215-eng-annex-1-okular.docx) of the application form.

In here we find that:
- idle average processor utilisation of the machine is: **0.1479 %**
- idle average electrical power consumption (net) is: **0.07 W**
- load processor utilization is: **458.7735 %s**
- load average energy demand : **0.06 Wh**

These values are in a way very confusing as the unit **%s** is not something one has to deal with daily.

The idea in the [original specification documents](https://produktinfo.blauer-engel.de/uploads/criteriafile/de/DE-UZ%20215-202001-de%20Kriterien-2020-01-16.pdf) is to move all the merely descriptive values like *%* to the
same dimension as energy (like power * time).

This however makes perfect sense if you have longer running and shorter running scenarios as it makes them better comparable.

What is very confusing though is the very small value of the **idle average electrical power consumption**.
This value is found in other documents of the appliation (*de-uz-215-eng-annex-3-okular-idle.pdf*) as 5.07 W.

When looking a bit deeper in the application documents (*de-uz-215-eng-annex-3-okular-scenario.pdf*) we find that the **0.07 W** originate from two measurements called *Baseline* and *Idle*.
They represent the state in idle without the installed software and one in idle with the software installed.
Both measuerements and then subtracted to get the theoretical overhead through the software itself. 
This explains the small value.

Als in this file we find the load average power **5.73 W** which is what we will use as it represents our displayed measurement data better.

To make the calculation similar to our reported values we thus get:

**[5.73 W (load) - 4.77 W (idle)] x 217 s / 3.6 = 57.86 mWh** 


**Info:** In the official application [documents from the Blauer Engel specification](https://www.blauer-engel.de/de/produktwelt/ressourcen-und-energieeffiziente-softwareprodukte) this *Baseline* is called Grundlast.

## Getting it running on Ubuntu 22.04

In the [Annex 1](https://invent.kde.org/teams/eco/blue-angel-application/-/blob/master/applications/okular/de-uz-215-eng-annex-1-okular.docx) the application mentions that Ubunutu 18.04 is required, but older versions should work too.

We opted for porting it to Ubuntu 22.04 as we believe this may encourage more people to have a go in trying out a certification 
for the Blauer Engel and get some code running as [18.04 does not get any Hardware and maintenance updates anymore](https://ubuntu.com/about/release-cycle) and thus might 
not be something that people are eager to isntall anymore.

In order to have it running we made some adjustments to the *Actiona* script and even created a port to 
xdotool* which made it easier to work with for us.

Ubuntu 22.04 proved to be very relaxed here in terms of needed changes as only the pop-under behaviour of the window manager had to be accounted
for which always opened Okular in the background.

For our screen also the clicking positions where greatly off and we ported it to our used resolution: **2560x1440**

We handed over all the code to the FEEP repository from the KDE Eco Team. Here is the merged [Pull Request](https://invent.kde.org/teams/eco/feep/-/commit/c89acbb3a6f642892a8a1bec281f0a17a3af754b) and one [open Pull Request for the Actiona script](https://invent.kde.org/teams/eco/feep/-/merge_requests/10).

## Our test system

Since the Blauer Engel is quite restrictive on the test systems we had a bit problems getting our 
hands on one of these machines and opted for the only one still available to  get on eBay, which was a:

- Fujitsu Esprimo P956
- Intel Core i5-6500 (4 Cores @ 3.2 GHz)
    + TDP 65 W
- 16 GB RAM (DDR4, 2133 MHz)
- 500GB HDD SATA III 7.200 U/Min.
- PSU: 250 W (80+ Gold Efficiency)
- OS: Ubuntu 22.04

Sadly we do not know what PSU was in the machine from the Blauer Engel official application for Okular,
but all the PSUs from the Esprimo machines are either 80+ or 90+ in efficiency.

## Our final measured data

We ran the measurement with our setup by encapsulating *xdotool* into a *docker* container.

Okular sadly could not be boxed into a container as the UI was broken afterwards. So we resorted for having it run non containerized.

- The [idle power draw](https://metrics.green-coding.org/stats.html?id=0356a96b-8215-403e-97ba-e4b165c7a9bd) is **16.65 W** on average 
- The [load power draw of the Standard Usage Scenario](https://metrics.green-coding.org/stats.html?id=134dc16a-d6e3-4668-a9e4-b8be7dab6dcc) is **18.80 W**.

This means we have a net power draw of **2.15 W**.

Since the Blauer Engel reports mostly on the energy let's look at the Watt-hours:

The measurement took **213.877365 seconds**. So we have to deduct a **213.877365 * 16.65 W / 3.6 = ~989.18 mwH**  from the measurement of the Standard Usage Scenario.

Since the Standard Usage Scenario used an energy of **1116.98 mWh** this leaves us with a net total of **~ 127.80 mWh** aka **0.127 Wh** when removing the idle energy.


## Summary and open problems

The difference in total energy of a factor of 2.2 seems a bit much for such simlar systems.

We are currently seeing ~20 % difference in similar machines for similar tasks so far, so this would be very interesting to have this machine tested with our lab equipment to drill deeper.

Nevertheless we are not sure if this derived value of 57.86 mWh holds, as the average power draw of a desktop computer of 5 W seems very unplausible.
On this point in particular we have contacted the Umweltcampus Birkenfeld and will update the article with more details on that.

Apart from that we had some problems reproducing the measurements as some setup conditions posed not to be optimal for reproduing:
- No PDF file was given for the test run. Tests had to be inspected to understand that the file must be at least 60 pages long
- When using Ubuntu 22.04 the tests were not working, cause setting the app to fullscreen mode introduced a popup that was not accounted for.
- Resolution was unknown. In our used resolution 2560x1440 it was not working. Clicks where off
- Okular changed its interface in the meantime. Since the version was specified we could have switched to the older version, but this highlights how flaky only xdotool / Actiona tests are sadly. In the most recent version from the package repositories in Ubuntu 22.04 some elements where center-aligned rather than left, which breaks pixel based clicking tools.
- Actiona could not be used out of the box. The window for the test runner must be moved to the bottom right, otherwise it would close itself.
- Ubuntu 22.04 had to be moved to a X11 by default. Wayland was not working.
- Okular did never run on first start. The script is so fast that it seeming expects that the document is already cached.
    + However this probably where the most load of Okular happens: Opening and parsing a document for the first time and then caching most of the heavy work

### Technical / electrical problems
- No way to know if any of the actions succeeeded. The tests MUST be run with a human sitting next to it.
- The GUDE posed not apt to fulfill the job of measuring:
    + It is possible to hide short spikes of power!!! Switching a light briefly on may lead to a zero reading as it is not caught by the slow sampling interval. This we have also [demonstrated in the KDE measurement lab](https://eco.kde.org/blog/2022-07-25-sprint-lab-follow-up/)
    + The resolution of 1 s is generally too low. One cannot tell much about typical software execution times in the millisecond range
    + The resolution if 1 W for the GUDE is also really coarse and leads to sometimes 20-25% off values at least, given that very efficienct desktop machines can have loads < 10 W.
    + Stating a measurement value of "Average electrical power draw" of 0.6 W (even assuming it was mathematically accurately derived) is really not possible to claim if the measurement device only has a 1 W resolution :)
    + It has a delay of ~ 1 second for the measurements as seen here. We made an [example measurement](https://metrics.green-coding.org/stats.html?id=0f0e89ab-f7f5-4bf8-a6ba-40efeeca50a6) where we only stress one core to really identify when the GUDE starts measuring and when it ends. The problem being though that you might well be 100-200 ms off, as the GUDE not always responds in the same frequency on its polling API for the measurement data. So this increases the uncertainty even more.

## Outlook

Althoug we have many critical points on the measurement part in this article we strongly believe
in the approach of the Blue Angel as it is layed out so far.

The focus on the meta criteria and a Standard Usage Scenario is what really can help
end users navigate through the complexity that modern software applications have if they
want to make a sustainable digital decision.

Measuring all code paths and eventualities is neither scalable nor practical.

But by focusing on the major use cases and molding them into a Standard Usage Scenario
is an approach to not only measure an application task, but also make it comparable.

We hope to see the Blue Angel move forward and streamline the application process as well
as put a tighter grip on the measurement criteria.
Also by introducing a central measurement service (available as SaaS) so that people interested in certifiying can use
instead of investing into measurement hardware.

The restriction on the Esprimo machines makes perfect sense for us in order to allow people to reproduce the results, but not for scaling the certification process in general.