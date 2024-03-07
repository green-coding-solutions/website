---
title: "Power Hog"
date: 2023-9-20 19:00:00
publishDate: 2023-01-16
draft: false
icon: "piggy bank"
desc: "Power Hog bietet Tools zur Überwachung des Computer-Energieverbrauchs, mit Fokus auf Prozessanalyse, zentraler Daten-Erfassung zur Optimierung und CO2-Datenübermittlung."
ordering: 5
---

Der Power Hog bietet eine Reihe von Tools, mit denen Sie den Energieverbrauch Ihres Computers überwachen können.
Derzeit sind die drei Hauptziele:

1) Der Benutzerin die Möglichkeit geben, zu analysieren, welche Prozesse wie viel Energie verbrauchen und wie sich dies auf das System auswirkt.
2) Zentrale Erfassung der Stromverbrauchsdaten, um Anwendungen/Prozesse zu identifizieren, die optimiert werden könnten, um auf breiterer Ebene Energie zu sparen.
3) Der Nutzerin die Möglichkeit geben, die Daten an eine CO2 Datenbank zu übermitteln, damit der Energieverbrauch einem Projekt zugeordnet werden kann.

Derzeit unterstützen wir nur MacOSX durch das powermetrics [[1]]({{< relref path="blog/power-measurement-on-macos" lang="en" >}}) Tool!
Für die Unterstützung von Linux oder Windows ist noch mehr Arbeit nötig.

Der Hog besteht aus zwei Hauptteilen.

Das Hintergrundskript, das alle Daten sammelt und sie an einen Server sendet. Dies wird `power_logger` genannt. Mehr
Informationen können hier gefunden werden:

[https://github.com/green-coding-solutions/hog#power-logger](https://github.com/green-coding-solutions/hog#power-logger)

Die App, die Ihnen erste Einblicke in die gesammelten Daten und weitere Informationen über den Hog auf Ihrem System gibt. Einzelheiten
finden Sie hier:

[https://github.com/green-coding-solutions/hog#the-desktop-app](https://github.com/green-coding-solutions/hog#the-desktop-app)

Detaillierte Analysen können im Dashboard des Green Metrics Tool durchgeführt werden. Sie können entweder unseren Server oder Ihren eigenen Host verwenden.

Eine vollständige Readme und Dokumentation finden Sie im GitHub Repo.

{{< button "arrow alternate circle down" "Download" "https://github.com/green-coding-solutions/hog/releases" >}}

{{< button "book" "Dokumentation" "https://github.com/green-coding-solutions/hog/blob/main/README.md#the-power-hog" >}}

{{< button "code branch" "Github" "https://github.com/green-coding-solutions/hog" >}}

---

## Screenshots

{{< rawhtml >}}
<img class="ui rounded bordered image" src="/img/projects/hog-power-logger.avif" alt="HOG Screenshot" loading="lazy" style="margin:auto;">
<br>
<img class="ui rounded bordered image" src="/img/projects/hog-mac-app.avif" alt="HOG Screenshot" loading="lazy" style="margin:auto;">
<br>
<img class="ui rounded bordered image" src="/img/projects/hog-website.avif" alt="HOG Screenshot" loading="lazy" style="margin:auto;">
<br>
{{< /rawhtml >}}
