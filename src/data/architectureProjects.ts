export const slugify = (t: string) => t.toLowerCase().replace(/\s+/g, '-');

export type ProjectImage = { src: string; subtitle: string; position?: string };
export type Category = 'Residential' | 'Commercial' | 'Competition' | 'Mixed Use';

export type Project = {
  title: string;
  /** Explicit URL slug override. Use for titles with non-ASCII characters —
   * slugify() only lowercases and swaps spaces for hyphens, it does not
   * transliterate, so a title like "Balıkesir..." would otherwise produce a
   * non-ASCII URL segment that Next.js dynamic routing does not reliably match. */
  slug?: string;
  category: Category;
  type: string;
  year: string;
  location: string;
  architect: string;
  area: string;
  /** Canonical thumbnail/hero image — authoritative source for the card's main image, independent of images[] order. */
  coverImage: string;
  images: ProjectImage[];
};

export const PROJECTS: Project[] = [
  {
    title: 'Corten Facade Villa',
    category: 'Residential',
    type: 'Villa',
    year: '2026',
    location: 'Lamu, Kenya',
    architect: 'Ahmed Alnaseri, Yassir Rawi',
    area: '140 m²',
    coverImage: '/Kalilou Kaba/render/image 11.png',
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
    category: 'Commercial',
    type: 'Hospital',
    year: '2026',
    location: 'Baghdad, Iraq',
    architect: 'Ahmed Alnaseri, Yassir Rawi',
    area: '800 m²',
    coverImage: '/Baghdad Private Hospital/Render/facade 1.jpeg',
    images: [
      { src: '/Baghdad Private Hospital/Render/facade 1.jpeg',           subtitle: 'Main Entrance' },
      { src: '/Baghdad Private Hospital/Render/Exterior hospital 2.png', subtitle: 'Facade Detail' },
      { src: '/Baghdad Private Hospital/Render/scrpt.png',               subtitle: 'Parametric Definition' },
      { src: '/Baghdad Private Hospital/Render/model1.jpeg',             subtitle: 'Panel Shop Drawing' },
      { src: '/Baghdad Private Hospital/Render/facade 1.jpeg',           subtitle: 'Main Entrance' },
    ],
  },
  {
    title: 'Hasyl Canopy',
    category: 'Commercial',
    type: 'Parametric Canopy',
    year: '2025',
    location: 'Awaza, Turkmenistan',
    architect: 'Ahmed Alnaseri, Furkan Kartekin',
    area: '500 m²',
    coverImage: '/Hasyl/render/CANOPY_V1_1 - Photo.jpg',
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
    slug: 'national-hospital-baghdad',
    category: 'Commercial',
    type: 'Facade Design',
    year: '2025',
    location: 'Baghdad, Iraq',
    architect: 'Ahmed Alnaseri',
    area: '300 m²',
    coverImage: '/Hospital in mansoor/hospital mansore.png',
    images: [
      { src: '/Hospital in mansoor/hospital mansore.png',     subtitle: 'Interior View' },
      { src: '/Hospital in mansoor/hospital mansor gpt.png',  subtitle: 'Exterior View', position: 'center 35%' },
      { src: '/Hospital in mansoor/facade hospital.png',      subtitle: 'Massing Model' },
      { src: '/Hospital in mansoor/detail 1.png',             subtitle: 'Facade Detail' },
      { src: '/Hospital in mansoor/panel facade hos.png',     subtitle: 'Panel Study' },
      { src: '/Hospital in mansoor/hos 1.png',                subtitle: 'Night View — Red' },
      { src: '/Hospital in mansoor/hos3.png',                 subtitle: 'Night View — Green' },
    ],
  },
  {
    title: 'PPG Factory Facade',
    category: 'Commercial',
    type: 'Facade Design',
    year: '2024',
    location: 'Bursa, Türkiye',
    architect: 'Ahmed Alnaseri, Furkan Kartekin',
    area: '1,371 m²',
    coverImage: '/PPG FACADE/RENDER/V3_1.png',
    images: [
      { src: '/PPG FACADE/RENDER/V3_1.png', subtitle: 'Facade Detail' },
      { src: '/PPG FACADE/RENDER/V3_2.png', subtitle: 'Exterior View' },
      { src: '/PPG FACADE/RENDER/V3_3.png', subtitle: 'Panel Study' },
      { src: '/PPG FACADE/RENDER/4.png',    subtitle: 'Close-up' },
      { src: '/PPG FACADE/RENDER/v4.png',   subtitle: 'Courtyard Detail' },
    ],
  },
  {
    title: 'Kerkuk Restaurant',
    category: 'Commercial',
    type: 'Facade Design',
    year: '2024',
    location: 'Kirkuk, Iraq',
    architect: 'Ahmed Alnaseri',
    area: '350 m²',
    coverImage: '/Restrant Kerkuk/restaurant facade.png',
    images: [
      { src: '/Restrant Kerkuk/restaurant facade.png',        subtitle: 'Facade Study' },
      { src: '/Restrant Kerkuk/IMG_3260.JPG',                 subtitle: 'Exterior View', position: 'center 80%' },
      { src: '/Restrant Kerkuk/IMG_3266.JPG',                 subtitle: 'Street Corner View' },
      { src: '/Restrant Kerkuk/IMG_3261.JPG',                 subtitle: 'Facade at Dusk' },
      { src: '/Restrant Kerkuk/IMG_3259.JPG',                 subtitle: 'Facade Detail' },
      { src: '/Restrant Kerkuk/IMG_3262.JPG',                 subtitle: 'Cantilever Detail' },
      { src: '/Restrant Kerkuk/IMG_3264.JPG',                 subtitle: 'Facade Overhang' },
      { src: '/Restrant Kerkuk/IMG_3265.JPG',                 subtitle: 'Soffit Detail' },
      { src: '/Restrant Kerkuk/Resturant Facade part 1.png',  subtitle: '3D Partial Detail_ Interior' },
      { src: '/Restrant Kerkuk/Resturant Facade part 2.png',  subtitle: '3D Partial Detail_ Exterior' },
    ],
  },
  {
    title: 'Balıkesir Cumhuriyet Meydanı',
    slug: 'balikesir-cumhuriyet-meydani',
    category: 'Competition',
    type: 'Urban Design',
    year: '2026',
    location: 'Balıkesir, Türkiye',
    architect: 'Furkan Kartekin, Ezgi Kartekin',
    area: '—',
    coverImage: '/Balıkesir Cumhuriyet meydanı/Renderlar-usb/1.jpg',
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
    title: 'Toyota SAS & Lexus Showroom',
    slug: 'lexus-toyota-showroom-slemani',
    category: 'Commercial',
    type: 'Facade Design',
    year: '2026',
    location: 'Sulaymaniyah, Iraq',
    architect: 'Ahmed Alnaseri',
    area: '500 m²',
    coverImage: '/Lexus/Lexus Facade.jpg',
    images: [
      { src: '/Lexus/Lexus Facade.jpg',        subtitle: 'Exterior View' },
      { src: '/Lexus/Complete facade 3D.png',  subtitle: 'Complete Facade Model' },
      { src: '/Lexus/Facade 2.JPG',            subtitle: 'Facade Detail' },
      { src: '/Lexus/Facade 3.JPG',            subtitle: 'Panel Installation Detail' },
      { src: '/Lexus/Facade 4.JPG',            subtitle: 'Construction Progress' },
      { src: '/Lexus/Facade 5.jpg',            subtitle: 'Facade Underside View' },
      { src: '/Lexus/Mockup.jpeg',             subtitle: 'Panel Mockup' },
      { src: '/Lexus/3D model Mockup.JPG',     subtitle: 'Panel Type Grouping' },
      { src: '/Lexus/Poses 3D.png',            subtitle: 'Panel Type Map' },
      { src: '/Lexus/Poses 3D 2.png',          subtitle: 'Panel Type Map — End View' },
      { src: '/Lexus/Poses 3D 3.png',          subtitle: 'Panel Type Map — Perspective' },
      { src: '/Lexus/Planar script.png',       subtitle: 'Grasshopper Script — Planarity Check' },
    ],
  },
];
