---
title: "Energy Efficiency of programming languages - Revisiting Python in 2024"
draft: false
date: 2024-05-08
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
socialmedia_preview: "img/social-media-previews/case-study-python-energy-efficiency-2024.webp"

---

In 2017 a paper was published in the Proceedings of 2017 ACM SIGPLAN called [Energy Efficiency across Programming Languages](https://greenlab.di.uminho.pt/wp-content/uploads/2017/10/sleFinal.pdf)

The paper compares different programming language on standardised algorithmical compute benchmarks and ranks them according to their energy efficiency.

One of the most loved and used languages today, Python, ranks very low in this paper having a **75x** increased energy consumption over the low level language C.

{{< rawhtml >}}
<figure>
  <img class="ui medium rounded image" src="/img/case-studies/python-vs-c.webp" alt="Python vs. C">
  <figcaption>Python vs. C - Energy consumption (relative)</figcaption>
</figure>
{{< /rawhtml >}}

To this day the paper is cited on many media outlets, LinkedIn, and even TikTok! It certainly shook up many people by creating a doom and gloom scenario that many digital products use one of the currently most inefficient languages.

Though many caveats exist in this claim like:
- Most python code makes intensive compute through C libraries and not through Python directly
- Actual programs compared seem to be more like 4x in difference due to the nature of a program to not be compute only but also a lot of I/O, syscalls etc [\[1\]](#sources).

However, not close to **7 years later** and many Python versions and also implementations later we thought it is due for a re-visit of the paper.

Since in the paper [Python 3.6 was used](https://github.com/greensoftwarelab/Energy-Languages/blob/master/Python/binary-trees/Makefile) we will look at newer version like Python 3.9, Python 3.12, Mojo, RustPython and also PyPy 3.10 if Python has advanced either in the CPython reference implementation of if also different interpreters might ease the inefficiency a bit.

{{< greenblock >}}
Agenda
{{< /greenblock >}}

{{< rawhtml >}}
            <div class="ui segment raised">
                <div class="ui list">
                    <div class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="header">
                                <a href="#header">Introduction</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="header">
                                <a href="#research-question">Research Question</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="header">
                                <a href="#setup">Setting up power capping on Linux</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="header">
                                <a href="#energy-for-compression">Measurements</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="header">
                                <a href="#summary">Evaluation of possible drawbacks</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="header">
                                <a href="#summary">Summary and further considerations</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{{< /rawhtml >}}

{{< whiteblock >}}
What do we want to find out?
{{< /whiteblock >}}

{{< research_question >}}
    How has the energy efficiency changed with Python 3.9 and Python 3.12 and how does PyPy and Mojo compare to C?
{{< /research_question >}}

{{< greenblock >}}
Benchmarking with the Green Metrics Tool
{{< /greenblock >}}

We used the same benchmarks as in the original paper: [The Computer Language Benchmark Game](https://en.wikipedia.org/wiki/The_Computer_Language_Benchmarks_Game)

Since the [archived repository on Gitlab](https://salsa.debian.org/benchmarksgame-team/archive-alioth-benchmarksgame) contains mutliple submitted variants we resorted to using the originally selected benchmarks by the study authors in their [Github repository](https://github.com/greensoftwarelab/Energy-Languages)

The [Green Metrics Tool](https://www.green-coding.io/projects/green-metrics-tool/) makes it very easy to consume these benchmarks directly. We only added a container which contained the necessary Python version:

- [Python3.6 Dockerfile](https://github.com/green-coding-solutions/python-benchmarks/blob/main/python/Dockerfile-3-6)
- [Python3.9 Dockerfile](https://github.com/green-coding-solutions/python-benchmarks/blob/main/python/Dockerfile-3-9)
- [Python 3.12 Dockerfile](https://github.com/green-coding-solutions/python-benchmarks/blob/main/python/Dockerfile-3-12)
- [Mojo Dockerfile](https://github.com/green-coding-solutions/python-benchmarks/blob/main/python/Dockerfile-Mojo)
- [PyPy 3.10](https://github.com/green-coding-solutions/python-benchmarks/blob/main/python/Dockerfile-pypy)
- [C Dockerfile](https://github.com/green-coding-solutions/python-benchmarks/blob/main/c/Dockerfile)

We just boot the container, execute the CLI command and let the Green Metrics Tool do it's automated measurement magic. Find an example [usage_scenario for Python 3.6 here](https://github.com/green-coding-solutions/python-benchmarks/blob/main/usage_scenario_py3.6.yml).


During the run we are mainly looking at the CPU energy and the total machine energy. In the original paper they only looked at the CPU energy.

**Pro Tip**: If you do not know what the Green Metrics Tool is: It is our all-in-one open source professional software benchmarking and optimization solution. [Find infos here](https://www.green-coding.io/projects/green-metrics-tool/)

{{< whiteblock >}}
Results
{{< /whiteblock >}}


{{< table class="ui table" >}}
| Language                    | Benchmark | vs. C [CPU Energy]   | vs. C [Machine Energy]
|:---------------------------:|:---:|:---:|:---:|
| Python 3.6    | binary-trees | 60x | 56x |
| Python 3.6  | fannkuch-redux | 66x | 63x |
| Python 3.6           | fasta | 34x | 38x |
| **Python 3.6**         | **TOTAL** | **61x** | **58x** |
{{</ table >}}
[Source: Measurements, charts and details](https://metrics.green-coding.io/compare.html?ids=80f1ac86-2255-4b7c-938b-a9f8bddbf4a7,cb671005-0873-4992-8979-0d4b48052bec,a7a4446b-0e5d-4202-a0a1-01b053fbb2f0,0eb0f2b9-6552-40be-8907-f62004357d46,cc0bd7c8-0bc7-4378-9f2c-c4f56ef32655,365f3705-2981-4294-96f5-406f2e1f02f6,530a6fdb-89ad-41c5-ab3b-30d40f69b324,076528c7-b26c-4e4d-b300-49610ab87c7a,88af6680-4bd8-4f9b-a518-e75c0331d604,2700b66f-03dc-4d5b-9503-f106805d7eb6,4187414a-32ea-4bb4-b5d3-17496e307109,eff016f1-8bcd-4bc8-b1bb-f71da5296856,42d34b4a-d028-4d61-b2fe-aef3927035ec,e9e955f2-ae74-4904-8c25-70f0364fb780,45c0d2ed-97ef-4a88-8a2f-f5a8076f7ecc,90bdde06-e427-4986-9268-42ba91bc8fcc,bced3fe2-37e7-4823-88f7-dad14fe4367d,764bbf13-e5bf-4d32-8a15-21a92610b5fb,388d786b-66fc-4f52-af24-c620586d2eb5,1f85d489-c51e-4a0c-9e2c-d1f58be13028)

---

{{< table class="ui table" >}}
| Language                    | Benchmark | vs. C [CPU Energy]   | vs. C [Machine Energy]
|:---------------------------:|:---:|:---:|:---:|
| Python 3.9    | binary-trees | 51x | 49x |
| Python 3.9  | fannkuch-redux | 72x | 68x |
| Python 3.9           | fasta | 30x | 33x |
| **Python 3.9**         | **TOTAL** | **63x** | **61x** |
{{</ table >}}

[Source: Measurements, charts and details](https://metrics.green-coding.io/compare.html?ids=80f1ac86-2255-4b7c-938b-a9f8bddbf4a7,cb671005-0873-4992-8979-0d4b48052bec,a7a4446b-0e5d-4202-a0a1-01b053fbb2f0,0eb0f2b9-6552-40be-8907-f62004357d46,cc0bd7c8-0bc7-4378-9f2c-c4f56ef32655,365f3705-2981-4294-96f5-406f2e1f02f6,530a6fdb-89ad-41c5-ab3b-30d40f69b324,076528c7-b26c-4e4d-b300-49610ab87c7a,88af6680-4bd8-4f9b-a518-e75c0331d604,2700b66f-03dc-4d5b-9503-f106805d7eb6,2b6fa23f-db48-4cb3-8fb3-64ac73c4540e,c641bd55-13f5-40da-8c0f-3546fab8f69e,1d80f5d6-3978-4162-887c-363eca556814,f007e7a2-4e52-418e-871a-ab073b71c885,296cbaaa-972f-4a09-bb6a-57a37fc935c5,26c36b5e-0f82-4d0c-a0eb-78c9f3e4f686,3b026236-02d0-48d8-b2ef-bc1ebcd09133,de113e65-3bbf-47aa-a8a6-fd89cda20385,3cb69b09-bff0-4846-b64b-0a4e7f22c5a1,c21ff568-83ae-49b9-b4b4-57b35e8c3fda)

---

{{< table class="ui table" >}}
| Language                    | Benchmark | vs. C [CPU Energy]   | vs. C [Machine Energy]
|:---------------------------:|:---:|:---:|:---:|
| Python 3.12    | binary-trees | 33x | 33x |
| Python 3.12  | fannkuch-redux | 57x | 54x |
| Python 3.12           | fasta | 28x | 31x |
| **Python 3.12**         | **TOTAL** | **50x** | **48x** |
{{</ table >}}

[Source: Measurements, charts and details](https://metrics.green-coding.io/compare.html?ids=80f1ac86-2255-4b7c-938b-a9f8bddbf4a7,cb671005-0873-4992-8979-0d4b48052bec,a7a4446b-0e5d-4202-a0a1-01b053fbb2f0,0eb0f2b9-6552-40be-8907-f62004357d46,cc0bd7c8-0bc7-4378-9f2c-c4f56ef32655,365f3705-2981-4294-96f5-406f2e1f02f6,530a6fdb-89ad-41c5-ab3b-30d40f69b324,076528c7-b26c-4e4d-b300-49610ab87c7a,88af6680-4bd8-4f9b-a518-e75c0331d604,2700b66f-03dc-4d5b-9503-f106805d7eb6,4187414a-32ea-4bb4-b5d3-17496e307109,eff016f1-8bcd-4bc8-b1bb-f71da5296856,42d34b4a-d028-4d61-b2fe-aef3927035ec,e9e955f2-ae74-4904-8c25-70f0364fb780,45c0d2ed-97ef-4a88-8a2f-f5a8076f7ecc,90bdde06-e427-4986-9268-42ba91bc8fcc,bced3fe2-37e7-4823-88f7-dad14fe4367d,764bbf13-e5bf-4d32-8a15-21a92610b5fb,388d786b-66fc-4f52-af24-c620586d2eb5,1f85d489-c51e-4a0c-9e2c-d1f58be13028)


---

{{< table class="ui table" >}}
| Language                    | Benchmark | vs. C [CPU Energy]   | vs. C [Machine Energy]
|:---------------------------:|:---:|:---:|:---:|
| PyPy 3.10    | binary-trees | 5x | 7x |
| PyPy 3.10  | fannkuch-redux | 21x | 25x |
| PyPy 3.10           | fasta | 22x | 18x |
| **PyPy 3.10**         | **TOTAL** | **18x** | **21x** |
{{</ table >}}


- [Source: Measurements, charts and details](https://metrics.green-coding.io/compare.html?ids=80f1ac86-2255-4b7c-938b-a9f8bddbf4a7,cb671005-0873-4992-8979-0d4b48052bec,a7a4446b-0e5d-4202-a0a1-01b053fbb2f0,0eb0f2b9-6552-40be-8907-f62004357d46,cc0bd7c8-0bc7-4378-9f2c-c4f56ef32655,365f3705-2981-4294-96f5-406f2e1f02f6,530a6fdb-89ad-41c5-ab3b-30d40f69b324,076528c7-b26c-4e4d-b300-49610ab87c7a,88af6680-4bd8-4f9b-a518-e75c0331d604,2700b66f-03dc-4d5b-9503-f106805d7eb6,f1e87161-cd0e-4a9c-8c4e-2a2ec446740e,6c102ade-3a3b-42c7-a4e1-99a6b6176d54,3a7be3cb-4e3f-4ab1-8c75-f858d37878ed,1b50129d-cbd8-4047-8f44-56df6fef6de4,dcbb001d-72b7-4f02-af58-755fba9cc855,e85b110e-67c4-4346-bade-a969e20a5097,6caa8a15-736a-4bb1-9d88-df9163f34697,375ac16f-eb4d-47db-95d9-72bb9ef0e824,dc10f93f-aec9-492a-a4dd-5fd4b71e4262,d0c0483c-de4c-49bc-add6-34cb505d4db6)
    - 18x Difference in CPU Energy (Mean)
    - 21x Difference in Total Machine Energy (Mean)

---

{{< table class="ui table" >}}
| Language                    | Benchmark | vs. C [CPU Energy]   | vs. C [Machine Energy]
|:---------------------------:|:---:|:---:|:---:|
| Mojo    | binary-trees | 51x | 48x |
| Mojo  | fannkuch-redux | 65x | 62x |
| Mojo           | fasta | 32x | 36x |
| **Mojo**         | **TOTAL** | **58x** | **56x** |
{{</ table >}}


- [Source: Measurements, charts and details](https://metrics.green-coding.io/compare.html?ids=80f1ac86-2255-4b7c-938b-a9f8bddbf4a7,cb671005-0873-4992-8979-0d4b48052bec,a7a4446b-0e5d-4202-a0a1-01b053fbb2f0,0eb0f2b9-6552-40be-8907-f62004357d46,cc0bd7c8-0bc7-4378-9f2c-c4f56ef32655,365f3705-2981-4294-96f5-406f2e1f02f6,530a6fdb-89ad-41c5-ab3b-30d40f69b324,076528c7-b26c-4e4d-b300-49610ab87c7a,88af6680-4bd8-4f9b-a518-e75c0331d604,2700b66f-03dc-4d5b-9503-f106805d7eb6,daa35e7a-539d-4c97-bdf4-137ecc30e6fd,17baf6f0-313b-4146-829b-a3d63047f0d9,f59eca5a-a6c8-4257-be6c-b6315cbb2cee,7e0d8230-76f8-4c86-aefd-ea2e7947287c,7f4a4aa1-a497-47ac-b080-0901796a1aea,bdba78f3-debe-4594-a100-e97b625015fa,ad1517ec-3672-4dbf-b417-b7089f17cfa8,27393216-3f93-48dd-b9d7-7c3fcd4ec48a,6a8d67dd-6d92-4c13-9daf-61075b41b9a5,899187a5-7377-4911-85d1-ad8038467563)
    - 58x Difference in CPU Energy (Mean)
    - 56x Difference in Total Machine Energy (Mean)






    - What => Change to 3.6 is [significant](https://metrics.green-coding.io/compare.html?ids=4187414a-32ea-4bb4-b5d3-17496e307109,eff016f1-8bcd-4bc8-b1bb-f71da5296856,42d34b4a-d028-4d61-b2fe-aef3927035ec,e9e955f2-ae74-4904-8c25-70f0364fb780,45c0d2ed-97ef-4a88-8a2f-f5a8076f7ecc,90bdde06-e427-4986-9268-42ba91bc8fcc,bced3fe2-37e7-4823-88f7-dad14fe4367d,764bbf13-e5bf-4d32-8a15-21a92610b5fb,388d786b-66fc-4f52-af24-c620586d2eb5,1f85d489-c51e-4a0c-9e2c-d1f58be13028,2b6fa23f-db48-4cb3-8fb3-64ac73c4540e,c641bd55-13f5-40da-8c0f-3546fab8f69e,1d80f5d6-3978-4162-887c-363eca556814,f007e7a2-4e52-418e-871a-ab073b71c885,296cbaaa-972f-4a09-bb6a-57a37fc935c5,26c36b5e-0f82-4d0c-a0eb-78c9f3e4f686,3b026236-02d0-48d8-b2ef-bc1ebcd09133,de113e65-3bbf-47aa-a8a6-fd89cda20385,3cb69b09-bff0-4846-b64b-0a4e7f22c5a1,c21ff568-83ae-49b9-b4b4-57b35e8c3fda)! 



## DISCUSSION

What stands out with these results is that we cannot exactly reproduce the 75x difference between Python and C. Our data only shows a 60x difference.

These are the best python versions in descending order:

{{< table class="ui table" >}}
| Language                    | Overhead vs. C [Machine Energy]
|:---------------------------:|:---:|:---:|:---:|
| PyPy 3.10    | 21x |
| Python 3.12  | 48x |
| Mojo           |  56x |
| Python 3.6  | 58x |
| Python 3.9  | 61x |
{{</ table >}}

The reason for that is most likely that we use newer and different hardware. However what should be expected is that we at least have a similar offset for the singular tests,
which is also not the case.

In the original paper the differences for the single tests comparing Python 3.6 with C are:

- binary-trees: 45x (CPU Energy) => 25% less
- fankuch-redux: 59x (CPU Energy) => 11% less
- fasta: 38x (CPU Energy) => 11% more

So not only are the values off, also the tendency swaps direction for the *fasta* test.

We have no explanation for that at the moment.

For the *TOTAL* value of all these three tests combined at least there is an uncertainty what the authors here accumulated exactly. 
Specifically if it is just the average of the ratios (60+66+34/3) or if it is the sum of the total energies and then the ratio (which is what the Green Metrics Tool does).

In any case, it would not explain the differences in the singular tests, so we did not investiage here any further.

What we can see though is that Python definitely made an increase in efficiency from Python 3.6 to Python 3.12 (with a suprising bump for Python 3.9 :) )

Coming back to our initial research question we can attest that using Python today is around ~18% more efficient. That being sad you are probably at least around 48x times worse than C
on a plain compute job :)

Moving to a different interpreter like PyPy though makes a strong improvment and overall and is more than 50% more efficient than Python 3.12. 
Which means it is only around 21x worse than C ... in selective cases also down to 7x, which is pretty strong!

Mojo showed no relevant improvements which is mostly due to the fact that it cannot natively enhance Python code at the time of writing.
It will just wrap the Python code and import it as a module and then run it with the native Python interpreter (`libpython`). See our [discussion on their Github](https://github.com/modularml/mojo/discussions/1983)


{{< greenblock >}}
Summary and further considerations
{{< /greenblock >}}

In this case study we have looked at Python and how it compares to C in a nostalgic look back on the original test setup from [Greenlab](https://greenlab.di.uminho.pt) and their paper [Energy Efficiency across Programming Languages](https://greenlab.di.uminho.pt/wp-content/uploads/2017/10/sleFinal.pdf).

We have seen that Python has improved quite a bit (~18%) and different interpreters can remedy the slowness problem of the language quite a bit (PyPy).

Some numbers were hard to compare and their actual offset stays unknown. However it should not reduce the validity of the findings in this case study.

The general setup and absolute claims about wether or not Python is really 48x worse or 75x worse is also heavily debated on Reddit where the selection of the author to just use 
the *fastest* benchmark they could find in the repostiory of the [The Computer Language Benchmark Game](https://en.wikipedia.org/wiki/The_Computer_Language_Benchmarks_Game) is criticized. People argue that usign a *similar* implementation should be more representative.

What exactly means we will leave up to you curious researchers and we encourage you to ping us if this article sparked your interest, you would like to ask questions, spotted a flaw or even want to reproduce our measurements. It could be a nice opportunity to give our free open source [Green Metrics Tool](https://github.com/green-coding-solutions/green-metrics-tool) a test drive ;)  

Contact us on this article at [info@green-coding.io](mailto:info@green-coding.io)

## Sources

[1] [Microsoft research on energy consumption of UI apps](https://devblogs.microsoft.com/sustainable-software/language-impact-on-ui-apps/)
