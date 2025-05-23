---
title: "Why measuring AI matters"
date: 2025-05-23
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/ai_measure.webp"
---

## Why measuring AI matters

<table><tr><td>

**TL;DR**

<ul>
  <li>Avoid high energy costs and emissions by comparing models before rolling them out at scale.</li>
  <li>Learn how to benchmark AI models for energy use using simple tools like Ollama and the Green Metrics Tool.</li>
  <li>Follow a real-world case study where smarter model selection led to resource savings.</li>
  <li>Get a ready-to-use setup for measuring inference performance on your own GPU or with our hosted cluster.</li>
</ul>

</td></tr></table>



The environmental cost of AI is all over the news, which has caused some concern especially as companies rushing to deploy LLM-powered features often overlook the energy impact of inference. In this regard, measuring AI models provides a great opportunity to steer a company’s internal rollout of new AI features toward a lower cost while ensuring better performance.

## How we helped a client cut costs by choosing the right model

For instance, with one of our clients, we sought to compare the efficiency and effectiveness of three different models to ascertain which model was not only more accurate but also consumed fewer resources.  We did this by collecting the 50 most typical queries used in the organisation and had these three different models process these tasks. We wrote a paper for the [HotCarbon 24](https://hotcarbon.org/2024) [workshop](https://hotcarbon.org/assets/2024/pdf/hotcarbon24-final109.pdf) in which we measured various models and created a system that saves considerable amounts of resources in the inference stage.

How did we do this? In this post, we will give you a simplified version of that case study and walk you through the key steps and show how straightforward it can be to start benchmarking AI models for energy consumption. This is a great example of how innovating sustainably can help you save on AI interaction time while potentially reducing costs. 

## Tools you will need to start benchmarking

* First, the **Green Metrics Tool** is a great tool to do this. All the code can be found in our our examples GitHub repo [here](https://github.com/green-coding-solutions/example-applications/tree/main/ai-model)
* Second, **[ollama](https://ollama.com/)** which is a great wrapper around loads of different [models](https://ollama.com/search). It allows you to use a simple program to query a model without having to go through the tedious setup if you want to use a model from [huggingface](https://huggingface.co/). What is even better is that there is also an ollama [docker container](https://hub.docker.com/r/ollama/ollama) that does even more of the heavy lifting for you.
* Third, we would recommend that you use a **gpu** to do most of the inferencing for more realistic data. You can setup your system using this documentation [here](https://hub.docker.com/r/ollama/ollama)
* Fourth, you need to create a **`usage_scenario.yml`** file that puts all the moving parts together.

## Example

For this example I wanted to see how much resources gemma3-1b uses. Of course you can benchmark as many models as you want with this approach. So your [`usage_scenario.yml`](https://docs.green-coding.io/docs/measuring/usage-scenario/) might look something like this.

```
---
name: AI model
author: Arne Tarara <arne@green-coding.io>
description: Run an inference with a small AI model on the GPU

compose-file: !include compose.yml

services:
  gcb-ai-model:
    docker-run-args:
      - --gpus=all

flow:
  - name: Download gemma3-1b
    container: gcb-ai-model
    commands:
      - type: console
        command: ollama pull gemma3:1b
        read-notes-stdout: true
        log-stdout: true

  - name: Load gemma3-1b into memory
    container: gcb-ai-model
    commands:
      - type: console
        command: ollama run gemma3:1b ""
        read-notes-stdout: true
        log-stdout: true

  - name: Run Inference on gemma3-1b
    container: gcb-ai-model
    commands:
      - type: console
        command: ollama run gemma3:1b "Tell me a long joke?"
        read-notes-stdout: true
        log-stdout: true
```

Some things to note:

* You will need to supply the `--gpus=all` as a docker run arg so the docker container can access the GPU.
* We first do a simple warmup prompt. This is because the model needs to be loaded into memory on the first run. So we warm up all the caches before firing away.
* In this example we only used one prompt to test the models. For a good comparison, they obviously need to be the same for each model. Also adding more prompts makes sense.
* We don't check for correct answers in this case. This is quite hard to do and would be too much for this blog article. Also this is not really the case we are trying to make. There are loads of benchmarks for correctness out there.

And that is pretty much it. Those are the components you will need to benchmark a model or create something so that you can compare `n` models. The results can then be seen in the Green Metrics Tool frontend.

https://metrics.green-coding.io/stats.html?id=99e1c669-0d29-4d9f-a7e8-22e637dde402

{{< image "/img/blog/ai_bench.webp" "massive" "centered" "fluid">}}

## Cluster

You can also use our AI Benchmark machine in our cluster which has a GTX 1080 8 GB installed with all the detailed metric providers so you get exact results. You can find the documentation [here](https://docs.green-coding.io/docs/measuring/measurement-cluster/)

## Next steps

AI rollouts should always be accompanied by sustainability measurements to understand the ecological but also cost impact of the project. While small AI endeavours might not have a significant negative impact, they can quickly scale and lead to significant costs and emissions. Building in sustainable measurements early during the design and model selection phase helps you make more sustainable and responsible choices.

Contact us to learn more how to steer your AI implementation sustainably [info@green-coding.io](mailto:info@green-coding.io)
