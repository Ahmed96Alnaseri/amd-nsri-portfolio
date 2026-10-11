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
    coverImage: '/projects/corten-facade-villa/renders/image-11.png',
    images: [
      { src: '/projects/corten-facade-villa/renders/image-11.png', subtitle: 'Exterior View' },
      { src: '/projects/corten-facade-villa/renders/image-2.png', subtitle: 'Facade Detail' },
      { src: '/projects/corten-facade-villa/renders/interior.png', subtitle: 'Interior View' },
      { src: '/projects/corten-facade-villa/renders/image-3.png', subtitle: 'Corten Panel Close-up' },
      { src: '/projects/corten-facade-villa/renders/image-4.png', subtitle: 'Living Room View' },
      { src: '/projects/corten-facade-villa/renders/model.png',   subtitle: 'Massing Model' },
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
    coverImage: '/projects/baghdad-private-hospital/renders/facade-1.webp',
    images: [
      { src: '/projects/baghdad-private-hospital/renders/facade-1.webp',           subtitle: 'Main Entrance' },
      { src: '/projects/baghdad-private-hospital/renders/exterior-hospital-2.webp', subtitle: 'Facade Detail' },
      { src: '/projects/baghdad-private-hospital/renders/scrpt.webp',               subtitle: 'Parametric Definition' },
      { src: '/projects/baghdad-private-hospital/renders/model1.webp',             subtitle: 'Panel Shop Drawing' },
      { src: '/projects/baghdad-private-hospital/renders/facade-1.webp',           subtitle: 'Main Entrance' },
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
    coverImage: '/projects/hasyl-canopy/card/canopy-v1-1-photo.webp',
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
    slug: 'national-hospital-baghdad',
    category: 'Commercial',
    type: 'Facade Design',
    year: '2025',
    location: 'Baghdad, Iraq',
    architect: 'Ahmed Alnaseri',
    area: '300 m²',
    coverImage: '/projects/national-hospital-baghdad/hospital-mansore.webp',
    images: [
      { src: '/projects/national-hospital-baghdad/hospital-mansore.webp',     subtitle: 'Interior View' },
      { src: '/projects/national-hospital-baghdad/hospital-mansor-gpt.webp',  subtitle: 'Exterior View', position: 'center 35%' },
      { src: '/projects/national-hospital-baghdad/card/facade-hospital.webp',      subtitle: 'Massing Model' },
      { src: '/projects/national-hospital-baghdad/detail-1.webp',             subtitle: 'Facade Detail' },
      { src: '/projects/national-hospital-baghdad/card/panel-facade-hos.webp',     subtitle: 'Panel Study' },
      { src: '/projects/national-hospital-baghdad/hos-1.webp',                subtitle: 'Night View — Red' },
      { src: '/projects/national-hospital-baghdad/hos3.webp',                 subtitle: 'Night View — Green' },
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
    coverImage: '/projects/ppg-factory-facade/renders/v3-1.png',
    images: [
      { src: '/projects/ppg-factory-facade/renders/v3-1.png', subtitle: 'Facade Detail' },
      { src: '/projects/ppg-factory-facade/renders/v3-2.png', subtitle: 'Exterior View' },
      { src: '/projects/ppg-factory-facade/renders/v3-3.png', subtitle: 'Panel Study' },
      { src: '/projects/ppg-factory-facade/renders/4.png',    subtitle: 'Close-up' },
      { src: '/projects/ppg-factory-facade/renders/v4.png',   subtitle: 'Courtyard Detail' },
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
    coverImage: '/projects/kerkuk-restaurant/img-3266.jpg',
    images: [
      { src: '/projects/kerkuk-restaurant/img-3266.jpg',                 subtitle: 'Street Corner View' },
      { src: '/projects/kerkuk-restaurant/img-3260.jpg',                 subtitle: 'Exterior View', position: 'center 80%' },
      { src: '/projects/kerkuk-restaurant/img-3261.jpg',                 subtitle: 'Facade at Dusk' },
      { src: '/projects/kerkuk-restaurant/img-3259.jpg',                 subtitle: 'Facade Detail' },
      { src: '/projects/kerkuk-restaurant/img-3262.jpg',                 subtitle: 'Cantilever Detail' },
      { src: '/projects/kerkuk-restaurant/img-3264.jpg',                 subtitle: 'Facade Overhang' },
      { src: '/projects/kerkuk-restaurant/img-3265.jpg',                 subtitle: 'Soffit Detail' },
      { src: '/projects/kerkuk-restaurant/restaurant-facade.png',        subtitle: 'Facade Study' },
      { src: '/projects/kerkuk-restaurant/resturant-facade-part-1.png',  subtitle: '3D Partial Detail_ Interior' },
      { src: '/projects/kerkuk-restaurant/resturant-facade-part-2.png',  subtitle: '3D Partial Detail_ Exterior' },
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
    coverImage: '/projects/balikesir-cumhuriyet-meydani/card/1.webp',
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
    coverImage: '/projects/lexus-toyota-showroom-slemani/lexus-facade.jpg',
    images: [
      { src: '/projects/lexus-toyota-showroom-slemani/lexus-facade.jpg',        subtitle: 'Exterior View' },
      { src: '/projects/lexus-toyota-showroom-slemani/complete-facade-3d.png',  subtitle: 'Complete Facade Model' },
      { src: '/projects/lexus-toyota-showroom-slemani/facade-2.jpg',            subtitle: 'Facade Detail' },
      { src: '/projects/lexus-toyota-showroom-slemani/facade-3.jpg',            subtitle: 'Panel Installation Detail' },
      { src: '/projects/lexus-toyota-showroom-slemani/facade-4.jpg',            subtitle: 'Construction Progress' },
      { src: '/projects/lexus-toyota-showroom-slemani/facade-5.jpg',            subtitle: 'Facade Underside View' },
      { src: '/projects/lexus-toyota-showroom-slemani/mockup.jpeg',             subtitle: 'Panel Mockup' },
      { src: '/projects/lexus-toyota-showroom-slemani/3d-model-mockup.jpg',     subtitle: 'Panel Type Grouping' },
      { src: '/projects/lexus-toyota-showroom-slemani/poses-3d.png',            subtitle: 'Panel Type Map' },
      { src: '/projects/lexus-toyota-showroom-slemani/poses-3d-2.png',          subtitle: 'Panel Type Map — End View' },
      { src: '/projects/lexus-toyota-showroom-slemani/poses-3d-3.png',          subtitle: 'Panel Type Map — Perspective' },
      { src: '/projects/lexus-toyota-showroom-slemani/planar-script.png',       subtitle: 'Grasshopper Script — Planarity Check' },
    ],
  },
];
