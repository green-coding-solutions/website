---
title: "Google cloud energy use"
---

## Question
Let's say we write a cronjob that calls the google cloud function every 20 minutes.
The function has a typical runtime of 2 seconds, which resembles a very large web request.

How much energy will be used after one day?

How long does the function idle after it has been used?

This is to be assumed a bad scenario for serverless, as we have no repeated requests to leverage caching,
but also no really long downtime of the function.