export type ToolPlatform = 'Grasshopper' | 'Web' | 'Software' | 'Web + Grasshopper';
export type ToolStatus = 'Live' | 'Beta' | 'Coming Soon';
export type ToolType = 'showcase' | 'product';

export interface Tool {
  /** URL slug — /tools/[slug] */
  slug: string;
  /** Display name — DM Serif Display */
  name: string;
  /** One-line description (cards) — translated via tv() */
  description: string;
  /** Fuller description (detail hero) — translated via tv() */
  detail: string;
  /** "What it does" bullet list — each translated via tv() */
  features: string[];
  /** Platform badge */
  platform: ToolPlatform;
  /** Status badge — Live / Beta / Coming Soon */
  status: ToolStatus;
  /** showcase = portfolio piece (commission); product = purchasable */
  type: ToolType;
  /** Background/hero image path. null = show default diamond placeholder. */
  image: string | null;
  /** Product price (e.g. "Contact for pricing"); null for showcase */
  price: string | null;
}

/** Filter chips shown above the grid (in order). */
export const TOOL_PLATFORMS = ['Grasshopper', 'Web', 'Software'] as const;
export type ToolPlatformFilter = (typeof TOOL_PLATFORMS)[number];

const tools: Tool[] = [
  {
    slug: 'sheet-metal-unfolder',
    name: 'Sheet Metal Unfolder',
    description: 'Flat cutting patterns with k-factor and bend radius control',
    detail:
      'A GHPython definition that unfolds complex sheet metal geometry into accurate flat cutting patterns. Configurable k-factor and bend radius ensure each fold lands precisely where the model predicts — DXF-ready output for laser cutting and press brake.',
    features: [
      'Unfolds 3D sheet metal geometry into flat, fabrication-ready patterns',
      'Configurable k-factor and bend radius for accurate bend allowance',
      'DXF-ready output for laser cutting and press brake',
    ],
    platform: 'Grasshopper',
    status: 'Beta',
    type: 'showcase',
    image: null,
    price: null,
  },
  {
    slug: 'perforation-pattern-engine',
    name: 'Perforation Pattern Engine',
    description: 'Parametric perforation layouts — pitch, diameter, open area ratio',
    detail:
      'A Grasshopper definition that generates production-ready perforation layouts from parametric inputs. Control pitch, diameter, and open area ratio across panel fields — output is rationalized for CNC punching and laser cutting workflows.',
    features: [
      'Parametric control over pitch, diameter, and open area ratio',
      'Generates rationalized layouts for CNC punching and laser cutting',
      'Panel-ready output with zone-by-zone fabrication documentation',
    ],
    platform: 'Grasshopper',
    status: 'Beta',
    type: 'showcase',
    image: null,
    price: null,
  },
  {
    slug: 'panel-type-optimizer',
    name: 'Panel Type Optimizer',
    description: 'Groups facade panels by tolerance to minimize unique fabrication types',
    detail:
      'A Grasshopper tool that analyzes all facade panels and groups similar geometries by configurable area tolerance. Reducing unique panel types cuts fabrication cost and shortens production lead time without compromising design intent.',
    features: [
      'Groups panels by configurable area tolerance thresholds',
      'Visualizes unique type distribution across the facade',
      'Outputs a rationalized panel schedule ready for fabrication',
    ],
    platform: 'Grasshopper',
    status: 'Beta',
    type: 'showcase',
    image: null,
    price: null,
  },
  {
    slug: 'surface-punch-mapper',
    name: 'Surface Punch Mapper',
    description: 'Projects image-based punch patterns onto 3D Rhino surface geometry',
    detail:
      'A Grasshopper definition that projects image-based punch patterns onto 3D surface geometry from Rhino models. Translates pixel brightness into hole placement, enabling gradient and pictorial effects on complex facade panels.',
    features: [
      'Projects image punch data onto arbitrary 3D surface geometry',
      'Brightness-to-hole mapping for gradient and pictorial effects',
      'Outputs panel-by-panel punch data ready for CNC production',
    ],
    platform: 'Grasshopper',
    status: 'Beta',
    type: 'showcase',
    image: null,
    price: null,
  },
  {
    slug: 'pinact',
    name: 'Pinact',
    description: 'Location intelligence and site analysis — standalone software',
    detail:
      'A location intelligence tool for site analysis and positioning. Pinact aggregates spatial data to help architects and developers evaluate sites, understand their surroundings, and communicate location potential — distributed as standalone desktop software.',
    features: [
      'Aggregates spatial and environmental data for site intelligence',
      'Visualizes location context for architectural and development decisions',
      'Client-ready output for site presentation and feasibility reporting',
    ],
    platform: 'Software',
    status: 'Live',
    type: 'product',
    image: null,
    price: 'Contact for pricing',
  },
  {
    slug: 'material-quantity-estimator',
    name: 'Material Quantity Estimator',
    description: 'Total aluminum sheets, powder coat, and profiles — web or Grasshopper',
    detail:
      'A dual-platform quantity takeoff tool. The web version delivers fast rough estimates from basic inputs; the Grasshopper version reads model geometry directly for precise quantities. Calculates aluminum sheet counts, powder coat area, and profile lengths.',
    features: [
      'Calculates aluminum sheet counts, powder coat area, and profile lengths',
      'Web version for fast rough estimates from basic project inputs',
      'Grasshopper version reads model geometry for precise quantities',
    ],
    platform: 'Web + Grasshopper',
    status: 'Beta',
    type: 'product',
    image: null,
    price: 'Free (web) · Grasshopper on request',
  },
];

/** Lookup by slug for the /tools/[slug] detail route. */
export const toolsBySlug: Record<string, Tool> = Object.fromEntries(
  tools.map(tl => [tl.slug, tl]),
);

export default tools;
