export type Lang = 'EN' | 'TR' | 'AR';

export const LANGS: Lang[] = ['EN', 'TR', 'AR'];
export const LS_KEY = 'amd-nsri-lang';

export const translations = {
  EN: {
    nav: {
      wordmark:     'AMD NSRI',
      architecture: 'Architecture',
      design:       'Design',
      tools:        'Tools',
      fabrication:  'Fabrication',
      shop:         'Shop',
      contact:      'Contact',
      archDesc:     'Spatial concepts and visualization',
      designDesc:   'Experimental design and objects',
      toolsDesc:    'Parametric tools and definitions',
      fabDesc:      'Production and fabrication logic',
      shopDesc:     'Products and resources',
      contactDesc:  'Collaboration inquiries',
      menuLabel:    'AMD NSRI',
      closeMenu:    'Close navigation',
      openMenu:     'Open menu',
    },
  },
  TR: {
    nav: {
      wordmark:     'AMD NSRI',
      architecture: 'Mimarlık',
      design:       'Tasarım',
      tools:        'Araçlar',
      fabrication:  'Fabrikasyon',
      shop:         'Mağaza',
      contact:      'İletişim',
      archDesc:     'Mekansal kavramlar ve görselleştirme',
      designDesc:   'Deneysel tasarım ve objeler',
      toolsDesc:    'Parametrik araçlar ve tanımlar',
      fabDesc:      'Üretim ve imalat mantığı',
      shopDesc:     'Ürünler ve kaynaklar',
      contactDesc:  'İş birliği talepleri',
      menuLabel:    'AMD NSRI',
      closeMenu:    'Menüyü kapat',
      openMenu:     'Menüyü aç',
    },
  },
  AR: {
    nav: {
      wordmark:     'AMD NSRI',
      architecture: 'العمارة',
      design:       'التصميم',
      tools:        'الأدوات',
      fabrication:  'التصنيع',
      shop:         'المتجر',
      contact:      'اتصل',
      archDesc:     'المفاهيم المكانية والتصور',
      designDesc:   'التصميم التجريبي والأشياء',
      toolsDesc:    'الأدوات والتعريفات الباراميترية',
      fabDesc:      'منطق الإنتاج والتصنيع',
      shopDesc:     'المنتجات والموارد',
      contactDesc:  'استفسارات التعاون',
      menuLabel:    'AMD NSRI',
      closeMenu:    'إغلاق القائمة',
      openMenu:     'فتح القائمة',
    },
  },
} as const;

export type NavT = { [K in keyof typeof translations.EN.nav]: string };
