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
];

export default designProjects;
