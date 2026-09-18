export type ToolPlatform =
  | 'Grasshopper'
  | 'Web'
  | 'Software'
  | 'Web + Grasshopper'
  | 'Submission-based'
  | 'Grasshopper · Service';
export type ToolStatus = 'Live' | 'Beta' | 'Coming Soon' | 'Available';
export type ToolType = 'showcase' | 'product' | 'quote';

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
  /** showcase = portfolio piece (commission); product = purchasable; quote = priced per project */
  type: ToolType;
  /** Background/hero image path. null = show default diamond placeholder. */
  image: string | null;
  /** Product price (e.g. "Contact for pricing"); null for showcase */
  price: string | null;
  /** Fine print under the price/CTA explaining how the price is arrived at. */
  pricingNote?: string;
  /** Overrides the default CTA label on the detail page. */
  ctaLabel?: string;
  /** Overrides the default CTA destination on the detail page. */
  ctaLink?: string;
  /** ctaLink points outside the app — open it in a new tab. */
  ctaExternal?: boolean;
  /** Render the primary CTA filled rather than outlined. */
  ctaFilled?: boolean;
  /** Optional second CTA, rendered outlined beneath the primary one. */
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
  /** Replaces the whole eyebrow line, including the trailing type label. */
  eyebrowFull?: string;
  /** Replaces the "What it does" heading. */
  featuresHeading?: string;
  /** Feature list split into labelled tiers; replaces `features` when set. */
  featureGroups?: { label: string; items: string[] }[];
  /** Extra sidebar rows with their own labels, inserted before the price row. */
  specRows?: { label: string; value: string }[];
  /** Replaces the price row's value. */
  priceLabelOverride?: string;
  /** Subject-specific contact templates; first match on the ?subject= param wins. */
  quoteTemplates?: { match: string; template: string }[];
  /** Single badge replacing the card's price + status pair. */
  cardBadge?: string;
  /** Drop the sidebar's status row (nothing to announce for a service or a live web tool). */
  hideStatus?: boolean;
  /** Overrides the sidebar's platform value (the bare `platform` still drives filtering). */
  platformLabel?: string;
  /** Path to a self-contained page embedded as the detail hero, replacing the placeholder. */
  embed?: string;
  embedHeight?: number;
  /** Embeds that restack on narrow screens need their own height there. */
  embedHeightMobile?: number;
  embedTitle?: string;
  /** Info row — what the client sends in. */
  input?: string;
  /** Info row — what the client gets back. */
  output?: string;
  /** Overrides the eyebrow's leading term (defaults to platform). */
  eyebrow?: string;
  /** Service tools describe a process instead of a feature list; replaces `features` when set. */
  steps?: { label: string; description: string }[];
  /** Seeds the contact form when arriving from this tool's CTA. */
  quoteTemplate?: string;
  /** Keywords for this tool. Not rendered yet. */
  tags?: string[];
}

/** Filter chips shown above the grid (in order). */
export const TOOL_PLATFORMS = ['Grasshopper', 'Web', 'Software'] as const;
export type ToolPlatformFilter = (typeof TOOL_PLATFORMS)[number];

const tools: Tool[] = [
  {
    slug: 'sheet-metal-unfolder',
    name: 'Sheet Metal Unfolding',
    description: 'Send your file. Receive fabrication-ready flat patterns.',
    detail:
      'An unfolding service for complex sheet metal panels. Submit your files — DWG, PDF, image, or any usable reference — and receive accurate flat cutting patterns with correct k-factor and bend allowance applied. Output is DWG-ready for laser cutting and press brake, plus STEP for CNC verification.',
    features: [],
    steps: [
      {
        label: 'Submit your files',
        description: 'Send your DWG, PDF, image, or any reference file via the quote form.',
      },
      {
        label: 'Scope & quote',
        description: 'A project-specific quote is prepared based on panel count, geometry complexity, and output requirements.',
      },
      {
        label: 'Unfolding',
        description: 'Each panel is unfolded using specific workflows with configurable k-factor and bend radius for your material spec.',
      },
      {
        label: 'Delivery',
        description: 'You receive DWG flat patterns ready for laser cutting or press brake, plus STEP files for CNC verification.',
      },
    ],
    platform: 'Submission-based',
    eyebrow: 'Unfolding Service',
    status: 'Available',
    hideStatus: true,
    type: 'quote',
    image: null,
    price: 'Quote on request',
    pricingNote: 'Priced per project scope — panel count, geometry complexity, and output format',
    ctaLabel: 'Submit a Project',
    ctaLink: '/contact?tool=sheet-metal-unfolding&subject=Sheet+Metal+Unfolding+Quote',
    quoteTemplate:
      "Hi, I'd like to submit a project for sheet metal unfolding.\n\nProject description:\nPanel count (approx):\nMaterial & thickness:\nRequired output format (DWG / STEP / other):\nDeadline (if any):",
    embed: '/sheet-metal-unfolder-hero.html',
    embedHeight: 480,
    embedHeightMobile: 720,
    embedTitle: 'Sheet Metal Unfolder — interactive demo',
    output: 'DWG flat pattern · STEP',
    tags: ['unfolding', 'sheet metal', 'fabrication', 'DWG', 'grasshopper', 'service'],
  },
  {
    slug: 'perforation-pattern-engine',
    name: 'IPunch',
    description: 'Upload an image. Get a perforated panel pattern with live DXF export.',
    detail:
      'IPunch converts any image into a fabrication-ready perforation pattern. Upload a photo, drawing, or graphic — the tool maps pixel brightness to hole density across a panel grid. Adjust hole radius, spacing, pattern type (grid or hex), and open-area ratio live. Export as DXF for AutoCAD and CNC directly from the browser. No installation, no account.',
    features: [
      'Maps pixel brightness to hole density across a panel grid',
      'Live control of hole radius, spacing, pattern type, and open-area ratio',
      'DXF export for AutoCAD and CNC straight from the browser',
    ],
    platform: 'Web',
    platformLabel: 'Web — runs in browser',
    status: 'Live',
    type: 'product',
    image: null,
    price: 'Free',
    cardBadge: 'Free · Live',
    hideStatus: true,
    ctaLabel: 'Open Tool',
    ctaLink: '/ipunch.html',
    ctaExternal: true,
    input: 'Any image (JPG · PNG · GIF)',
    output: 'DXF · SVG · PNG',
    tags: ['perforation', 'web', 'DXF', 'image', 'facade', 'panel', 'free'],
  },
  {
    slug: 'panel-type-optimizer',
    name: 'Panel Type Optimizer',
    description:
      'Reduce unique panel types across a complex facade. The free Grasshopper script handles basic tolerance-based grouping. The professional service covers full model rationalization — cleaned 3D geometry, reduced panel schedule, and Excel output with panel poses.',
    detail:
      'A Grasshopper tool that analyzes all facade panels and groups similar geometries by configurable area tolerance. Reducing unique panel types cuts fabrication cost and shortens production lead time without compromising design intent.',
    features: [],
    featureGroups: [
      {
        label: 'Free — Grasshopper Script',
        items: [
          'Groups panels by area similarity using a 3-value tolerance system',
          'Minimizes unique fabrication types across the full panel set',
          'Outputs grouped panel IDs ready for shop drawing annotation',
          'Download and run on your own model in Grasshopper',
        ],
      },
      {
        label: 'Professional Service',
        items: [
          'Send your 3D facade model (Rhino · STEP · OBJ)',
          'Full rationalization pass with custom tolerance tuning per project',
          'Cleaned 3D model returned with rationalized panel geometry',
          'Excel schedule with panel type, dimensions, quantity, and poses',
        ],
      },
    ],
    featuresHeading: 'What you get',
    platform: 'Grasshopper · Service',
    platformLabel: 'Grasshopper',
    eyebrowFull: 'Grasshopper · Free + Pro Service',
    status: 'Beta',
    hideStatus: true,
    type: 'product',
    image: null,
    price: 'Free script · Pro on request',
    cardBadge: 'FREE + PRO SERVICE',
    specRows: [
      { label: 'Free output', value: 'Grouped panel IDs · GH script' },
      { label: 'Pro output', value: '3D model · Excel with poses' },
    ],
    priceLabelOverride: 'Script free · Service on request',
    ctaLabel: 'Download Free Script',
    ctaLink: '/contact?tool=panel-type-optimizer&subject=Free+Script+Download',
    ctaFilled: true,
    ctaSecondaryLabel: 'Request Pro Service',
    ctaSecondaryLink: '/contact?tool=panel-type-optimizer&subject=Panel+Optimizer+Pro+Service',
    pricingNote:
      'Pro service: send your model, receive rationalized geometry + Excel panel schedule.',
    quoteTemplates: [
      {
        match: 'Free Script',
        template:
          "Hi, I'd like to download the Panel Type Optimizer Grasshopper script.\n\nProject context (optional):\nNumber of panels (approx):\nGrasshopper version:",
      },
      {
        match: 'Pro Service',
        template:
          "Hi, I'd like to request the professional Panel Type Optimizer service.\n\nProject description:\nNumber of panels (approx):\nFile format available (Rhino / STEP / OBJ):\nDeadline (if any):",
      },
    ],
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
export const toolsBySlug: Record<string, Tool> = {
  ...Object.fromEntries(tools.map(tl => [tl.slug, tl])),
  // The unfolding service's CTA passes ?tool=sheet-metal-unfolding, which the
  // contact form resolves through this map.
  'sheet-metal-unfolding': tools[0],
};

export default tools;
