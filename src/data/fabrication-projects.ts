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
    title: 'Hasyl Canopy',
    category: 'Perforated Panels',
    type: 'Parametric Canopy',
    material: 'Aluminum Composite',
    year: '2025',
    location: 'Awaza, Turkmenistan',
    detailHref: '/architecture/hasyl-canopy',
    images: [
      { src: '/projects/hasyl-canopy/card/canopy-v1-1-photo.webp', subtitle: 'Exterior View' },
      { src: '/projects/hasyl-canopy/card/ceiling-turkmen.webp',    subtitle: 'Ceiling Pattern Detail' },
      { src: '/projects/hasyl-canopy/drawings/kolon4.webp',             subtitle: 'Column Drawing' },
      { src: '/projects/hasyl-canopy/card/kolon.webp',              subtitle: 'Column Detail' },
      { src: '/projects/hasyl-canopy/card/canopy-v1-3-photo.webp', subtitle: 'Canopy View 3' },
      { src: '/projects/hasyl-canopy/renders/canopy-v1-4-photo.webp', subtitle: 'Canopy View 4' },
    ],
  },
  {
    title: 'National Hospital Facade',
    category: 'Perforated Panels',
    type: 'Facade Design',
    material: 'Perforated Aluminum',
    year: '2025',
    location: 'Baghdad, Iraq',
    detailHref: '/architecture/national-hospital-facade',
    images: [
      { src: '/projects/national-hospital-baghdad/hospital-mansor-gpt.webp',  subtitle: 'Exterior View' },
      { src: '/projects/national-hospital-baghdad/hospital-mansore.webp',     subtitle: 'Interior View' },
      { src: '/projects/national-hospital-baghdad/card/facade-hospital.webp',      subtitle: 'Massing Model' },
      { src: '/projects/national-hospital-baghdad/detail-1.webp',             subtitle: 'Facade Detail' },
      { src: '/projects/national-hospital-baghdad/card/panel-facade-hos.webp',     subtitle: 'Panel Study' },
      { src: '/projects/national-hospital-baghdad/hos-1.webp',                subtitle: 'Night View — Red' },
      { src: '/projects/national-hospital-baghdad/hos3.webp',                 subtitle: 'Night View — Green' },
    ],
  },
  {
    title: 'Kerkuk Restaurant',
    category: 'Perforated Panels',
    type: 'Facade Design',
    material: 'Perforated Aluminum',
    year: '2024',
    location: 'Kirkuk, Iraq',
    detailHref: '/architecture/kerkuk-restaurant',
    images: [
      { src: '/projects/kerkuk-restaurant/img-3266.jpg',                 subtitle: 'Street Corner View' },
      { src: '/projects/kerkuk-restaurant/img-3260.jpg',                 subtitle: 'Exterior View' },
      { src: '/projects/kerkuk-restaurant/img-3261.jpg',                 subtitle: 'Facade at Dusk' },
      { src: '/projects/kerkuk-restaurant/img-3259.jpg',                 subtitle: 'Facade Detail' },
      { src: '/projects/kerkuk-restaurant/img-3262.jpg',                 subtitle: 'Cantilever Detail' },
      { src: '/projects/kerkuk-restaurant/img-3264.jpg',                 subtitle: 'Facade Overhang' },
      { src: '/projects/kerkuk-restaurant/img-3265.jpg',                 subtitle: 'Soffit Detail' },
      { src: '/projects/kerkuk-restaurant/restaurant-facade.png',        subtitle: 'Facade Study' },
      { src: '/projects/kerkuk-restaurant/resturant-facade-part-1.png',  subtitle: 'Panel Gradient Model' },
      { src: '/projects/kerkuk-restaurant/resturant-facade-part-2.png',  subtitle: 'Panel Study — Detail' },
    ],
  },
  {
    title: 'Toyota SAS & Lexus Showroom',
    category: 'Perforated Panels',
    type: 'Facade Design',
    material: 'Compound-Curved Aluminum',
    year: '2026',
    location: 'Sulaymaniyah, Iraq',
    detailHref: '/architecture/lexus-toyota-showroom-slemani',
    images: [
      { src: '/projects/lexus-toyota-showroom-slemani/card/lexus-facade.webp',        subtitle: 'Exterior View' },
      { src: '/projects/lexus-toyota-showroom-slemani/card/complete-facade-3d.webp',  subtitle: 'Complete Facade Model' },
      { src: '/projects/lexus-toyota-showroom-slemani/facade-2.webp',            subtitle: 'Facade Detail' },
      { src: '/projects/lexus-toyota-showroom-slemani/facade-3.webp',            subtitle: 'Panel Installation Detail' },
      { src: '/projects/lexus-toyota-showroom-slemani/facade-4.webp',            subtitle: 'Construction Progress' },
      { src: '/projects/lexus-toyota-showroom-slemani/facade-5.webp',            subtitle: 'Facade Underside View' },
      { src: '/projects/lexus-toyota-showroom-slemani/mockup.webp',             subtitle: 'Panel Mockup' },
      { src: '/projects/lexus-toyota-showroom-slemani/3d-model-mockup.webp',     subtitle: 'Panel Type Grouping' },
      { src: '/projects/lexus-toyota-showroom-slemani/poses-3d.webp',            subtitle: 'Panel Type Map' },
      { src: '/projects/lexus-toyota-showroom-slemani/poses-3d-2.webp',          subtitle: 'Panel Type Map — End View' },
      { src: '/projects/lexus-toyota-showroom-slemani/poses-3d-3.webp',          subtitle: 'Panel Type Map — Perspective' },
      { src: '/projects/lexus-toyota-showroom-slemani/planar-script.webp',       subtitle: 'Grasshopper Script — Planarity Check' },
    ],
  },
];

export default fabricationProjects;
