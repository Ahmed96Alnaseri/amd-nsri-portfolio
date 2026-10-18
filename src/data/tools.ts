export type ToolPlatform =
  | 'Grasshopper'
  | 'Web'
  | 'Software'
  | 'Web + Grasshopper'
  | 'Submission-based'
  | 'Grasshopper · Service';
export type ToolStatus = 'Live' | 'Beta' | 'Coming Soon' | 'Available';
export type ToolType = 'showcase' | 'product' | 'quote';
/** What a tool is for: drives the filter tabs on /tools (the platform badge on each card stays separate). */
export type ToolCategory = 'design' | 'fabrication' | 'lifestyle';

export interface Tool {
  /** URL slug — /tools/[slug] */
  slug: string;
  /** Display name — DM Serif Display */
  name: string;
  /** Filter tab on /tools */
  category: ToolCategory;
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
  /** Hero image path (in public/): shown whole on the detail page, and behind the card.
      null = the diamond placeholder (or no hero at all with noHeroPlaceholder). */
  image: string | null;
  /** While image is null, show no hero box at all instead of the diamond placeholder. */
  noHeroPlaceholder?: boolean;
  /** Artwork on its way: the detail page shows the diamond placeholder at this size's ratio, laid out like
      heroImage (badge position included), so adding heroImage later swaps it in without moving anything. */
  heroPlaceholderSize?: { width: number; height: number };
  /** Finished artwork for the detail hero, composed on the page background: shown whole at its own
      ratio — no crop, fade or diamond. Takes precedence over `image` there; the card keeps `image`. */
  heroImage?: { src: string; width: number; height: number };
  /** Static still of the detail hero for the /tools card, trimmed to the design. Shown whole beside the
      card text, never cropped; tools without a hero design leave it unset and keep the diamond.
      width/height are the file's own size: narrow cards reserve the image's space from them before it
      loads, so the card doesn't grow while it arrives. Update them when the file changes. */
  cardImage?: { src: string; width: number; height: number };
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
  /** Card shows the status alone — no price or quote label (the detail page still lists the price). */
  cardStatusOnly?: boolean;
  /** Drop the sidebar's status row (nothing to announce for a service or a live web tool). */
  hideStatus?: boolean;
  /** Overrides the sidebar's platform value (the bare `platform` is the card's badge; filtering uses `category`). */
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
  /** Outlined tag on the card's right (styled like the platform badge), replacing the price and status. */
  cardTag?: string;
}

/** Filter tabs shown above the grid, after "All" (in order); labels in translations.ts (tools.cat*). */
export const TOOL_CATEGORIES: ToolCategory[] = ['design', 'fabrication', 'lifestyle'];

const tools: Tool[] = [
  {
    slug: 'perforation-pattern-engine',
    category: 'design',
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
    heroImage: { src: '/tools/ipunch/hero.png', width: 1540, height: 480 },
    cardImage: { src: '/tools/ipunch/card.webp', width: 1040, height: 365 },
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
    slug: 'surface-punch-mapper',
    category: 'fabrication',
    name: 'NESTRI',
    description:
      'Paste your panel schedule and get an optimized nesting layout. Minimizes sheet waste and exports DXF for CNC cutting.',
    detail:
      'Sheet nesting for fabrication. Paste your panel schedule — pose, width, length, quantity — and get an optimized nesting layout that minimizes material waste and maximizes sheet utilization. Export the nested sheets as DXF, ready for CNC cutting.',
    features: [
      'Paste a pose schedule straight from Excel',
      'Automatic nesting optimization to minimize sheet waste',
      'Utilization and waste readout per sheet size',
      'Export nested layout as DXF for CNC cutting',
    ],
    platform: 'Web',
    platformLabel: 'Web — runs in browser',
    eyebrowFull: 'Web Tool · Free',
    status: 'Live',
    hideStatus: true,
    type: 'product',
    image: null,
    heroImage: { src: '/tools/nestri/hero.png', width: 1540, height: 480 },
    // card shows the two panels only; the hero's wordmark would repeat the card title
    cardImage: { src: '/tools/nestri/card.webp', width: 1040, height: 335 },
    price: 'Free',
    cardBadge: 'FREE · LIVE',
    ctaLabel: 'Open NESTRI',
    ctaLink: '/nestri.html',
    ctaExternal: true,
    input: 'Panel schedule (pose · width · length · qty)',
    output: 'Nested layout DXF · utilization report',
  },
  {
    slug: 'nestri-pro',
    category: 'fabrication',
    name: 'NESTRI PRO',
    description: 'True-shape nesting from DXF. Fills part cut-outs; exports DXF and Excel.',
    detail:
      'True-shape sheet nesting for fabrication. Upload the DXF your parts are drawn in — outlines, cut-outs and bend lines are read from the drawing — and get a nesting layout of the real shapes, with small parts placed in the cut-outs of larger ones. Export the nested sheets as DXF, ready for CNC cutting.',
    // what PRO adds over NESTRI comes first
    features: [
      'Nests the real part outlines read from DXF',
      'Places small parts in the cut-outs of larger ones',
      'Rolls, offcuts and odd-shaped sheets as stock',
      'Layer mapping; quantities read from the drawing',
      'Utilization, waste and weight per sheet size',
      'DXF with cut, bend and marking layers, plus an Excel report',
    ],
    platform: 'Web',
    platformLabel: 'Web — runs in browser',
    eyebrowFull: 'Web Tool · Pro Edition',
    status: 'Live',
    hideStatus: true,
    type: 'product',
    image: null,
    heroImage: { src: '/tools/nestri-pro/hero.png', width: 1540, height: 480 },
    // card shows the two panels only; the hero's wordmark would repeat the card title
    cardImage: { src: '/tools/nestri-pro/card.webp', width: 1040, height: 313 },
    price: null,
    input: 'DXF part drawings',
    output: 'Nested sheets DXF · Excel report',
    ctaLabel: 'Open NESTRI PRO',
    ctaLink: '/nestri-pro.html',
    ctaExternal: true,
  },
  {
    slug: 'sheet-metal-unfolder',
    category: 'fabrication',
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
    cardStatusOnly: true,
    pricingNote: 'Priced per project scope — panel count, geometry complexity, and output format',
    ctaLabel: 'Submit a Project',
    ctaLink: '/contact?tool=sheet-metal-unfolding&subject=Sheet+Metal+Unfolding+Quote',
    quoteTemplate:
      "Hi, I'd like to submit a project for sheet metal unfolding.\n\nProject description:\nPanel count (approx):\nMaterial & thickness:\nRequired output format (DWG / STEP / other):\nDeadline (if any):",
    embed: '/tools/sheet-metal-unfolder/hero.html',
    // resting frame of the embed (1440×480), before Unfold is pressed
    cardImage: { src: '/tools/sheet-metal-unfolder/card.webp', width: 1040, height: 405 },
    embedHeight: 480,
    embedHeightMobile: 720,
    embedTitle: 'Sheet Metal Unfolder — interactive demo',
    output: 'DWG flat pattern · STEP',
    tags: ['unfolding', 'sheet metal', 'fabrication', 'DWG', 'grasshopper', 'service'],
  },
  /* ── Coming soon: placeholder page like AMAD and Pinact until the tool is ready ── */
  {
    slug: 'finsa',
    category: 'design',
    name: 'FINSA',
    description: 'A façade material and colour preview tool.',
    detail: 'A façade material and colour preview tool.',
    features: [],
    platform: 'Web',
    status: 'Coming Soon',
    type: 'product',
    image: null,
    price: null,
  },
  {
    slug: 'expanded-mesh-generator',
    category: 'fabrication',
    name: 'Expanded Mesh Generator',
    description:
      'Expanded metal mesh panels from catalogue sizes, with an optional U or L frame. Exports STEP and DWG.',
    detail:
      'Expanded Mesh Generator builds an expanded metal mesh panel from its catalogue dimensions: the long and short way of the diamond (LWD, SWD), strand width, thickness and bend radius. Set the panel size, turn the mesh 90°, slide the pattern, and add an optional U-channel or L-angle frame with mitred corners. The live 3D view and the dimensioned 2D elevation update as you type, with readouts for open area, eye count, mesh depth and frame length. Export 3D solids as STEP and the 2D front elevation as DWG, straight from the browser. No installation, no account.',
    features: [
      'Mesh from catalogue dimensions: LWD, SWD, strand width, thickness and bend radius',
      'Panel size, mesh direction (0° or ±90°) and pattern position',
      'Optional U-channel or L-angle frame with 45° mitred corners; the mesh is cut to fit inside it',
      'Live 3D view and a dimensioned 2D elevation',
      'Readouts: panel area, mesh cut size, eye count, open area, mesh depth and frame length',
      'STEP export: closed 3D solids per strand row and frame piece, in millimetres (a centre detail for very dense meshes)',
      'DWG export: AutoCAD 2000 front elevation with hidden lines removed, on separate layers',
    ],
    platform: 'Web',
    platformLabel: 'Web — runs in browser',
    eyebrowFull: 'Web Tool · Free',
    status: 'Live',
    hideStatus: true,
    type: 'product',
    image: null,
    heroImage: { src: '/tools/expanded-mesh-generator/hero.png', width: 1540, height: 480 },
    // the panel drawing only; the hero's wordmark would repeat the card title
    cardImage: { src: '/tools/expanded-mesh-generator/card.webp', width: 1040, height: 670 },
    price: 'Free',
    cardBadge: 'FREE · LIVE',
    input: 'Mesh LWD · SWD · W · T · R, panel size, optional U or L frame',
    output: 'STEP 3D solids · DWG 2D elevation',
    ctaLabel: 'Open Tool',
    ctaLink: '/expanded-mesh-generator.html',
    ctaExternal: true,
  },
  /* ── Coming soon: placeholder page — replace name/description/detail and add content when the
        real tool is ready. No features, price or CTA until then. ── */
  {
    slug: 'amad',
    category: 'lifestyle',
    name: 'AMAD',
    description: 'Arrange my plans. Turn your goals into a daily schedule that adapts to you.',
    detail: 'A web app for personal planning. AMAD turns your goals into a daily schedule that adapts to you.',
    features: [],
    platform: 'Web',
    status: 'Coming Soon',
    type: 'product',
    image: null,
    price: null,
  },
  {
    slug: 'pinact',
    category: 'lifestyle',
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
    status: 'Coming Soon',
    type: 'product',
    image: null,
    price: 'Contact for pricing',
    cardStatusOnly: true,
  },
];

/** Lookup by slug for the /tools/[slug] detail route. */
export const toolsBySlug: Record<string, Tool> = {
  ...Object.fromEntries(tools.map(tl => [tl.slug, tl])),
  // The unfolding service's CTA passes ?tool=sheet-metal-unfolding, which the
  // contact form resolves through this map.
  'sheet-metal-unfolding': tools.find(tl => tl.slug === 'sheet-metal-unfolder')!,
};

export default tools;
