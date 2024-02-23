---
title: "PNG. A message from the past and how to kill it"
date: 2024-01-10
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/big_png.webp"

---

{{< rawhtml >}}
<img class="ui small floated right rounded bordered image" src="/img/blog/big_png.webp" alt="An image of a big png" loading="lazy">
{{< /rawhtml >}}

While reading this great article [https://evanhahn.com/worlds-smallest-png/](https://evanhahn.com/worlds-smallest-png/) about the smallest png image possible I started thinking about how old the png standard is and how many more newer formats are out there. PNG is 27 years old and JPG is 31. Still png with jpg still seems to be the standard when looking at software out there. For example the standard wordpress themes have pngs for their [images](https://github.com/WordPress/WordPress/tree/master/wp-content/themes/twentyeleven/images). Also the wordpress [photos page](https://wordpress.org/photos/) returns a lot pf JPG images. We have written about the savings of using avif in comparison to png in one of our case studies: **[AVIF VS. PNG](/case-studies/avif-vs-png/)**

But if the advantages are so obvious why are people still using 30 year old technology. Pretty much all browsers support either [AVIF](https://caniuse.com/?search=avif) or [WebP](https://caniuse.com/?search=webp)? My guess is easy tooling. People consider it to be a hassle to changing everything on a page. This is something I also noticed when creating the website for the [https://www.eco-compute.io/](https://www.eco-compute.io/) conference. As there are so many images out there in png/ jpg it was always an extra step to change the file. I can imagine that when a deadline is close and the boss is breathing down someones back this step is often skipped. As I have done so may times.

So I created a little script that solves this problem. It's called `png2webp`:

[https://github.com/green-coding-solutions/png2webp/blob/main/png2webp.sh](https://github.com/green-coding-solutions/png2webp/blob/main/png2webp.sh)

The functionality is quite simple.

1. It looks for all *.png and *.jpg files
2. It converts them to webp
3. It looks for all files in which the files were referenced
4. Replaces the filename with the webp image
5. It will also delete unused files if you specify the `-d` parameter.

That is pretty much it. You can either give it a git url, which it will then clone or a path.

It will also look for jpg files so the name is a little confusing but for simplicity sake I wanted to keep it short. In the future I also want to add avif support but as this isn't supported by all the browsers to date I went for webp. Even if avif is probably the better image format currently.

Looking at the [eco-compute.io](http://eco-compute.io) website the script was able to:

```
Total deleted unused images: .82 MB
Total original size: 6.40 MB
Total WEBP size: 1.53 MB
Total space saved: 4.87 MB
```

This is amazing. How much unnecessary data was transferred every time someone visited that site.

So let’s try a bigger project [Wordpress](https://github.com/WordPress/WordPress/tree/bcb0f7467874c97a63b78d279c2ddccf9a18824a). This is one of the most used sites out there.

```
Total original size: 13.76 MB
Total WEBP size: 8.68 MB
Total space saved: 5.08 MB
```

Wow considering these images are probably loaded millions of times a day this would save a huge amount of data.

Of course a site like Wordpress might still opt to use 30 year old technology because they want to make sure that the site is still accessible on really really old browsers. But is that really worth it? I think everyone needs to start thinking about their footprint and how to reduce it and if this means that some people, on ancient unpatched systems, might not see an image I would at least want a discussion about it. Looking at [https://caniuse.com/webp](https://caniuse.com/webp) the webp image technology is available on 97.05% of all users. Which is already quite a lot. If you want to increase even more you can use [webp-hero](https://github.com/chase-moskal/webp-hero) which is a "browser polyfill for the webp image format" so that older browsers can render webp images. It is as easy as:
```
<!--[if IE]>
<script src="https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js"></script>
<script src="https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js"></script>
<script>
	var webpMachine = new webpHero.WebpMachine()
	webpMachine.polyfillDocument()
</script>
<![endif]-->
```

but please read the documentation for more details.

In the future I would love to build a service that tells you how much data you can save by giving it a git repo. But that will be for another post.

For now try it on your own repos and feel free to comment and improve the script. PRs are very welcome!

Although image compression is no new technique we see an important differnce here between classical perfomance engineering techniques and the newer spin on the topic, Green Coding, which we want to push forward.
For a normal website, even for wordpress, the transfer time is often good enough as the user does not even notice the latency on a normal connection. However we saved by just using a simple one time operation about 70% of transfer volume through the network. This means that in the near future some network switches do not have to be upgraded and we save hardware and thus CO2 for the plant. This is just a minor example of what we also consider Green Coding: Applying already known techniques for savings that are not performance critical, just to do reduce resource consumption and thus CO2 emission.