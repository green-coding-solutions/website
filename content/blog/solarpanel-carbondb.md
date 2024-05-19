---
title: "Carbon Aware Development - (SCLA part 2)"
date: 2023-10-10
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/slca2.webp"
---


```bash
#!/bin/env bash

power=0

for ((i=1; i<=60; i++))
do
    echo "$(date +%s) - Iteration $i"
    curl http://192.168.178.45/rpc/PM1.GetStatus?id=0 --silent | jq -r ".apower" >> /tmp/solarpanel_power.log
    sleep 1
done

#power=$(awk '{s+=$1; count+=1} END {if (count > 0) print s/count; else print 0}' /tmp/solarpanel_power.log)
#echo "AVG Power is $power"

# Since we poll every 1s Watts = Joules
energy=$(awk '{s+=$1} END {print s}' /tmp/solarpanel_power.log)

# timestamp in microseconds
timestamp=$(date +%s%N | cut -b1-16)

json_data=$(cat <<EOF
[
  {
    "type": "generator.solar",
    "company": "20b269ce-cd67-4788-8614-030eaf5a0b47",
    "machine": "e732e9b9-2daa-4177-a5c3-20af79567a66",
    "project": "00000001-BCA5-451B-9E60-3A2FD07FA28D",
    "tags": "GCS HQ Solar Panel",
    "time_stamp": "$timestamp",
    "energy_value": "$energy"
  }
]
EOF
)

curl -X POST https://api.green-coding.io/v1/carbondb/add \
    -H "Content-Type: application/json" \
    -d "$json_data"

# Clear tmp file
echo > /tmp/solarpanel_power
```


```systemd
[Unit]
Description=User Loop 60 Iterations Service

[Service]
ExecStart=%h/query_solarpanel.sh
Restart=always
RestartSec=0
#StandardOutput=file:%h/query_solarpanel.log
#StandardError=file:%h/query_solarpanel.log


[Install]
WantedBy=default.target
```

The full code can be found on GitHub.

The code does not check for valid results as the motivation is to emulate the usage of the software. In this case all inputs are fixed length. It could be that the app behaves differently according to the data size or complexity given to it. In this case it makes sense to benchmark various scenarios and then do [curve fitting](https://en.wikipedia.org/wiki/Curve_fitting) to generate a general rule based on the inputs.

Now we can use the [Green Metrics Tool]({{< relref path="projects/green-metrics-tool" >}}) to measure each part of our application while developing and see what is using how much resources in our benchmark case.

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

By using the [Eco-CI]({{< relref path="projects/eco-ci" >}}) you can also add this type of analytics to your normal workflow.

Of course every software will behave differently depending on the system that it is run on. Some will even argue that it is not possible to get exact repeatable readings but that is not the main point here.

## Conclusion

We have shown that through thinking about resource usage early on it is possible to make more informed decisions when writing code. A core belief of carbon aware development is that software develops over time and is constantly changed. There are a multitude of factors people try to optimize but to date carbon emission couldn’t objectively be taken into account. By using tooling like the Green Metrics Tool and benchmarks this is now possible.

The series now continues with the [“Software Life Cycle Assessment done in the wild”]({{< relref path="blog/software-life-cycle-assessment" >}}) article.
