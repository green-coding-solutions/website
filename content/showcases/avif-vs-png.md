---
title: "AVIF vs. PNG"
draft: false
summary: "In this showcase we will look at image compression with the AVIF format. Typically when trying to optimize a website for network resource consumption and thus CO2 emission images are the lowest hanging fruit."
date: 2022-07-01 08:00:00
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"

---

{{< rawhtml >}}
    <img class="ui medium floated right rounded bordered image" src="/img/showcases/avif.webp">
{{< /rawhtml >}}

In this showcase we will look at image compression. Typically when trying to optimize a website for network resource consumption and thus CO2 emission images are the lowest hanging fruit.


Modern image formats like [AVIF](https://de.wikipedia.org/wiki/AVIF) typically achieve +50% compression ratio when compared to PNG in a similar perceived quality. <br>Try out on [Squoosh.app](https://squoosh.app) for yourself to see the potential!

AVIF received many [positive blogposts](https://2020.derekshirk.com/posts/improving-performance-with-avif-image-compression). However modern image formats like AVIF have a downside: They are not supported in older browsers like IE, Safari or old Chrome devices. Check support on [CanIUse.com](https://caniuse.com/avif).

If you still want to support these old browsers, so that they do not see a blank image you typically would use a polyfill.

In this detailed article we will look at the potential backlash when using polyfills and how to watch out for the tipping points when a move to AVIF might actually get worse in terms of carbon emissions, although it might make no difference in performance for the users.

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
                    <p></p>
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
                                        <a href="#collecting-data">Collecting all needed data to calculate</a>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <i class="right triangle icon"></i>
                                <div class="content">
                                    <div class="header">
                                        <a href="#calculating-savings">Calculate savings</a>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <i class="right triangle icon"></i>
                                <div class="content">
                                    <div class="header">
                                        <a href="#rebound-effects">Rebound effect</a>
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
                    <div class="ui message">
                        <h2 class="ui header">
                            <i class="help icon"></i>
                            <div class="content">
                                 Never heard of the CO2 emission of network data?
                                <div class="sub header">Read this great article on the topic: <a href="/co2-formulas/">Calculating from GB to kWh</a></div>
                            </div>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </section><!-- end about -->
    <section class="single-page bg-one">
        <div class="section-two">
            <div class="title-one">What do we want to find out?</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <div class="ui segment inverted" id="research-question">
                    <h2 class="ui header">
                        <i class="graduation cap icon"></i>
                        <div class="content">
                            Research question
                            <div class="sub header">How much do we save in CO2 when converting all PNG to AVIF and is there a downside / rebound effect to it?</div>
                        </div>
                    </h2>
                </div>
            </div>
        </div>
    </section><!-- end about -->
    <section class="single-page bg-two">
        <div class="section-two">
            <div class="title-two">Calculations</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <div class="ui segment" id="collecting-data">
                    <div class="header">
                        <a class="ui blue ribbon label" href="#collecting-data">
                            <h3 style="color: #fff;">Collecting data</h3>
                        </a>
                    </div>
                    <p>First we need to calcuate some statistical data from Google Analytics or whatever product you are using.</p>
                    <p>The following list outlines the questions and also the answers for the sample site that we are looking at:</p>
                    <div class="ui large divided list">
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">How many users does our site have per day?</div>
                                <p>Our sample site has 1.000 Users per day.</p>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">What kind of browser are our users using?</div>
                                <div class="content">
                                    <ul>
                                        <li>Chrome & Chrome for Android: 55%</li>
                                        <li>Edge: 5%</li>
                                        <li>Firefox: 15%</li>
                                        <li>Internet Explorer 6-11: 5%</li>
                                        <li>Safari macOS & iOS: 20%</li>
                                    </ul>
                                    <p>This is a representative distribution for Germany from one of our clients for a non-ecommerce site in 2022.</p>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">How many images do we have per page?</div>
                                <p>2 images per site on average</p>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">How big are our images on average?</div>
                                <p>Our images are on average 50kB</p>
                            </div>
                        </div>
                        <div class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">How many pages do the users visit on average?</div>
                                <p>Users visit for 2.7 pages / visit</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui segment" id="calculating-savings">
                    <div class="header">
                        <a class="ui orange ribbon label" href="#calculating savings">
                            <h3 style="color: #fff;">Caclulating savings</h3>
                        </a>
                    </div>
                    <p>First we calculate the savings in form of kB / MB we get when using the AVIF format:</p>
                    <div class="ui ten mini statistics">
                        <div class="statistic">
                            <div class="value">1.000</div>
                            <div class="label">Users</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">2</div>
                            <div class="label">img / site</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">50 kB</div>
                            <div class="label">avg. img size</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">2.7</div>
                            <div class="label">visits / site</div>
                        </div>
                        <div class="statistic">
                            <div class="value" style="text-transform: lowercase;">x</div>
                        </div>
                        <div class="statistic">
                            <div class="value">50%</div>
                            <div class="label">AVIF savings</div>
                        </div>
                        <div class="statistic">
                            <div class="value" style="text-transform: lowercase;">=</div>
                        </div>
                        <div class="statistic">
                            <div class="value">135</div>
                            <div class="label">MB</div>
                        </div>
                    </div>
                    <h3>Calculate CO2 savings</h3>
                    <p>Since every network transmission has an energy and CO2 budget attached to it we no use our formulas from <a href="#TODO">TODO:_ CO2 formulas for software engineering</a> and then we plug in to calculate the savings per day. We also use the <a href="https://app.electricitymaps.com/zone/DE">avg. grid intensity in Germany</a> for today (280g / kWh).</p>
                    <div class="ui ten mini statistics">
                        <div class="statistic">
                            <div class="value">135</div>
                            <div class="label">MB</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">0.00006</div>
                            <div class="label">kwH / MB</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">280</div>
                            <div class="label">gCO2e / kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply">
                            <div class="value">=</div>
                        </div>
                        <div class="statistic">
                            <div class="value">2.268</div>
                            <div class="label">gCO2e</div>
                        </div>
                    </div>
                </div>
                <div class="ui segment" id="rebound-effects">
                    <div class="header">
                        <a class="ui red ribbon label" href="#rebound-effects">
                            <h3 style="color: #fff;">Potential Rebound effects</h3>
                        </a>
                    </div>
                    <p></p>
                    <p>We now know, that we could save a potential <strong>2.268 gCO2e</strong> per day for our 1.000 users if we were to move to AVIF. However what we have not considered yet is the users of the <strong>IE 6-11</strong>,<strong>Safari</strong>, <strong>Edge</strong> and <strong>Chrome < 85</strong> browsers which do not support AVIF format out of the box.</p>
                    <p>The typical fix for this is to include a polyfill. A choice we have personally used in the past is this library: <a href="https://github.com/Kagami/avif.js">Kagami avif.js</a>, which itself relies on an npm package: <a href="https://www.npmjs.com/package/dav1d.js">dav1d.js</a></p>
                    <p>The total size of this polyfill is <strong>~300 kB</strong></p>
                    <h3>Calculating network traffic impact of the library</h3>
                    <h3>Getting CO2 impact of polyfill</h3>
                    <p>In some cases it can be tricky to detect the correct browser and delivering the polyfill only to exactly them. Therefore for reduced complexity the polyfills are always delivered no matter if needed or not.</p>
                    <p>However in this case we believe separating the browsers out through some capability check or the user agent header should work just fine.</p>
                    <p>So we assume that the polyfill is only delivered for our 30% non-supporting Browsers</p>
                    <div class="ui ten mini statistics">
                        <div class="statistic">
                            <div class="value">1.000</div>
                            <div class="label">Users</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">30%</div>
                            <div class="label">non-supporting browsers</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">300 kB</div>
                            <div class="label">total polyfill size</div>
                        </div>
                        <div class="statistic">
                            <div class="value" style="text-transform: lowercase;">=</div>
                        </div>
                        <div class="statistic">
                            <div class="value">90</div>
                            <div class="label">MB</div>
                        </div>
                    </div>
                    <h3>Getting total number</h3>
                    <p>We get the total number by just subtracting the 135 MB with the 90 MB to a total of 45 MB.</p>
                </div>
            </div>
         </div>
    </section><!-- end about -->
    <section class="single-page bg-one" id="summary">
        <div class="section-two">
            <div class="title-one">Summary</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <p>In this example moving to AVIF even with the needed polyfill is still worth regarding the carbon emissions. However the margin got quite diminished and if the users are visiting less pages or the browser ratio is different this might also easily reverse and become a rebound effect.</p>
                <p>If you look at this example I hope we could convey that if you optimize for lesser CO2 emissions the backlash to consider are often different when optimizing just for performance, where a mere 300 kB polyfill will most likely go unnoticed.</p>
                <p>When looking at our example one might also argue, that instead of including the polyfill we could also use a switch that would redirect to a different HTML page which includes only PNG images, or to use an image service, that only delivers the correct image based on detected browser capabilities.</p>
                <p>All of these approaches have different problems and backlashes though, since they typically mean that you save on network bandwith, but therefore have to increase the storage, which is also powered by energy and thus emits CO2.</p>
                <p>In a follow-up article we will further drill-down into the cost of storage in particular and how replicating your data manyfold to different CDNs also has a CO2 cost that has to be factored in.</p>
{{< /rawhtml >}}
