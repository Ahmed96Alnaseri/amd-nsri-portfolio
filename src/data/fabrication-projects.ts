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
      { src: '/Hasyl/render/CANOPY_V1_1 - Photo.jpg', subtitle: 'Exterior View' },
      { src: '/Hasyl/Diagram/ceiling türkmen.png',    subtitle: 'Ceiling Pattern Detail' },
      { src: '/Hasyl/Diagram/kolon4.png',             subtitle: 'Column Drawing' },
      { src: '/Hasyl/Diagram/kolon.png',              subtitle: 'Column Detail' },
      { src: '/Hasyl/render/CANOPY_V1_3 - Photo.jpg', subtitle: 'Canopy View 3' },
      { src: '/Hasyl/render/CANOPY_V1_4 - Photo.jpg', subtitle: 'Canopy View 4' },
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
      { src: '/Hospital in mansoor/hospital mansor gpt.png',  subtitle: 'Exterior View' },
      { src: '/Hospital in mansoor/hospital mansore.png',     subtitle: 'Interior View' },
      { src: '/Hospital in mansoor/facade hospital.png',      subtitle: 'Massing Model' },
      { src: '/Hospital in mansoor/detail 1.png',             subtitle: 'Facade Detail' },
      { src: '/Hospital in mansoor/panel facade hos.png',     subtitle: 'Panel Study' },
      { src: '/Hospital in mansoor/hos 1.png',                subtitle: 'Night View — Red' },
      { src: '/Hospital in mansoor/hos3.png',                 subtitle: 'Night View — Green' },
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
      { src: '/Restrant Kerkuk/IMG_3260.JPG',                 subtitle: 'Exterior View' },
      { src: '/Restrant Kerkuk/restaurant facade.png',        subtitle: 'Facade Study' },
      { src: '/Restrant Kerkuk/IMG_3266.JPG',                 subtitle: 'Street Corner View' },
      { src: '/Restrant Kerkuk/IMG_3261.JPG',                 subtitle: 'Facade at Dusk' },
      { src: '/Restrant Kerkuk/IMG_3259.JPG',                 subtitle: 'Facade Detail' },
      { src: '/Restrant Kerkuk/IMG_3262.JPG',                 subtitle: 'Cantilever Detail' },
      { src: '/Restrant Kerkuk/IMG_3264.JPG',                 subtitle: 'Facade Overhang' },
      { src: '/Restrant Kerkuk/IMG_3265.JPG',                 subtitle: 'Soffit Detail' },
      { src: '/Restrant Kerkuk/Resturant Facade part 1.png',  subtitle: 'Panel Gradient Model' },
      { src: '/Restrant Kerkuk/Resturant Facade part 2.png',  subtitle: 'Panel Study — Detail' },
    ],
  },
];

export default fabricationProjects;
