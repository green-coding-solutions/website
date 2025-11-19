---
title: "Eco CI"
date: 2023-01-15 19:00:00
publishDate: 2023-01-15
draft: false
icon: "leaf"
desc: "Eco CI berechnet den Energieverbrauch Ihrer CI/CD-Umgebungen und unterstützt GitHub sowie GitLab. Es verfolgt den Energieverbrauch der Durchläufe für ein genaues Energiemanagement und Budgetierung. Zu den Schlüsselfunktionen gehören Echtzeitmessungen und Datenexport, die nachhaltige Entwicklungspraktiken ermöglichen."
ordering: 2
---

Eco CI ist der interne Name für ein Projekt, in dem wir kleine Tools entwickeln, um CI-Pipelines in Bezug auf ihren Energieverbrauch transparenter zu machen und auch kleine Tools zu entwickeln, die Energie/CO2 in der Pipeline einsparen können.

Unsere aktuelle Arbeit konzentriert sich auf Github Actions, eine der bisher größten kostenlosen Plattformen für kontinuierliche Integration.

Durch die Integration unserer maßgeschneiderten Github Actions und Github Apps in Ihren Test-Workflow erhalten Sie eine automatische Abschätzung der Energiekosten des Workflow-Laufs.

## Github Actions - Energieabschätzung

Github Actions laufen auf Microsoft Azure VMs. In diesen VMs ist eine direkte Messung mit etwas wie RAPL leider nicht möglich.

Wir nutzen unsere Arbeit aus dem [Cloud Energy]({{< relref path="products/cloud-energy" >}}) Projekt, um den Energieverbrauch dieser Azure-VMs zu schätzen.

Das Ergebnis ist eine leicht integrierbare Github-Aktion, mit der Sie die Energie in Joule für den CI-Lauf erhalten. Es ist auch möglich, nur Ergebnisse für einen Teil des CI-Laufs zu erhalten.

{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/products/github-actions-energy.webp" loading="lazy">
  <figcaption>Github Aktionen Energieabschätzung</figcaption>
</figure>
{{< /rawhtml >}}


{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/blog/eco-ci.webp" loading="lazy">
  <figcaption>Demo der Eco CI-Funktion im Green Metrics Tool</figcaption>
</figure>
{{< /rawhtml >}}



### Links
{{< button "code branch" "Github" "https://github.com/green-coding-solutions/eco-ci-energy-estimation" >}}

{{< button "shopping bag" "Github-Marktplatz" "https://github.com/marketplace/actions/eco-ci-energy-estimation" >}}

{{< button "eye" "Live-Vorschau" "https://github.com/green-coding-solutions/green-metrics-tool/pull/1233#issuecomment-2993393021" >}}

{{< button "chartline" "CI Energiekostenüberwachung" "https://metrics.green-coding.io/ci.html?repo=green-coding-solutions/green-metrics-tool&branch=main&workflow=45267393&start_date=2025-05-01&end_date=2025-09-12" >}}

{{< button "book" "Blog Artikel" "/blog/eco-ci-gitlab-release" >}}

{{< button "code branch" "Github Repository (für Gitlab Dokumentation)" "https://github.com/green-coding-solutions/eco-ci-energy-estimation/blob/main/README.md#gitlab" >}}


&nbsp;

---

## Github Aktion - Eco CI Activity Checker

Der Eco CI Activity Checker wurde für CI-Workflows entwickelt, die nach einem bestimmten Zeitplan ablaufen.

Oftmals werden diese Workflows auch dann ausgeführt, wenn in den letzten z.B. 24 Stunden kein einziger Commit stattgefunden hat, oder auch wenn
ein paar Minuten vor dem Lauf ein manueller Lauf ausgelöst wurde.

Der Eco CI Activity Checker überspringt dann den Testlauf und spart so Energie und CO2.

{{< button "book" "Blog-Artikel" "/blog/eco-ci-activity-checker-released" >}}

{{< button "code branch" "Github Repository" "https://github.com/green-coding-solutions/eco-ci-activity-checker" >}}

{{< button "shopping bag" "Github Marktplatz" "https://github.com/marketplace/actions/eco-ci-activity-checker" >}}

&nbsp;

---

## Gitlab Plugin

Bitte beachten Sie für Gitlab unsere zentrale [Github repository Dokumentation](https://github.com/green-coding-solutions/eco-ci-energy-estimation/blob/main/README.md#gitlab), die alles über die Gitlab-Funktionalität beinhaltet.

{{< button "book" "Blog arcticle" "blog/eco-ci-gitlab-release" >}}

{{< button "code branch" " Github Repository (für Gitlab Dokumentation)" "https://github.com/green-coding-solutions/eco-ci-energy-estimation/blob/main/README.md#gitlab" >}}

&nbsp;

---

## Wie geht es mit dem Eco CI-Projekt weiter?

Eine weitere Einsparung kann durch die Umplanung von Arbeit, die nicht zeitabhängig ist, auf Zeiten wo das Stromnetzes "grüner" ist erzielt werden. Dies ist eine geplante Funktion, die bald als separate Aktion entwickelt wird.

Auch hängende und im Leerlauf befindliche VMs werden derzeit in einem unserer Projekte angegangen, um sie abzuschalten und die Verschwendung von Leerlaufstrom zu stoppen

Schauen Sie doch auch gerne in unseren [Blog]({{< relref path="blog" lang="en" >}}) um auf dem Laufenden zu bleiben.

<div class="clear"></div>
