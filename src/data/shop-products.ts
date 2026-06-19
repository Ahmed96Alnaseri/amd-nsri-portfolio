export type ShopCategory = 'Script' | '3D Asset' | '3D Printing';

/** Drives the purchase / notify button behaviour. */
export type PurchaseMode = 'download' | 'coming-soon' | 'free';

export interface ShopProduct {
  /** URL slug — /shop/[slug] */
  slug: string;
  /** Display name — DM Serif Display (translated via tv()) */
  name: string;
  /** One-line description shown on the card — translated via tv() */
  description: string;
  /** Fuller description for the detail hero — translated via tv() */
  detail: string;
  /** Category badge */
  category: ShopCategory;
  /** Price string — "₺800", "Coming Soon" — translated via tv() */
  price: string;
  /** Purchase flow */
  mode: PurchaseMode;
  /** "Digital Download" | "Physical" — shown below price */
  deliveryType: 'Digital Download' | 'Physical';
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
export const SHOP_FILTERS = ['All', 'Scripts', '3D Assets', '3D Printing', 'Free'] as const;
export type ShopFilter = (typeof SHOP_FILTERS)[number];

/** Does a product belong under the given filter chip? */
export function matchesFilter(p: ShopProduct, filter: ShopFilter): boolean {
  switch (filter) {
    case 'All':         return true;
    case 'Scripts':     return p.category === 'Script';
    case '3D Assets':   return p.category === '3D Asset';
    case '3D Printing': return p.category === '3D Printing';
    case 'Free':        return p.mode === 'free';
  }
}

const products: ShopProduct[] = [
  /* ── Scripts ──────────────────────────────────────────────── */
  {
    slug: 'sheet-metal-unfolder-script',
    name: 'Sheet Metal Unfolder Script',
    description: 'GHPython unfolding script, ready to embed in your definition',
    detail:
      'A standalone GHPython unfolding script for Grasshopper. Drop it into any definition and it immediately flattens complex sheet metal geometry into accurate flat cutting patterns — configurable k-factor, bend radius, and DXF-ready output.',
    category: 'Script',
    price: '₺800',
    mode: 'download',
    deliveryType: 'Digital Download',
    included: [
      'GHPython script (.py)',
      'Grasshopper example file (.gh)',
      'PDF integration notes',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['panel-optimizer-script', 'perforation-generator-script'],
    image: null,
  },
  {
    slug: 'panel-optimizer-script',
    name: 'Panel Optimizer Script',
    description: 'Standalone GHPython script for panel type reduction',
    detail:
      'Groups facade panels by configurable area tolerance to minimize unique fabrication types. Paste the script into your Grasshopper definition and get an instant rationalization report — fewer mould types, lower cost, shorter lead time.',
    category: 'Script',
    price: '₺600',
    mode: 'download',
    deliveryType: 'Digital Download',
    included: [
      'GHPython script (.py)',
      'Grasshopper example file (.gh)',
      'Panel schedule template (.xlsx)',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['sheet-metal-unfolder-script', 'perforation-generator-script'],
    image: null,
  },
  {
    slug: 'perforation-generator-script',
    name: 'Perforation Generator Script',
    description: 'Parametric perforation script with open-area output',
    detail:
      'Parametric perforation layout generator in a single GHPython script. Drive pitch, diameter, and open-area ratio; the script outputs a rationalized layout and computes the total open-area percentage per panel — CNC and laser ready.',
    category: 'Script',
    price: '₺700',
    mode: 'download',
    deliveryType: 'Digital Download',
    included: [
      'GHPython script (.py)',
      'Grasshopper example file (.gh)',
      'Open-area calculation notes',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['sheet-metal-unfolder-script', 'panel-optimizer-script'],
    image: null,
  },

  /* ── 3D Assets ─────────────────────────────────────────────── */
  {
    slug: 'facade-panel-detail-library',
    name: 'Facade Panel Detail Library',
    description: '30 aluminum panel connection details, Rhino 3dm format',
    detail:
      'A curated library of 30 aluminum facade panel connection details modelled in Rhino. Covers bracket types, sub-structure interfaces, horizontal and vertical joints, and weathering conditions — production-grade geometry, fully annotated.',
    category: '3D Asset',
    price: '₺1,200',
    mode: 'download',
    deliveryType: 'Digital Download',
    included: [
      '30 Rhino 3dm detail files',
      'Layer-organized by connection type',
      'PDF reference sheet',
    ],
    requirements: ['Rhino 6 or later'],
    related: ['parametric-canopy-gh-file'],
    image: null,
  },
  {
    slug: 'parametric-canopy-gh-file',
    name: 'Parametric Canopy Grasshopper File',
    description: 'Full GH definition from the Hasyl Canopy project',
    detail:
      'The complete, annotated Grasshopper definition behind the Hasyl Canopy project. Includes surface rationalization, panel subdivision, substructure geometry, and perforation logic — a live case study file, not a stripped demo.',
    category: '3D Asset',
    price: '₺2,500',
    mode: 'download',
    deliveryType: 'Digital Download',
    included: [
      'Annotated Grasshopper definition (.gh)',
      'Base Rhino model (.3dm)',
      'Project notes PDF',
    ],
    requirements: ['Rhino 7 or later', 'Grasshopper'],
    related: ['facade-panel-detail-library', 'sheet-metal-unfolder-script'],
    image: null,
  },

  /* ── 3D Printing ───────────────────────────────────────────── */
  {
    slug: 'panel-sculpture-no1',
    name: 'AMD NSRI Panel Sculpture No.1',
    description: '3D printed aluminum-finish facade panel sculpture, 15cm',
    detail:
      'A physical object derived from AMD NSRI facade studies — a 15cm panel sculpture printed in high-detail resin with an aluminum-finish surface treatment. Limited production run, studio-signed.',
    category: '3D Printing',
    price: '—',
    mode: 'coming-soon',
    deliveryType: 'Physical',
    included: [
      'Studio-signed sculpture',
      'Numbered certificate',
      'Protective packaging',
    ],
    requirements: [],
    related: ['amd-nsri-lattice-pendant'],
    image: null,
  },
  {
    slug: 'amd-nsri-lattice-pendant',
    name: 'AMD NSRI Lattice Pendant',
    description: 'Generative lattice structure, resin printed',
    detail:
      'A wearable object generated from AMD NSRI lattice studies — a pendant in high-detail clear resin with internal structural geometry derived from parametric models. Limited production run.',
    category: '3D Printing',
    price: '—',
    mode: 'coming-soon',
    deliveryType: 'Physical',
    included: [
      'Pendant with cord',
      'Studio-signed card',
      'Protective packaging',
    ],
    requirements: [],
    related: ['panel-sculpture-no1'],
    image: null,
  },
];

/** Lookup by slug for the /shop/[slug] detail route + related lookups. */
export const productsBySlug: Record<string, ShopProduct> = Object.fromEntries(
  products.map(p => [p.slug, p]),
);

export default products;
