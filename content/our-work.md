---
title: "Sustainable Software"
draft: false
summary: "Find out what we do at Green Coding and why the carbon impact of software matters"
date: 2022-07-21 08:00:00
author: "Arne Tarara"
authorlink: "https://de.linkedin.com/in/arne-tarara"

---

Software will always have carbon emissions. The same way that also solar power has some carbon emissions
and human life does too.

However we believe that using software is the way to be more green and more sustainable and digitalizing every sector is one building block to tackle climate change.

As with every technological domain measuring and understanding how much you use 
is the most important step to approach any task. 

The next step is to understand the potentials for optimizations. Sometimes this are very low hangig fruits like
[green hosting](https://www.thegreenwebfoundation.org/).

Other times it involves changes to your infrastructure, your code or your development workflows.

Nevertheless we see it as an exciting process that is for the best of all of us.

Let's make software cool again!

{{< rawhtml >}}
                </div>
            </div>
    </section><!-- end about -->
    <section class="single-page bg-two" style=""><div id="ancla1"></div>
        <div class="section-two">
            <div class="title-two">Software usage</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-two">                
{{< /rawhtml >}}
In order to do compute software needs to use the underlying hardware and will thus consume energy.

Energy consumption is often not straight forward. If you have CPU / GPU intensive loads like in [High Performance Computing](https://en.wikipedia.org/wiki/High-performance_computing)
or in Bitcoin Mining then the energy use is often identical to the Thermal Design power of your chip.

In everday use of software the case is however very different. Many factors contribute to the often wasteful energy use of software
and are often decoupled from the pure visual time we see a software running:

#### Boot time
Modern software runs virtualized or containerized. These virtual machines have to be booted and the cost for this constant up-spinning and
down-spinning is hidden from the user and often even from the developer.
#### Background activities
After the user interaction software has to do background jobs. Be it cronjobs, ML Training, stream processing etc.
#### Idle time
Even in the age of virtualization machines often have significant idle times. In the user landscape this is often compensated with sleep modes. In the server
world energy saving modes typically do not exist.
#### Process energy
Software can so fast that it is not perceivable if the usage was 10ms or 100ms. Nevertheless the energy difference can be enormous and 
is hard to estimate if scaled up.


### Our work
To make all of these separate domains visible to the developer we are creating open source tools to show the energy during the complete lifecycle 
of an application.

See our [Github](https://github.com/green-coding-berlin) repository and our current flaghship product the [Green Metrics Tool](https://github.com/green-coding-berlin/green-metrics-tool)

{{< rawhtml >}}
                </div>
            </div>
    </section><!-- end about -->
    <section class="single-page bg-one" style=""><div id="ancla1"></div>
        <div class="section-one">
            <div class="title-one">Developing software</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">                
{{< /rawhtml >}}

When developing software also VMs are constantly spun up and down. In addition to that in a typical developing process
software runs through a Continuous Integration (CI) Pipeline and all the tests are executed in full.

This process is often very opaque and the true cost hidden from the developer as it takes place in the cloud or on
specialized SAAS platforms.

The understanding the cost of building software and the potential savings when batching the process or even splitting 
the Pipeline to only execute relevant parts can be tremendous.

### Our work
As said before: Measuring is the first key to understanding, therefore our main focus here lies in 
the visiblity and education about the energy cost for developing software.

We develop in-line plugins for Github Actions and badges that make other people aware how much the build costs.

Also we focus in the building process for static sites, which typically have a lower cost of operating but incur a build cost.

Checkout out our energy badges in [Github Readmes](https://github.com/green-coding-berlin/wordpress-static) or our [Case Studies](https://www.green-coding.org/showcases/) on the topic. 

Example badge: {{< rawhtml >}} <img src="https://img.shields.io/badge/Energy%20cost%20for%20build-1.4%20J-orange">{{< /rawhtml >}}

Our CI Pipeline Plugins are currently in beta. If you want to join the circle of beta testers \
please drop us a line to: [info@green-coding.org](mailto:info@green-coding.org)

{{< rawhtml >}}
                </div>
            </div>
    </section><!-- end about -->
    <section class="single-page bg-two" style=""><div id="ancla1"></div>
        <div class="section-two">
            <div class="title-two">Network</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-two">                
{{< /rawhtml >}}
Network transmissions are coming more and more into the focus as one of 
the main drivers of software carbon emissions.

Great tools like [Websitecarbon.com](https://www.websitecarbon.com/) allow the visiblity of the cost for a typical
website request.

Nowadays this is typically done by boiling down the complexity into one very error prone formula. See our
article on [CO2-Formulas](https://www.green-coding.org/co2-formulas/) for more details.

The problematic in network emissions lies not in their existence, but in their invisibilty.

In the advent of the internet network transfer was typically metered. By introducing flatrates
the internet increased its adoption and became ubiquitous.

However flatrates have introduced a decoupling from the nature of network transmissions not really
having a flat carbon emission. 
This creates a disconnectedness and misunderstandig that every use of network has typically 
a linear increase in carbon emissions.

Since you do not see your consumption, like you for instance do for you telephone bill, you
risk getting careless with the resource. Same as with buffet food, where leftovers are the norm.

The solution to this is, we believe, making this resource more visible and getting a more sustainable
way of interacting with it.

### Our work
We currently address this topic by educating developers through [Meetups](https://www.green-coding.org/meetups) and through
talks at conferences or coding bootcamps like [WBS Coding School](https://www.wbscodingschool.com/)

On the technical site we highligh the network emissions in our [Green Metrics Tool](https://github.com/green-coding-berlin/green-metrics-tool) and show
recommendations like
- Moving connection from mobile to fixed-line
- Demand Shifting to do network requests in carbon-friendly times
- Using compression techniques
- Altering connection formats like HTTP -> HTTP2
- NOT delivering content that has no strong benefit
- Reducing update cycles and polling intervals 

{{< rawhtml >}}
                </div>
            </div>
    </section><!-- end about -->
    <section class="single-page bg-one" style=""><div id="ancla1"></div>
        <div class="section-one">
            <div class="title-one">Embodied carbon</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">                
{{< /rawhtml >}}

To run software you need hardware. That hardware has to be produced and often is the major driver of carbon emissions.

In consumer devices like Smartphones typically [over 90% of the total carbon emissions come from the manufacturing](https://greensoftware.foundation/articles/sustainable-systems-user-hardware-and-sustainability)

On servers this is a differnt deal, and here it is [roughly the other way around](https://i.dell.com/sites/csdocuments/CorpComm_Docs/en/carbon-footprint-poweredge-r740xd.pdf
) (if you are not running on carbon free electricty).

### Our work
We use official databases like the [NegaOctet](https://negaoctet.org/) database from France to get the embodied carbon of the underlying hardware
and showing the cost of manufactoring.

Another approach we will likely adopt in the future is the concept of "Digital Resource Primitives", which is developed by the [SDIA](https://knowledge.sdialliance.org/digital-environmental-footprint).

The concept effectively coins a resource as blocked, when it is used by software and thus can attribute the carbon impact from manufacturing
to the time when it is used making software better comparable.



{{< rawhtml >}}
                </div>
            </div>
    </section><!-- end about -->
    <section class="single-page bg-two" style=""><div id="ancla1"></div>
        <div class="section-two">
            <div class="title-two">Work with us</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-two">                
{{< /rawhtml >}}

If you are a developer that wants to develop sustainable software or just use our tools, a company that needs 
consulting on their digital products or an activists group, please contact us under [info@green-coding.org](mailto:info@green-coding.org)

