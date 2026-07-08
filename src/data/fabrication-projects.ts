export type FabricationCategory =
  | 'Cladding'
  | 'Perforated Panels'
  | 'Shop Drawings'
  | 'Unfolding';

export interface FabricationImage {
  /** Path relative to /public, e.g. "/kolon.png" */
  src: string;
  /** Caption shown on hover / in the lightbox */
  subtitle: string;
}

export interface FabricationProject {
  title: string;
  category: FabricationCategory;
  /** Info row — TYPE */
  type: string;
  /** Info row — MATERIAL */
  material: string;
  /** Info row — YEAR */
  year: string;
  /** Info row — LOCATION */
  location: string;
  /** Empty array renders an "imagery pending" placeholder card */
  images: FabricationImage[];
  /**
   * When present, the card's main image + DISCOVER navigate here.
   * Real projects point at the existing case-study template (/architecture/[slug]).
   * Placeholder projects omit this and are not clickable.
   */
  detailHref?: string;
}

const fabricationProjects: FabricationProject[] = [
  {
    title: 'Hasyl Perforated Canopy',
    category: 'Perforated Panels',
    type: 'Parametric Canopy',
    material: 'Aluminum Composite',
    year: '2025',
    location: 'Turkmenistan',
    images: [],
  },
  {
    title: 'Hasyl Column Connection',
    category: 'Shop Drawings',
    type: 'Structural Node',
    material: 'Steel + Aluminum',
    year: '2025',
    location: 'Turkmenistan',
    images: [],
  },
  {
    title: 'Folded Aluminum Cladding',
    category: 'Cladding',
    type: 'Facade Cladding',
    material: 'Aluminum 3mm',
    year: '2024',
    location: 'Istanbul, Türkiye',
    images: [],
  },
  {
    title: 'Sheet Unfolding Study',
    category: 'Unfolding',
    type: 'Sheet Development',
    material: 'Sheet Steel 2mm',
    year: '2023',
    location: 'Istanbul, Türkiye',
    images: [],
  },
  {
    title: 'Laser-Cut Screen Partition',
    category: 'Perforated Panels',
    type: 'Interior Screen',
    material: 'Mild Steel 3mm',
    year: '2024',
    location: 'Baghdad, Iraq',
    images: [],
  },
  {
    title: 'Standing-Seam Roof System',
    category: 'Cladding',
    type: 'Roof System',
    material: 'Zinc',
    year: '2025',
    location: 'Istanbul, Türkiye',
    images: [],
  },
];

export default fabricationProjects;
