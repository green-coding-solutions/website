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


# Open Source Projects
---

{{< rawhtml >}}
<div class="ui cards">
  <div class="card">
    <div class="image">
      <img src="/img/projects/nextcloud.webp">
    </div>
    <div class="content">
      <div class="header">Django</div>
      <div class="meta">
        <a>CMS</a>
      </div>
      <div class="description">
        Nextcloud is an open source modern, on-premises content collaboration platform with real-time document editing, video chat & groupware on mobile, desktop and web.
      </div>
    </div>
    <div class="content">
       <h4>Scenario</h4>
      <div class="description">
          We look at Nextcloud in two basic scenarios:
         <ul>
           <li>Installation and file upload</li>
           <li>Talk conversation</li>
           <li>Collaborative Docs editing</li>
         </ul>
         All of these scenarios are accessed with Chrome and Firefox and we also look at different backends like PostgrSQL, MariaDB and SQLite.
      </div>
      <div class="description">
         See the <a href="https://github.com/green-coding-berlin/nextcloud-docker/tree/master/energy-tests">README</a> for details.
      </div>
    </div>
    <div class="content">
       <h4>Links</h4>
       <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/stats.html?id=d98f6d14-6d19-405d-9777-5ed4a474dcf0">Example measurement</a>
        </div>
       <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/?repo=https://github.com/green-coding-berlin/nextcloud-docker">All measurements</a>
        </div>
        <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/compare.html?ids=4e823274-9782-4ede-b0d6-4ab939a06eb6,d98f6d14-6d19-405d-9777-5ed4a474dcf0">SQLite vs PostgreSQL</a>
        </div>
        <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/compare.html?ids=4e823274-9782-4ede-b0d6-4ab939a06eb6,d98f6d14-6d19-405d-9777-5ed4a474dcf0">Chrome vs. Firefox</a>
        </div>
      </ul>
    </div>
    <div class="content">
      <h4>Badges</h4>
      <a href="https://metrics.green-coding.berlin/stats.html?id=d98f6d14-6d19-405d-9777-5ed4a474dcf0"><img src="https://api.green-coding.berlin/v1/badge/single/d98f6d14-6d19-405d-9777-5ed4a474dcf0?metric=AC"></a>
      <a href="https://metrics.green-coding.berlin/stats.html?id=d98f6d14-6d19-405d-9777-5ed4a474dcf0"><img src="https://api.green-coding.berlin/v1/badge/single/d98f6d14-6d19-405d-9777-5ed4a474dcf0?metric=RAPL"></a>
      <a href="https://metrics.green-coding.berlin/stats.html?id=7d5b368c-9940-4dd1-aa80-0a94f4007709"><img src="https://api.green-coding.berlin/v1/badge/single/7d5b368c-9940-4dd1-aa80-0a94f4007709?metric=SCI"></a>
    </div>
  </div>       

  <div class="card">
    <div class="image">
      <img src="/img/projects/wagtail.webp">
    </div>
    <div class="content">
      <div class="header">Wagtail</div>
      <div class="meta">
        <span class="date">CMS</span>
      </div>
      <div class="description">
        Wagtail is the leading open-source Python CMS, built on the Django Web Framework.
      </div>
    </div>
        <div class="content">
       <h4>Scenario</h4>
      <div class="description">
          For Wagtail the lovely maintainers have create a GOLD benchmark, which utilizes the reference 
          implementation of the <a href="https://github.com/wagtail/bakerydemo">Bakery</a> and then accesses
          different style pages with a Chrome browser like a contact form, search, homepage etc.
      </div>
      <div class="description">
          See the <a href="https://github.com/green-coding-berlin/bakerydemo-gold-benchmark">README</a> for details.
      </div>
    </div>
    <div class="content">
       <h4>Links</h4>
       <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/stats.html?id=3799aa1d-634a-4c15-b83b-21f49daeebb1">Example measurement</a>
        </div>
       <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/index.html?repo=bakerydemo-gold-benchmark">All measurements</a>
        </div>
      </ul>
    </div>
    <div class="content">
      <h4>Badges</h4>
      <a href="https://metrics.green-coding.berlin/stats.html?id=3799aa1d-634a-4c15-b83b-21f49daeebb1"><img src="https://api.green-coding.berlin/v1/badge/single/3799aa1d-634a-4c15-b83b-21f49daeebb1?metric=AC"></a>
      <a href="https://metrics.green-coding.berlin/stats.html?id=3799aa1d-634a-4c15-b83b-21f49daeebb1"><img src="https://api.green-coding.berlin/v1/badge/single/3799aa1d-634a-4c15-b83b-21f49daeebb1?metric=RAPL"></a>
      <a href="https://metrics.green-coding.berlin/stats.html?id=3799aa1d-634a-4c15-b83b-21f49daeebb1"><img src="https://api.green-coding.berlin/v1/badge/single/3799aa1d-634a-4c15-b83b-21f49daeebb1?metric=SCI"></a>
    </div>
  </div>
  <div class="card">
    <div class="image">
      <img src="/img/projects/django.webp">
    </div>
    <div class="content">
      <div class="header">Django</div>
      <div class="meta">
        <a>CMS</a>
      </div>
      <div class="description">
        Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It’s free and open source.
      </div>
    </div>
    <div class="content">
      <h4>Scenario</h4>
      <div class="description">
          For this example we are looking at the unit tests of the Django project.
         See the <a href="https://github.com/green-coding-berlin/django">README</a> for details.
      </div>
    </div>
    <div class="content">
       <h4>Links</h4>
       <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/stats.html?id=9a626aa1-d906-4727-b443-65cc01d140d1">Example measurement</a>
        </div>
       <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/?repo=https://github.com/green-coding-berlin/django">All measurements</a>
        </div>
      </ul>
    </div>
    <div class="content">
      <h4>Badges</h4>
      <a href="https://metrics.green-coding.berlin/stats.html?id=9a626aa1-d906-4727-b443-65cc01d140d1"><img src="https://api.green-coding.berlin/v1/badge/single/9a626aa1-d906-4727-b443-65cc01d140d1?metric=AC"></a>
      <a href="https://metrics.green-coding.berlin/stats.html?id=9a626aa1-d906-4727-b443-65cc01d140d1"><img src="https://api.green-coding.berlin/v1/badge/single/9a626aa1-d906-4727-b443-65cc01d140d1?metric=RAPL"></a>
      <a href="https://metrics.green-coding.berlin/stats.html?id=9a626aa1-d906-4727-b443-65cc01d140d1"><img src="https://api.green-coding.berlin/v1/badge/single/9a626aa1-d906-4727-b443-65cc01d140d1?metric=SCI"></a>
    </div>
  </div>  


  <div class="card">
    <div class="image">
      <img src="/img/projects/wordpress.png">
    </div>
    <div class="content">
      <div class="header">Wordpress</div>
      <div class="meta">
        <a>CMS</a>
      </div>
      <div class="description">
        Wordpress is an open source blogging system built on PHP and MySQL. It is used over 43% of all sites across the web.
      </div>
    </div>
    <div class="content">
       <h4>Scenario</h4>
      <div class="description">
          We setup a standard installation, create 3 demo pages and then use a Chrome browser to access these pages like a normal browsing user would do.
      </div>
      <div class="description">
          See the <a href="https://github.com/green-coding-berlin/example-applications/tree/main/wordpress-official-data">README</a> for details.
      </div>      
    </div>
    <div class="extra content">
       <h4>Links</h4>
       <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/stats.html?id=0d105b85-9e0a-4f78-b6a5-a80dc085b4f9">Example measurement</a>
        </div>
       <div class="ui label label-margin-bottom">
          <i class="external alternate icon"></i>
          <a class="detail" href="https://metrics.green-coding.berlin/?repo=https://github.com/green-coding-berlin/example-applications&filename=wordpress-official-data/usage_scenario.yml">All measurements</a>
        </div>
      </ul>
    </div>
    <div class="extra content">
      <h4>Badges</h4>
      <a href="https://metrics.green-coding.berlin/stats.html?id=0d105b85-9e0a-4f78-b6a5-a80dc085b4f9"><img src="https://api.green-coding.berlin/v1/badge/single/0d105b85-9e0a-4f78-b6a5-a80dc085b4f9?metric=AC"></a>
      <a href="https://metrics.green-coding.berlin/stats.html?id=0d105b85-9e0a-4f78-b6a5-a80dc085b4f9"><img src="https://api.green-coding.berlin/v1/badge/single/0d105b85-9e0a-4f78-b6a5-a80dc085b4f9?metric=RAPL"></a>
      <a href="https://metrics.green-coding.berlin/stats.html?id=0d105b85-9e0a-4f78-b6a5-a80dc085b4f9"><img src="https://api.green-coding.berlin/v1/badge/single/0d105b85-9e0a-4f78-b6a5-a80dc085b4f9?metric=SCI"></a>
    </div>
  </div>


 
</div>

{{</ rawhtml >}}


