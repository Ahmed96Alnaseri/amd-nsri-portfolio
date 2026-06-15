export type ProjectStatus = 'Completed' | 'In Production' | 'Released' | 'Concept' | 'Fabricated';

export type ProjectCategory = 'Architecture' | 'Fabrication' | 'Tools' | 'Design' | 'Facade';

export interface Project {
  /** Zero-padded project number, e.g. "001" */
  num: string;
  title: string;
  category: ProjectCategory;
  year: string;
  status: ProjectStatus;
  /** One-sentence project concept shown on the card */
  concept: string;
  /** Keyword tags shown at the bottom of the card */
  tags: string[];
  /** Production keywords revealed on hover over the image */
  overlayKeywords: string[];
  /**
   * Path to the project image relative to /public.
   * e.g. "/projects/perforated-facade.jpg"
   * Leave as empty string "" until the image is ready — the placeholder grid will show instead.
   */
  image: string;
  /** URL for the case study page */
  caseStudyLink: string;
}

const projects: Project[] = [
  {
    num: '001',
    title: 'Hasyl Canopy',
    category: 'Facade',
    year: '2025',
    status: 'Completed',
    concept:
      'A parametric facade system driven by solar exposure data, translating environmental logic into geometric perforation patterns.',
    tags: ['Facade', 'Parametric', 'Panelization', 'Rhino'],
    overlayKeywords: ['SHOP DRAWINGS', 'RATIONALIZATION', 'SUBSTRUCTURE', 'CNC READY'],
    image: '/project-hysel-01.png',
    caseStudyLink: '/architecture/001',
  },
  {
    num: '002',
    title: 'Folded Aluminum Canopy',
    category: 'Fabrication',
    year: '2024',
    status: 'In Production',
    concept:
      'Structural canopy developed from a single folded geometry, optimized for CNC cutting and on-site assembly with minimal connections.',
    tags: ['Unfolding', 'Aluminum', 'Structure', 'Assembly'],
    overlayKeywords: ['UNFOLDING', 'TOLERANCE STUDY', 'JOINT DETAIL', 'MATERIAL SPEC'],
    image: '',
    caseStudyLink: '/architecture/002',
  },
  {
    num: '003',
    title: 'Grasshopper Panelization Engine',
    category: 'Tools',
    year: '2023',
    status: 'Released',
    concept:
      'A Grasshopper definition that divides any freeform surface into fabrication-ready flat panels with automatic seam logic and numbering.',
    tags: ['Grasshopper', 'Automation', 'Plugin', 'Workflow'],
    overlayKeywords: ['DEFINITION', 'SEAM LOGIC', 'AUTO NUMBERING', 'EXPORT READY'],
    image: '',
    caseStudyLink: '/architecture/003',
  },
  {
    num: '004',
    title: 'Residential Tower Skin Study',
    category: 'Architecture',
    year: '2023',
    status: 'Concept',
    concept:
      'Facade language exploration for a high-rise residential project — testing depth, shadow, and materiality across twelve skin variations.',
    tags: ['High-Rise', 'Visualization', 'Concept', 'Urban'],
    overlayKeywords: ['12 VARIATIONS', 'SHADOW STUDY', 'DEPTH 200–600mm', 'MATERIAL OPTIONS'],
    image: '',
    caseStudyLink: '/architecture/004',
  },
  {
    num: '005',
    title: 'Laser-Cut Screen Partition',
    category: 'Design',
    year: '2024',
    status: 'Fabricated',
    concept:
      'Interior screen system derived from Islamic geometric patterns, rationalized for laser cutting in 3mm steel with press-fit assembly.',
    tags: ['Laser Cut', 'Interior', 'Steel', 'Pattern'],
    overlayKeywords: ['3mm STEEL', 'PRESS-FIT', 'LASER PATH', 'PATTERN DENSITY'],
    image: '',
    caseStudyLink: '/architecture/005',
  },
  {
    num: '006',
    title: 'Parametric Stair Balustrade',
    category: 'Fabrication',
    year: '2023',
    status: 'Completed',
    concept:
      'Balustrade geometry generated from stair geometry — each panel unique, all derived from a single parametric rule and exported as individual DXF files.',
    tags: ['Stair', 'DXF Export', 'Unique Panels', 'Steel'],
    overlayKeywords: ['UNIQUE PANELS', 'DXF EXPORT', 'BEND RADIUS', 'WELD SPEC'],
    image: '',
    caseStudyLink: '/architecture/006',
  },
];

export default projects;
