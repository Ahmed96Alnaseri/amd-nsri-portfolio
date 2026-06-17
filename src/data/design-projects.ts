export type DesignCategory =
  | 'Parametric'
  | 'Computational'
  | 'Facade Systems'
  | 'Competitions';

export interface DesignImage {
  /** Path relative to /public, e.g. "/study-01.png" */
  src: string;
  /** Caption shown on hover / in the lightbox */
  subtitle: string;
}

export interface DesignProject {
  title: string;
  category: DesignCategory;
  /** Info row — TYPE */
  type: string;
  /** Info row — SOFTWARE */
  software: string;
  /** Info row — YEAR */
  year: string;
  /** Info row — STATUS */
  status: string;
  /** Empty array renders an "imagery pending" placeholder card */
  images: DesignImage[];
  /**
   * When present, the card's main image + DISCOVER navigate here.
   * Real projects point at the existing case-study template (/architecture/[slug]).
   * Placeholder-only projects omit this and are not clickable.
   */
  detailHref?: string;
}

const designProjects: DesignProject[] = [
  {
    title: 'Hospital Facade Perforation System',
    category: 'Parametric',
    type: 'Perforated Facade',
    software: 'Grasshopper + Rhino',
    year: '2024',
    status: 'In Development',
    images: [],
    detailHref: '/architecture/hospital-facade-perforation-system',
  },
  {
    title: 'Aziz Gold Smith Facade',
    category: 'Facade Systems',
    type: 'Commercial Facade',
    software: 'Grasshopper + Rhino',
    year: '2024',
    status: 'Completed',
    images: [],
    detailHref: '/architecture/aziz-gold-smith-facade',
  },
  {
    title: 'Sustainable Cities Monument',
    category: 'Competitions',
    type: 'Monument',
    software: 'Grasshopper + Unreal Engine 5',
    year: '2024',
    status: 'Competition Entry',
    images: [],
    detailHref: '/architecture/sustainable-cities-monument',
  },
  {
    title: 'Woven Metal Grid Facade',
    category: 'Parametric',
    type: 'Woven Facade',
    software: 'Grasshopper',
    year: '2024',
    status: 'Research',
    images: [],
  },
  {
    title: 'Facade Configurator Web Tool',
    category: 'Computational',
    type: 'Web Application',
    software: 'Three.js + Next.js',
    year: '2025',
    status: 'Prototype',
    images: [],
  },
  {
    title: 'Panel Unfolding Algorithm',
    category: 'Computational',
    type: 'Geometry Tool',
    software: 'Grasshopper + GHPython',
    year: '2024',
    status: 'Research',
    images: [],
  },
];

export default designProjects;
