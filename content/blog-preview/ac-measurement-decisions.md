---
title: "AC Measurement Decisions"
date: 2022-01-13 19:00:00
draft: true
author: "Arne Tarara"
---



Volker Krause did some investigation on  very cheap power plug: https://volkerkrause.eu/2020/10/17/kde-cheap-power-measurement-tools.html

This article sparked our interest as, opposed to the Gude Expert Power Control 1202 Series which had
only 1s resolution, the Gosund powerplug could be instrumented to deliver 200ms resolution.
However, now running the device in an "unofficial" mode it was even more unclear how this already cheap
device conforms to some specification or accuracy.
Therefore we forfeited looking deeper into this device and rather invest the money in a 
professional and hopefully extensively calibrated product, because we don't have the measurement
setup to verify our measurement setup :)

So the two interesting devices for us where:
- MCP39F511N POWER MONITOR DEMONSTRATION BOARD (https://www.microchip.com/en-us/development-tool/ADM00706) ~250 EUR new
- Janitza UMG 604 (https://www.janitza.com/umg-604-pro.html) ~ 1000 EUR new / 250 EUR used

Given the pricepoint the Janitza had a much higher price point, but was available used for the same price.
So we opted for the latter.


### IotaWATT

https://docs.iotawatt.com/en/master/installation.html#voltage-and-frequency

Being an open-source measurement device, this was particularly interesting for us.

However the downside being that it uses current-clamps which the specification was a bit unclear to us.

Since the measure indirectly there will be probably some alteration / smoothing of the signal happening.

Still it would have the enormous benefit, that a pre-configured device could be shipped at low-cost to interested users
and they just have to "clamp" around their PC line.