'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-bottom">
        <span className="footer-copy">{t('footer.copy')}</span>
        <span className="footer-credit">{t('footer.credit')}</span>
      </div>
    </footer>
  );
}
