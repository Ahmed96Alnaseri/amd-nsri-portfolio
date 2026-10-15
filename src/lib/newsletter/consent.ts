import type { Lang } from '@/lib/translations';
import texts from './consent-texts.json';

/** The consent version every new sign-up records. The texts live in consent-texts.json, which the export script
    (scripts/newsletter/export-confirmed.mjs) reads too, so a CSV row carries the exact wording that person agreed to. */
export const CONSENT_VERSION: string = texts.current;

const versions = texts.versions as Record<string, Record<Lang, string>>;

/** The consent wording as the form shows it, with [[text|/path]] link markers (the form renders them as links). */
export function consentMarkup(lang: Lang, version: string = CONSENT_VERSION): string {
  const v = versions[version];
  if (!v) throw new Error(`unknown consent version ${version}`);
  return v[lang] ?? v.EN;
}

/** The exact wording the person agreed to, as plain text (link markers removed). */
export function consentText(lang: Lang, version: string = CONSENT_VERSION): string {
  return consentMarkup(lang, version).replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1');
}
