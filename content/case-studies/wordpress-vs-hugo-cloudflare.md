---
title: "Wordpress vs. Hugo + Cloudflare"
summary: "In this case study we will look the carbon benefit of a static site compared to a Wordpress site. To get a more fair picture we will also include the HUGO build process and reason a bit about a possible hosting optimization."
date: 2022-07-28 08:00:00
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"

---

{{< rawhtml >}}
    <img class="ui medium floated right rounded bordered image" src="/img/case-studies/wordpress-vs-cloudflare-and-hugo.webp">
{{< /rawhtml >}}

In this case study we will look the carbon benefit of a static site. 

Site generators like [HUGO](https://www.gohugo.io) are currently all the hype. The idea is to write your website in simple markdown but still benefit from nice styling and templating. 

The result will be a one-time generated page which saves server compute resources, is faster to deliver and, hopefully, also save carbon emissions.

We will create a simple Wordpress site and then port the design and posts to HUGO. We will measure the carbon emissions of Wordpress for parsing the page with the database and PHP, and we will also measure the cost of HUGO generating the static HTML page.

We will then look at the savings of HUGO and the potential tipping point if you build your page too often, where HUGO might be less optimal than Wordpress.

Also we will talk about hosting, as we will see that just moving your site to Wordpress without using a webhosting that can actually turn OFF the server you will have a close to zero impact in carbon emissions.



- Cost of building around 1-6 Joules -> Link
- Cost of RAM and disk not looked at. RAM however more than one order of magnitude lower in internal tests

- We will try then the absolute most minimal setups to make the comparison as fair as possible.
    + We will spin up a simple apache webserver and deliver the hugo public folder
    + We will spin up the basic wordpress with the same template and just make a request to the root page


- CURL vs. Firefox 
- Exclude functionality for containers in measurement!



{{< rawhtml >}}
            </div>
         </div>
    </section><!-- end about -->
    <section class="single-page bg-two">
        <div class="section-two" style="padding: 10px;">
            <div class="data-content-one">
            <div class="ui segment raised">
                <div class="header">
                    <a class="ui red ribbon label" href="#">
                        <h3 style="color: #fff;">Agenda</h3>
                    </a>
                </div>
                <div class="ui list">
                    <div class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="header">
                                <a href="#introduction">Introduction</a>
                            </div>
                        </div>
                    </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#research-question">Research Question</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#repositories">Repositories</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#measurements">Measurements</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#hosting-and-idle">Hosting and Idle time</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#summary">Summary & further considerations</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </section><!-- end about -->
    <section class="single-page bg-one" style="">
        <div class="section-one">
            <div class="title-one">What do we want to find out?</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <div class="ui segment inverted" id="research-question">
                    <h2 class="ui header">
                        <i class="graduation cap icon"></i>
                        <div class="content">
                            Research question
                            <div class="sub header">How much do we save when moving our site from Wordpress to HUGO by looking at the per-request energy but also at the build time?</div>
                        </div>
                    </h2>
                </div>
            </div>
         </div>
    </section><!-- end about -->
    <section class="single-page bg-two" style="">
        <div class="section-two">
            <div class="title-two">Data</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <div class="ui segment" id="repositories">
                    <div class="header">
                        <a class="ui blue ribbon label" href="#repositories">
                            <h3 style="color: #fff;">Repositories</h3>
                        </a>
                    </div>
                    <p>All the software we are talking here about and are basing our calculations on you can run yourself and falsify.</p>
                    <div class="ui list">
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="https://github.com/green-coding-berlin/wordpress-static">Wordpress Minimal Site</a>
                                    <p>Github repository</p>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="https://metrics.green-coding.io/stats.html?id=ad66a391-eb61-49e0-a557-b8caf48f3aaa">Wordpress Minimal Site</a>
                                    <p>Energy Measurements of web request</p>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="https://github.com/green-coding-berlin/example-applications/tree/main/wordpress-vs-hugo/hugo-apache">HUGO Minimal Site</a>
                                    <p>Github repository</p>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="https://metrics.green-coding.io/stats.html?id=7e2da0da-ee0e-495a-960e-1f7af014643c">HUGO Minimal Site</a>
                                    <p>Energy-Measurement of web request</p>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="https://metrics.green-coding.io/stats.html?id=ecae575e-8c76-44eb-a3be-db1d6c5fd331">HUGO Minimal Site</a>
                                    <p>Energy-Measurement of build process</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui red message" id="research-question">
                    <h2 class="ui header">
                    <i class="warning icon floated left huge colored red"></i>                        
                        <div class="content">
                            Measurements Disclaimer
                            <div class="sub header">All energy measurements and / or benchmarks on a normal operating system are by nature error prone and uncomparable. Please never compare our values with values on your system. Measurements of software can only ever be compared on the exact same system. Also measurements should never be seen as ground truth, but only as indicator of the order of magnitude.</div>
                        </div>
                    </h2>
                </div>                
                <div class="ui segment" id="measurements">
                    <div class="header">
                        <a class="ui orange ribbon label" href="#measurements">
                            <h3 style="color: #fff;">Measurements</h3>
                        </a>
                    </div>
                    <p></p>
                    <div id="chart"style="width: 100%; max-width: 600px; height: 300px; display: block; float:right;"></div>
                    <p>The chart on the right side shows the relation of the HUGO build process (<strong>~1.4 J</strong>), the HUGO energy per web request (<strong>~1 J</strong>) and the energy for a web request o Wordpress (<strong>~10 J</strong>)</p>
                    <p>Since we have repeated the measurements 3 times we attached the error bars, which represent the 95% confidence interval.</p>
                    <p>The measurements are already an order of magnitude off, which is kind of what we assumed from the start. A static site is enormously more efficient, even if you also include the build process. Even for this simple setup it is around 10x.</p>
                    <p><strong>Note:</strong> If you want to drill down on the details of the measurement like: How long was the pre-heat time of the CPU, how long was the pre-idle time, which CPU was used, what was the measurement resolution etc. please check the details on the links in the box above.</p>                
                </div>
                <div class="ui segment" id="hosting-and-idle">
                    <div class="header">
                        <a class="ui red ribbon label" href="#hosting-and-idle">
                            <h3 style="color: #fff;">Hosting and idle time</h3>
                        </a>
                    </div>
                    <p></p>               
                    <p>When optimizing for low carbon and low energy hosting is a very important topic.</p>
                    <p>If you were just to replace the Wordpress site with a static site but the server will continue to run in idle it might be that your total energy savings are very minimal.</p>
                    <p>If you look at the <a href="https://docs.microsoft.com/en-gb/learn/modules/sustainable-software-engineering-overview/7-energy-proportionality">simplified load to energy curve from Microsoft</a> you can see that just by having the machine in idle you are already using a significant portion of energy.</p>
                    <p>These curves are, as said, simplified and a real curve might look better or worse. Very good and industry used measurements are the <a href="https://www.spec.org/power_ssj2008/results/res2022q3/power_ssj2008-20220617-01178.html">curves from the SPECpower team</a>.</p>
                    <p>Typically a server runs at least at 10-15% load when it is fully hypervised and this means that when you are one client on the server you are typially in the flat part of the curve.</p>
                    <p>An optimization for pure compute has the lowest effect here.</p>
                    <p>Also you have to take into account that a typical webserver that only serves webpages is mostly idle. Therefore typically the idle power draw is your major concern, and not so much the minimal load that your website puts onto the server.</p>
                    <p>If you have a typical web application (say a website) that has typically long patterns of idle time / time between requests, than you should go for a hosting solution that can dynamically scale to zero.</p>
                    <p>Cloudflare for instance provides such a feature with their <a href="https://pages.cloudflare.com/">Cloudflare Pages</a> product that also supports HUGO out of the box.</p>
                </div>
            </div>
         </div>
    </section><!-- end about -->
    <section class="single-page bg-one" id="summary">
        <div class="section-one">
            <div class="title-one">Summary</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <p>We have looked at some rough metrics on the energy usage of Wordpress and HUGO in comparison and also looked at the potential minimal gain if you just have your website moved to a static version but do not adress the idle power draw issue.</p>
                <p>If your website with wordpress however maxes out your CPU to > 80% the solution to go to Cloudflare Pages might not be the best scenario anymore. </p>
                <p>Our goal of this case study was to educate developers in what order of magnitude the energy budgets of idle power draw and compute power draw for a typical server are.</p>
                <p>Also how the energy compares between the request to a static site and a Wordpress site.</p>
                <p>You see that the exact path for optimizing your energy consumption for hosting depends on your load, but is always better when we look at static sites.</p>
                <p>Further considerations might however include meta-criteria like the cost of development and maintenance, which will typically incur carbon or energy costs in the phyisical world.</p>
                <p>If you want your specific architecture analysed or get a more detailed understanding for the optimization potential in your architecture shoot us an email at <a href="mailto:info@green-coding.io">info@green-coding.io</a></p>
            </div>

<script type="text/javascript" src="/dist/js/echarts.min.js"></script>
<script type="module">

var chartDom = document.getElementById('chart');
var myChart = echarts.init(chartDom);
var option;

var categoryData = [
  'Static Site\n(HUGO, build)',
  'Static Site\n(HUGO, request)',
  'Dynamic Site\n(Wordpress, request)'
];
var errorData = [
  [0, 0.9209346288584132, 1.8923987044749198],
  [1, 0, 2.198027357631517],
  [2, 9.684064057746113, 10.482602608920555]
];
var barData = [1.4066666666666665, 0.9766666666666666, 10.083333333333334];
var dataCount = 100;

option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Energy', 'error']
  },
  xAxis: {
    data: categoryData
  },
  yAxis: {
    axisLabel: {show: true},
    name: 'Unit: J',
  },
  series: [
    {
      type: 'bar',
      name: 'Energy',
      data: barData,
      itemStyle: {
        color: '#77bef7'
      }
    },
    {
      type: 'custom',
      name: 'error',
      itemStyle: {
        borderWidth: 1.5
      },
      renderItem: function (params, api) {
        var xValue = api.value(0);
        var highPoint = api.coord([xValue, api.value(1)]);
        var lowPoint = api.coord([xValue, api.value(2)]);
        var halfWidth = api.size([1, 0])[0] * 0.1;
        var style = api.style({
          stroke: api.visual('color'),
          fill: undefined
        });
        return {
          type: 'group',
          children: [
            {
              type: 'line',
              transition: ['shape'],
              shape: {
                x1: highPoint[0] - halfWidth,
                y1: highPoint[1],
                x2: highPoint[0] + halfWidth,
                y2: highPoint[1]
              },
              style: style
            },
            {
              type: 'line',
              transition: ['shape'],
              shape: {
                x1: highPoint[0],
                y1: highPoint[1],
                x2: lowPoint[0],
                y2: lowPoint[1]
              },
              style: style
            },
            {
              type: 'line',
              transition: ['shape'],
              shape: {
                x1: lowPoint[0] - halfWidth,
                y1: lowPoint[1],
                x2: lowPoint[0] + halfWidth,
                y2: lowPoint[1]
              },
              style: style
            }
          ]
        };
      },
      encode: {
        x: 0,
        y: [1, 2]
      },
      data: errorData,
      z: 100
    }
  ]
};

option && myChart.setOption(option);



</script>

{{< /rawhtml >}}
