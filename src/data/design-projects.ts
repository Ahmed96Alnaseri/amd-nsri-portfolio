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
    title: 'Corten Facade Villa',
    category: 'Facade Systems',
    type: 'Villa',
    software: 'Grasshopper + Rhino',
    year: '2026',
    status: 'Concept Design',
    detailHref: '/architecture/corten-facade-villa',
    images: [
      { src: '/projects/corten-facade-villa/renders/image-11.webp', subtitle: 'Exterior View' },
      { src: '/projects/corten-facade-villa/renders/image-2.webp', subtitle: 'Facade Detail' },
      { src: '/projects/corten-facade-villa/renders/interior.webp', subtitle: 'Interior View' },
      { src: '/projects/corten-facade-villa/renders/image-3.webp', subtitle: 'Corten Panel Close-up' },
      { src: '/projects/corten-facade-villa/renders/image-4.webp', subtitle: 'Living Room View' },
      { src: '/projects/corten-facade-villa/renders/model.webp',   subtitle: 'Massing Model' },
    ],
  },
  {
    title: 'Baghdad Private Hospital',
    category: 'Facade Systems',
    type: 'Hospital',
    software: 'Grasshopper + Rhino',
    year: '2026',
    status: 'Concept Design',
    detailHref: '/architecture/baghdad-private-hospital',
    images: [
      { src: '/projects/baghdad-private-hospital/renders/facade-1.webp',           subtitle: 'Main Entrance' },
      { src: '/projects/baghdad-private-hospital/renders/exterior-hospital-2.webp', subtitle: 'Facade Detail' },
      { src: '/projects/baghdad-private-hospital/renders/scrpt.webp',               subtitle: 'Parametric Definition' },
      { src: '/projects/baghdad-private-hospital/renders/model1.webp',             subtitle: 'Panel Shop Drawing' },
      { src: '/projects/baghdad-private-hospital/renders/facade-1.webp',           subtitle: 'Main Entrance' },
    ],
  },
  {
    title: 'Balıkesir Cumhuriyet Meydanı',
    category: 'Competitions',
    type: 'Urban Design',
    software: 'AutoCAD + 3ds Max',
    year: '2026',
    status: 'Competition',
    detailHref: '/architecture/balikesir-cumhuriyet-meydani',
    images: [
      { src: '/projects/balikesir-cumhuriyet-meydani/card/1.webp', subtitle: 'Elevated Deck View' },
      { src: '/projects/balikesir-cumhuriyet-meydani/card/5.webp', subtitle: 'Main Square View' },
      { src: '/projects/balikesir-cumhuriyet-meydani/card/6.webp', subtitle: 'Timber Canopy View' },
      { src: '/projects/balikesir-cumhuriyet-meydani/card/7.webp', subtitle: 'Covered Passage View' },
      { src: '/projects/balikesir-cumhuriyet-meydani/card/1-kat-plani.webp', subtitle: 'First Floor Plan' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/gorunus-1.webp', subtitle: 'Elevation 1' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/gorunus-2.webp', subtitle: 'Elevation 2' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/kesit-detay.webp', subtitle: 'Section Detail' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/vaziyet-plani.webp', subtitle: 'Site Plan' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/zemin-kat-plani-2.webp', subtitle: 'Ground Floor Plan' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/senaryolar-1.webp', subtitle: 'Use Scenario 1' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/senaryolar-2.webp', subtitle: 'Use Scenario 2' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/senaryolar-3.webp', subtitle: 'Use Scenario 3' },
      { src: '/projects/balikesir-cumhuriyet-meydani/drawings/senaryolar-4.webp', subtitle: 'Use Scenario 4' },
    ],
  },
  {
    title: 'Muğla Belediyesi Sosyal Hizmet Binası',
    category: 'Competitions',
    type: 'Social Services Building',
    // same team as Balıkesir; confirm the software
    software: 'AutoCAD + 3ds Max',
    year: '2026',
    status: 'Competition',
    detailHref: '/architecture/mugla-belediyesi-sosyal-hizmet-binasi',
    images: [
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/01-street-corner-view.webp', subtitle: 'Street Corner View' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/02-entrance-courtyard.webp', subtitle: 'Entrance Courtyard' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/03-timber-shading-facade.webp', subtitle: 'Timber Shading Façade' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/04-pocket-theatre.webp', subtitle: 'Pocket Theatre' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/05-interior-corridor.webp', subtitle: 'Interior Corridor' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/06-site-plan.webp', subtitle: 'Site Plan' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/07-first-floor-plan.webp', subtitle: 'First Floor Plan' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/08-section.webp', subtitle: 'Section' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/09-street-elevation.webp', subtitle: 'Street Elevation' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/10-public-routes-axonometric.webp', subtitle: 'Public Routes Axonometric' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/11-massing-formation.webp', subtitle: 'Massing Formation' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/12-theatre-amphitheatre-axonometric.webp', subtitle: 'Theatre & Amphitheatre Axonometric' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/13-amphitheatre-section.webp', subtitle: 'Amphitheatre Section' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/14-terrace-axonometric.webp', subtitle: 'Terrace Axonometric' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/15-courtyard-axonometric.webp', subtitle: 'Courtyard Axonometric' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/16-enclosed-courtyard-axonometric.webp', subtitle: 'Enclosed Courtyard Axonometric' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/17-facade-shading-diagram.webp', subtitle: 'Façade Shading Diagram' },
    ],
  },
  {
    title: 'Hasyl Canopy',
    category: 'Parametric',
    type: 'Parametric Canopy',
    software: 'Grasshopper + Rhino',
    year: '2025',
    status: 'Concept Design',
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
    category: 'Facade Systems',
    type: 'Facade Design',
    software: 'Grasshopper + Rhino',
    year: '2025',
    status: 'Concept Design',
    detailHref: '/architecture/national-hospital-baghdad',
    images: [
      { src: '/projects/national-hospital-baghdad/hospital-mansore.webp',     subtitle: 'Interior View' },
      { src: '/projects/national-hospital-baghdad/hospital-mansor-gpt.webp',  subtitle: 'Exterior View' },
      { src: '/projects/national-hospital-baghdad/card/facade-hospital.webp',      subtitle: 'Massing Model' },
      { src: '/projects/national-hospital-baghdad/detail-1.webp',             subtitle: 'Facade Detail' },
      { src: '/projects/national-hospital-baghdad/card/panel-facade-hos.webp',     subtitle: 'Panel Study' },
      { src: '/projects/national-hospital-baghdad/hos-1.webp',                subtitle: 'Night View — Red' },
      { src: '/projects/national-hospital-baghdad/hos3.webp',                 subtitle: 'Night View — Green' },
    ],
  },
  {
    title: 'PPG Factory Facade',
    category: 'Facade Systems',
    type: 'Facade Design',
    software: 'Grasshopper + Rhino',
    year: '2024',
    status: 'Concept Design',
    detailHref: '/architecture/ppg-factory-facade',
    images: [
      { src: '/projects/ppg-factory-facade/renders/v3-2.png', subtitle: 'Exterior View' },
      { src: '/projects/ppg-factory-facade/renders/v3-1.png', subtitle: 'Facade Detail' },
      { src: '/projects/ppg-factory-facade/renders/v3-3.png', subtitle: 'Panel Study' },
      { src: '/projects/ppg-factory-facade/renders/4.png',    subtitle: 'Close-up' },
      { src: '/projects/ppg-factory-facade/renders/v4.png',   subtitle: 'Courtyard Detail' },
    ],
  },
];

export default designProjects;
