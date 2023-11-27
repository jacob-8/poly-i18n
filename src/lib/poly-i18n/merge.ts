import type en from './locales/en.json'

export function merge({fallback, translation}: {fallback: Record<string, any>, translation: Record<string, any>}) {
  const result = { ...fallback };

  Object.keys(translation).forEach(key => {
    if (translation[key] && typeof translation[key] === 'object') {
      result[key] = merge({fallback: result[key] || {}, translation: translation[key]});
    } else if (translation[key]) {
      result[key] = translation[key];
    }
  });

  return result as typeof en;
}

if (import.meta.vitest) {
  describe(merge, () => {
    it('recursively merges nested objects', () => {
      const fallback = { a: 1, b: { c: 2 } };
      const translation = { b: { d: 3 } };
      const merged = merge({fallback, translation});
      expect(merged).toEqual({ a: 1, b: { c: 2, d: 3 } });
    });

    it('handles falsy values appropriately', () => {
      const fallback = { a: 1, b: null, c: 3, d: 4 };
      const translation = { a: undefined, b: 2, c: null, d: '' };
      const merged = merge({fallback, translation});
      expect(merged).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });
  });
}