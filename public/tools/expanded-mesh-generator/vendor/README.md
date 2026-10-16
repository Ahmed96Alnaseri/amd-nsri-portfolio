# Expanded Mesh Generator: bundled libraries and fonts

The tool page loads everything from this site; it contacts no outside provider. Versions are pinned:

| What | Version | License | Files |
|---|---|---|---|
| three.js (3D view) | 0.160.0 | MIT | `three-0.160.0/three.module.min.js`, `addons/controls/OrbitControls.js`, `addons/environments/RoomEnvironment.js` (copied unchanged from the npm package) |
| @node-projects/acad-ts (DWG writer, loaded on the first DWG export) | 3.2.0 | MIT | `acad-ts-3.2.0/acad-ts.min.js`: the package's `dist/` (620 ES modules) bundled into one file with esbuild 0.24.0 (`--bundle --format=esm --minify --target=es2020`); same 667 exports |
| Fonts: DM Serif Display 400; IBM Plex Mono 400/500/600; IBM Plex Sans 400/500; IBM Plex Sans Arabic 400/500/600 | @fontsource 5.3.0 | SIL OFL 1.1 | `../fonts/files/*.woff2` (Latin, Latin Extended, and Arabic for Plex Sans Arabic), declared in `../fonts/fonts.css` |

To update a library, replace its folder with the new version's files under a new versioned name and change the paths in
`expanded-mesh-generator.html` (the import map and `ACAD_URL`).
