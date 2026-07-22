---
title: "webNRG"
date: 2026-03-10 10:00:00
publishDate: 2026-03-10
draft: false
icon: "lightning"
desc: "webNRG misst den Energieverbrauch und die CO2-Emissionen von Webseiten, indem es die Analyse des Netzwerkverkehrs mit der tatsächlichen Leistungsaufnahme des Geräts während des Renderings kombiniert"
ordering: 9
---

webNRG ist ein kostenloses Open-Source-Tool, das den Energieverbrauch und die CO2-Emissionen von Webseiten misst. Anders als Tools, die nur grünes Hosting und Netzwerkdaten betrachten, konzentriert sich webNRG auf die zwei Faktoren, die häufig übersehen werden: **die Energie des Netzwerkverkehrs** und **die Rendering-Leistung auf der Nutzerseite**.

Das Tool führt beides zu einem einzigen Wert zusammen, der nach dem Vorbild des Nutri-Score von **A+ bis F** bewertet wird. So sind die Ergebnisse für Entwicklerinnen und Nicht-Techniker gleichermaßen sofort verständlich.

{{< rawhtml >}}
<figure>
    <img class="ui centered huge image" src="/img/products/webNRG-sample-site.webp" alt="Green-Coding.io webNRG Zusammenfassung" loading="lazy">
    <figcaption><a href="https://website-tester.green-coding.io/details.html?page=https%3A%2F%2Fwww.green-coding.io">green-coding.io webNRG⚡️ Zusammenfassung</a></figcaption>
</figure>
{{< /rawhtml >}}

Eine der zentralen Erkenntnisse aus der Entwicklung von webNRG: Eine Seite, die 35× mehr Daten überträgt als eine andere, kann trotzdem gleich viel Rendering-Energie verbrauchen. Datenmenge und Leistungsaufnahme korrelieren nur schwach (0,49) — genau deshalb ist es wichtig, beides getrennt zu messen.

### Wie es funktioniert

- Reichen Sie Ihre Webseiten-URL für einen einmaligen Test ein oder melden Sie sich für ein **wöchentliches Monitoring** an
- webNRG misst die Energie über ein Zeitfenster von 5 Sekunden nach dem initialen Laden der Seite
- Netzwerkverkehr und CPU-/Rendering-Energie werden unabhängig voneinander erfasst
- Die Ergebnisse werden gegen den Leerlaufverbrauch verglichen, mit Schwellenwerten von jeweils 25 % pro Bewertungsstufe
- Die Emissionen werden auf Basis eines typischen Szenarios von 10.000 Nutzern pro Monat berechnet

### Links

{{< button "lightning" "webNRG ausprobieren" "https://website-tester.green-coding.io/" >}}

{{< button "book" "Blogartikel zur Veröffentlichung" "/blog/webnrg-released" >}}

<div class="clear"></div>
