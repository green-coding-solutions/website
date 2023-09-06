---
title: "Energy ID"
date: 2023-08-02 10:00:00
publishDate: 2023-08-02
draft: false
icon: "portrait"
---

In the Energy ID project we are looking at popular open source software and benchmark their Energy, CO2 and the [Green Software Foundation's SCI](https://sci-guide.greensoftware.foundation/) metric via our [Green Metrics Tool](projects/green-metrics-tool/)

Energy ID creates a *score card* with a:
- description
- benchmarking- / usage-scenario
- detailed measurement links
- badges

The badges can be used in Github projects or similar and are based on our [OpenEnergyBadge](projects/open-energy-badge/) project.

The projects aim is to get a quick idea about the "typical use case of a software" and how much this would accrue in terms of energy / carbon cost.

If you want to further compare a project, monitor a project over time or even do optimizations and performance engineering do look into the capabilities of the [Green Metrics Tool](projects/green-metrics-tool/)

**Important:** The absolute numbers shown here are not to be taken as ground truth of the actual carbon cost of the 
software in the wild. These are the cost that happen on our testing machines and
also reflect the cost of the scenario chosen by us. A different use-case might incur a vastly different carbon cost.

For measurement on different machines, which are more similar to what you are running in your setup, visit our [Cluster documentation](https://docs.green-coding.berlin/docs/measuring/measurement-cluster/)
and re-run the measurement on a machine more apt for your comparison.

# Open Source Projects
---




{{< rawhtml>}}
<div class="ui modal" id="nextcloud">
    <div class="header">
        Nextcloud
    </div>
    <div class="content">
        <p>
            Nextcloud is an open source modern, on-premises content collaboration platform with real-time document editing, video chat & groupware on mobile, desktop and web.
        </p>
        <p>
            <h4>Scenario</h4>
            <p>
                We look at Nextcloud in two basic scenarios:
                <ul>
                    <li>Installation and file upload</li>
                    <li>Install & Talk conversation</li>
                    <li>Install & Collaborative Docs editing</li>
                </ul>
                All of these scenarios are accessed with Chrome and Firefox and we also look at different backends like PostgrSQL, MariaDB and SQLite.
                Please note, that because at the moment the install is included these values are a bit elevated.
            </p>
            <div class="content">
                See the <a href="https://github.com/green-coding-berlin/nextcloud-docker/tree/master/energy-tests">README</a> for details.
            </div>
        </p>
        <p>
            <h4>Machine</h4>
            <p><a href="https://docs.green-coding.berlin/docs/measuring/measurement-cluster/">Fujitsu Esprimo P956 [NOP Linux] (Blue Angel compatible)</a></p>
        </p>
        <p>
            <h4>Links</h4>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/stats.html?id=b5b9a3af-9817-4379-aeeb-d57268dd61c8">Example measurement</a>
            </div>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/?repositories.html?uri=https://github.com/green-coding-berlin/nextcloud-docker">All measurements</a>
            </div>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/compare.html?ids=b7d5a32a-3516-448a-b5e5-1b1b5fa130e5,b5b9a3af-9817-4379-aeeb-d57268dd61c8">SQLite vs PostgreSQL</a>
            </div>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/compare.html?ids=a5e38c5d-dd1e-44c9-a23e-6d0346d8e37a,b5b9a3af-9817-4379-aeeb-d57268dd61c8">Chrome vs. Firefox</a>
            </div>
        </p>
    </div>
    <div class="actions">
        <div class="ui green ok button">
            <i class="checkmark icon"></i>
            OK
        </div>
    </div>
</div>
<div class="ui modal" id="wagtail">
    <div class="header">
        Wagtail
    </div>
    <div class="content">
        <p>
            Wagtail is the leading open-source Python CMS, built on the Django Web Framework.
        </p>
        <p>
            <h4>Scenario</h4>
            <p>
                For Wagtail the lovely maintainers have create a GOLD benchmark, which utilizes the reference
                implementation of the <a href="https://github.com/wagtail/bakerydemo">Bakery</a> and then accesses
                different style pages with a Chrome browser like a contact form, search, homepage etc.
            </p>
            <div class="content">
                See the <a href="https://github.com/green-coding-berlin/bakerydemo-gold-benchmark">README</a> for details.
            </div>
        </p>
        <p>
            <h4>Machine</h4>
            <p><a href="https://docs.green-coding.berlin/docs/measuring/measurement-cluster/">Fujitsu Esprimo P956 [NOP Linux] (Blue Angel compatible)</a></p>
        </p>        
        <p>
            <h4>Links</h4>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/stats.html?id=79b0ef85-19dd-4f16-b519-48f4c92c5092">Example measurement</a>
            </div>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/index.html?repo=bakerydemo-gold-benchmark">All measurements</a>
            </div>
        </p>
    </div>
    <div class="actions">
        <div class="ui green ok button">
            <i class="checkmark icon"></i>
            OK
        </div>
    </div>
</div>
<div class="ui modal" id="django">
    <div class="header">
        Django
    </div>
    <div class="content">
        <p>
            Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It’s free and open source.
        </p>
        <p>
            <h4>Scenario</h4>
            <p>
                For this example we are looking at the unit tests of the Django project.
                See the <a href="https://github.com/green-coding-berlin/django">README</a> for details.
            </p>
        </p>
        <p>
            <h4>Machine</h4>
            <p><a href="https://docs.green-coding.berlin/docs/measuring/measurement-cluster/">Fujitsu Esprimo P956 [NOP Linux] (Blue Angel compatible)</a></p>
        </p>        
        <p>
            <h4>Links</h4>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/stats.html?id=550d1875-1883-4d9a-8194-1fb408f7916a">Example measurement</a>
            </div>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/?repositories.html?uri=https://github.com/green-coding-berlin/django">All measurements</a>
            </div>
        </p>
    </div>
    <div class="actions">
        <div class="ui green ok button">
            <i class="checkmark icon"></i>
            OK
        </div>
    </div>
</div>

<div class="ui modal" id="wordpress">
    <div class="header">
        Wordpress
    </div>
    <div class="content">
        <p>
            Wordpress is an open source blogging system built on PHP and MySQL. It is used over 43% of all sites across the web.
        </p>
        <p>
            <h4>Scenario</h4>
            <p>
                We setup a standard installation, create 3 demo pages and then use a Chrome browser to access these pages like a normal browsing user would do.
            </p>
            <p>
                See the <a href="https://github.com/green-coding-berlin/example-applications/tree/main/wordpress-official-data">README</a> for details.
            </p>
        </p>
        <p>
            <h4>Machine</h4>
            <p><a href="https://docs.green-coding.berlin/docs/measuring/measurement-cluster/">Fujitsu Esprimo P956 [NOP Linux] (Blue Angel compatible)</a></p>
        </p>        
        <p>
            <h4>Links</h4>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/stats.html?id=6f2e09ea-85cd-4b77-9630-b0a70cfb4cfa">Example measurement</a>
            </div>
            <div class="ui label label-margin-bottom">
                <i class="external alternate icon"></i>
                <a class="detail" href="https://metrics.green-coding.berlin/?repositories.html?uri=https://github.com/green-coding-berlin/example-applications&filename=wordpress-official-data/usage_scenario.yml">All measurements</a>
            </div>
        </p>
    </div>
    <div class="actions">
        <div class="ui green ok button">
            <i class="checkmark icon"></i>
            OK
        </div>
    </div>
</div>
{{</ rawhtml>}}


{{< rawhtml >}}
<div class="ui link cards">
    <div class="card">
        <div class="image nextcloud-card">
            <img src="/img/projects/nextcloud.webp">
        </div>
        <div class="content nextcloud-card">
            <div class="header">Nextcloud</div>
            <div class="meta">
                <a>CMS</a>
                <span class="card-details">click for details</span>
            </div>
        </div>
        <div class="content">
            <h4>Badges</h4>
            <a href="https://metrics.green-coding.berlin/stats.html?id=b5b9a3af-9817-4379-aeeb-d57268dd61c8"><img src="https://api.green-coding.berlin/v1/badge/single/b5b9a3af-9817-4379-aeeb-d57268dd61c8?metric=AC"></a>
            <a href="https://metrics.green-coding.berlin/stats.html?id=b5b9a3af-9817-4379-aeeb-d57268dd61c8"><img src="https://api.green-coding.berlin/v1/badge/single/b5b9a3af-9817-4379-aeeb-d57268dd61c8?metric=RAPL"></a>
            <a href="https://metrics.green-coding.berlin/stats.html?id=b5b9a3af-9817-4379-aeeb-d57268dd61c8"><img src="https://api.green-coding.berlin/v1/badge/single/b5b9a3af-9817-4379-aeeb-d57268dd61c8?metric=SCI"></a>
        </div>
        <a class="ui button" href="https://metrics.green-coding.berlin/?repositories.html?uri=https://github.com/green-coding-berlin/nextcloud-docker">
            <i class="external alternate icon"></i> All measurements            
        </a>
    </div>
    <div class="card">
        <div class="image wagtail-card">
            <img src="/img/projects/wagtail.webp">
        </div>
        <div class="content wagtail-card">
            <div class="header">Wagtail</div>
            <div class="meta">
                CMS
                <span class="card-details">click for details</span>                
            </div>
        </div>
        <div class="content">
            <h4>Badges</h4>
            <a href="https://metrics.green-coding.berlin/stats.html?id=79b0ef85-19dd-4f16-b519-48f4c92c5092"><img src="https://api.green-coding.berlin/v1/badge/single/79b0ef85-19dd-4f16-b519-48f4c92c5092?metric=AC"></a>
            <a href="https://metrics.green-coding.berlin/stats.html?id=79b0ef85-19dd-4f16-b519-48f4c92c5092"><img src="https://api.green-coding.berlin/v1/badge/single/79b0ef85-19dd-4f16-b519-48f4c92c5092?metric=RAPL"></a>
            <a href="https://metrics.green-coding.berlin/stats.html?id=79b0ef85-19dd-4f16-b519-48f4c92c5092"><img src="https://api.green-coding.berlin/v1/badge/single/79b0ef85-19dd-4f16-b519-48f4c92c5092?metric=SCI"></a>
        </div>
        <a class="ui button" href="https://metrics.green-coding.berlin/index.html?repo=bakerydemo-gold-benchmark">
            <i class="external alternate icon"></i> All measurements
        </a>
    </div>
    <div class="card">
        <div class="image django-card">
            <img src="/img/projects/django.webp">
        </div>
        <div class="content django-card">
            <div class="header">Django</div>
            <div class="meta">
                <a>Framework</a>
                <span class="card-details">click for details</span>
            </div>
        </div>
        <div class="content">
            <h4>Badges</h4>
            <a href="https://metrics.green-coding.berlin/stats.html?id=550d1875-1883-4d9a-8194-1fb408f7916a"><img src="https://api.green-coding.berlin/v1/badge/single/550d1875-1883-4d9a-8194-1fb408f7916a?metric=AC"></a>
            <a href="https://metrics.green-coding.berlin/stats.html?id=550d1875-1883-4d9a-8194-1fb408f7916a"><img src="https://api.green-coding.berlin/v1/badge/single/550d1875-1883-4d9a-8194-1fb408f7916a?metric=RAPL"></a>
            <a href="https://metrics.green-coding.berlin/stats.html?id=550d1875-1883-4d9a-8194-1fb408f7916a"><img src="https://api.green-coding.berlin/v1/badge/single/550d1875-1883-4d9a-8194-1fb408f7916a?metric=SCI"></a>
        </div>
        <a class="ui button" href="https://metrics.green-coding.berlin/?repositories.html?uri=https://github.com/green-coding-berlin/django">
            <i class="external alternate icon"></i> All measurements
        </a>
    </div>
    <div class="card">
        <div class="image wordpress-card">
            <img src="/img/projects/wordpress.png">
        </div>
        <div class="content wordpress-card">
            <div class="header">Wordpress</div>
            <div class="meta">
                <a>Blog/CMS</a>
                <span class="card-details">click for details</span>
            </div>
        </div>
        <div class="content">
            <h4>Badges</h4>
            <a href="https://metrics.green-coding.berlin/stats.html?id=6f2e09ea-85cd-4b77-9630-b0a70cfb4cfa"><img src="https://api.green-coding.berlin/v1/badge/single/6f2e09ea-85cd-4b77-9630-b0a70cfb4cfa?metric=AC"></a>
            <a href="https://metrics.green-coding.berlin/stats.html?id=6f2e09ea-85cd-4b77-9630-b0a70cfb4cfa"><img src="https://api.green-coding.berlin/v1/badge/single/6f2e09ea-85cd-4b77-9630-b0a70cfb4cfa?metric=RAPL"></a>
            <a href="https://metrics.green-coding.berlin/stats.html?id=6f2e09ea-85cd-4b77-9630-b0a70cfb4cfa"><img src="https://api.green-coding.berlin/v1/badge/single/6f2e09ea-85cd-4b77-9630-b0a70cfb4cfa?metric=SCI"></a>
        </div>
        <a class="ui button" href="https://metrics.green-coding.berlin/?repositories.html?uri=https://github.com/green-coding-berlin/example-applications&filename=wordpress-official-data/usage_scenario.yml">
            <i class="external alternate icon"></i> All measurements
        </a>
    </div>
</div>
{{</ rawhtml>}}