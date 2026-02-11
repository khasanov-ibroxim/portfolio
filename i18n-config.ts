// i18n-config.ts
export const i18n = {
  defaultLocale: 'ru',
  locales: ['ru', 'en' , "uz"],
} as const;

export type Locale = (typeof i18n)['locales'][number];
