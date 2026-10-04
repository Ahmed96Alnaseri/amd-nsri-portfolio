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
  /** Finished artwork for the detail hero, composed on the page background: shown whole at its own
      ratio — no crop, fade or diamond. Takes precedence over `image` there; the card keeps `image`. */
  heroImage?: { src: string; width: number; height: number };
  /** Static still of the detail hero for the /tools card, trimmed to the design. Shown whole beside the
      card text, never cropped; tools without a hero design leave it unset and keep the diamond. */
  cardImage?: string;
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
    heroImage: { src: '/tools/ipunch-hero.png', width: 1540, height: 480 },
    cardImage: '/tools/ipunch-card.webp',
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
    heroImage: { src: '/tools/nestri-hero.png', width: 1540, height: 480 },
    // card shows the two panels only; the hero's wordmark would repeat the card title
    cardImage: '/tools/nestri-card-panels.webp',
    price: 'Free',
    cardBadge: 'FREE · LIVE',
    ctaLabel: 'Open NESTRI',
    ctaLink: '/nestri.html',
    ctaExternal: true,
    input: 'Panel schedule (pose · width · length · qty)',
    output: 'Nested layout DXF · utilization report',
  },
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
    cardStatusOnly: true,
    pricingNote: 'Priced per project scope — panel count, geometry complexity, and output format',
    ctaLabel: 'Submit a Project',
    ctaLink: '/contact?tool=sheet-metal-unfolding&subject=Sheet+Metal+Unfolding+Quote',
    quoteTemplate:
      "Hi, I'd like to submit a project for sheet metal unfolding.\n\nProject description:\nPanel count (approx):\nMaterial & thickness:\nRequired output format (DWG / STEP / other):\nDeadline (if any):",
    embed: '/sheet-metal-unfolder-hero.html',
    // resting frame of the embed (1440×480), before Unfold is pressed
    cardImage: '/tools/sheet-metal-unfolder-card.webp',
    embedHeight: 480,
    embedHeightMobile: 720,
    embedTitle: 'Sheet Metal Unfolder — interactive demo',
    output: 'DWG flat pattern · STEP',
    tags: ['unfolding', 'sheet metal', 'fabrication', 'DWG', 'grasshopper', 'service'],
  },
  /* ── Coming soon: placeholder pages — replace name/description/detail and add content when the
        real tool is ready. No features, price or CTA until then. ── */
  {
    slug: 'nestri-pro',
    name: 'NESTRI PRO',
    description: 'The professional edition of NESTRI. More power for production nesting.',
    detail: 'NESTRI PRO is the professional edition of NESTRI, built for production nesting.',
    features: [],
    platform: 'Web',
    status: 'Coming Soon',
    type: 'product',
    image: null,
    price: null,
  },
  {
    slug: 'amad',
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
