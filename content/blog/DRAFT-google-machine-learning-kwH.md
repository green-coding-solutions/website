---
title: "Machine learning google preview - first look"
date: 2022-08-13
draft: true
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

Please extract amount of GPU / TPU / CPUs
 -> 6144 TPU v4 [1]

Get the power rating for these components
 -> 90/170/192W min/mean/max power [2a]
 -> Google’s TPU v4 Pods consist of 4,096 TPU v4 chips, each of which delivers 275 teraflops of ML-targeted bfloat16 (“brain floating point”) performance. In aggregate, this means that each TPU pod packs around 1.13 bfloat16 exaflops of AI power – and that the pods in the Mayes County datacenter total some 9 exaflops. [2]
 
 And get the calculation time for the AI model
  ->  ~55 hours for the 480B parameter model and ~40 hours for the 200B [3]
  -> (but this isn't the PaLM - PaLM did 540B in total)
  -> Our own calculation: (6144 * ~55 * 170) / 1000  = 57446.4 kwH
  = 24,851 Kilograms of Carbon Dioxide (CO2) equivalent [5]
 
Sources:
[1] https://www.infoq.com/news/2022/04/google-palm-ai/
[2] https://www.hpcwire.com/2022/05/16/google-clouds-new-tpu-v4-ml-hub-packs-9-exaflops-of-ai/
[2a] https://6lli539m39y3hpkelqsm3c2fg-wpengine.netdna-ssl.com/wp-content/uploads/2022/05/Cloud_TPU_v4_specs_700x.png
[3] https://cloud.google.com/blog/topics/tpus/google-showcases-cloud-tpu-v4-pods-for-large-model-training
[4] https://storage.googleapis.com/pathways-language-model/PaLM-paper.pdf
[5] https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results