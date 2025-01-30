---
title: "Measuring AI with the GMT"
date: 2025-01-24
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/ai_measure.webp"
---


The environmental cost of AI is all over the news and people are quite worried. Measuring AI models provides a great opportunity to steer a company’s internal rollout of new AI features in a more sustainable way. With one of our clients, for instance, we collected the 50 most typical queries used in the organization and had three different models process these tasks. We then compared both their effectiveness and their efficiency to uncover which one was not only more accurate but also consumed fewer resources. We also wrote a paper for the [HotCarbon 24](https://hotcarbon.org/2024) workshop in which we measured loads of models and managed to create a system that saves considerable amounts of resources in the inference stage [🖹](https://hotcarbon.org/assets/2024/pdf/hotcarbon24-final109.pdf)In this post, we present a simplified version of that case study, highlighting how innovating sustainably can save on AI interaction time and potentially reduce costs. Below, we’ll walk through the key steps and show how straightforward it can be to start benchmarking AI models for energy consumption.

The Green Metrics Tool is a great tool to do this. This is a quick description on how this can be done. All the code can be found in our examples GitHub repo https://github.com/green-coding-solutions/example-applications/tree/main/ai-bench


For simplicity we use [ollama](https://ollama.com/) which is a great wrapper around loads of different [models](https://ollama.com/search). This enables you to use a simple program to query a model without having to go through the tedious setup if you want to use a model from [huggingface](https://huggingface.co/). The great news is there is also an ollama [docker container](https://hub.docker.com/r/ollama/ollama) which does even more of the heavy lifting for you. So now benchmarking a/ or multiple models becomes really easy.

If you want data that is somewhat realistic I would recommend that you use a gpu to do most of the calculations. You can find the documentation on how to setup your system [here](https://hub.docker.com/r/ollama/ollama).

Now the last thing we need to do is create a `usage_scenario.yml` file that puts all the moving parts together.

## Example

For this example I wanted to compare two fairly similar models `llama3.2:1b` and `tinyllama:1.1b` they are both 1 billion parameters but differ in age and focus. Of course you can benchmark as many models as you want with this approach. So your `usage_scenario.yml` might looks something like this

```
---
name: AI Bechmark
author: Didi Hoffmann <didi@green-coding.io>
description: This is a really  benchmark for multiple AI models

services:
  ollama:
    image: ollama/ollama:latest
    setup-commands: ['ollama pull llama3.2:1b','ollama pull tinyllama:1.1b']

flow:
  - name: Model llama3.21b warmup
    container: ollama
    commands:
      - type: console
        command: ollama run llama3.2:1b "Tell me a joke to warm up please."
  - name: Model llama3.21b prompts
    container: ollama
    commands:
      - type: console
        command: ollama run llama3.2:1b "What is 1 + 1?"
        note: "What is 1 + 1?"
  - name: Model tinyllama1.1b warmup
    container: ollama
    commands:
      - type: console
        command: ollama run tinyllama:1.1b "Tell me a joke to warm up please."
  - name: Model tinyllama1.1b prompts
    container: ollama
    commands:
      - type: console
        command: ollama run tinyllama:1.1b "What is 1 + 1?"
        note: "What is 1 + 1?"
```

Some things to note:

- We pull the models in the setup commands as we don't want the network traffic to interfere with out readings. A model shouldn't be punished for slow network connection
- We first do a simple warmup prompt. This is because the model needs to be loaded into memory on the first run. So we warm up all the caches before firing away.
- In this example we only used one prompt to test the models. For a good comparison they obviously need to be the same for each model. Also adding more prompts makes sense.
- We don't check for correct answers in this case. This is quite hard to do and would be to much for this blog article. Also this is not really the case we are trying to make. There are loads of benchmarks for correctness out there.

And that is pretty much it. Those are the components you will need to benchmark a model or create something so that you can compare `n` models. The results can then be seen in the Green Metrics Tool frontend.

{{< image "/img/blog/ai_bench.webp" "massive" "centered" "fluid">}}

You can easily see that tinylama uses considerable less energy for 10 prompts. You can find the prompts in the repo. These are nothing specific but just some standard things you would ask an LLM to do. Nothing to complex though.

## Making even easier

Because writing these files can be quite tedious and the files becomes quite huge I wrote a little helper script that you can download in the [examples repo](https://github.com/green-coding-solutions/example-applications/tree/main/ai-bench) called `./build_usage.py`. With this script you can add the models as parameters you want to benchmark. The models can be found [here](https://ollama.com/library)

```
./build_usage.py 'llama3.2:1b' 'tinyllama:1.1b'
```

This will also read the `prompts.txt` and then create the `usage_scenario.yml` file which you can then use for the Green Metrics Tool.

The `prompts.txt` is a simple text file with each line being one prompt. This will be repeated for each model to make a fair comparison.

## Cluster

You can also our AI Benchmark machine in our cluster which has a state of the art graphics card installed with all the detailed metric providers so you get exact results.

## Next steps

AI rollouts should always be accompanied by sustainability measurements to understand the ecological but also cost direction of the project. While small AI endeavour might not have significant negative impact it can quickly balloon up and incur significant costs and emissions. Having a sustainability measurement in place already in the design and selection phase provides relevant support.

Contact us to learn more how to steer your AI implementation sustainably [info@green-coding.io](mailto:info@green-coding.io)