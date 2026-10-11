export const slugify = (t: string) => t.toLowerCase().replace(/\s+/g, '-');

/** alt: descriptive text for screen readers and search (translated via tv()); falls back to the subtitle. */
export type ProjectImage = { src: string; subtitle: string; position?: string; alt?: string };
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
  /** One-sentence page description for search and link previews (src/app/architecture/[slug]/layout.tsx). */
  summary?: string;
  /** 1200×630 link-preview image; without it the page uses the site's default preview. */
  ogImage?: string;
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
    coverImage: '/Restrant Kerkuk/IMG_3266.JPG',
    images: [
      { src: '/Restrant Kerkuk/IMG_3266.JPG',                 subtitle: 'Street Corner View' },
      { src: '/Restrant Kerkuk/IMG_3260.JPG',                 subtitle: 'Exterior View', position: 'center 80%' },
      { src: '/Restrant Kerkuk/IMG_3261.JPG',                 subtitle: 'Facade at Dusk' },
      { src: '/Restrant Kerkuk/IMG_3259.JPG',                 subtitle: 'Facade Detail' },
      { src: '/Restrant Kerkuk/IMG_3262.JPG',                 subtitle: 'Cantilever Detail' },
      { src: '/Restrant Kerkuk/IMG_3264.JPG',                 subtitle: 'Facade Overhang' },
      { src: '/Restrant Kerkuk/IMG_3265.JPG',                 subtitle: 'Soffit Detail' },
      { src: '/Restrant Kerkuk/restaurant facade.png',        subtitle: 'Facade Study' },
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
    title: 'Muğla Belediyesi Sosyal Hizmet Binası',
    slug: 'mugla-belediyesi-sosyal-hizmet-binasi',
    category: 'Competition',
    type: 'Social Services Building',
    year: '2026',
    location: 'Menteşe, Muğla, Türkiye',
    architect: 'Furkan Kartekin, Ezgi Kartekin',
    area: '—',
    // web-optimised WebP (ASCII paths): renders at 1600 px for the card, drawings at full gallery size;
    // the full-size originals live in /_originals (git-ignored, not deployed)
    coverImage: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/01-street-corner-view.webp',
    images: [
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/01-street-corner-view.webp', subtitle: 'Street Corner View', alt: 'Street-corner view of the white social services building with timber shading and a perforated brick screen, people crossing the paved plaza in front' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/02-entrance-courtyard.webp', subtitle: 'Entrance Courtyard', alt: 'Entrance courtyard beneath the bridge linking the two wings, with the pocket theatre\'s glazed stage visible below and the building name on the façade' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/03-timber-shading-facade.webp', subtitle: 'Timber Shading Façade', alt: 'Street-level façade of adjustable vertical timber shading panels, with a parent pushing a pram along the paved street' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/04-pocket-theatre.webp', subtitle: 'Pocket Theatre', alt: 'Pocket theatre interior with a grand piano on stage and the rear wall open to the stepped outdoor amphitheatre' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/card/05-interior-corridor.webp', subtitle: 'Interior Corridor', alt: 'Interior corridor lit through a perforated brick screen, with patterns of daylight falling across the timber floor' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/06-site-plan.webp', subtitle: 'Site Plan', alt: 'Site plan placing the building within the street fabric of the historic Menteşe district' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/07-first-floor-plan.webp', subtitle: 'First Floor Plan', alt: 'First floor plan showing the two wings arranged around the central courtyard' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/08-section.webp', subtitle: 'Section', alt: 'Section through the pocket theatre and the amphitheatre stepping down from street level' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/09-street-elevation.webp', subtitle: 'Street Elevation', alt: 'Street elevation of the building between its neighbours' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/10-public-routes-axonometric.webp', subtitle: 'Public Routes Axonometric', alt: 'Axonometric of the ground floor with the two public routes, Production Street and Art Street, highlighted in yellow' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/11-massing-formation.webp', subtitle: 'Massing Formation', alt: 'Massing diagram in steps, showing the block divided by two routes and opened around a courtyard' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/12-theatre-amphitheatre-axonometric.webp', subtitle: 'Theatre & Amphitheatre Axonometric', alt: 'Axonometric of the pocket theatre with its stage opening onto the outdoor amphitheatre' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/13-amphitheatre-section.webp', subtitle: 'Amphitheatre Section', alt: 'Section perspective of the amphitheatre\'s planted, stepped seating' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/14-terrace-axonometric.webp', subtitle: 'Terrace Axonometric', alt: 'Axonometric of a shared terrace with folding timber shading panels and a central planter' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/15-courtyard-axonometric.webp', subtitle: 'Courtyard Axonometric', alt: 'Axonometric of a public courtyard with trees, benches and a long seating edge' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/16-enclosed-courtyard-axonometric.webp', subtitle: 'Enclosed Courtyard Axonometric', alt: 'Axonometric of an enclosed courtyard with a perforated brick wall and space for play' },
      { src: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/17-facade-shading-diagram.webp', subtitle: 'Façade Shading Diagram', alt: 'Façade shading diagram tracing the sun path and how the timber panels adjust through the day' },
    ],
    summary: 'Competition proposal for a municipal social services building in Muğla\'s historic Menteşe district: two public routes, a central courtyard and a pocket theatre opening onto an outdoor amphitheatre.',
    ogImage: '/projects/mugla-belediyesi-sosyal-hizmet-binasi/og.jpg',
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
