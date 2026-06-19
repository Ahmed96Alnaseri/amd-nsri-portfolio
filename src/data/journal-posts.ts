export type JournalCategory =
  | 'Process'
  | 'Computational'
  | 'Fabrication'
  | 'Tools'
  | 'Reflection';

/** A single block of article body — rendered on the detail page. */
export type JournalBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string };

export interface JournalPost {
  /** URL slug — /journal/[slug] */
  slug: string;
  /** Title — DM Serif Display (translated via tv()) */
  title: string;
  /** One-line excerpt for cards + detail lede (translated via tv()) */
  excerpt: string;
  /** Category badge */
  category: JournalCategory;
  /** Publication year, e.g. "2024" */
  year: string;
  /** Publication month, e.g. "12" */
  month: string;
  /** Estimated reading time in minutes */
  readingMins: number;
  /** One post is the large, full-width featured article at the top */
  featured?: boolean;
  /** Article body (detail page) — long-form, falls through tv() untranslated */
  body: JournalBlock[];
  /** Related post slugs */
  related: string[];
}

/** Filter chips shown above the grid (in order). */
export const JOURNAL_FILTERS = [
  'All',
  'Process',
  'Computational',
  'Fabrication',
  'Tools',
  'Reflection',
] as const;
export type JournalFilter = (typeof JOURNAL_FILTERS)[number];

const posts: JournalPost[] = [
  {
    slug: 'why-facades-fail-between-render-and-fabrication',
    title: 'Why Facades Fail Between Render and Fabrication',
    excerpt:
      'The gap between what architects draw and what fabricators build is where most facade projects lose quality, budget, and time.',
    category: 'Process',
    year: '2024',
    month: '12',
    readingMins: 6,
    featured: true,
    body: [
      { type: 'p', text: 'An architectural render is a promise made in pixels. The light is perfect, the panels are seamless, the joints disappear. Then the project reaches a workshop, and the promise meets the press brake, the sheet size, and the tolerance stack. The distance between those two states is where most facade projects quietly lose quality, budget, and time.' },
      { type: 'h2', text: 'The render is not a drawing' },
      { type: 'p', text: 'A render answers one question: how will this look? Fabrication asks a different set entirely — how is this cut, folded, fixed, sequenced, and transported? When the design is resolved only to the resolution of the render, those questions are pushed downstream to people who did not author the intent, and who must now reverse-engineer it under deadline.' },
      { type: 'h2', text: 'Where the promise breaks' },
      { type: 'p', text: 'It breaks at the panel edge, where a clean line in the model becomes a bend that the material cannot hold. It breaks at the corner, where three surfaces meet and no one decided which one wins. It breaks in the schedule, where two hundred "unique" panels could have been forty. Each break is a decision that was deferred rather than designed.' },
      { type: 'h2', text: 'Closing the gap' },
      { type: 'p', text: 'The fix is not more detail for its own sake. It is moving fabrication logic upstream — into the model, into the definition, into the first conversations about form. When unfolding, panel rationalization, and tolerance live inside the design tool, the render stops being a promise and starts being a specification. That is the entire premise of AMD NSRI.' },
    ],
    related: [
      'panel-type-reduction-40-percent',
      'hasyl-canopy-to-production',
    ],
  },
  {
    slug: 'panel-type-reduction-40-percent',
    title: 'Panel Type Reduction: How One Algorithm Saved 40% on Fabrication Cost',
    excerpt:
      'A single panel-grouping algorithm collapsed hundreds of "unique" panels into a handful of types — and took the fabrication bill down with them.',
    category: 'Computational',
    year: '2024',
    month: '11',
    readingMins: 5,
    body: [
      { type: 'p', text: 'On a freeform facade, almost every panel is technically unique. Technically. The differences between many of them are smaller than the fabrication tolerance — which means treating them as distinct is paying for precision no one can measure.' },
      { type: 'h2', text: 'Unique is expensive' },
      { type: 'p', text: 'Every unique panel type is a unique cutting file, a unique mould or jig, a unique line on the schedule, and a unique opportunity for error on site. Reduce the number of types and you reduce all four at once.' },
      { type: 'h2', text: 'Grouping by tolerance' },
      { type: 'p', text: 'The algorithm is simple in principle: cluster panels whose dimensions fall within a chosen tolerance band, then represent each cluster with a single fabricable type. The art is in choosing the band — tight enough that the surface still reads as intended, loose enough that the savings are real. On one project, that single move cut unique types by roughly 40%, and the fabrication cost followed.' },
    ],
    related: [
      'why-facades-fail-between-render-and-fabrication',
      'hasyl-canopy-to-production',
    ],
  },
  {
    slug: 'k-factor-and-bend-allowance',
    title: 'K-Factor and Bend Allowance: What Every Architect Should Know',
    excerpt:
      "Bend allowance isn't a fabrication footnote. It decides whether your folded geometry closes — or fails on the brake.",
    category: 'Fabrication',
    year: '2024',
    month: '10',
    readingMins: 4,
    body: [
      { type: 'p', text: 'When sheet metal is folded, the material on the outside of the bend stretches and the inside compresses. Somewhere between them sits a neutral axis that does neither. Where that axis sits — expressed as the k-factor — determines how much flat material a bend actually consumes.' },
      { type: 'h2', text: 'Why architects should care' },
      { type: 'p', text: 'Because if the flat pattern is cut without accounting for bend allowance, the folded part will not match the model. Holes drift, edges miss, panels that should close leave a gap. The geometry was right; the development was wrong.' },
      { type: 'h2', text: 'A number, not a guess' },
      { type: 'p', text: 'The k-factor is not folklore — it is a property of the material and the tooling, typically between 0.3 and 0.5 for aluminum. Set it correctly in your unfolding tool and the flat pattern lands on the brake exactly where the model predicted. That is the whole job.' },
    ],
    related: [
      'building-the-sheet-metal-unfolder',
      'why-facades-fail-between-render-and-fabrication',
    ],
  },
  {
    slug: 'building-the-sheet-metal-unfolder',
    title: 'Building the Sheet Metal Unfolder in GHPython',
    excerpt:
      'Building a sheet-metal unfolder from scratch in GHPython — geometry, k-factor, and DXF export, one decision at a time.',
    category: 'Tools',
    year: '2024',
    month: '09',
    readingMins: 7,
    body: [
      { type: 'p', text: 'Commercial unfolding tools exist, but building your own teaches you exactly what the operation is — and lets you bend it to the way you actually work. This is the shape of the GHPython tool behind AMD NSRI.' },
      { type: 'h2', text: 'Walking the faces' },
      { type: 'p', text: 'Unfolding is a traversal problem. Pick a base face, then walk to each adjacent face across its shared edge, rotating it flat into the base plane. Repeat until every face has been laid down. The data structure that matters is the adjacency graph; get that right and the geometry follows.' },
      { type: 'h2', text: 'Folding the k-factor in' },
      { type: 'p', text: 'At each shared edge, the bend allowance is inserted so the flat pattern reserves the right amount of material for the fold. This is where the k-factor enters the code — not as an afterthought, but as a parameter on every edge transition.' },
      { type: 'h2', text: 'Out to the floor' },
      { type: 'p', text: 'The last step is export. Flattened outlines, fold lines on a separate layer, and bend annotations write out to DXF — the format the laser and the press brake actually read. From model to machine in one definition.' },
    ],
    related: [
      'k-factor-and-bend-allowance',
      'panel-type-reduction-40-percent',
    ],
  },
  {
    slug: 'hasyl-canopy-to-production',
    title: 'From Hasyl Canopy to Production: A Parametric Fabrication Case Study',
    excerpt:
      'Following the Hasyl Canopy from parametric model to fabricated reality — every decision that made it buildable.',
    category: 'Process',
    year: '2024',
    month: '08',
    readingMins: 8,
    body: [
      { type: 'p', text: 'The Hasyl Canopy began as a pattern and ended as a structure standing at a building entrance. Between those two points is a chain of decisions, each one narrowing the distance between intention and assembly.' },
      { type: 'h2', text: 'From pattern to surface' },
      { type: 'p', text: 'The geometry started in an Islamic geometric pattern, abstracted into a parametric definition. Controlling the pattern at the definition level meant the density, scale, and rhythm could be tuned without redrawing a single line by hand.' },
      { type: 'h2', text: 'From surface to panels' },
      { type: 'p', text: 'The continuous surface was then rationalized into panels sized for the sheet stock and the cutting bed, numbered automatically, and checked against the substructure. Rationalization is where ambition meets the loading dock.' },
      { type: 'h2', text: 'From panels to assembly' },
      { type: 'p', text: 'Finally, the connection logic and assembly sequence were resolved so the parts arrived on site ready to go together in a known order. The canopy was buildable because buildability was designed into it from the first parameter.' },
    ],
    related: [
      'why-facades-fail-between-render-and-fabrication',
      'panel-type-reduction-40-percent',
    ],
  },
  {
    slug: 'why-i-started-amd-nsri',
    title: 'Why I Started AMD NSRI',
    excerpt:
      'Why I left the comfort of pure architecture to build the bridge between design and fabrication.',
    category: 'Reflection',
    year: '2024',
    month: '07',
    readingMins: 3,
    body: [
      { type: 'p', text: 'I trained as an architect, but I kept finding myself drawn to the parts of the work most architects hand off — the panel that has to fold, the joint that has to close, the file the workshop actually opens.' },
      { type: 'h2', text: 'The handoff problem' },
      { type: 'p', text: 'Again and again I watched good designs degrade at the handoff between design and fabrication. Not because anyone was careless, but because the two worlds spoke different languages and no one was responsible for the translation.' },
      { type: 'h2', text: 'A platform, not a portfolio' },
      { type: 'p', text: 'AMD NSRI is my attempt to be that translation — a platform that carries an idea from concept to geometry to system to tool to fabricated reality, without losing intent at any seam. It is named for that path: a goal, a distance, the route toward a destination.' },
    ],
    related: [
      'hasyl-canopy-to-production',
      'why-facades-fail-between-render-and-fabrication',
    ],
  },
];

/** Lookup by slug for the /journal/[slug] detail route + related lookups. */
export const postsBySlug: Record<string, JournalPost> = Object.fromEntries(
  posts.map(p => [p.slug, p]),
);

export default posts;
