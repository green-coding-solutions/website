## Caveats of HUGO

- When you have an article under content that is in form of markdown page
and it has a "date" value set in the future it will NOT render out.
Please consider either putting the date to something that has passed or leave it
out if no need.

## CSS / JS Structure
- CSS / JS files in HUGO are natively found in /static

- In our case however we use bundling. This means most relevant files are under
/assets and cannot be accessed through the URL structure directly.
They are however loaded in the site-style.html and site-scripts.html. There the
bundling code is visible. Add new files to the bundle there

## Template
This site uses the Candy Flat Theme.
(Internal: It is in the company Shared Drive.)

## Multi-Language
HUGO offers two forms of multi-language support:
- Filename extension based
- subfolder based
See detailed documentation here: https://gohugo.io/content-management/multilingual/

We decided to implement the filename extension route. Reason being that it is quicker to determine if an article
has already been translated by just seeing if a same-named copy is located next to it in the filesystem tree.
Also the language coding for layouts still works through filename extensions and it is more cohrent to have 
content AND layouts use the same mechanism.

When localizing a template in the `layouts` folder there are two options:
- Creating a new template with the `.de.md` extension. (Beware, you must restart the `hugo server` for it to show. It does not support hot reload)
- Using the `i18n` feature of *HUGO*. All strings are in the *i18n* folder either in the *en.yaml* or *de.yaml*.
    + See documentation here: https://gohugo.io/content-management/multilingual/#translation-of-strings