# Portfolio assets

Drop exported images here, then add an entry to `PORTFOLIO` in
`src/config/content.ts`.

- Web formats only — `.webp` preferred, `.jpg`/`.png`/`.svg` fine. Export at
  roughly 1600px on the long edge; the grid crops to a 4:3 thumbnail and the
  lightbox shows the full image.
- Paths in the config are written WITHOUT a leading slash. They go through
  `asset()`, which prefixes the deploy base so the same entry works whether
  the site is served from a domain root or a project subpath.
- For a multi-page brochure, export the cover as the image and point the
  entry's `file` at the PDF in this folder.

Nothing here is referenced automatically — an image only appears once it has
a config entry, so a stray export will not show up on the site.
