## Caveats of Hugo

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

- Exception to this rule is the dynamic way of rendering the meetup images.
They are handled in index.css. Here all /meetup content articles are looped
and for their value .Meetupimg some dynamic CSS rules are written out.

## Template
This site uses the Candy Flat Theme.
(Internal: It is in the company Shared Drive.)