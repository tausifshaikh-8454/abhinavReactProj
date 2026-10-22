# Motwane Interactive Infrastructure Explorer (prototype)

A responsive React + Three.js web prototype using React Three Fiber. It contains a clean isometric-style 3D scene, click-to-inspect assets, a guided journey, a portfolio/division directory and links to official Motwane pages.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The generated static site is written to `dist/`.

## Project structure

- `src/Scene.jsx` — Three.js scene built from lightweight procedural geometry; clickable assets and animated illustrative power-flow dots.
- `src/App.jsx` — page layout, asset inspector, guided journey, portfolio directory and interactions.
- `src/catalogue.js` — editable data registry for division/product grouping, asset mappings and official links.
- `src/styles.css` — responsive visual system.

## Important scope notes

1. This is the **first working prototype**, not a production-ready 3D asset library or live digital twin. The equipment is simplified geometry drawn in code, not photorealistic CAD models.
2. Motion on the power path is illustrative only. No electrical measurements, alarms or telemetry are connected.
3. Product and division groupings are an initial content map informed by public Motwane web pages and the product context provided. It is not an exhaustive audited catalogue. Confirm exact product names, current ownership/division, approved claims, product URLs, and image assets with Motwane product teams before publishing.
4. Items such as access control, water monitoring, street lighting, training and cable fault location are supporting portfolio areas in the wider campus scene; they are not claimed to sit on the electrical transmission path.
5. For production, use approved CAD/Blender GLB models, optimise geometry/textures, lazy-load models, add a no-WebGL fallback and test performance on low-end Android devices.

## Suggested next development milestones

1. Verify the division and product list against the current internal catalogues.
2. Replace selected procedural models with approved GLB models from Blender.
3. Add precise hotspots to individual components and product-specific details.
4. Add approved datasheet/product links and analytics events.
5. Test browser/mobile performance, accessibility and the WordPress embed strategy.

## Useful links

- Motwane homepage: https://motwane.com/
- Power & Grid division: https://motwane.com/all-divisions/power-and-grid/
- Industrial & Commercial division: https://motwane.com/all-divisions/industrial-commercial/
- Test & Measurement products: https://motwane.com/product_category/test-measurement/
- MOT-WARE: https://motwane.com/product_category/motware/
- IoXn: https://motwane.com/product_category/ioxn/
- Motwane AI & Analytics: https://motwane.com/product_category/data-products/
- Vite: https://vite.dev/guide/
- React Three Fiber: https://r3f.docs.pmnd.rs/
