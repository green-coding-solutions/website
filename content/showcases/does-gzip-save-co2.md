---
title: "Does gzip save CO2?"
summary: "Looking at gzip compression and if it really saves carbon emissions"

date: 2022-07-16 08:00:00
author: "Dan Mateas"
authorlink: "https://de.linkedin.com/in/dan-mateas-693634105"
---

{{< rawhtml >}}
    <img class="ui small floated right rounded bordered image" src="/img/showcases/gzip.webp">
{{< /rawhtml >}}

In this showcase we look at a question we have gotten multiple times from our community: We know gzip saves data transfer and makes pages load faster. But does gzip really carbon emissions?


Thinking about it the question is quite intriguing: gzip was not designed to reduce carbon emissions in particular and when the data is transfered it has to be first compressed and then on the end user device also decompressed. This obiously consumes energy and thus emits CO2.

So is it really worth it to gzip if you just care about carbon emissions? Let's dive in!
                    
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
                <ul class="ui list">
                    <li class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="header">
                                <a href="#introduction">Introduction</a>
                            </div>
                        </div>
                    </li>
                        <li class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#research-question">Research Question</a>
                                </div>
                            </div>
                        </li>
                        <li class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#energy-data-transfer">Energy for data transfer</a>
                                </div>
                            </div>
                        </li>
                        <li class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#energy-for-compression">Energy for compression</a>
                                </div>
                            </div>
                        </li>
                        <li class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">
                                    <a href="#summary">Summary & further considerations</a>
                                </div>
                            </div>
                        </li>
                    </ul>
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
                            <div class="sub header">Does gzip compression consume more energy than it is able to save through reduced size of the transferred data?</div>
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
                <div class="ui segment" id="energy-data-transfer">
                    <div class="header">
                        <a class="ui blue ribbon label" href="#energy-data-transfer">
                            <h3 style="color: #fff;">Energy for data transfer</h3>
                        </a>
                    </div>
                    <img class="ui medium floated right rounded bordered image" src="/img/showcases/gzip-files-compression.webp">
                    <p>For our showcase we will look at two cases: First we take the Javascript file from google.com</p>
                    <p>Then we will also look at a CSV file with a size of 10 MB, so that gzip takes at least a second to run.</p>
                    <ul class="ui large divided list">
                        <li class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">google.js</div>
                                <p><strong>805 kB</strong> uncompressed -> <strong>272 kB</strong> compressed</p>
                            </div>
                        </li>
                        <li class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="header">accidents.csv</div>
                                <p><strong>21 MB</strong> uncompressed -> <strong>5.2 MB</strong> compressed</p>
                            </div>
                        </li>
                    </ul>
                    <p>Now we can calculate the carbon savings of each of these files using our <a href="/co2-formulas">CO2 Formulas</a>:</p>
                    <h3>VueJS</h3>
                    <div class="ui ten mini statistics">
                        <div class="statistic">
                            <div class="value">( 805 kB</div>
                            <div class="label">google.js</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">-</div></div>
                        <div class="statistic">
                            <div class="value">272 kB )</div>
                            <div class="label">google.js.gz</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">0.00000006</div>
                            <div class="label">kwH / kB</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">3.600.000</div>
                            <div class="label">J / kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">115.13 J</div>
                            <div class="label">savings</div>
                        </div>
                    </div>
                    <h3>CSV File</h3>
                    <div class="ui ten mini statistics">
                        <div class="statistic">
                            <div class="value">( 21 MB</div>
                            <div class="label">CSV</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">-</div></div>
                        <div class="statistic">
                            <div class="value">5.2 MB )</div>
                            <div class="label">CSV.gz</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">0.00006</div>
                            <div class="label">kwH / MB</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">3.600.000</div>
                            <div class="label">J / kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">3412.8 J</div>
                            <div class="label">savings</div>
                        </div>
                    </div>
                    <p>We see that just by compressing the file we would save <strong>115.13 Joules</strong> and <strong>3412.8 Joules</strong> when we were to transfer these files of a fixed line network.</p>
                    <p>Now lets look at the compute cost on order to achieve this compression.</p>
                </div>
                <div class="ui segment" id="energy-for-compression">
                    <div class="header">
                        <a class="ui orange ribbon label" href="#energy-for-compression">
                            <h3 style="color: #fff;">Calculating compute cost</h3>
                        </a>
                    </div>
                    <img class="ui large floated right rounded bordered image" src="/img/showcases/perf-call-gzip.webp">                    
                    <p>We will use <code>perf</code> on linux and <strong>Intel RAPL</strong> to measure the energy for compression as this is typically a CPU only task.</p>
                    <p>When using Intel RAPL you have to watch out that when using it for a time window smaller than the minimal time resolution of the Intel RAPL interface we might get inaccurate results. Currently these limits are <strong>976 microseconds</strong> and <strong>15.3 microJoule</strong>.</p>
                    <p>Also you have to take care, if your process runs longer than a typical scheduler tick, that your 
                    base load is very low, so your code can run mostly uninterrupted.</p>
                    <p>In order to compensate for scheduler overhead we make 10 runs per scenario.</p>
                    <table class="ui sortable celled striped table" id="table">
                        <thead>
                            <tr>
                                <th>Runs (n)</th>
                                <th>File</th>
                                <th>Action</th>
                                <th>Energy (mean)</th>
                                <th>Duration (mean)</th>
                            </tr>
                        </thead>
                        <tbody id="projects-table">
                            <tr>
                                <td>10</td>
                                <td>CSV</td>
                                <td>gzip</td>
                                <td>8.416 J +/- .062</td>
                                <td>0.7245 s +/- .002</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>CSV.gz</td>
                                <td>gunzip</td>
                                <td>1.43 J +/- .02</td>
                                <td>.1245 s +/- .0002</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>google.js</td>
                                <td>gzip</td>
                                <td>.399 J +/- .006</td>
                                <td>.035 s +/- .0002</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>google.js.gz</td>
                                <td>gunzip</td>
                                <td>.088 J +/- .0008</td>
                                <td>.088 s +/- .0</td>
                            </tr>                            
                        </tbody>                        
                    </table>
                    <p>The table shows the results of the mean of 10 runs for each of the rows. We see that we are well above the minimum limits for Intel RAPL.</p>
                </div>
            </div>
         </div>
    </section><!-- end about -->
    <section class="single-page bg-one" id="summary">
        <div class="section-two">
            <div class="title-one">Summary</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <p>In the results of the table we can see, that the network carbon emission savings through compression of <strong>115.13 J</strong> and  <strong>3412.8 J</strong> are way higher than the compression & decompress costs of <strong>~10 J</strong> ad <strong>~0.5 J</strong></p>
                <p>Even with this simple test setup which may contain some inaccuracies, as we did not watch out for hyperthreading, no pre-burn time, no pre-idle time and we did not check which C-state our CPU cores where in or if Intel Speed-Step was activated we can safely assume: gzip compression saves energy!</p>
{{< /rawhtml >}}
