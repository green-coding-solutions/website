---
title: "Linting"
date: 2023-04-24
author: "Danilo Jesic"
authorlink: "https://www.linkedin.com/in/djesic/"
---

Static code analysis, or linting, is a commonly used practice in software development
and a part of the development lifecycle.  
Usually ran locally on the development machine, sometimes as part of the CI/CD pipeline,
but *always* with an energy cost.

We wanted to highlight the energy usage of two code linting tools in the Python ecosystem.

To facilitate this, we made a Docker image based on Python and added `git` to `git clone` the latest
development version of the [`green-metrics-tool`](https://github.com/green-coding-berlin/green-metrics-tool/tree/dev) and create a Python virtual environment in which
it sets up an installation of [Pylint](https://pylint.readthedocs.io/en/v2.17.2/) and [Ruff](https://beta.ruff.rs/docs/).

Pylint is a well established and renowned linting tool that is highly configurable and extensible.  
Ruff is a up-and-coming linter that is implemented in Rust and is experiencing a surge in functionality and users.

While both of these tools implement different rules for linting, there is a considerable overlap.  
The intent of this example is to show the results of two tools running on the same code with the same settings.

The default configuration was generated for both tools, and then modified to only use the union of rules
available in both tools.  
Our code base has around 5000 lines of Python code, not including git submodules that were excluded in the linting configuration.
This configuration might not be one that would be found in production somewhere, but is useful
for our example to highlight the difference in the tool's energy usage.  
See [`rules.md`](https://github.com/green-coding-berlin/example-applications/blob/main/linting/rules.md) for details.  

We measured 10 runs with each linter and then compared the results.  

[Pylint linting - 10 runs](https://metrics.green-coding.berlin/compare.html?ids=62536feb-ab90-494e-bf36-f7bc35cfd04c,2b2817cf-bbcc-4e6a-9a2c-92fe572b4af0,921b6190-d1d6-4b32-ade4-1b1730786399,fde2b170-e4a6-4111-942e-a7a73eb63c7c,7e6f47e9-57bc-40a6-9ec2-f06acbbd7567,dec6c1d2-77f7-4994-8c13-65bb2865a126,49618675-0612-4223-b97f-9132e52668ae,907a31bd-169b-4a0b-9ded-78d6df360612,6de6dac9-e2e5-444d-bb89-e14ad0f4bcdf,9db12e30-176a-46ed-ab5c-f95ca76a0b7a)
{{< rawhtml >}}
<img class="ui xlarge centered rounded bordered image" src="/img/blog/pylint-10-runs.webp" alt="Pylint linting - 10 runs" loading="lazy">
{{< /rawhtml >}}

[Ruff linting - 10 runs](https://metrics.green-coding.berlin/compare.html?ids=4a717cff-18bc-4a91-b9e0-900fcbe47a3b,ff9aa98a-c831-4cea-b792-4a32dd274423,80223820-a0e2-4038-acb6-115e2c1e4099,dd5a39e0-9625-479d-93e6-99b52fa8a81b,0e113f14-433d-4347-9b56-a92904cfbf8f,d8829214-12ab-4eb0-8775-26303af7d140,52c86b56-8e4d-4dc5-84f5-e6bfdba5a291,e60a642d-3d40-42ee-ae49-e54310439852,4c483472-6f6f-41d9-9afe-b9ba3e220f52,0c9a004a-68ca-42b0-a516-23c1e0828aaa)
{{< rawhtml >}}
<img class="ui xlarge centered rounded bordered image" src="/img/blog/ruff-10-runs.webp" alt="Ruff linting - 10 runs" loading="lazy">
{{< /rawhtml >}}

[Comparing Pylint vs Ruff](https://metrics.green-coding.berlin/compare.html?ids=4a717cff-18bc-4a91-b9e0-900fcbe47a3b,62536feb-ab90-494e-bf36-f7bc35cfd04c)
{{< rawhtml >}}
<img class="ui xlarge centered rounded bordered image" src="/img/blog/compare-linters.webp" alt="Comparing linters" loading="lazy">
{{< /rawhtml >}}
{{< rawhtml >}}
<img class="ui xlarge centered rounded bordered image" src="/img/blog/compare-linters-details.webp" alt="Comparing linters - details" loading="lazy">
{{< /rawhtml >}}

## Conclusion

Ruff used a lot less memory and CPU resources, half as much machine energy, and it completes the linting half a second quicker!

These results show it's worth considering a migration to Ruff in the near future!
