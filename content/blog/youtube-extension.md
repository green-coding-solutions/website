---
title: "Youtube Extension"
date: 2022-05-19
draft: false
author: "Alexandre Oliveira"
authorlink: "https://www.linkedin.com/in/alexandre-oliv"
---

{{< rawhtml >}}
<img src="/img/blog/youtube_extension.webp" alt="Greener Youtube extension" loading="lazy" style="display: block;
  margin-left: auto; margin-right: auto; margin-bottom: 15px;">
{{< /rawhtml >}}

How many times do we use Youtube only to listen to songs, or to watch videos without the necessity of going for that fancy 4k/HD resolution? Also: do we really want to automatically watch other (algorithmically-chosen) videos after the current video is finished? In other words, how can we have a carbon-friendly approach while still getting the content we wanted?

During the onboarding process at Green Coding Berlin, I was given the task of creating a simple Chrome extension that would turn off the Autoplay feature of Youtube, and would also scale down the videos to the lowest available quality.

&nbsp;

## Installing

First of all, you need to download the code at https://github.com/green-coding-berlin/greener-youtube

Now open your Chrome/Brave browser, and go to chrome://extensions/

Set it to "Developer mode" (top-right corner) -> "Load unpacked" -> select the folder where you downloaded the code to.

Now you'll see the "Greener Youtube 1.0" extension there; just make sure to click on the toggle switch to activate it.

From now on, just go to Youtube, click on any video, and you'll see that the Autoplay will be turned off and that the video resolution will go down to 144p.

&nbsp;

## Results

The savings (in bandwidth and carbon) can be enormous.

While watching "Björk - All Is Full of Love" (https://www.youtube.com/watch?v=k9YZW7XGON0), using the DevTools to measure the network activity, the total size of the video went down from 160MB (original 4k - 2160p quality) to 9.4MB (144p quality).

That's a 94% savings!

We also measured the same video using other available extensions, for instance Audio Only Youtube (89% savings) and Music Mode for Youtube (99%).\
While those two extensions also provided enormous savings, they didn't show the video, which in this case was not what we really wanted.

{{< rawhtml >}}
<img src="/img/blog/bjork.webp" alt="Björk clip" loading="lazy" style="display: block;
  margin-left: auto; margin-right: auto; margin-bottom: 25px;">
{{< /rawhtml >}}

When talking about music only, there's also another option. Take into example "Metallica - For Whom The Bell Tolls", a 5:09 "video" on https://www.youtube.com/watch?v=eeqGuaAl6Ic. \
Using our extension, it went down from 27.6 to 5.4MB (80% savings).\
For such audio-only videos which are also officially available at Youtube Music, a simple trick is to change the URL from www.youtube.com to music.youtube.com. \
The same song now has only 5.0MB by simply going to https://music.youtube.com/watch?v=eeqGuaAl6Ic.

&nbsp;

## Project timeline

The project is still on its initial phase, with more features and options possibly coming soon. Feel free to send us some feedback or pull requests.
