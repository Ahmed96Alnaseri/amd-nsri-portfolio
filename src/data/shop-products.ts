export type ShopCategory = 'Plugin' | 'Digital Tool' | 'Software' | 'Template';

/** Drives the purchase/contact button + the "Free" filter. */
export type PurchaseMode = 'buy' | 'free' | 'contact';

export interface ShopProduct {
  /** URL slug — /shop/[slug] */
  slug: string;
  /** Display name — DM Serif Display (translated via tv()) */
  name: string;
  /** Optional variant suffix shown as "(Web)" / "(Grasshopper)" — not translated */
  variant?: string;
  /** One-line description (cards) — translated via tv() */
  description: string;
  /** Fuller description (detail hero) — translated via tv() */
  detail: string;
  /** Category badge */
  category: ShopCategory;
  /** Price string — "₺2,500", "Free", "Contact for pricing" (translated via tv()) */
  price: string;
  /** Purchase flow — buy / free / contact */
  mode: PurchaseMode;
  /** "What's included" list — each translated via tv() */
  included: string[];
  /** Requirements list — each translated via tv() */
  requirements: string[];
  /** Related product slugs */
  related: string[];
  /** Hero/background image path. null = copper diamond placeholder. */
  image: string | null;
}

/** Filter chips shown above the grid (in order). */
export const SHOP_FILTERS = ['All', 'Plugins', 'Digital Tools', 'Software', 'Free'] as const;
export type ShopFilter = (typeof SHOP_FILTERS)[number];

/** Does a product belong under the given filter chip? */
export function matchesFilter(p: ShopProduct, filter: ShopFilter): boolean {
  switch (filter) {
    case 'All':           return true;
    case 'Plugins':       return p.category === 'Plugin';
    case 'Digital Tools': return p.category === 'Digital Tool';
    case 'Software':      return p.category === 'Software';
    case 'Free':          return p.mode === 'free';
  }
}

const products: ShopProduct[] = [
  {
    slug: 'sheet-metal-unfolder',
    name: 'Sheet Metal Unfolder',
    description: 'Grasshopper definition for flat pattern generation',
    detail:
      'A production-tested Grasshopper definition that unfolds complex sheet metal geometry into accurate flat cutting patterns. Configurable k-factor and bend radius keep every fold true to the model, with DXF-ready output for laser and press brake.',
    category: 'Plugin',
    price: '₺2,500',
    mode: 'buy',
    included: [
      'Commented Grasshopper definition (.gh)',
      'Step-by-step PDF documentation',
      'Example Rhino files',
      'Sample DXF output',
      'Email support',
      'Free minor updates',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['surface-punch-mapper', 'material-quantity-estimator-grasshopper'],
    image: null,
  },
  {
    slug: 'perforation-pattern-engine',
    name: 'Perforation Pattern Engine',
    description: 'Parametric perforation layout generator for Rhino',
    detail:
      'A parametric perforation layout generator for Rhino and Grasshopper. Drive pitch, diameter, and open-area ratio across any panel field and export rationalized, fabrication-ready layouts for CNC punching and laser cutting.',
    category: 'Plugin',
    price: '₺1,800',
    mode: 'buy',
    included: [
      'Commented Grasshopper definition (.gh)',
      'Step-by-step PDF documentation',
      'Example Rhino files',
      'Email support',
      'Free minor updates',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['surface-punch-mapper', 'sheet-metal-unfolder'],
    image: null,
  },
  {
    slug: 'panel-type-optimizer',
    name: 'Panel Type Optimizer',
    description: 'Facade panel grouping and tolerance analysis tool',
    detail:
      'A facade rationalization tool that groups similar panels by configurable area tolerance, cutting the number of unique fabrication types — and with it, cost and lead time — without compromising the design surface.',
    category: 'Plugin',
    price: '₺2,200',
    mode: 'buy',
    included: [
      'Commented Grasshopper definition (.gh)',
      'Step-by-step PDF documentation',
      'Example Rhino files',
      'Panel schedule template',
      'Email support',
      'Free minor updates',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['perforation-pattern-engine', 'material-quantity-estimator-grasshopper'],
    image: null,
  },
  {
    slug: 'surface-punch-mapper',
    name: 'Surface Punch Mapper',
    description: 'Image-to-punch projection for 3D surfaces',
    detail:
      'Projects image-based punch patterns onto 3D surface geometry straight from your Rhino model. Pixel brightness maps to hole placement, enabling gradient and pictorial effects across complex facade panels — output ready for CNC.',
    category: 'Plugin',
    price: '₺1,500',
    mode: 'buy',
    included: [
      'Commented Grasshopper definition (.gh)',
      'Step-by-step PDF documentation',
      'Example Rhino files',
      'Sample image maps',
      'Email support',
      'Free minor updates',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['perforation-pattern-engine', 'sheet-metal-unfolder'],
    image: null,
  },
  {
    slug: 'material-quantity-estimator-web',
    name: 'Material Quantity Estimator',
    variant: 'Web',
    description: 'Rough material takeoff — aluminum, powder coat, profiles',
    detail:
      'A free, browser-based takeoff tool for fast, rough material estimates. Enter basic project inputs and get instant figures for aluminum sheets, powder-coat area, and profile lengths — no installation, no account.',
    category: 'Digital Tool',
    price: 'Free',
    mode: 'free',
    included: [
      'Instant browser access',
      'Aluminum sheet estimate',
      'Powder-coat area estimate',
      'Profile length estimate',
      'No installation required',
    ],
    requirements: ['Modern web browser', 'No installation required'],
    related: ['material-quantity-estimator-grasshopper', 'facade-configurator'],
    image: null,
  },
  {
    slug: 'material-quantity-estimator-grasshopper',
    name: 'Material Quantity Estimator',
    variant: 'Grasshopper',
    description: 'Precise material quantities from Rhino drawings',
    detail:
      'The precision counterpart to the web estimator. This Grasshopper definition reads your Rhino model geometry directly to produce exact material quantities — aluminum sheet counts, powder-coat area, and profile lengths — ready for procurement.',
    category: 'Plugin',
    price: '₺3,000',
    mode: 'buy',
    included: [
      'Commented Grasshopper definition (.gh)',
      'Step-by-step PDF documentation',
      'Example Rhino files',
      'Quantity schedule template',
      'Email support',
      'Free minor updates',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['material-quantity-estimator-web', 'panel-type-optimizer'],
    image: null,
  },
  {
    slug: 'facade-configurator',
    name: 'Facade Configurator',
    description: 'Interactive web-based facade panel configurator',
    detail:
      'An interactive, web-based configurator that lets clients assemble a facade in real time — swapping panels, depth, and material in a live preview and exporting a specification ready for quoting. Deployed and branded for your studio.',
    category: 'Digital Tool',
    price: 'Contact for pricing',
    mode: 'contact',
    included: [
      'Custom-branded web deployment',
      'Real-time 3D configurator',
      'Specification export',
      'Setup and onboarding',
      'Priority support',
    ],
    requirements: ['Modern web browser', 'Project brief required'],
    related: ['material-quantity-estimator-web', 'pinact'],
    image: null,
  },
  {
    slug: 'pinact',
    name: 'Pinact',
    description: 'Location intelligence and site analysis software',
    detail:
      'Standalone location-intelligence software for site analysis and positioning. Pinact aggregates spatial data to help architects and developers evaluate sites, read their surroundings, and communicate location potential.',
    category: 'Software',
    price: 'Contact for pricing',
    mode: 'contact',
    included: [
      'Standalone desktop application',
      'Site analysis toolkit',
      'Location reporting export',
      'Setup and onboarding',
      'Priority support',
    ],
    requirements: ['Windows 10 or later', 'License key (provided)'],
    related: ['facade-configurator', 'material-quantity-estimator-web'],
    image: null,
  },
];

/** Lookup by slug for the /shop/[slug] detail route + related lookups. */
export const productsBySlug: Record<string, ShopProduct> = Object.fromEntries(
  products.map(p => [p.slug, p]),
);

export default products;
