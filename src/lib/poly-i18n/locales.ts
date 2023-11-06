export enum Locales {
  en = 'English',
  es = 'Español',
  he = 'עברית',
}

export type LocaleCode = keyof typeof Locales

export function getSupportedLocale(userLocale: string | undefined) {
  return Object.keys(Locales).find((supportedLocale) => {
    return userLocale?.includes(supportedLocale)
  }) as LocaleCode | undefined
}

if (import.meta.vitest) {
  describe(getSupportedLocale, () => {
    test('should return locale for supported locale', () => {
      expect(getSupportedLocale('es')).toBe('es')
    })

    test('should return undefined for unsupported locale', () => {
      expect(getSupportedLocale('xx')).toBe(undefined)
    })

    test('should return basic locale for locale with region code', () => {
      expect(getSupportedLocale('en-US')).toBe('en')
    })
  })
}

export function findSupportedLocaleFromAcceptedLangauges(acceptedLanguageHeader: string | null) {
  const locales = acceptedLanguageHeader
    ?.split(',')
    ?.map(lang => lang.split(";")[0].trim()) ?? []

  for (const locale of locales) {
    const supportedLocale = getSupportedLocale(locale)
    if (supportedLocale) {
      return supportedLocale
    }
  }
}

if (import.meta.vitest) {
  describe(findSupportedLocaleFromAcceptedLangauges, () => {
    it('return shortened (acceptable) form of dialect', () => {
      const acceptedLanguageHeader = 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7'
      expect(findSupportedLocaleFromAcceptedLangauges(acceptedLanguageHeader)).toEqual('en')
    })

    it('returns 2nd accepted if 1st not supported', () => {
      expect(findSupportedLocaleFromAcceptedLangauges('zh-TW,en-GB')).toEqual('en')
    })

    it('handles null header', () => {
      expect(findSupportedLocaleFromAcceptedLangauges(null)).toEqual(undefined)
    })
  })
}