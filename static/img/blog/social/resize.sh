#!/bin/bash

if ! command -v mogrify &> /dev/null; then
    echo "ImageMagick is not installed. Please install it to proceed."
    exit 1
fi

for file in *.webp; do
    mogrify -resize 175x175! "$file"
done
