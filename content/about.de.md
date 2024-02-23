---
title: "Nachhaltige Software"
draft: false
description: "Finden Sie heraus, was wir bei Green Coding tun und warum die Auswirkungen von Software auf die Umwelt wichtig sind"
date: 2022-07-21 08:00:00
author: "Arne Tarara"
authorlink: "https://de.linkedin.com/in/arne-tarara"
translationKey: about

---

{{< image "/img/about/world.webp" >}}

Software wird immer CO2 emissionen haben. Genauso wie jede Technologie, selbst die Solarenergie, CO2 in der Herstellung produziert und das menschliche Leben auch.

Wir glauben jedoch, dass die Nutzung von Software der Weg zu mehr Umweltfreundlichkeit und Nachhaltigkeit ist und dass die Digitalisierung jedes Sektors ein Baustein zur Bekämpfung des Klimawandels ist.

Wie in jedem technologischen Bereich ist das Messen und Verstehen des eigenen Verbrauchs der wichtigste Schritt, um eine Aufgabe anzugehen.

Der nächste Schritt besteht darin, die Optimierungspotenziale zu verstehen. Manchmal sind dies sehr einfache Sachen wie [grünes Hosting](https://www.thegreenwebfoundation.org/).

In anderen Fällen geht es um Änderungen an Ihrer Infrastruktur, Ihrem Code oder Ihren Entwicklungsabläufen.

Der wichtigste Schritt ist die Sensibilisierung und Aufklärung der Entwickler über den Energieverbrauch als einen wichtiger Baustein, der bei der Entwicklung von Software-Architekturen zu berücksichtigen ist.

Dies wird wiederum die Nachfrage nach den Metriken erhöhen und die Bereitstellung durch die Akteure der Branche vorantreiben.


{{< greenblock >}}
Software-Nutzung
{{</ greenblock >}}

Um Berechnungen durchführen zu können, muss die Software die zugrunde liegende Hardware nutzen und verbraucht daher Energie.

Der Energieverbrauch ist oft nicht einfach zu ermitteln. Wenn Sie CPU-/GPU-intensive Lasten haben, wie beim [High Performance Computing](https://de.wikipedia.org/wiki/Hochleistungsrechnen)
oder beim Bitcoin-Mining, ist der Energieverbrauch oft identisch mit der thermischen Leistung Ihres Chips.

Bei der alltäglichen Nutzung von Software ist der Fall jedoch ganz anders. Viele Faktoren tragen zu dem oft verschwenderischen Energieverbrauch von Software bei und sind oft von der reinen Zeit, in der eine Software läuft, entkoppelt:

#### Boot-Zeit

Moderne Software läuft virtualisiert oder containerisiert. Diese virtuellen Maschinen müssen gebootet werden.
Die Kosten für dieses ständige Hoch- und Runterfahren sind für den Benutzer und oft auch für den Entwickler nicht sichtbar.

#### Infrastruktur

Dieser Punkt ist mit der Boot-Zeit verwoben, hat aber genug Potenzial, um gesondert erwähnt zu werden.
Moderne Software wird zumindest in einem Hypervisor virtualisiert, wenn nicht sogar in einer VM oder einem zusätzlichen Container. Diese Technik löst viele Probleme in Bezug auf die Verschwendung von Ressourcen, bringt aber auch Herausforderungen wie Overhead mit sich.
Die Infrastruktur ist oft suboptimal gewählt, überdimensioniert oder zu undurchsichtig, um sie zu analysieren.

#### Hintergrundaktivitäten

Nach der Benutzerinteraktion muss die Software Hintergrundaufgaben erledigen. Sei es Cronjobs, ML-Training, Stream-Verarbeitung usw.

#### Leerlaufzeit

Auch im Zeitalter der Virtualisierung haben Maschinen oft erhebliche Leerlaufzeiten. In der Benutzerlandschaft wird dies oft mit Schlafmodi kompensiert. In der Server Welt gibt es typischerweise keine Energiesparmodi.

#### Prozessenergie

Software kann so schnell sein, dass es nicht wahrnehmbar ist, ob die Nutzung 10ms oder 100ms betrug. Dennoch kann der Energieunterschied enorm sein und ist schwer abzuschätzen, wenn er hochskaliert wird.


### Unsere Arbeit

Um all diese getrennten Bereiche für die EntwicklerInnen sichtbar zu machen, entwickeln wir Open-Source-Tools, die den Energieverbrauch sichtbar machen.

Für nutzerorientierte Anwendungen in der Desktop-, Web- und mobilen Welt entwickeln wir ein Tool zur Messung des gesamten Anwendungslebenszyklus auf der Grundlage eines eines Standardnutzungsszenarios: Das [Green Metrics Tool](https://github.com/green-coding-solutions/green-metrics-tool)

Durch die Verknüpfung von der Version des Codes und eines Nutzungsszenarios können wir verschiedene Software miteinander vergleichbar machen.

In Cloud-Umgebungen mit verteilten Architekturen ist die Verwendung eines Benchmarking-Tools sehr umständlich und nicht wirklich sinnvoll.

Hier werden Inline-Messungen benötigt, die in bereits existierende Beobachtungslösungen exportiert werden können, und auch vorausschauende Schätzungen, die architektonische Optimierungen vorantreiben können (z. B. welcher Dienst zu verwenden ist oder ob ein Wechsel zu Serverless von Vorteil ist).

Anhand von Fallstudien wollen wir auch die Overhead-Kosten der Virtualisierung aufzeigen und Metriken bereitstellen, um fundierte Entscheidungen zu treffen, welches Architekturmodell am besten in eine energiebewusste Unternehmenskultur passt.

Sehen Sie sich auch [unsere Projekte](/de/projects)

{{< whiteblock >}}
Entwicklung von Software
{{</ whiteblock >}}

Bei der Entwicklung von Software werden auch VMs ständig hoch- und runtergefahren. Darüber hinaus durchläuft die Software in einem typischen Entwicklungsprozess die Software eine Continuous Integration (CI) Pipeline durchläuft und alle Tests vollständig ausgeführt werden.

Dieser Prozess ist oft sehr intransparent und die wahren Kosten bleiben dem Entwickler verborgen, da er in der Cloud oder auf
spezialisierten SAAS-Plattformen stattfindet.

Das Verständnis der Kosten für die Erstellung von Software und die potenziellen Einsparungen bei der Stapelverarbeitung oder sogar der Aufteilung der der Pipeline, um nur relevante Teile auszuführen, kann enorm sein.

### Unsere Arbeit

Messen ist der erste Schlüssel zum Verstehen, daher liegt unser Hauptaugenmerk hier auf die Sichtbarmachung und Aufklärung über die Energiekosten bei der Entwicklung von Software.

Wir entwickeln Inline-Plugins für Github Actions und Badges, die andere Leute darauf aufmerksam machen, wie viel die Entwicklung eines Tools kostet.

Außerdem konzentrieren wir uns auf den Aufbau von statischen Websites, die in der Regel weniger Resourcen verbrauchen, aber auch gebaut werden müssen.

Schauen Sie sich unser [OpenEnergyBadge Projekt](/de/projects/open-energy-badge), unsere [Eco CI-plugins for Github](/de/projects/eco-ci) oder unsere [Case Studies](/case-studies/) zu diesem Thema an.

Beispiel Abzeichen: {{< rawhtml >}} <a href="https://metrics.green-coding.io/stats.html?id=01e4f6e1-318f-4ecb-a19f-041439a50065"><img src="https://api.green-coding.io/v1/badge/single/01e4f6e1-318f-4ecb-a19f-041439a50065?metric=AC"></a>{{< /rawhtml >}}


{{< greenblock  "/img/about/dev.webp" >}}
Netzwerke
{{</ greenblock >}}

Netzübertragungen rücken als einer der Hauptverursacher von Software-Emissionen immer mehr in Focus als einer der
Hauptverursacher der CO2 Emmisonen von Software zu sein.

Großartige Tools wie [Websitecarbon.com](https://www.websitecarbon.com/) ermöglichen die Sichtbarkeit der Kosten für eine typische
Website-Anfrage.

Heutzutage wird dies in der Regel durch das Herunterbrechen der Komplexität in eine sehr fehleranfällige Formel erreicht. Siehe unseren
Artikel über [CO2-Formeln](/co2-formulas/) für weitere Einzelheiten.

Die Problematik der Netzwerkemissionen liegt nicht in ihrer Existenz, sondern in ihrer Unsichtbarkeit.

In der Anfangszeit des Internets wurde die Netzübertragung sehr genau gemessen, da danach abgerchnet wurde. Durch die Einführung von Flatrates
konnte das Internet seine Akzeptanz erhöht und wurde allgegenwärtig.

Flatrates haben jedoch zu einer Abkopplung vom Netzwerkverkehr und den Emmissonen geführt.
Dies führt zu einer Entkopplung und dem Missverständnis, dass jede Nutzung des Netzes irgendwann
zu einem bestimmten Zeitpunkt zu einem Anstieg der Kohlenstoffemissionen führt. Manchmal linear, manchmal in Stufen. (Siehe [Gigabytes zu kWh](/de/co2-formulas/#gigabytes-to-kwh))

Da Sie Ihren Verbrauch nicht sehen, wie zum Beispiel bei Ihrer Telefonrechnung, gehen Sie das Risko die Resource nicht mehr zu beachten. Das Gleiche gilt für das Essen am Buffet, wo Reste die Regel sind.

Die Lösung liegt unserer Meinung nach darin, diese Ressource sichtbarer zu machen und einen nachhaltigeren Umgang mit ihr zu finden.


### Unsere Arbeit
Wir befassen uns derzeit mit diesem Thema, indem wir Entwickler durch [Meetups](/talks-and-events/) und durch
Vorträge auf Konferenzen oder Coding Bootcamps wie [WBS Coding School](https://www.wbscodingschool.com/)

Auf der technischen Seite heben wir die Netzwerkemissionen in unserem [Green Metrics Tool](https://github.com/green-coding-solutions/green-metrics-tool) hervor und zeigen Empfehlungen wie:

- Verlagerung von Mobilfunk- zu Festnetzanschlüssen
- Demand Shifting, um Netzwerkanfragen zu CO2 freundlichen Zeiten zu erledigen
- Verwendung von Kompressionstechniken
- Änderung von Verbindungsformaten wie HTTP -> HTTP2
- NICHT liefern von Inhalten, die keinen großen Nutzen haben
- Verringerung der Aktualisierungszyklen und Abfrageintervalle

{{< whiteblock >}}
Hardware Herstellung (Embodied Carbon)
{{</ whiteblock >}}

{{< image "/img/about/carbon.webp" "medium" "right" >}}

Um Software zu betreiben, braucht man Hardware. Diese Hardware muss hergestellt werden und ist oft der Hauptverursacher von CO2 emissionen.

Bei Verbrauchergeräten wie Smartphones stammen typischerweise [über 90 % der gesamten CO2 emissionen aus der Herstellung](https://greensoftware.foundation/articles/sustainable-systems-user-hardware-and-sustainability)

Bei Servern sieht die Sache anders aus, und hier ist es [ungefähr umgekehrt](https://i.dell.com/sites/csdocuments/CorpComm_Docs/en/carbon-footprint-poweredge-r740xd.pdf) (wenn Sie mit grünem Strom betrieben werden).


### Unsere Arbeit

Wir verwenden offizielle Datenbanken wie die [NegaOctet](https://negaoctet.org/) eine Datenbank aus Frankreich, um das gebunde CO2 der zugrunde liegenden Hardware zu ermitteln.

Ein weiterer Ansatz, den wir verfolgen, ist das Konzept der *Digital Resource Primitives*, das von der [SDIA](https://knowledge.sdialliance.org/digital-environmental-footprint) entwickelt wurde.

Das Konzept kennzeichnet eine Ressource als blockiert, wenn sie von einer Software verwendet wird, und kann so die CO2 auswirkungen der Herstellung der Zeit zuordnen, in der sie verwendet wird, was die Software besser vergleichbar macht.

{{< greenblock >}}
Interessiert?
{{</ greenblock >}}

{{< rawhtml >}}
<div class="btn-one">
    <a href="mailto:info@green-coding.io"><span>Kontaktieren Sie uns</span></a>
</div>
<br>
<center>Weitere Beispiele finden Sie auf unserer Seite <a href="/services/">Services</a>.</center>
{{</ rawhtml >}}
