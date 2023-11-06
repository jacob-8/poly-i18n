export enum Locales {
  en = 'English',
  es = 'Español',
  he = 'עברית',
}

export type LocaleCode = keyof typeof Locales

export function getSupportedLocale(userLocale: string | undefined): LocaleCode {
  const locale = Object.keys(Locales).find((supportedLocale) => {
    return userLocale?.includes(supportedLocale)
  }) as LocaleCode | undefined
  return locale || 'en'
}

if (import.meta.vitest) {
  describe(getSupportedLocale, () => {
    test('should return locale for supported locale', () => {
      expect(getSupportedLocale('es')).toBe('es')
    })

    test('should return default locale for unsupported locale', () => {
      expect(getSupportedLocale('xx')).toBe('en')
    })

    test('should return basic locale for locale with region code', () => {
      expect(getSupportedLocale('en-US')).toBe('en')
    })
  })
}
