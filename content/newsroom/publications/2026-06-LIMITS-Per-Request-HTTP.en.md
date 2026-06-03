---
title: "Measure Once, Model Everywhere: Model-Based Per-Request Resource Consumption for HTTP"
link: ""
date: 2026-06-23
draft: false
type: "publication"
magazine: "LIMITS 2026"
---
Recent proposals for HTTP-based sustainability disclosure focus on what environmental information should be transmitted at the protocol boundary, but leave open how such per-request values can be generated in realistic deployments. We present a model-based approach for estimating resource consumption and CO2e per HTTP request without requiring fine-grained production power telemetry. Endpoints are benchmarked offline under controlled conditions to derive compact energy models that are evaluated online at the HTTP server boundary. We implement this as an nginx extension that loads a JSON model registry and emits per-request metadata for energy, grid intensity, embodied emissions, and total request-level impact, with only low runtime overhead.
