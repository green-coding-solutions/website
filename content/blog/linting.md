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
development version of the `green-metrics-tool` and create a Python virtual environment in which
it sets up an installation of [Pylint](https://pylint.readthedocs.io/en/v2.17.2/) and [Ruff](https://beta.ruff.rs/docs/).

Pylint is a well established and renowned linting tool that is highly configurable and extensible.  
Ruff is a up-and-coming linter that is implemented in Rust and is experiencing a surge in functionality and users.

While both of these tools implement different rules for linting, there is a considerable overlap.  
The intent of this example is to show the results of two tools running on the same code with the same settings.

The default configuration was generated for both tools, and then modified to only use the union of rules
available in both tools.  
This configuration might not be one that would be found in production somewhere, but is useful
for our example to highlight the difference in the tool's energy usage.  
See `rules.md`(TODO: after merge) for details.

- run with blue-angel-compare [x]
- screenshots of graphs [ ]
- some conclusion from the data [ ]
