---
title: "Measuring AI with the GMT"
date: 2025-01-24
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/ai_measure.webp"
---


The environmental cost of AI is all over the news and people are quite worried. Measuring AI models provides a great opportunity to steer a company’s internal rollout of new AI features in a more sustainable way. With one of our clients, for instance, we collected the 50 most typical queries used in the organization and had three different models process these tasks. We then compared both their effectiveness and their efficiency to uncover which one was not only more accurate but also consumed fewer resources. We also wrote a paper for the [HotCarbon 24](https://hotcarbon.org/2024) [🖹](https://hotcarbon.org/assets/2024/pdf/hotcarbon24-final109.pdf) workshop in which we measured loads of models and managed to create a system that saves considerable amounts of resources in the inference stage In this post, we present a simplified version of that case study, highlighting how innovating sustainably can save on AI interaction time and potentially reduce costs. Below, we’ll walk through the key steps and show how straightforward it can be to start benchmarking AI models for energy consumption.

The Green Metrics Tool is a great tool to do this. This is a quick description on how this can be done. All the code can be found in our examples GitHub repo https://github.com/green-coding-solutions/example-applications/tree/main/ai-model

For simplicity we use [ollama](https://ollama.com/) which is a great wrapper around loads of different [models](https://ollama.com/search). This enables you to use a simple program to query a model without having to go through the tedious setup if you want to use a model from [huggingface](https://huggingface.co/). The great news is there is also an ollama [docker container](https://hub.docker.com/r/ollama/ollama) which does even more of the heavy lifting for you. So now benchmarking a/ or multiple models becomes really easy.

If you want data that is somewhat realistic I would recommend that you use a gpu to do most of the calculations. You can find the documentation on how to setup your system [here](https://hub.docker.com/r/ollama/ollama).

Now the last thing we need to do is create a `usage_scenario.yml` file that puts all the moving parts together.

## Example

For this example I wanted to see how much resources gemma3-1b uses. Of course you can benchmark as many models as you want with this approach. So your `usage_scenario.yml` might looks something like this

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

- You will need to supply the `--gpus=all` as a docker run arg so the docker container can access the GPU.
- We first do a simple warmup prompt. This is because the model needs to be loaded into memory on the first run. So we warm up all the caches before firing away.
- In this example we only used one prompt to test the models. For a good comparison they obviously need to be the same for each model. Also adding more prompts makes sense.
- We don't check for correct answers in this case. This is quite hard to do and would be to much for this blog article. Also this is not really the case we are trying to make. There are loads of benchmarks for correctness out there.

And that is pretty much it. Those are the components you will need to benchmark a model or create something so that you can compare `n` models. The results can then be seen in the Green Metrics Tool frontend.

https://metrics.green-coding.io/stats.html?id=99e1c669-0d29-4d9f-a7e8-22e637dde402

{{< image "/img/blog/ai_bench.webp" "massive" "centered" "fluid">}}

## Cluster

You can also our AI Benchmark machine in our cluster which has a state of the art graphics card installed with all the detailed metric providers so you get exact results. You can find the documentation here: https://docs.green-coding.io/docs/measuring/measurement-cluster/

## Next steps

AI rollouts should always be accompanied by sustainability measurements to understand the ecological but also cost direction of the project. While small AI endeavour might not have significant negative impact it can quickly balloon up and incur significant costs and emissions. Having a sustainability measurement in place already in the design and selection phase provides relevant support.

Contact us to learn more how to steer your AI implementation sustainably [info@green-coding.io](mailto:info@green-coding.io)