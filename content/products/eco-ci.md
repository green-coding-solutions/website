---
title: "Eco CI"
date: 2023-01-15 19:00:00
publishDate: 2023-01-15
draft: false
icon: "leaf"
desc: Eco-CI calculates the energy consumption of your CI/CD environments, supporting GitHub and GitLab. It tracks the power usage of the runs for accurate energy management and budgeting. Key features include real-time measurements and data export, aiding in sustainable development practices"
ordering: 2
---


Eco CI is all about understanding energy and carbon emissions of CI/CD pipelines and making this data actionable for 
reduction.

Our current work focuses on Github Actions and GitLab Pipelines, the biggest free continous integration platforms to date.

By integrating our custom Github Actions / GitLab Plugins into your testing workflow you get an automated estimation about the
energy cost of the workflow run.

Github Actions runs on Microsoft Azure VMs. In these VMs are direct measurement with something like RAPL is sadly not possible.

We are using our work from our [Cloud Energy project]({{< relref path="products/cloud-energy" >}}) to estimate the energy used by these Azure VMs.

The result is an easily integrateable Github Action where you get the energy in Joules for the CI run. It is
also possible to get only results for part of the CI run.

The same logic applies for GitLab, which uses docker internally, but still uses shared ressources.

{{< button "code branch" "Github Repository" "https://github.com/green-coding-solutions/eco-ci-energy-estimation" >}}

{{< button "shopping bag" " Github Marketplace" "https://github.com/marketplace/actions/eco-ci-energy-estimation" >}}

{{< button "eye" "Live preview on Github Actions" "https://github.com/green-coding-solutions/green-metrics-tool/actions/runs/4720202654" >}}

{{< button "chartline" "CI Energy Cost monitoring" "https://metrics.green-coding.io/ci.html?repo=green-coding-berlin%2Fgreen-metrics-tool&branch=dev&workflow=45267392" >}}

{{< button "book" "Blog article" "/blog/eco-ci-gitlab-release" >}}

{{< button "code branch" "Github Repository (for Gitlab documentation)" "https://github.com/green-coding-solutions/eco-ci-energy-estimation/blob/main/README.md#gitlab" >}}


---

## Community Version / Enterprise Version

We believe in open source and that for advancing sustainable software the measurement tools must be freely accessible
and falsifyable.

The **community version** gives you all the functionality for energy and carbon estimation a <u>free open source AGPL-v3 license.</u>

However the accompanying **API & Dashboard** we offer as **SaaS** which includes some premium features and a support plan.

<div class="ui horizontal divider header"><i class="tag icon"></i>Comparison Table</div>
<br>
<div class="ui three column stackable grid">
    <div class="ui column">
    <div class="ui fluid card">
        <div class="content">
            <div class="header center aligned">Community version</div>
            <div class="meta center aligned">free and open source</div>
            <div class="ui divider horizontal">0 EUR / month</div>
            <div class="ui list">
                <div class="item"><i class="icon checkmark"></i> <div class="content">
                    Fully featured estimation directly on GitHub / GitLab / locally
                </div></div>
                <div class="item"><i class="icon checkmark"></i> <div class="content">
                    AGPLv3 licensed
                </div></div>
                <div class="item"><i class="icon checkmark"></i> <div class="content">
                    Free API & Dashboard SaaS tier for open source communities
                </div></div>
                <div class="item"><i class="icon checkmark"></i> <div class="content">
                    Github Issues community support
                </div></div>
                <div class="item"><i class="icon times"></i> <div class="content">
                    Limited public access to API & Dashboard SaaS
                    <br><small>1.000 Data points - Max. 30 days</small>                                        
                </div></div>
                <hr>
                <div class="item"><i class="icon times"></i> <div class="content">
                    No setup support
                </div></div>
                <div class="item"><i class="icon times"></i> <div class="content">
                    No measurement support
                </div></div>
            </div>
        </div>
        <div class="extra content">
            <a class="ui button fluid grey" href='https://github.com/green-coding-solutions/green-metrics-tool'>Free (Download on Github)</a>
        </div>
    </div>
    </div>
    <div class="ui column">
    <div class="ui card fluid raised">
        <div class="content">
            <div class="header center aligned">Premium</div>
            <div class="meta center aligned">Support & maintenance.</div>
            <div class="ui divider horizontal">100 EUR / 10.000 Data points / month</div>
            <div class="ui list">
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>All</b> Community Features
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    Hosted API <b>SaaS</b> version
                    <br><small>Serviced updates and maintenance</small>
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Unlimited</b> data retention
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Custom</b> GitHub / GitLab runners support
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Jenkins / CircleCI</b> preview (beta)
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>CarbonDB</b> integration
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Support</b> the development
                </div></div>
            </div>
        </div>
        <div class="extra content">
            <a class="ui button fluid blue" href="mailto:info@green-coding.io">Get in touch</a>
        </div>
    </div>
    </div>
    <div class="ui column">
    <div class="ui fluid card">
        <div class="content">
            <span class="ui label left corner blue">
                <i class="icon plus"></i>
            </span>
            <div class="header center aligned">Enterprise</div>
            <div class="meta center aligned">Custom to your needs</div>
            <div class="ui divider horizontal">Individual pricing</div>
            <div class="ui list">
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    Includes <b>all</b> Premium features
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Individual</b> setup & support
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Individual</b> support contact
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Development</b> & <b>Customization</b>
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Custom</b> integrations
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Authentication</b> and <b>ACL</b> for users
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Self-hosted</b> or <b>private isolated API</b>
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Whitelabel</b> & <b>Dual-Licensing</b>
                </div></div>
            </div>
        </div>
        <div class="extra content">
            <a class="ui button fluid blue" href="mailto:info@green-coding.io">Get in touch</a>
        </div>
    </div>
    </div>
</div>

<br>
<br>


<br>
<div class="ui horizontal divider header"><i class="eye icon"></i>Screenshots</div>
<br>

{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/products/gh_actions_pr.webp" loading="lazy">
  <figcaption>Eco-CI PR data display</figcaption>
</figure>
{{< /rawhtml >}}


{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/products/github-actions-energy.webp" loading="lazy">
  <figcaption>Github Actions energy estimation</figcaption>
</figure>
{{< /rawhtml >}}


{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/blog/eco-ci.webp" loading="lazy">
  <figcaption>Eco-CI feature demo in Green Metrics Tool</figcaption>
</figure>
{{< /rawhtml >}}

&nbsp;

---

## Github Action - Eco CI Activity Checker

The Eco CI Activity Checker was designed for CI workflows that run on a scheduled basis.

Often these run happen even if there was not even a single commit in the last ex. 24 hours, or even if there
was a manual run triggered just a couple minutes before the run.

The Eco CI Activity checker skips the test run then and thus saves energy and CO2.

{{< button "book" "Blog article" "/blog/eco-ci-activity-checker-released" >}}

{{< button "code branch" "Github Repository" "https://github.com/green-coding-solutions/eco-ci-activity-checker" >}}

{{< button "shopping bag" "Github Marketplace" "https://github.com/marketplace/actions/eco-ci-activity-checker" >}}

&nbsp;

---
