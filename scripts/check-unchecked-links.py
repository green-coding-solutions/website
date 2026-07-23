#!/usr/bin/env python3
"""Check the internal links that htmltest does not look at.

htmltest inspects a[href], img[src], script[src] and link[href]. Two kinds of
real link live outside those attributes and therefore pass it unnoticed:

  <option value>  The responsive nav (layouts/partials/site-navigation.html) is
                  a <select> that navigates via JavaScript, so its URLs sit in
                  form values. To HTML they are opaque strings.

  srcset          Retina variants are never fetched by htmltest, so a renamed
                  @2x image breaks silently for high-DPI screens only.

Usage: check-unchecked-links.py [public_dir]
Exits non-zero and lists every URL that does not resolve to a file.
"""

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

OPTION_VALUE = re.compile(r'<option\b[^>]*\bvalue="([^"]*)"', re.IGNORECASE)
SRCSET = re.compile(r'<[^>]*\bsrcset="([^"]*)"', re.IGNORECASE)

# Schemes that point off-site; parity with htmltest's CheckExternal: false.
EXTERNAL = ("http://", "https://", "//", "mailto:", "tel:", "javascript:", "data:")


def is_external(url: str) -> bool:
    return url.lower().startswith(EXTERNAL)


def srcset_urls(value: str):
    """Yield the URL of each srcset candidate ("<url> 2x, <url> 1x")."""
    for candidate in value.split(","):
        candidate = candidate.strip()
        if candidate:
            # The URL is the first token; anything after it is a descriptor.
            yield candidate.split()[0]


def resolves(public: Path, page: Path, url: str) -> bool:
    """True if `url`, as linked from `page`, is served by a file under public/."""
    path = urlsplit(url).path
    if not path:
        return True  # pure query or fragment: same document
    rel = unquote(path)

    if rel.startswith("/"):
        base = public
        rel = rel.lstrip("/")
    else:
        base = page.parent  # relative URLs resolve against the linking page

    if not rel or rel.endswith("/"):
        return (base / rel / "index.html").is_file()

    target = base / rel
    # Hugo serves pretty URLs, so /foo may be foo/index.html or foo.html.
    return (
        target.is_file()
        or (target / "index.html").is_file()
        or target.with_name(target.name + ".html").is_file()
    )


def main() -> int:
    public = Path(sys.argv[1] if len(sys.argv) > 1 else "public")
    if not public.is_dir():
        print(f"error: no such directory: {public}", file=sys.stderr)
        return 2

    documents = 0
    checked = 0
    failures = []

    for page in sorted(public.rglob("*.html")):
        documents += 1
        html = page.read_text(encoding="utf-8", errors="replace")
        where = page.relative_to(public)

        for value in OPTION_VALUE.findall(html):
            value = value.strip()
            # Not every <option> is a link. Only absolute paths are treated as
            # navigation targets, so plain form values (a country code, say)
            # and pure fragments are left alone.
            if not value.startswith("/") or is_external(value):
                continue
            checked += 1
            if not resolves(public, page, value):
                failures.append((where, "option value", value))

        for value in SRCSET.findall(html):
            for url in srcset_urls(value):
                # Every srcset candidate is a URL by spec, so relative ones are
                # resolved too — unlike <option value> above.
                if is_external(url) or url.startswith("#"):
                    continue
                checked += 1
                if not resolves(public, page, url):
                    failures.append((where, "srcset", url))

    for where, kind, value in failures:
        print(f"  target does not exist --- {where} --> {value}  [{kind}]")

    print("=" * 72)
    if failures:
        print(f"✘✘✘ {len(failures)} broken link(s) in {documents} documents")
        return 1
    print(f"✔✔✔ passed — {checked} unchecked-by-htmltest links in {documents} documents")
    return 0


if __name__ == "__main__":
    sys.exit(main())
