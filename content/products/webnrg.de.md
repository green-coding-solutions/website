---
title: "webNRG"
date: 2026-03-10 10:00:00
publishDate: 2026-03-10
draft: false
icon: "lightning"
desc: "webNRG misst den Energieverbrauch und die CO₂-Emissionen von Websites durch die Kombination von Netzwerkverkehrsanalyse und tatsächlichem Gerätestromverbrauch beim Rendering"
ordering: 9
---

webNRG ist ein kostenloses Open-Source-Tool, das den Energieverbrauch und die CO₂-Emissionen von Websites misst. Im Gegensatz zu Tools, die sich nur auf grünes Hosting und Netzwerkdaten konzentrieren, legt webNRG den Fokus auf zwei häufig vernachlässigte Faktoren: **Energie des Netzwerkverkehrs** und **Rendering-Leistung auf der Nutzerseite**.

Das Tool kombiniert beide Faktoren zu einem einzigen Score, der nach einem Nutri-Score-ähnlichen System von **A+ bis F** bewertet wird – damit sind die Ergebnisse sowohl für Entwickler als auch für Nicht-Techniker sofort verständlich.

{{< rawhtml >}}
<figure>
    <img class="ui centered huge image" src="/img/products/webNRG-sample-site.webp" alt="Green-Coding.io webNRG Zusammenfassung" loading="lazy">
    <figcaption><a href="https://website-tester.green-coding.io/details.html?page=https%3A%2F%2Fwww.green-coding.io">green-coding.io webNRG⚡️ Zusammenfassung</a></figcaption>
</figure>
{{< /rawhtml >}}

Eine der zentralen Erkenntnisse beim Entwickeln von webNRG: Eine Seite, die 35× mehr Daten überträgt als eine andere, kann dennoch denselben Rendering-Energieverbrauch haben. Netzwerkgröße und Stromverbrauch korrelieren nur schwach (0,49) – deshalb ist es wichtig, beide separat zu messen.

### So funktioniert es

- Reiche deine Website-URL für einen einmaligen Test ein oder registriere dich für ein **wöchentliches Monitoring**
- webNRG misst die Energie über ein 5-Sekunden-Fenster nach dem ersten Seitenaufruf
- Netzwerkverkehr und CPU-/Rendering-Energie werden unabhängig voneinander erfasst
- Ergebnisse werden gegen den Leerlauf-Stromverbrauch benchmarkt, mit 25%-Schritten pro Bewertungsstufe
- Emissionen werden auf Basis eines typischen Szenarios von 10.000 Nutzern/Monat berechnet

### Links

{{< button "lightning" "webNRG ausprobieren" "https://website-tester.green-coding.io/" >}}

{{< button "book" "Release-Blogartikel" "/blog/webnrg-released" >}}

<div class="clear"></div>
