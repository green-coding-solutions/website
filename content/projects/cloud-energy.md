---
title: "Cloud Energy"
date: 2023-01-13 19:00:00
publishDate: 2023-01-13
draft: false
icon: "cloud"
---


{{< rawhtml >}}
<img class="ui big floated right rounded bordered image" src="https://github.com/green-coding-berlin/spec-power-model/raw/main/img/hp_synergy_480_Gen10_Plus.png" alt="XGBoost performance" loading="lazy" style="margin:auto;">
<br>
{{</ rawhtml >}}




Since in the cloud it is often not possible to measure directly we have created a Machine Learning estimation model
based on the data from [SPECPower](https://www.spec.org/power_ssj2008/)

The setup of the model is based on a [research paper](https://interactdc.com/static/images/documents/Elsevier_Journal.pdf) from [Interact DC](https://interactdc.com/) and the University of East London.

Our model allows for inline measuring in Watts as well as energy budgeting in Joules with many optional input
params to make the model more accurate.

In the chart on the right you can see the performance for an out-of-sample prediciton. Please find more details
for in-sample predictions, exploratory data analysis and application documentation on Github.

The model is open-source [AGPLv3 Licensed](https://github.com/green-coding-berlin/green-metrics-tool/blob/main/LICENSE)

---

{{< rawhtml >}} 
    <a class="ui labeled button" href="https://github.com/green-coding-berlin/spec-power-model">
    <div class="ui button">
        <i class="code branch icon"></i>
    </div>
    <span class="ui basic label">
        Github incl. documentation
    </span>
</a>
{{< /rawhtml >}}

```
$ ./static-binary | python3 xgb.py --tdp 240 
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


