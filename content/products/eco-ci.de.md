---
title: "Eco CI"
date: 2023-01-15 19:00:00
publishDate: 2023-01-15
draft: false
icon: "leaf"
desc: "Eco CI berechnet den Energieverbrauch Ihrer CI/CD-Umgebungen und unterstützt GitHub sowie GitLab. Es verfolgt den Energieverbrauch der Durchläufe für ein genaues Energiemanagement und Budgetierung. Zu den Schlüsselfunktionen gehören Echtzeitmessungen und Datenexport, die nachhaltige Entwicklungspraktiken ermöglichen."
ordering: 2
---


Bei Eco CI geht es darum, den Energieverbrauch und die CO2-Emissionen von CI/CD-Pipelines zu verstehen und diese Daten
für eine Reduktion nutzbar zu machen.

In manchen Umgebungen, in denen CI/CD-Pipelines laufen (zum Beispiel die SaaS-Produkte von GitHub oder GitLab), ist eine direkte
Energiemessung mit Schnittstellen wie RAPL oder IPMI leider nicht möglich.

Eco CI nutzt unsere Arbeit aus dem [Cloud Energy Projekt]({{< relref path="products/cloud-energy" >}}), um den Energieverbrauch abzuschätzen.

Dabei wurde es initial für GitHub Actions und GitLab Pipelines entwickelt, ist aber inzwischen modular aufgebaut und funktioniert mit jedem CI/CD-System,
das skriptbasierte Plugins unterstützt (Jenkins, Teamcity, einfache lokale Nutzung etc.).

Wenn Sie GitHub oder GitLab nutzen, können Sie unser fertiges Plug-in direkt in Ihren Test-Workflow integrieren und erhalten eine automatische Abschätzung der
Energiekosten des Workflow-Laufs. Das Ergebnis ist eine leicht integrierbare Github Action, mit der Sie die Energie in Joule für den CI-Lauf erhalten. Es ist
auch möglich, nur Ergebnisse für einen Teil des CI-Laufs zu erhalten.

Die gleiche Logik gilt für GitLab oder andere virtualisierte / containerisierte Systeme.

Bei der Nutzung in anderen lokalen CI/CD-Systemen, die nicht virtualisiert sind, funktioniert es auf ähnliche Weise und gibt Energie-
und CO2-Werte des gesamten Systems aus.

### Links

{{< button "code branch" "Github Repository" "https://github.com/green-coding-solutions/eco-ci-energy-estimation" >}}

{{< button "shopping bag" "Github Marktplatz" "https://github.com/marketplace/actions/eco-ci-energy-estimation" >}}

{{< button "eye" "Live-Vorschau auf Github Actions" "https://github.com/green-coding-solutions/green-metrics-tool/pull/1233#issuecomment-2993393021" >}}

{{< button "chartline" "CI Energiekostenüberwachung" "https://metrics.green-coding.io/ci.html?repo=green-coding-solutions/green-metrics-tool&branch=main&workflow=45267393&start_date=2025-05-01&end_date=2025-09-12" >}}

{{< button "book" "Blog-Artikel" "/blog/eco-ci-gitlab-release" >}}

{{< button "code branch" "Github Repository (für Gitlab Dokumentation)" "https://github.com/green-coding-solutions/eco-ci-energy-estimation/blob/main/README.md#gitlab" >}}


---

## Community Version / Enterprise Version

Wir glauben an Open Source und daran, dass für die Unterstützung nachhaltiger Software die Messwerkzeuge frei zugänglich
und falsifizierbar sein müssen.

Die **Community Version** bietet alle Funktionen für die Energie- und CO2-Abschätzung mit einer <u>kostenlosen Open Source MIT Lizenz.</u>

Die dazugehörige **API & Dashboard** bieten wir jedoch als **SaaS** an, die einige Premium-Funktionen und einen Support-Plan enthält.

<div class="ui horizontal divider header"><i class="tag icon"></i>Vergleichstabelle</div>
<br>
<div class="ui three column stackable grid">
    <div class="ui column">
    <div class="ui fluid card">
        <div class="content">
            <div class="header center aligned">Community Version</div>
            <div class="meta center aligned">kostenlos und Open Source</div>
            <div class="ui divider horizontal">0 EUR / Monat</div>
            <div class="ui list">
                <div class="item"><i class="icon checkmark"></i> <div class="content">
                    Voll funktionsfähige Abschätzung direkt auf GitHub / GitLab / lokal
                </div></div>
                <div class="item"><i class="icon checkmark"></i> <div class="content">
                    MIT lizenziert
                </div></div>
                <div class="item"><i class="icon checkmark"></i> <div class="content">
                    Kostenloser API & Dashboard SaaS-Tarif für Open-Source-Communities
                </div></div>
                <div class="item"><i class="icon checkmark"></i> <div class="content">
                    Community-Support über Github Issues
                </div></div>
                <div class="item"><i class="icon times"></i> <div class="content">
                    Eingeschränkter öffentlicher Zugang zu API & Dashboard SaaS
                    <br><small>1.000 Datenpunkte - Max. 30 Tage</small>
                </div></div>
                <hr>
                <div class="item"><i class="icon times"></i> <div class="content">
                    Kein Einrichtungs-Support
                </div></div>
                <div class="item"><i class="icon times"></i> <div class="content">
                    Kein Mess-Support
                </div></div>
            </div>
        </div>
        <div class="extra content">
            <a class="ui button fluid grey" href='https://github.com/green-coding-solutions/green-metrics-tool'>Kostenlos (Download auf Github)</a>
        </div>
    </div>
    </div>
    <div class="ui column">
    <div class="ui card fluid raised">
        <div class="content">
            <div class="header center aligned">Premium</div>
            <div class="meta center aligned">Support & Wartung.</div>
            <div class="ui divider horizontal">100 EUR / 10.000 Datenpunkte / Monat</div>
            <div class="ui list">
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Alle</b> Community-Funktionen
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    Hosted-API als <b>SaaS</b>-Version
                    <br><small>Betreute Updates und Wartung</small>
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Unbegrenzte</b> Datenspeicherung
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    Unterstützung für <b>individuelle</b> Energie-Profile von GitHub / GitLab Runnern
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    Unterstützung bei der Integration in <b>Jenkins / CircleCI</b>
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Nachträgliches Backfilling</b> fehlender CO2-Intensitätswerte
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Support</b> der Entwicklung ❤️
                </div></div>
            </div>
        </div>
        <div class="extra content">
            <a class="ui button fluid blue" href="mailto:info@green-coding.io">Kontakt aufnehmen</a>
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
            <div class="meta center aligned">Zugeschnitten auf Ihre Bedürfnisse</div>
            <div class="ui divider horizontal">Individuelle Preise</div>
            <div class="ui list">
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    Enthält <b>alle</b> Premium-Funktionen
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Individuelle</b> Einrichtung & Support
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Persönlicher</b> Support-Ansprechpartner
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Entwicklung</b> & <b>Anpassung</b>
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Individuelle</b> Integrationen
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Authentifizierung</b> und <b>ACL</b> für Benutzer
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Self-hosted</b> oder <b>private isolierte API</b>
                </div></div>
                <div class="item"><i class="icon checkmark blue"></i> <div class="content">
                    <b>Whitelabel</b> & <b>Dual-Licensing</b>
                </div></div>
            </div>
        </div>
        <div class="extra content">
            <a class="ui button fluid blue" href="mailto:info@green-coding.io">Kontakt aufnehmen</a>
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
  <figcaption>Eco CI Datenanzeige im PR</figcaption>
</figure>
{{< /rawhtml >}}


{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/products/github-actions-energy.webp" loading="lazy">
  <figcaption>Github Actions Energieabschätzung</figcaption>
</figure>
{{< /rawhtml >}}


{{< rawhtml >}}
<figure>
  <img class="ui huge rounded image" src="/img/blog/eco-ci.webp" loading="lazy">
  <figcaption>Demo der Eco CI Funktion im Green Metrics Tool</figcaption>
</figure>
{{< /rawhtml >}}

&nbsp;

---

## Github Action - Eco CI Activity Checker

Der Eco CI Activity Checker wurde für CI-Workflows entwickelt, die nach einem bestimmten Zeitplan ablaufen.

Oftmals werden diese Workflows auch dann ausgeführt, wenn in den letzten z.B. 24 Stunden kein einziger Commit stattgefunden hat, oder auch wenn
ein paar Minuten vor dem Lauf ein manueller Lauf ausgelöst wurde.

Der Eco CI Activity Checker überspringt dann den Testlauf und spart so Energie und CO2.

{{< button "book" "Blog-Artikel" "/blog/eco-ci-activity-checker-released" >}}

{{< button "code branch" "Github Repository" "https://github.com/green-coding-solutions/eco-ci-activity-checker" >}}

{{< button "shopping bag" "Github Marktplatz" "https://github.com/marketplace/actions/eco-ci-activity-checker" >}}

&nbsp;

---

<div class="clear"></div>
