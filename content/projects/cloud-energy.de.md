---
title: "Cloud Energy"
date: 2023-01-13 19:00:00
publishDate: 2023-01-13
draft: false
icon: "cloud"
desc: "Unser Machine Learning Modell für die Energiemessung in der Cloud. Sowohl virtualisert als auch auf Bare Metal. Basierend auf den SPECPower Daten ermöglicht es präzise Inline-Messungen und Energiebudgetierung."
ordering: 3
---


{{< rawhtml >}}
<img class="ui big floated right rounded bordered image" src="https://github.com/green-coding-solutions/spec-power-model/raw/main/img/hp_synergy_480_Gen10_Plus.png" alt="XGBoost performance" loading="lazy" style="margin:auto;">
<br>
{{</ rawhtml >}}

Da es in der Cloud oft nicht möglich ist, Energie direkt zu messen, haben wir ein Machine Learning Modell erstellt, basierend auf Daten von [SPECPower](https://www.spec.org/power_ssj2008/).

Die Basis des Modells basiert auf einem [Forschungspapier](https://interactdc.com/static/images/documents/Elsevier_Journal.pdf) von [Interact DC](https://interactdc.com/) und der University of East London.

Unser Modell ermöglicht die Inline-Messung in Watt sowie die Energiebudgetierung in Joule mit vielen optionalen Eingabeparametern, um das Modell genauer zu machen.

In der Grafik rechts sehen Sie die Leistung für eine Out-of-Sample-Vorhersage. Weitere Details zu In-Sample-Vorhersagen, explorativer Datenanalyse und Anwendungsdokumentation finden Sie auf Github.

Das Modell ist Open-Source und unter der [AGPLv3-Lizenz](https://github.com/green-coding-solutions/green-metrics-tool/blob/main/LICENSE) lizenziert.

---
{{< button "code branch" "Github incl. Dokumentation" "https://github.com/green-coding-solutions/spec-power-model" >}}

&nbsp;


```
$ ./static-binary | python3 xgb.py --make intel -- cpu-freq 2600 --ram 7 --cpu-threads 24
191.939294374113
169.99632303510703
191.939294374113
191.939294374113
191.939294374113
191.939294374113
194.37740205685841
191.939294374113
169.99632303510703
191.939294374113
....
```

---
