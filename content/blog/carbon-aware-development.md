---
title: "Carbon Aware Development - (SCLA part 2)"
date: 2023-10-10
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
---

While writing the [“Software Life Cycle Assessment done in the wild”](/blog/software-life-cycle-assessment/) article I needed to develop a little server that could do three simple tasks. Because the article became too long I decided to separate the methodology how to develop with environmental impact in mind into a dedicated part. Feel free to head over to the [SLCA](/blog/software-life-cycle-assessment/) article and read the first part to see why we are developing this server.

In this article I want to introduce the new concept of Carbon Aware Development. While there is some prior work on how to measure carbon emissions of software, we at [Green Coding Solutions have loads on the topic](https://www.green-coding.io/blog/), there is no usable and tool based framework, I am aware of, that encourages developers to think about their choices in regards to carbon from the beginning (However there are theoretical ones like for instance [the GREENSOFT model](https://www.umwelt-campus.de/fileadmin/Umwelt-Campus/Greensoft/The_GREENSOFT_Model_A_reference_model_fo.pdf)). The main focus, in this article, is on the **development** phase of the Software Life Cycle Assessment with solutions for the usage phase discussed in the other article. Developing software is an iterative process. Often decisions we take very early on have major consequences later on. The most obvious being the programming language and the underlying architecture everything is based on. While many factors are taken into account early on, carbon is nearly never one.

> **Carbon Aware Development** is a methodology in which resource usage is seen as a first class metric in evaluating software and implementation decisions. It acknowledges that software is always in ongoing development.
>

## Defining usage

First we need to define what functionality the software should actually fulfill. While in test [driven development](https://en.wikipedia.org/wiki/Test-driven_development) we specify the unit tests first to check if the code we write actually does what we expect it to in Carbon Aware Development we specify the usage of the software first to see how the implementation behaves in certain scenarios. While you can mix your tests with your usage scenario it makes more sense to keep them separate as they differ fundamentally in what they are supposed to achieve.

The server we are developing should do three simple things:

- Accept json strings and save them into a database
- Return the last timestamp when given a user_id so we can only transmit the values that haven’t been saved.
- Render a little badge for the project how much energy it has incurred to date

Like pretty much with any project we start by creating a docker file and specifying what components we need initially. Details can be found in the GitHub repo:

[https://github.com/green-coding-services/SLCA-Code](https://github.com/green-coding-services/SLCA-Code)

For this example we use a simple setup with a [FastAPI](https://fastapi.tiangolo.com/) and a database in the background. Because I am used to [PostgreSQL](https://www.postgresql.org/) my initial setup includes this but the way we are setting this up we can easily benchmark different backends in the future.

The first step is to write a benchmarking script for our backend which should cover as much functionality as possible. The basic idea is to have a script you can run to see how the resource usage has changed over time. Like this you can check what impact your modifications have. The usage benchmark script should reflect the usage of the software as closely as possible. Because of how software can be measured it is not sensible to have very short benchmarks. We solve this by repeating a certain call multiple times and then divide the resource usage to get a good approximation. You can see this in the benchmarking code

```python
def get_data(url):
    for _ in range(QUERY_COUNT):
        response = requests.get(url)
        response.raise_for_status()
```

When writing the benchmarking script it is sensible to not go to crazy with the input creation as this also consumes energy and while we can split it in the end it might make the result not as accurate.

Here is the complete benchmarking script:

```python
import argparse
import requests
import json
QUERY_COUNT = 1000
BASE_URL = 'http://app:8000'

def get_data(url):
    for _ in range(QUERY_COUNT):
        response = requests.get(url)
        response.raise_for_status()

def post_data(url):

    data = json.dumps({
                    'time': 1683894535949,
                    'node': 1231231234,
                    'combined_power': 2343,
                    'cpu_energy': 45,
                    'gpu_energy': 234,
                    'ane_energy': 3456,
                    'time_delta': 1000,
                    'screen_energy': 70,
                    'project': 'Some String',
                    'type': 'development.user.pc',
                })
    headers = {'Content-Type': 'application/json'}
    for _ in range(QUERY_COUNT):
        response = requests.post(url, headers=headers, data=data)
        response.raise_for_status()

def save():
    post_data(f"{BASE_URL}/save")

def last_time():
    get_data(f"{BASE_URL}/last_time/1231231234")

def badge():
    get_data(f"{BASE_URL}/badge/Some%20String")

if __name__ == "__main__":
    commands = {'save': save, 'last_time': last_time, 'badge': badge}

    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=commands.keys())
    args = parser.parse_args()
    commands[args.command]()
```

And then we can use create a `usage_scenario` file that exposes the various components

```yaml
name: Carbon Aware Development example
author: Didi Hoffmann <didi@green-coding.io>
version: 1
description: An example how to develop a program while thinking of your environmental impact

compose-file: !include docker-compose.yml
...
flow:
  - name: CAD Bechmark
    container: gcb-python
    commands:
      - type: console
        command: python3 bench.py save
        note: Save Flow
      - type: console
        command: sleep 30
        note: Idling
      - type: console
        command: python3 bench.py last_time
        note: Last Time Flow
      - type: console
        command: sleep 30
        note: Idling
      - type: console
        command: python3 bench.py badge
        note: Badge Flow
```

The full code can be found on GitHub.

The code does not check for valid results as the motivation is to emulate the usage of the software. In this case all inputs are fixed length. It could be that the app behaves differently according to the data size or complexity given to it. In this case it makes sense to benchmark various scenarios and then do [curve fitting](https://en.wikipedia.org/wiki/Curve_fitting) to generate a general rule based on the inputs.

Now we can use the [Green Metrics Tool](https://www.green-coding.io/projects/green-metrics-tool/) to measure each part of our application while developing and see what is using how much resources in our benchmark case.

## Usage

Developing software is dynamic process and continuous refactoring is an essential part of writing good code. While writing there are constant decisions that need to be made: what library to use, what database, how to structure endpoints. In all these decisions we should be able to see the impact. Now that we have a proper benchmarking setup we can run it after every major change or play with different implementations to see which ones give you the best tradeoff between the various aspects. But now you can put resource usage as a first class citizen.

When developing I like to use the [PostgreSQL](https://www.postgresql.org/) [JSON](https://www.postgresql.org/docs/9.5/functions-json.html) store as the schema changes quite often and I don’t want to refactor the table all the time. I normally refactor this later on as I assume that column based operations are faster and more energy efficient. Now I can check this with real values using the GMT compare functionality.

{{< rawhtml >}}
<img class="ui big  centered rounded bordered image" src="/img/blog/slca/cad.avif" alt="Energy over time" loading="lazy">
{{< /rawhtml >}}

You can clearly see that the column based implementation takes 1863.52 Joule and the Json store implementation uses 1999.59 Joule. Which is about 7.30% “worse”. Looking at that this is based on 1000 operations and a server normally handles millions of requests this is quite an increase in efficiency.

- [Json store benchmark](https://metrics.green-coding.io/stats.html?id=67715c39-4134-4685-ae42-59262fe076a7)
- [Column store benchmark](https://metrics.green-coding.io/stats.html?id=71353c66-6432-4bf2-b459-5b5d4ed33ed3)
- [Comparison](https://metrics.green-coding.io/compare.html?ids=71353c66-6432-4bf2-b459-5b5d4ed33ed3,67715c39-4134-4685-ae42-59262fe076a7)

By using the [Eco-CI](https://www.green-coding.io/projects/eco-ci/) you can also add this type of analytics to your normal workflow.

Of course every software will behave differently depending on the system that it is run on. Some will even argue that it is not possible to get exact repeatable readings but that is not the main point here.

## Conclusion

We have shown that through thinking about resource usage early on it is possible to make more informed decisions when writing code. A core belief of carbon aware development is that software develops over time and is constantly changed. There are a multitude of factors people try to optimize but to date carbon emission couldn’t objectively be taken into account. By using tooling like the Green Metrics Tool and benchmarks this is now possible.

The series now continues with the [“Software Life Cycle Assessment done in the wild”](/blog/software-life-cycle-assessment/) article.
