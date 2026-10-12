export type ProjectStatus = 'Completed' | 'In Production' | 'Released' | 'Concept' | 'Fabricated' | 'Live' | 'Competition';

export type ProjectCategory = 'Architecture' | 'Fabrication' | 'Tools' | 'Design' | 'Facade' | 'Digital Tool';

export interface Project {
  /** Zero-padded project number, e.g. "001" */
  num: string;
  title: string;
  /** Slug matching this project's entry in the architecture PROJECTS array — used to look up coverImage. */
  slug: string;
  category: ProjectCategory;
  year: string;
  status: ProjectStatus;
  /** One-sentence project concept shown on the card */
  concept: string;
  /** Keyword tags shown at the bottom of the card */
  tags: string[];
  /** Production keywords revealed on hover over the image */
  overlayKeywords: string[];
  /** URL for the case study page (for a tool card: the tool itself) */
  caseStudyLink: string;
  /** Selected Works only: 'contain' shows the whole cover in the card's box instead of cropping it to fill */
  coverFit?: 'contain';
  /** Selected Works only: where the cover sits in its box (CSS object-position), e.g. 'center top' */
  coverPosition?: string;
  /** A tool card instead of a project: its own cover image, translated title and an "Open Tool" link */
  tool?: {
    coverImage: string;
    /** English CTA label, translated through tv() */
    ctaLabel: string;
  };
}

const projects: Project[] = [
  {
    num: '001',
    title: 'Muğla Belediyesi Sosyal Hizmet Binası',
    slug: 'mugla-belediyesi-sosyal-hizmet-binasi',
    category: 'Architecture',
    year: '2026',
    status: 'Competition',
    concept:
      'Competition proposal for a municipal social services building in Muğla\'s historic Menteşe district, built around two public routes, a courtyard and a pocket theatre.',
    tags: ['Architecture', 'Competition', 'Civic', 'Public Building'],
    overlayKeywords: ['TIMBER SHADING', 'CENTRAL COURTYARD', 'POCKET THEATRE', 'COMPETITION ENTRY'],
    caseStudyLink: '/architecture/mugla-belediyesi-sosyal-hizmet-binasi',
    // the 16:9 render at its full width, building at the top of the near-square box: cropping it to fill
    // the box cut off the sides of the building
    coverFit: 'contain',
    coverPosition: 'center top',
  },
  /* Taken out of Selected Works (its slot now shows Muğla) but kept here: put its slug back in
     SELECTED_WORK_SLUGS (src/components/FeaturedWorksSection.tsx) to show it again. */
  {
    num: '001',
    title: 'Hasyl Canopy',
    slug: 'hasyl-canopy',
    category: 'Facade',
    year: '2025',
    status: 'Completed',
    concept:
      'A parametric facade system driven by solar exposure data, translating environmental logic into geometric perforation patterns.',
    tags: ['Facade', 'Parametric', 'Panelization', 'Rhino'],
    overlayKeywords: ['SHOP DRAWINGS', 'RATIONALIZATION', 'SUBSTRUCTURE', 'CNC READY'],
    caseStudyLink: '/architecture/001',
  },
  {
    num: '002',
    title: 'Toyota SAS & Lexus Showroom',
    slug: 'lexus-toyota-showroom-slemani',
    category: 'Facade',
    year: '2026',
    status: 'In Production',
    concept:
      '600 compound-curved aluminum panels, computationally clustered into repeatable types and automatically unfolded for CNC fabrication of a Sulaymaniyah showroom facade.',
    tags: ['Facade', 'Aluminum', 'Computational', 'Grasshopper'],
    overlayKeywords: ['600 PANELS', 'TOLERANCE GROUPING', 'AUTO UNFOLD', 'CNC READY'],
    caseStudyLink: '/architecture/lexus-toyota-showroom-slemani',
  },
  {
    num: '003',
    title: 'National Hospital Facade',
    slug: 'national-hospital-baghdad',
    category: 'Facade',
    year: '2025',
    status: 'Completed',
    concept:
      'A perforated aluminum facade for a cardiac hospital in Baghdad, its graduated pattern forming a glowing heart visible after dark.',
    tags: ['Facade', 'Perforated', 'Aluminum', 'Healthcare'],
    overlayKeywords: ['GRADIENT PATTERN', 'HEART GEOMETRY', 'DAY / NIGHT', 'PERFORATION FIELD'],
    caseStudyLink: '/architecture/national-hospital-baghdad',
  },
  {
    num: '004',
    title: 'Kerkuk Restaurant',
    slug: 'kerkuk-restaurant',
    category: 'Facade',
    year: '2024',
    status: 'Completed',
    concept:
      'A gradient multi-perforated aluminum facade for a restaurant in Kirkuk, hole density shifting from dense at the base to luminous at the crown.',
    tags: ['Facade', 'Perforated', 'Gradient', 'Restaurant'],
    overlayKeywords: ['GRADIENT DENSITY', 'CNC PUNCHED', 'FLAT PANELS', 'NIGHT GLOW'],
    caseStudyLink: '/architecture/kerkuk-restaurant',
  },
  {
    num: '005',
    title: 'IPunch — Image to Perforation',
    slug: 'ipunch',
    category: 'Digital Tool',
    year: '2026',
    status: 'Live',
    concept:
      'Converts grayscale imagery into variable-diameter perforation fields, translating pixel brightness into controlled hole sizes and density, with fabrication-ready DXF output.',
    tags: ['Image Sampling', 'Variable Perforation', 'DXF Output'],
    overlayKeywords: ['GRAYSCALE MAPPING', 'VARIABLE DIAMETERS', 'PUNCH SCHEDULE', 'CNC READY'],
    caseStudyLink: '/ipunch.html',
    tool: { coverImage: '/tools/ipunch/work.webp', ctaLabel: 'Open Tool' },
  },
  /* Taken out of Selected Works (its slot now shows IPunch) but kept here: put its slug back in
     SELECTED_WORK_SLUGS (src/components/FeaturedWorksSection.tsx) to show it again. */
  {
    num: '005',
    title: 'Balıkesir Cumhuriyet Meydanı',
    slug: 'balikesir-cumhuriyet-meydani',
    category: 'Architecture',
    year: '2026',
    status: 'Concept',
    concept:
      "A competition proposal reimagining Balıkesir's central square through a timber canopy and elevated deck, reinterpreting the city's traditional arasta culture.",
    tags: ['Competition', 'Urban Design', 'Timber', 'Public Space'],
    overlayKeywords: ['TIMBER CANOPY', 'PEDESTRIAN SPINE', 'PUBLIC DECK', 'COMPETITION ENTRY'],
    caseStudyLink: '/architecture/balikesir-cumhuriyet-meydani',
  },
  {
    num: '006',
    title: 'PPG Factory Facade',
    slug: 'ppg-factory-facade',
    category: 'Facade',
    year: '2024',
    status: 'Concept',
    concept:
      'A gradient multi-perforated aluminum cladding system for a paint factory in Bursa, panel geometry driven by a sine-based attractor field.',
    tags: ['Facade', 'Concept', 'Computational', 'Aluminum'],
    overlayKeywords: ['SINE ATTRACTOR', 'GRADIENT PERFORATION', 'PARAMETRIC PANELS', 'CONCEPT DESIGN'],
    caseStudyLink: '/architecture/ppg-factory-facade',
  },
];

export default projects;
