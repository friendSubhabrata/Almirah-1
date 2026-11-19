/**
 * Central configuration for Kolkata Almirah Care.
 * Update SITE_DOMAIN when connecting your paid custom domain on GitHub Pages.
 */
export const SITE_CONFIG = {
  businessName: 'Kolkata Almirah Care',
  businessNameBn: 'কলকাতা আলমারি কেয়ার',
  // Configurable canonical domain (no trailing slash). Replace with your real custom domain.
  siteDomain: 'https://kolkataalmirahcare.in',
  phoneRaw: '7003821400',
  phoneDisplay: '+91 7003821400',
  phoneHref: 'tel:+917003821400',
  whatsappNumber: '917003821400',
  workingHoursEn: 'Every day, 9:00 AM – 8:00 PM',
  workingHoursBn: 'প্রতিদিন সকাল ৯:০০ – রাত ৮:০০',
  workingHoursNoteEn: 'Please call or WhatsApp to confirm doorstep slot availability.',
  workingHoursNoteBn: 'হোম সার্ভিসের সময় নিশ্চিত করতে কল বা হোয়াটসঅ্যাপ করুন।',
  primaryLocationEn: 'Kolkata, West Bengal, India',
  primaryLocationBn: 'কলকাতা, পশ্চিমবঙ্গ, ভারত',
  // Google Tools Integration placeholders (leave empty until real IDs are ready)
  ga4MeasurementId: '',
  googleSearchConsoleCode: '',
  // Optional: Add your verified Google Business Profile / Google Maps share URL when live
  googleBusinessProfileUrl: '',
} as const;

/**
 * Returns Vite's configured base path normalized with leading and trailing slashes
 * (e.g. "/" for root/custom domain, or "/repo-name/" for project GitHub Pages).
 */
export function getBasePath(): string {
  const raw = import.meta.env.BASE_URL || '/';
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * Prefixes an app-internal path (e.g. "/services/" or "/src/assets/images/hero.jpg")
 * with the configured GitHub Pages base path when deployed under a repository subpath.
 */
export function withBase(appPath: string): string {
  const base = getBasePath();
  const clean = appPath.startsWith('/') ? appPath.slice(1) : appPath;
  return `${base}${clean}`;
}

/**
 * Strips the configured base path from window.location.pathname so routing
 * resolves identically on "/" and "/<repo-name>/".
 */
export function stripBase(pathname: string): string {
  const base = getBasePath();
  if (base === '/') return pathname || '/';
  const baseNoTrailing = base.slice(0, -1);
  if (pathname === baseNoTrailing || pathname === base) return '/';
  if (pathname.startsWith(base)) {
    return `/${pathname.slice(base.length)}`;
  }
  return pathname || '/';
}

export function getCanonicalBase(): string {
  const buildSiteUrl = import.meta.env.VITE_SITE_URL;
  if (buildSiteUrl && typeof buildSiteUrl === 'string') {
    return buildSiteUrl.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    if (!window.location.hostname.includes('run.app')) {
      const baseNoTrailing = getBasePath().replace(/\/$/, '');
      return `${window.location.origin}${baseNoTrailing}`;
    }
  }
  return SITE_CONFIG.siteDomain;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
