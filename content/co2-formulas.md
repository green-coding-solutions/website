---
title: "CO2 Formulas"
draft: false
summary: "Formulas to convert from GB to CO2e or from kWH to CO2e etc."
date: 2022-07-21 08:00:00
author: "Arne Tarara"
authorlink: "https://de.linkedin.com/in/arne-tarara"

---

When using software the typical unit we experience directly is often time. Software is either fast or slow,
but we typically do not think about the carbon footprint of software.

Software uses energy through the utilization of the underlying hardware (typically measured in Watts). These Watts have to come from somewhere and we will see that every amount of energy typically has a carbon value associated with it.

Also software uses energy when making network requests and also indirectly is responsible for the embodied carbon, which is the CO2 emitted when the hardware that it uses has to be initially manufactured.

On this page we want to hightlight how to get from typical values like **time** or **Megabytes** to **kWh** and finally to **CO2**.

{{< rawhtml >}}
                </div>
            </div>
    </section><!-- end about -->
    <section class="single-page bg-two" style=""><div id="ancla1"></div>
        <div class="section-two">
            <div class="title-two">List of CO2 formulas</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <div class="ui segment">
                    <div class="header">
                        <a class="ui blue ribbon label" href="#gigabytes-to-kwh" id="gigabytes-to-kwh">
                            <h3 style="color: #fff;">Gigabytes to kwH</h3>
                        </a>
                    </div>
                    <p></p>
                    <img class="ui large floated right rounded bordered image" src="/img/co2-formulas/boundaries_network_emissions.webp">
                    <p>When you want to quantify the cost of transferring an amount of data through the internet you would need to measure at every hop of the packet and add up cost for routers, cables, tranmission towers etc.</p>
                    <p>Since this measurement data is not available a heuristic is used that estimates the cost of all this network equipment the data has to flow through based on the actual transferred amount of data in GB.</p>
                    <p>When you have the value already in GB you can just convert them with a constant factor to kWh.</p>
                    <p>As you might suggest this seemingly easy formula makes a lot of assumptions and uses a lot of averages.</p>
                    <p>Typically these approaches either follow a top down approach by looking at the electricity bill of a telecom provider and then the network transmission reporting to divide the two numbers.</p>
                    <p>Other approaches are to really trace the path of some sample packets and look at every piece of network equipment on the way and then on its power draw for the transmission only.</p>
                    <p>There are also other approaches but all have downsides and upsides. The number of <strong>0.06 kWh / GB</strong> is already a mix with the idea to get the best out of all of these approaches.</p>
                    <p>The study linked in the source [1] down below also notes that through advances in efficiency the electric intesity drops by around a half every 2 years and suggests that an extrapolation for the coming years might be a valid assumption. This would bring the value in <strong>2024</strong> down to a <strong>~0.002652 kWH / GB</strong> (<i>0.06 / (2**(9/2))</i>)</p>
                    <p>However this model is not without critique, as the real nature of network devices to date is that they consume 80% of their peak capacity already in idle mode. The rest is a proportional factor according to the usage of the possible bandwidth. Many models have been proposed to better attribute this reality on the real electricity cost for application that uses the network, however time-share or data-share models all have different downsides [2][3].</p>
                    <p>We deciced to use the linear approach of network transfer attribution to power consumption in our tools as it bests incentives the user to keep the network traffic to a minimum. No matter which current known calculation method is used it will be inaccurate still and none of the current methods can reliably incorporate the real costs of provisioning new hardware for bandwith increase back in time to the pool of applications that tipped the providers to increase the bandwith. This we have also discussed with one of the paper authors on GitHub [4]</p>
                    <h3>Included Network parts</h3>
                    <p>The important point to note with this number is which parts of the network are included. In the picture on the right you see the included parts. <strong>Only the Access Network and the IP core network is included</strong>, which means the connection between datacenters and telecom providers.</p>
                    <p>Not included are the networking inside of the datacenters and also no end-user devices or their in-Home wifi. The calculation only goes to the curbside.</p>
                    <p>Also important: <strong>Only fixed line transmissions</strong> are included in this number. No mobile traffic, which is typically more energy intensive by at least the factor 2-3x.</p>
                    <h3>Value in Gigabytes</h3>
                    <div class="ui mini statistics">
                        <div class="statistic">
                            <div class="value">1</div>
                            <div class="label">Gigabytes</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">0.0028125</div>
                            <div class="label">kWh / GB</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">0.0028125</div>
                            <div class="label">kWH</div>
                        </div>
                    </div>
                    <p>If your value is in Megabytes the conversion factor has to be divived with <strong>1.000</strong> and will equate to <strong>0.0000028125 MB / kWh</strong></p>
                    <h3>Alternative numbers</h3>
                    <p>Recently also a very detailed study from <a href="https://resilio.tech">Resilio</a> for the French Government produced some different numbers which are even about one order of magnitude lower. Since they have been using the accredited methodology from ADEME it might make sense to use these numbers in France specifically if not the EU. [5]</p>
                    <p>[1] <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/jiec.12630">Untangling the estimates</a></p>
                    <p>[2] <a href="https://github.com/intarchboard/e-impact-workshop-public/blob/main/papers/Schien_Rethinking-Allocation-v2.pdf">Daniel Schien, Paul Shabajee, Chris Preist. “Rethinking Allocation in High-Baseload Systems: A Demand-Proportional Network Electricity Intensity Metric.”</a></p>
                    <p>[3] <a href="https://onlinelibrary.wiley.com/doi/10.1111/jiec.13512">Network energy use not directly proportional to data volume: The power model approach for more reliable network energy consumption calculations</p>
                    <p>[4] <a href="https://github.com/green-coding-solutions/green-metrics-tool/issues/707">GitHub Discussion on whether incentivized approaches make still sense for attribution of network traffic data.</p>
                    <p>[5] <a href="https://librairie.ademe.fr/7111-evaluation-of-the-environmental-footprint-of-internet-service-provisioning-in-france.html">Evaluation of the environmental footprint of internet service provisioning in France</a></p>
                </div>
                <!-- end segment -->                
                <div class="ui segment">
                    <div class="header">
                        <a class="ui yellow ribbon label" href="#from-kwh-to-co2e" id="from-kwh-to-co2e">
                            <h3 style="color: #fff;">From kWh to CO2e</h3>
                        </a>
                    </div>
                    <p></p>
                    <img class="ui large floated right rounded bordered image" src="/img/co2-formulas/electricitymap_de.webp">
                    <p>This conversion is probably the most often done and also the one with the most impact.</p>
                    <p>By most often done we mean that companies already get the current intensity of their grid and schedule workloads accordingly.</p>
                    <p>The current intensity of the grid can for instance be retrieved from <a href="https://app.electricitymaps.com/zone/DE">Electricitymap.com</a>. In our case in Germany the number is at the moment <strong>317 gCO2e/kWh</strong></p>
                    <h3>Worldwide average grid carbon intensity</h3>
                    <p>If your workload is distributed over multiple countries or you don't know at all where your workload is running, then the best way is to take the global average.</p>
                    <p>For 2022 this number is: <strong>436 gCO2e/kWh</strong> (No numbers for 2023 have been released as of writing on 10.02.2024)</p>
                    <p>So if we were to plug in this number into a calculation starting with kWh we get directly to gCO2e, which means gramms of CO2 equivalent. Since not every checmical process generates pure CO2 they are all converted to the equivalent climate warming potential of CO2, which results in CO2e</p>
                    <div class="ui five mini statistics">
                        <div class="statistic">
                            <div class="value">1</div>
                            <div class="label">kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">436</div>
                            <div class="label">gCO2e/kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">436</div>
                            <div class="label">gCO2e</div>
                        </div>
                    </div>
                    <p>Source: <a href="https://ember-climate.org/insights/research/global-electricity-review-2023/">Ember Climate</a></p>
                </div>
                <!-- end segment -->
                <div class="ui segment" id="calculating-savings">
                    <div class="header">
                        <a class="ui blue ribbon label" href="#from-joules-to-kwh" id="from-joules-to-kwh">
                            <h3 style="color: #fff;">From Joules to kwH</h3>
                        </a>
                    </div>
                    <p></p>
                    <p>Some energy budgeting tools or internal power meters (like <strong>Intel RAPL</strong>) give you *Joules* as an output value.</p>
                    <p>The actual SI-Unit value of Joules is Ws. So in order to get to kWh you have to first get to hours (60*60) and then get to *kilo*, which means to divide by a thousand</p>
                    <h3>Joules zu kWh</h3>
                    <div class="ui ten mini statistics">
                        <div class="statistic">
                            <div class="value">1</div>
                            <div class="label">Joule</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">/</div></div>
                        <div class="statistic">
                            <div class="value">(60*60)</div>
                            <div class="label">(to get to hours)</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">/</div></div>
                        <div class="statistic">
                            <div class="value">(1.000)</div>
                            <div class="label">(to get to *kilo*)</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">0.000000277...</div>
                            <div class="label">kWH</div>
                        </div>
                    </div>
                    <p>And vice versa:</p>
                    <h3>kWh to Joules</h3>
                    <div class="ui eight mini statistics">
                        <div class="statistic">
                            <div class="value">1</div>
                            <div class="label">kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">*</div></div>
                        <div class="statistic">
                            <div class="value">(60*60)</div>
                            <div class="label">(remove hours)</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">*</div></div>
                        <div class="statistic">
                            <div class="value">(1.000)</div>
                            <div class="label">(remove *kilo*)</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">3.600.000</div>
                            <div class="label">Joules</div>
                        </div>
                    </div>
                </div>
                <!-- end segment --> 
                <div class="ui segment">
                    <div class="header">
                        <a class="ui green ribbon label" href="#from-specs-to-kwh" id="from-specs-to-kwh">
                            <h3 style="color: #fff;">From Specs to kWh</h3>
                        </a>
                    </div>
                    <p></p>
                    <p>If you cannot measure the Watts directly (with an external powermeter, Intel RAPL, etc.) then you can always use datasheets or benchmarks and interpolate to get to your power value.</p>
                    <p>A naive approach to estimate the energy draw of a processor would be to use its Thermal Design Power (TDP).</p>
                    <p>This gives you a first impression in which order of magnitude your expected energy value is.</p>
                    <p>Example: My <a href="https://ark.intel.com/content/www/de/de/ark/products/84993/intel-core-i75557u-processor-4m-cache-up-to-3-40-ghz.html"><strong>Intel i7-5557U</strong> has a TDP of <strong>28 W</strong></a></p>
                    <p>If I were to do a compute of 5 seconds I would expect an energy consumption of <strong>140 Ws</strong> (28 W * 5 s), aka <strong>140 J</strong>.</p>
                    <p>If you look at our <a href="https://metrics.green-coding.io/stats.html?id=280ab840-a360-481f-8be7-b2712fde6281">CPU measurement</a> of a full CPU load you will see that the measured value is only <strong>~60 J</strong>.</p>
                    <p>So we can conclude that the TDP is a very rough estimate, and serves as a good upper bound. But it exaggerates the real energy by quite a bit.</p>
                </div>
                <!-- end segment -->              
                <div class="ui segment">
                    <div class="header">
                        <a class="ui green ribbon label" href="#">
                            <h3 style="color: #fff;">From Benchmarks to kWh</h3>
                        </a>
                    </div>
                    <p></p>
                    <p>A benchmark is another way to get from runtime to kWh.</p>
                    <p>TODO</p>
                    <p>Source: <a href="https://github.com/cloud-carbon-footprint/cloud-carbon-coefficients">David Mytton</a></p>
                </div>
                <!-- end segment -->          
{{< /rawhtml >}}
