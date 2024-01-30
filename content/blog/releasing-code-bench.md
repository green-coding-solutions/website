---
title: "Benchmarking code optimisation"
date: 2023-12-04
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
---

Standard benchmarks play a pivotal role in the field of software engineering, serving as a foundational element for ensuring quality and efficiency. The Transaction Processing Performance Council (TPC) benchmarks, in particular, have established a high standard across the database sector. These benchmarks are designed to simulate real-world database usage, offering a platform for comparing various database products in a manner that is fair, fundamental, and reproducible.

However, it is important to acknowledge that not all code is created equal. In reality, a significant portion of software is far from being optimally written. There are numerous reasons for this. Often, developers are constrained by tight deadlines, lack of interest or passion for the project, or simply the pressure to make things work within a limited timeframe. As a result, a lot of the software available today is not finely tuned or optimized. To mitigate this issue, considerable efforts have been made to enhance compilers and the internal mechanics of CPUs, aiming to compensate for less-than-optimal coding practices.

At Green Coding Solutions we have developed a great measurement infrastructure that enables us to measure software reproducible and really see how changes reflect on the impact software has. Now that we can measure code we want to start applying green coding techniques and see how these affect the resource usage. Also a lot of work is currently going on in this space [[0]](https://www.enviroinfo2023.eu/programme/schedule-overview/friday-schedule/)[[1]](https://www.meetup.com/green-software-development-karlsruhe/events/296796570/) but one big problem is that there is no real benchmark of code that can be optimised and that can be measured before and after the changes are applied. I strongly believe that this is a big problem as currently everyone selects their own little piece of code and such there is a) no way to compare results and b) wrong results or conclusions might happen as there is no sound fundament.

So we set out to create a repository with such code. The main aims are:

- The code is non optimal and can be “improved”
- The code is well tested
- Functions run long enough to be measured
- The code run is constant in energy consumption

The aim is also to support a wide breath of problems and languages with not only including trivial problems.

Currently we only include a very limited set of python functions that can be optimised but the idea is to collect loads of examples and actually implement a lot of things that are considered code smells[[2]](https://patterns.greensoftware.foundation/).

Find the code under:

https://github.com/green-coding-berlin/code-benchmark

We have included a Green Metrics Tool `usage_scenario.yml` file so you can benchmark the code with the GMT. Currently the problems are all CPU bound but we will extend this to also have some memory or IO bound problems that can be optimised.

Feel free to contribute and extend the problem space. PRs welcome!

## Reproducibility

In order to validate that some modification really changed the value the initial benchmark needs to run reportable and should minimize variations between runs. You can find the data [here](https://metrics.green-coding.io/compare.html?ids=a2975404-4450-48d0-a725-2bc339a43677,7eac2a19-409c-4b77-87c7-39c0da81c3c1,84f2e4c0-972c-4567-9dc6-32f99efdee46,216bac2c-0667-44e3-b59c-6b8a0bbceafc,874c183a-cd22-4836-a842-44c94156f54c,f49417a2-e475-4586-aa29-01ff885d4709,a0bd0177-8a19-4430-86d4-57fb8cbf887c,89bf5cb5-9e30-43a3-859e-fe9c489f2fa2,a4c89fff-1660-48b7-8f36-e32f01ecccbf,5ea1a73b-d69e-4eae-a848-ead2a80a570f,ce430702-36a1-4190-b98f-6813fbe171c2,4cfe7e56-20ba-4140-8383-6be863959c9a,238d5d19-ded5-4e3f-9fe2-20c56191a620,a21642e2-0d06-49f6-b212-be2ac09863a8,b001af04-9d53-40ce-b5f7-e461cbefc5f5,ad32abd2-e29c-4da8-8a4a-ec061e4e08eb,6035989e-9dee-4b22-984e-64e5457f005a,e2e4480b-bfd8-4940-a885-c33d2cf37c3c)

{{< rawhtml >}}
<figure >
    <img class="ui huge image" src="/img/blog/benchmark_energy_time.webp" alt="Energy over time" loading="lazy">
    <figcaption>18 runs of the benchmark code on our cluster</figcaption>
</figure>
{{< /rawhtml >}}


[0] [Influence of Static Code Analysis on Energy Consumption of Software](https://www.enviroinfo2023.eu/programme/schedule-overview/friday-schedule/)

[1] https://www.meetup.com/green-software-development-karlsruhe/events/296796570/

[2] https://patterns.greensoftware.foundation/