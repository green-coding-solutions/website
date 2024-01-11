---
title: "Sustainable Software"
draft: false
description: "Find out what we do at Green Coding and why the carbon impact of software matters"
date: 2022-07-21 08:00:00
author: "Arne Tarara"
authorlink: "https://de.linkedin.com/in/arne-tarara"
translationKey: about

---

Software wird immer Kohlenstoffemissionen haben. Genauso wie jede Technologie, selbst die Solarenergie, Kohlenstoffemissionen hat
und das menschliche Leben auch.

Wir glauben jedoch, dass die Nutzung von Software der Weg zu mehr Umweltfreundlichkeit und Nachhaltigkeit ist und dass die Digitalisierung jedes Sektors ein Baustein zur Bekämpfung des Klimawandels ist.

Wie in jedem technologischen Bereich ist das Messen und Verstehen des eigenen Verbrauchs 
ist der wichtigste Schritt, um eine Aufgabe anzugehen. 

Der nächste Schritt besteht darin, die Optimierungspotenziale zu verstehen. Manchmal sind dies sehr niedrig hängende Früchte wie
[grünes Hosting] (https://www.thegreenwebfoundation.org/).

In anderen Fällen geht es um Änderungen an Ihrer Infrastruktur, Ihrem Code oder Ihren Entwicklungsabläufen.

Der wichtigste Schritt ist die Sensibilisierung und Aufklärung der Entwickler über den Energieverbrauch als einen
wichtiger Baustein, der bei der Entwicklung von Software-Architekturen zu berücksichtigen ist.

Dies wird wiederum die Nachfrage nach den Metriken erhöhen und die Bereitstellung durch die Akteure der Branche vorantreiben.


{{< greenblock >}}
Software-Nutzung
{{</ greenblock >}}

Um Berechnungen durchführen zu können, muss die Software die zugrunde liegende Hardware nutzen und verbraucht daher Energie.

Der Energieverbrauch ist oft nicht einfach zu ermitteln. Wenn Sie CPU-/GPU-intensive Lasten haben, wie beim [High Performance Computing] (https://en.wikipedia.org/wiki/High-performance_computing)
oder beim Bitcoin-Mining, ist der Energieverbrauch oft identisch mit der thermischen Leistung Ihres Chips.

Bei der alltäglichen Nutzung von Software ist der Fall jedoch ganz anders. Viele Faktoren tragen zu dem oft verschwenderischen Energieverbrauch von Software bei
und sind oft von der reinen visuellen Zeit, in der eine Software läuft, entkoppelt:

#### Boot-Zeit
Moderne Software läuft virtualisiert oder containerisiert. Diese virtuellen Maschinen müssen gebootet werden, und die Kosten für dieses ständige Hoch- und
Die Kosten für dieses ständige Hoch- und Runterfahren sind für den Benutzer und oft auch für den Entwickler nicht sichtbar.
#### Infrastruktur
Dieser Punkt ist mit der Boot-Zeit verwoben, hat aber genug Potenzial, um gesondert erwähnt zu werden.
Moderne Software wird zumindest in einem Hypervisor virtualisiert, wenn nicht sogar in einer VM oder einem zusätzlichen Container. Diese Technik löst
viele Probleme in Bezug auf die Verschwendung von Ressourcen, bringt aber auch Herausforderungen wie Overhead mit sich.
Die Infrastruktur ist oft suboptimal gewählt, überdimensioniert oder zu undurchsichtig, um sie zu analysieren.
#### Hintergrundaktivitäten
Nach der Benutzerinteraktion muss die Software Hintergrundaufgaben erledigen. Sei es Cronjobs, ML-Training, Stream-Verarbeitung usw.
#### Leerlaufzeit
Auch im Zeitalter der Virtualisierung haben Maschinen oft erhebliche Leerlaufzeiten. In der Benutzerlandschaft wird dies oft mit Schlafmodi kompensiert. In der Server
Welt gibt es typischerweise keine Energiesparmodi.
#### Prozessenergie
Software kann so schnell sein, dass es nicht wahrnehmbar ist, ob die Nutzung 10ms oder 100ms betrug. Dennoch kann der Energieunterschied enorm sein und 
ist schwer abzuschätzen, wenn er hochskaliert wird.


### Unsere Arbeit
Um all diese getrennten Bereiche für den Entwickler sichtbar zu machen, entwickeln wir Open-Source-Tools, die den Energieverbrauch sichtbar machen.

Für nutzerorientierte Anwendungen in der Desktop-, Web- und mobilen Welt entwickeln wir ein Tool zur Messung des gesamten Anwendungslebenszyklus auf der Grundlage eines
auf dem Konzept eines Standardnutzungsszenarios: Das [Green Metrics Tool] (https://github.com/green-coding-berlin/green-metrics-tool)

Durch die Verknüpfung von Codeversion und Nutzungsszenario können wir verschiedene Software miteinander vergleichbar machen.

In Cloud-Umgebungen mit verteilten Architekturen ist die Verwendung eines Benchmarking-Tools sehr umständlich und nicht wirklich sinnvoll.

Hier werden Inline-Messungen benötigt, die in bereits existierende Beobachtungslösungen exportiert werden können, und auch vorausschauende Schätzungen, die
architektonische Optimierungen vorantreiben können (z. B. welcher Dienst zu verwenden ist oder ob ein Wechsel zu Serverless von Vorteil ist).

Anhand von Fallstudien wollen wir auch die Overhead-Kosten der Virtualisierung aufzeigen und Metriken bereitstellen, um fundierte Entscheidungen zu treffen, welches
Architekturmodell am besten in eine energiebewusste Unternehmenskultur passt.

Sehen Sie sich auch [unsere Projekte](/#projects)

{{< whiteblock >}}
Entwicklung von Software
{{</ whiteblock >}}


When developing software also VMs are constantly spun up and down. In addition to that in a typical developing process
software runs through a Continuous Integration (CI) Pipeline and all the tests are executed in full.


This process is often very opaque and the true cost hidden from the developer as it takes place in the cloud or on
specialized SAAS platforms.


Das Verständnis der Kosten für die Erstellung von Software und die potenziellen Einsparungen bei der Stapelverarbeitung oder sogar der Aufteilung der 
der Pipeline, um nur relevante Teile auszuführen, kann enorm sein.


### Unsere Arbeit
Wie bereits gesagt: Messen ist der erste Schlüssel zum Verstehen, daher liegt unser Hauptaugenmerk hier auf 
die Sichtbarmachung und Aufklärung über die Energiekosten bei der Entwicklung von Software.


Wir entwickeln Inline-Plugins für Github Actions und Badges, die andere Leute darauf aufmerksam machen, wie viel die Entwicklung kostet.


Also we focus in the building process for static sites, which typically have a lower cost of operating but incur a build cost.


Checkout out our [OpenEnergyBadge project](/projects/open-energy-badge), our [Eco CI-plugins for Github](/projects/eco-ci) or our [Case Studies](/case-studies/) on the topic. 


Example badge: {{< rawhtml >}} <a href="https://metrics.green-coding.io/stats.html?id=01e4f6e1-318f-4ecb-a19f-041439a50065"><img src="https://api.green-coding.io/v1/badge/single/01e4f6e1-318f-4ecb-a19f-041439a50065?metric=AC"></a>{{< /rawhtml >}}


{{< greenblock >}}
Network
{{</ greenblock >}}




Network transmissions are coming more and more into the focus as one of 
the main drivers of software carbon emissions.


Great tools like [Websitecarbon.com](https://www.websitecarbon.com/) allow the visiblity of the cost for a typical
Website-Anfrage.


Heutzutage wird dies in der Regel durch das Herunterbrechen der Komplexität in eine sehr fehleranfällige Formel erreicht. Siehe unseren
Artikel über [CO2-Formeln](/co2-formulas/) für weitere Einzelheiten.


Die Problematik der Netzwerkemissionen liegt nicht in ihrer Existenz, sondern in ihrer Unsichtbarkeit.


In der Anfangszeit des Internets wurde die Netzübertragung in der Regel gemessen. Durch die Einführung von Flatrates
hat das Internet seine Akzeptanz erhöht und wurde allgegenwärtig.


Flatrates haben jedoch zu einer Abkopplung von der Art der Netzübertragungen geführt, die nicht wirklich
eine pauschale Kohlenstoffemission. 
Dies führt zu einer Entkopplung und dem Missverständnis, dass jede Nutzung des Netzes irgendwann
zu einem bestimmten Zeitpunkt zu einem Anstieg der Kohlenstoffemissionen führt. Manchmal linear, manchmal in Stufen. (Siehe [Gigabytes zu kWh](/co2-formulas/#gigabytes-to-kwh))


Da Sie Ihren Verbrauch nicht sehen, wie zum Beispiel bei Ihrer Telefonrechnung, gehen Sie
riskiert man einen unvorsichtigen Umgang mit der Ressource. Das Gleiche gilt für das Essen am Buffet, wo Reste die Regel sind.


Die Lösung liegt unserer Meinung nach darin, diese Ressource sichtbarer zu machen und einen nachhaltigeren Umgang mit ihr zu finden.
mit ihr umzugehen.


### Unsere Arbeit
Wir befassen uns derzeit mit diesem Thema, indem wir Entwickler durch [Meetups](/meetups-and-events/) und durch
Vorträge auf Konferenzen oder Coding Bootcamps wie [WBS Coding School](https://www.wbscodingschool.com/)


Auf der technischen Seite heben wir die Netzwerkemissionen in unserem [Green Metrics Tool](https://github.com/green-coding-berlin/green-metrics-tool) hervor und zeigen
Empfehlungen wie
- Verlagerung von Mobilfunk- zu Festnetzanschlüssen
- Demand Shifting, um Netzwerkanfragen zu kohlenstofffreundlichen Zeiten zu erledigen
- Verwendung von Kompressionstechniken
- Änderung von Verbindungsformaten wie HTTP -> HTTP2
- NICHT liefern von Inhalten, die keinen großen Nutzen haben
- Verringerung der Aktualisierungszyklen und Abfrageintervalle 


{{< whiteblock >}}
Verkörperter Kohlenstoff
{{</ whiteblock >}}




Um Software zu betreiben, braucht man Hardware. Diese Hardware muss hergestellt werden und ist oft der Hauptverursacher von Kohlenstoffemissionen.


Bei Verbrauchergeräten wie Smartphones stammen typischerweise [über 90 % der gesamten Kohlenstoffemissionen aus der Herstellung] (https://greensoftware.foundation/articles/sustainable-systems-user-hardware-and-sustainability)


Bei Servern sieht die Sache anders aus, und hier ist es [ungefähr umgekehrt] (https://i.dell.com/sites/csdocuments/CorpComm_Docs/en/carbon-footprint-poweredge-r740xd.pdf
) (wenn Sie nicht mit kohlenstofffreiem Strom betrieben werden).


### Unsere Arbeit
Wir verwenden offizielle Datenbanken wie die [NegaOctet](https://negaoctet.org/) Datenbank aus Frankreich, um den verkörperten Kohlenstoff der zugrunde liegenden Hardware zu ermitteln
und die Herstellungskosten zu ermitteln.


Ein weiterer Ansatz, den wir verfolgen, ist das Konzept der *Digital Resource Primitives*, das von der [SDIA](https://knowledge.sdialliance.org/digital-environmental-footprint) entwickelt wurde.


Das Konzept kennzeichnet eine Ressource als blockiert, wenn sie von einer Software verwendet wird, und kann so die Kohlenstoffauswirkungen der Herstellung der Zeit zuordnen, in der sie verwendet wird, was die Software besser vergleichbar macht.




{{< greenblock >}}
Interessiert?
{{</ greenblock >}}


{{< rawhtml >}}
<div class="btn-one">
    <a href="mailto:info@green-coding.io"><span>Contact Us</span></a>
</div>
<br>
<center>Or see more examples on our <a href="/services/">Services</a> page.</center>
{{</ rawhtml >}}
