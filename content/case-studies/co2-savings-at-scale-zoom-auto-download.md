---
title: "CO2 savings at scale - The Zoom Auto-Download case"
draft: false
date: 2024-02-10
author: "Arne Tarara"
authorlink: "https://www.linkedin.com/in/arne-tarara"
socialmedia_preview: "img/social-media-previews/zoom-auto-download-case-study.webp"

---

A typical feedback that many people say when it comes to Green Coding is:
- Savings are so small. They do not really matter. IT is already efficient
- Techniques and changes are so hard to implement. We do not have the time to do it.

Although both statements are based on daily software realities it does also very often not apply.

First we see many clients running forgotten, duplicate, over-subscribed or just outdated and ineffcient
applications where savings can easily be in the range of hundrets of kilos of carbon.

Secondly techniques are not always costly if you focus on low-hanging fruits or apply them with proven
time saving DevOps techniques and only forward looking.

In this case study we want to highlight a case where we look at a mini-feature of an international renowned app, Zoom, and how a 10 seconds change can save hundrets of tons of CO2.

Latetly I was again in a Zoom meeting and as I always do I just joined in the browser. I click on the link in my calendar and are brought to a Zoom page like this: https://us06web.zoom.us/j/XXXXXXXX

The meeting link is obviously invalid for purposes of demonstration, but just try it with a link you have recently used yourself.

When I visit the site Zoom auto-downloads the Zoom client "for me". Also it directly shows me afterwards two options:
- Join from your browser
- Download Zoom

{{< image "/img/case-studies/zoom-download-image.webp" "yes" >}}


Like always I click on *Join from Your Browser*

I do not know how many times I have already downloaded this god-forsaken Zoom client. But today I felt the urge to know: How much carbon does this way of implementing an unnecessary download actually cost?



{{< greenblock >}}
What do we want to find out?
{{< /greenblock >}}

{{< research_question >}}
    How much carbon could be saved if Zoom would implement the download only on click?
{{< /research_question >}}

{{< whiteblock >}}
Assumptions and back-of-the-envelope calculation
{{< /whiteblock >}}

You might have noticed: We are not Zoom. So we do not have all the detailed internal numbers.

However statistics about Zoom are not too hard to find.

According to [Searchlogistics](https://www.searchlogistics.com/learn/statistics/zoom-user-statistics/) Zoom had 300 Mio. daily active meeting participants. This value is from 2021 though.

Although the [stock has dropped](https://finance.yahoo.com/quote/ZM/) quite a bit since the peak in 2021 fiscal reports show [no sign of shrinkage in the revenue](https://www.statista.com/statistics/1252725/zoom-revenue-worldwide/). Only reduced growth rates.

So it is fair to assume that the number of users is probalby still usable.

Now we need the cost of the download. This is easy to get. Just open the explorer: 41.1 MB (macOS)

To construct a calculation regarding CO2 we need numbers on the cost of data transmission and grid intensities. You find everything on our [CO2 Formulas](/co2-formulas) page.

- Grid Intensity: 0.436 kgCO2/kwH
- Data Transfer Cost: 0.0028125 kWh/GB
- Download size: 41.1 MB (0.00411 GB)
- Daily Users: 300 Mio.

Now we need some final technical assumptions: How often will this download actually be triggred?

First of all we have to exclude people that have Zoom installed as app. This will capture the browser links and handle them. Also we have to exclude mobile users, as they will not trigger this behaviour.

According to [Statcounter](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet) the Desktop rate is at 39.75%. I think it is fair to say that not everybody will make a Zoom meeting on mobile. But to be conservative we will assume that only 50% of all Zoom users actually use a desktop device for conferencing.

When I refresh the page the download does not trigger again. But when I close *my* browser it happens again. Zoom stores a token in the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) of the browser.

My browser is configured to clear this on every page close. This is surely not the norm though!

According to [Stackoverflow](https://stackoverflow.com/questions/8537112/when-is-localstorage-cleared) *localStorage* is cleared on different occasions:
- Every time the cookies are cleared
- When the browser is completely closed
- On Update
- ... Some miscellaneous cases

So how often do people update the browser? And how often do people clear cookies?

Most modern browsers have an update interval of 14-30 days. And according to [Clickz](https://www.clickz.com/study-consumers-delete-cookies-at-surprising-rate/84350/) and [GWI](https://blog.gwi.com/chart-of-the-day/1-in-3-are-regularly-deleting-cookies/) around 30 people delete cookies regularly (at least once a month if not weekly or daily).

So now we have all the moving parts together and can craft a calculation.

We will assume that from our 150 Mio. people (remember: 50% Desktop) around 50% will have the Zoom app installed. So we have 75 Mio. people per day.
From these 75 Mio. people only 30% regularly clear their cookies.

Just to be safe and account for recurring people and people that have more than one Zoom meeting per day and stuff that we might have missed we will divide this number by 100.

So our total actual people that will trigger this download are 0.75 Mio.

The final calculation will then be: 0.75 Mio * 0.0411 * 0.0028125 * 0.436 = **37.79 kg per Day**

When we bring this number up to a year we are talking **13.7 tons of CO2** every year. 




{{< greenblock >}}
Summary and further considerations
{{< /greenblock >}}

Of course we have made many assumptions, but contrary to the spirit of the GHG protocol and ISO 14001 norms we tried to be very conservative and rather estimate to low than too high.

I hope the final step of dividing everything by two orders of magnitude (/100) will bring us deep into the realm of under-estimating.

But then still **13.7 tons of CO2** ... For an absolutely unnecessary functionality.

Is a user nowadays really not being to click on a visible link above the fold if the download is necessary?

That is ~ 14 times the flight from Berlin to New York. For ZERO functionality.

And the change would be done in less than 15 seconds and would have no implications on UX or UI that need expensive testing.


We hope you liked this untypical loose style of our case-study and it gave you an idea how easy some savings can be attained and also how back-of-the-envelope techniques can be employed to get an idea what the order of magnitude of the carbon defect is.

The actual value might be two orders of magnitude higher, or, if we missed something major, even an order of magnitude lower. But even 1.3 tons of CO2 should be more than enough motivivation to put 5 seconds of work into it.

Happy for your feedback! What did we miss? What would you like to add? Contact us at [info@green-coding.io](mailto:info@green-coding.io)
