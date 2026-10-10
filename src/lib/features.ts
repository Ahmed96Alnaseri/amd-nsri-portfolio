/**
 * Site sections that can be switched off without deleting their code.
 *
 * SHOP_ENABLED — the Shop is parked while it is not ready to launch. With it false:
 *   - /shop and every /shop/<product> answer with the normal 404 page (src/app/shop/layout.tsx)
 *   - Shop is left out of the main and mobile menus (src/components/Navigation.tsx)
 *   - the homepage Ecosystem section drops its "AMD Shop" card (src/components/EcosystemSection.tsx)
 *   - tool pages never send a "Get This Tool" button to /shop (src/app/tools/[slug]/page.tsx)
 *   - /shop is left out of the sitemap and gets no search metadata (src/app/sitemap.ts)
 * The pages, product data (src/data/shop-products.ts) and translations all stay in place.
 * Set it to true and redeploy to bring the Shop back.
 */
export const SHOP_ENABLED = false;

/**
 * DESIGN_ENABLED — the Design section is parked while it is not ready to launch. With it false:
 *   - /design answers with the normal 404 page (src/app/design/layout.tsx)
 *   - Design is left out of the main and mobile menus (src/components/Navigation.tsx)
 *   - the homepage drops its "AMD Design" Ecosystem card (src/components/EcosystemSection.tsx)
 *     and the Design entry in the closing "Works" list (src/components/CallToActionSection.tsx)
 *   - project pages whose back link pointed at /design go back to Architecture instead
 *     (src/app/architecture/[slug]/page.tsx)
 *   - /design is left out of the sitemap and gets no search metadata (src/app/sitemap.ts)
 * The page, project data (src/data/design-projects.ts) and translations all stay in place.
 * Set it to true and redeploy to bring the Design section back.
 */
export const DESIGN_ENABLED = false;
