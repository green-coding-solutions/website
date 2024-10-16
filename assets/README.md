This directory will host also .js and .css files, just like /static does.

The difference is, that this directory is for files, that will be processed by HUGO.

In essence: All files that we minify will go here.

Since all files from the /static directory are passed through to the resulting /public folder as-is,
we would have the raw AND minified files in the resulting static page.

Therefore we use the assets folder, as none of these files will be automatically inlcuded in /public
albeit we process them.
