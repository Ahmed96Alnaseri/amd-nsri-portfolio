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
      { src: '/Kalilou Kaba/render/image 11.png', subtitle: 'Exterior View' },
      { src: '/Kalilou Kaba/render/İmage 2.png', subtitle: 'Facade Detail' },
      { src: '/Kalilou Kaba/render/interior.png', subtitle: 'Interior View' },
      { src: '/Kalilou Kaba/render/İmage 3.png', subtitle: 'Corten Panel Close-up' },
      { src: '/Kalilou Kaba/render/image 4.png', subtitle: 'Living Room View' },
      { src: '/Kalilou Kaba/render/model.png',   subtitle: 'Massing Model' },
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
      { src: '/Baghdad Private Hospital/Render/facade 1.jpeg',           subtitle: 'Main Entrance' },
      { src: '/Baghdad Private Hospital/Render/Exterior hospital 2.png', subtitle: 'Facade Detail' },
      { src: '/Baghdad Private Hospital/Render/scrpt.png',               subtitle: 'Parametric Definition' },
      { src: '/Baghdad Private Hospital/Render/model1.jpeg',             subtitle: 'Panel Shop Drawing' },
      { src: '/Baghdad Private Hospital/Render/facade 1.jpeg',           subtitle: 'Main Entrance' },
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
      { src: '/Balıkesir Cumhuriyet meydanı/Renderlar-usb/1.jpg', subtitle: 'Elevated Deck View' },
      { src: '/Balıkesir Cumhuriyet meydanı/Renderlar-usb/5.jpg', subtitle: 'Main Square View' },
      { src: '/Balıkesir Cumhuriyet meydanı/Renderlar-usb/6.jpg', subtitle: 'Timber Canopy View' },
      { src: '/Balıkesir Cumhuriyet meydanı/Renderlar-usb/7.jpg', subtitle: 'Covered Passage View' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/1. kat planı.jpg', subtitle: 'First Floor Plan' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/GÖRÜNÜŞ 1.jpg', subtitle: 'Elevation 1' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/GÖRÜNÜŞ 2.jpg', subtitle: 'Elevation 2' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/KESİT DETAY.jpg', subtitle: 'Section Detail' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/VAZİYET PLANI.jpg', subtitle: 'Site Plan' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/ZEMİN KAT PLANI 2.png', subtitle: 'Ground Floor Plan' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/senaryolar 1.jpg', subtitle: 'Use Scenario 1' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/senaryolar 2.jpg', subtitle: 'Use Scenario 2' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/senaryolar 3.jpg', subtitle: 'Use Scenario 3' },
      { src: '/Balıkesir Cumhuriyet meydanı/diagram-plan-kesit görünüşler/senaryolar 4.jpg', subtitle: 'Use Scenario 4' },
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
    category: 'Facade Systems',
    type: 'Facade Design',
    software: 'Grasshopper + Rhino',
    year: '2025',
    status: 'Concept Design',
    detailHref: '/architecture/national-hospital-baghdad',
    images: [
      { src: '/Hospital in mansoor/hospital mansore.png',     subtitle: 'Interior View' },
      { src: '/Hospital in mansoor/hospital mansor gpt.png',  subtitle: 'Exterior View' },
      { src: '/Hospital in mansoor/facade hospital.png',      subtitle: 'Massing Model' },
      { src: '/Hospital in mansoor/detail 1.png',             subtitle: 'Facade Detail' },
      { src: '/Hospital in mansoor/panel facade hos.png',     subtitle: 'Panel Study' },
      { src: '/Hospital in mansoor/hos 1.png',                subtitle: 'Night View — Red' },
      { src: '/Hospital in mansoor/hos3.png',                 subtitle: 'Night View — Green' },
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
      { src: '/PPG FACADE/RENDER/V3_2.png', subtitle: 'Exterior View' },
      { src: '/PPG FACADE/RENDER/V3_1.png', subtitle: 'Facade Detail' },
      { src: '/PPG FACADE/RENDER/V3_3.png', subtitle: 'Panel Study' },
      { src: '/PPG FACADE/RENDER/4.png',    subtitle: 'Close-up' },
      { src: '/PPG FACADE/RENDER/v4.png',   subtitle: 'Courtyard Detail' },
    ],
  },
];

export default designProjects;
