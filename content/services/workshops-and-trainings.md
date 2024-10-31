---
title: "Workshops & Trainings"
draft: false
description: "See our offers for Workshops & Trainings"
date: 2023-09-14 08:00:00
author: "Arne Tarara"
authorlink: "https://de.linkedin.com/in/arne-tarara"

---

Training your developers to write more carbon efficient software or just starting out with your team and setting first impulses to start a sustainable software journey. We have you covered with a wide selection of Workshops & Trainings wich are battle tested in SMEs and Enterprise size companies.

<br>

<div class="ui padded blue stacked raised segment">
    <div class="ui items">
      <div class="item">
        <div class="content">
          <h2>Measuring services in on-premise architectures or bare metal</h2>
          <div class="meta">
            <span class="ui label">Learning</span><span class="ui label">Methodologies</span>
          </div>
          <div class="description">
            <br>
            <p>This workshop is targeted to frontend or backend developers.</p>
            <p>It focuses on methodologies available for bare-metal architectures or on-premise hosted solutions.</p>
            <p>Goal is to containerize a company service in a reproducible container setup and measure its carbon consumption for its application case (Standard Usage Scenario).</p>
            <p>The created model can then be used to iterate on the companies services and drive the CO2 consumption down through carbon targeted optimizations.</p>
            <h3>Agenda</h3>
            <ul>
            <li>Identifying and query different metric sources in the linux subsystem/ CPU</li>
            <li>Using the Green Metrics Tool (https://github.com/green-coding-solutions/green-metrics-tool) and show its potentials to orchestrate a defined architecture and loading it with a standard usage scenario that reflects a company use case</li>
            <li>Factoring in the user view of the application by creating a client side representation through a containerized browser.</li>
            <li>Crafting a dedicated energy metrics reporter with techniques to reduce measurement overheali>
            After laying out the foundation different tools are presented that may fit better to the company architecture and their design principles are outlined.</p>
            <li>In a group fashion we will then select the best tool for the job or do a rewrite and scale it to the needed size and integrate it into a live company development process.</li>
            </ul>
          </div>
        </div>
        <figure class="ui large image middle aligned">
            <img srcset="/img/services/workshops-measuring.webp 1x, /img/services/workshops-measuring-2x.webp 2x" src="/img/services/workshops-measuring-2x.webp" loading="lazy">
          <figcaption>Measuring with Green Metrics Tool</figcaption>
        </figure>
      </div>
    </div>
</div>

<div class="ui padded blue stacked raised segment">
    <div class="ui items">
      <div class="item">
        <div class="content">
          <h2>Measuring in the cloud</h2>
          <div class="meta">
            <span class="ui label">Learning</span><span class="ui label">Methodologies</span>
          </div>
          <div class="description">
            <br>
            <p>This workshop is targeted to cloud engineers or dev teams that use cloud products on a simple customer basis.</p>
            <p>Cloud environments pose different problems for measuring energy as most of the on-premise solutions are restricted due to security concerns.</p>
            <p>This workshop will give a detailed overview of the work by other heads in the industry on tackling the landscape of scarce energy data in the cloud and the solutions implemented.</p>
            <p>Goal is to create inline measurements tools that measure parts of the companies cloud infrastructure compute cost and report their CO2 equivalent.</p>
            <h3>Agenda</h3>
            <ul>
                <li>Understanding restrictions in the cloud and where they originate from (SGX bugs etc.)</li>
                <li>Finding out what is available on the architectures used by the company</li>
                <li>EC2 bare metal registers</li>
                <li>Heroku Buildpacks</li>
                <li>APIs / Logs from services</li>
                <li>Developing out a simple OS level metrics reporter to get CPU utilization rates reported on the required interval</li>
                <li>Replicating the model from Teads Engineering</li>
                <li>Replicating the model used by CloudCarbon Footprint</li>
                <li>Replicating the model from the SDIA</li>
                <li>Implementing an advanced model based on SPECPower and an XGBoost Model</li>
                <li>Draft approaches based on research data for Log-Based services or services where only machine specs are known</li>
            </ul>
          </div>
        </div>
        <figure class="ui large image middle aligned">
            <img srcset="/img/services/workshops-cloud.webp 1x, /img/services/workshops-cloud-2x.webp 2x" src="/img/services/workshops-cloud-2x.webp" loading="lazy">
          <figcaption>Measuring in the Cloud</figcaption>
        </figure>
      </div>
    </div>
</div>

<div class="ui padded blue stacked raised segment">
    <div class="ui items">
      <div class="item">
        <div class="content">
          <h2>Green Web Development</h2>
          <div class="meta">
            <span class="ui label">Learning</span><span class="ui label">Methodologies</span>
          </div>
          <div class="description">
            <br>
            <p>This workshop is target to backend and frontend web software engineers.</p>
            <p>Goal is to be able to analyse an arbitrary website regarding its energy profile and learn current best practices in Green Web Development.</p>
            <h3>Agenda</h3>
            <ul>
                <li>Understanding methodology of currently existing website carbon calculators (Network based / Client-Server measurement based)</li>
                <li>Comparing different website carbon calculators regarding their results and trying to normalize them</li>
                <li>Understanding where network based formulas originate from and selection of the formula that best fits the company requirements.</li>
                <li>Getting to know current best practices in Green Software Engineering for the web from a backend perspective</li>
                <li>Getting to know current best practices in Green Software Engineering for the web from a fronted perspective</li>
                <li>Using Google Lighthouse in conjunction with best practices to avoid pitfalls of energy savings in caching scenarios</li>
                <li>Measuring implemented carbon saving techniques with a Linux CLI approach</li>
                <li>Measuring implemented carbon savings with a Firefox GUI based approach</li>
                <li>Learning auxiliary tools for Green Web Design from the Green Web Foundation and the Green Software Foundation</li>
            </ul>
          </div>
        </div>
        <figure class="ui large image middle aligned">
            <i class="ui icon massive green globe"></i>
          <figcaption>Green Web</figcaption>
        </figure>
      </div>
    </div>
</div>

<div class="ui padded blue stacked raised segment">
    <div class="ui items">
      <div class="item">
        <div class="content">
          <h2>CI/CD Pipelines</h2>
          <div class="meta">
            <span class="ui label">Learning</span><span class="ui label">Methodologies</span>
          </div>
          <div class="description">
            <br>
            <p>This workshop is target to software engineers and DevOps engineers.</p>
            <p>Goal is to setup an inline reporter of a CI Pipeline testing infrastructure that can measure the carbon cost of running the pipeline.</p>
            <p>The workshop is target to on-premise pipelines with arbitrary tooling (e.g. Jenkins) or cloud solutions like Github Actions / Gitlab.</p>
            <h3>Agenda</h3>
            <ul>
                <li>Understanding the capabilities and potential limitations of the CI Pipeline infrastructure used in the company</li>
                <li>Creating of a prototype that uses a reporter from the Green Metrics Tool to collect inline metrics in the CI Pipeline</li>
                <li>Connecting the reported metrics with CO2 values to generate a carbon cost profile.</li>
                <li>Measuring different other repositories from open source project to quantify own cost of testing in comparison to landscape out there
</li>
                <li>Integrating <a href="/products/eco-ci">Eco-CI</a> tooling to get live energy cost</li>
                <li>Using a custom Github runner on a bare metal machine to get more granular energy metrics for the CI Pipeline</li>
                <li>Understanding and reporting monthly carbon emissions through CarbonDB</li>
                <li>Identifiying optimization potentials and reductions for carbon in pipeline</li>
                <li>Implement optimizations</li>
            </ul>
          </div>
        </div>
        <figure class="ui large image middle aligned">
            <img srcset="/img/services/workshops-ci-cd.webp 1x, /img/services/workshops-ci-cd-2x.webp 2x" src="/img/services/workshops-ci-cd-2x.webp" loading="lazy">
          <figcaption>CI / CD Carbon tooling</figcaption>
        </figure>
      </div>
    </div>
</div>

<div class="ui green blue stacked raised segment">
    <div class="ui items">
      <div class="item">
        <div class="ui small image middle aligned">
            <i class="ui icon massive black users"></i>
        </div>
        <div class="content">
          <h2 class="">Custom Workshops</h2>
          <div class="description">
            <p>The cases above are just an examplary list of our field of workshops & trainings.</p>
            <p>When you schedule a call with us we first want to understand what are your current needs for your team and for your business.</p>
            <p>To tailor a workshop to your needs we want to understand if you just want to increase buy-in and engagement in your management or if you want to engage your dev team.</p>
            <p>To give you the best results we also want to understand the tools and progamming languages you work with to make individual recommendations for best-practices and optimizations.</p>
            <p>The goal of any workshop with us is to leave your team empowered and autonomous to start and continue the digital sustainability journey.</p>
          </div>
          <!-- TODO
          <div class="extra">
            <div class="ui left floated orange button">
              Download our KPI / carbon pricing case study
              <i class="right chevron icon"></i>
            </div>
          </div>
          -->
        </div>
      </div>
    </div>
</div>

<div class="ui section divider"></div>

{{< greenblock >}}
Interested?
{{</ greenblock >}}

{{< contact-us >}}
