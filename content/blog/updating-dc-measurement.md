---
title: "Updating the DC measurements"
date: 2022-08-13
draft: false
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
---

In my last blog post I have written about how we finally completed the DC measurement
reporter for our [Green Metrics Tool](https://github.com/green-coding-berlin/green-metrics-tool).

In the last days we have looked at reducing the variance of the ATX powerlanes 
and finding out if swapping out the resistors for more stable current measurement
resistors can improve the measurement.

Here are the results!

## Used hardware

- We are now using [**Isabellenhütte PBV 0,005 Ohm**](https://www.conrad.de/de/p/isabellenhuette-pbv-0-005-messwiderstand-0-005-10-w-l-x-b-x-h-22-x-4-x-17-mm-1-st-447366.html?searchType=SearchRedirect) current measurement resistors
- We have swapped out all the wiring and replaced it with new wiring that has matching resistances for every connection.
    + The lines connecting the two inner terminals of the current resistors are with **0.9 Ohm wires**
    + The lines connectiong the two outer terminals are connected with **1.7 Ohm wires**. 
    + Accuracy on the measurement is **+/- 0.1 Ohms**
    
## Adding the remaining lines on the ATX connector

In the PoC of our last blog post we have concentrated on the six 12 V power lines of the ATX connector.
The connector however features 4 more slots, where one slot however is not connected with the 
PSU.

{{< rawhtml >}}
<img class="ui medium floated right rounded bordered image" src="/img/blog/fujitsu_esprimo_p956_ATX_pinout.webp" alt="fujitsu esprimo p956 ATX pinout" loading="lazy">
{{< /rawhtml >}}

For overview, here is a diagram of the pin assignment (credits to [Wan Hung Lo Electronics](https://www.wanhunglo.com/2020/fujitsu-esprimo-e920-d3222-a12-12v-11vsb-to-atx-conversion-p28))

As visible in the image the remaining 3 lanes are:
- **PS_ON**: This is pulled to high / low to activate the PSU from the mainboard
- **PWR_OK**: This can tell the PSU if the voltage level is ok
- **11Vsb**: This is the Standby Power for stuff like WakeOnLan etc. and needed power to trigger PS_ON

So for our case, since our PicoLog HDR ADC-24 has only 8 differential inputs we have to
drop one of these lines.

We measured the **PS_ON pin** and got a minimal reading of **~ 20 mV** out of it. This pin is only
really needed to be connected on boot and seems to be irrelevant for the measurments.
As well in functionality as also in the power that it consumes. 

So we included the **11Vsb** and the **PWR_OK** in our measurements.
However when looking at the screenshots of the readouts you see that they do not really contribute
to the total power. This was expected for PWR_OK (apart from an error case maybe),
but may not be the case for the 11Vsb. Depending on what device you have attached and how
the mainboard wiring is done there could be a power draw on this line.

## Analysing the 12 V rails

{{< rawhtml >}}
<img class="ui big floated right rounded bordered image" src="/img/blog/picolog_hdr_adc_24_fujitsu_esprimo_P956.webp" alt="picolog hdr adc 24 fujitsu esprimo P956" loading="lazy">
{{< /rawhtml >}}

As suggested in our previous post the 12 V lines are internally not all wired to the same 
channel, but are split in two rails.

This is also seen in modern sytems, where the [P4 connector](https://en.wikipedia.org/wiki/ATX) can provide a second
12 V rail for energy hungry CPUs.

Why Fujitsu made the decision to split every 12 V rail in three cables we might never know though :).

By making a short stress test with `stress -c 10` and `stress -m 10` we see that the one rail gets
more loaded on a CPU intensive load and the other rail more on a memory intensive load.

They are so distinguishable that by just looking at rail #1 one can tell if the DRAM is accessed. However 
the direction the other way round does not hold. Rail #2 is also loaded, cause obvioulsy the CPU has to feed the DRAM.

Nevertheless this insight might pose an interesting starting point for an algorithmic or ML detection of what kind of load is happening.

## Summary of new setup

The total energy consumed with the new setup is much closer to the values we get when summing up the RAPL components, which is most likely related to stronger variance in the old resisistors.

Compare the readings on: 
- [Old Resitors Measurement](https://metrics.green-coding.org/stats.html?id=f99e563d-2c5c-453d-99fe-5ac9f6f307ac)
- [New Resitors Measurement](https://metrics.green-coding.org/stats.html?id=5eb70bc1-0d17-416a-839b-60e800a62cda)

The next step is to falsify with the AC reading from the Blauer Engel Team we will be doing over the next weeks.
After that we will integrate the harddisk into the measurement to close the gap of uncertainty further.

If you want to falsify our DC measurements or get to know how to make them work in your setup please shoot me an email to arne@green-coding.org !

