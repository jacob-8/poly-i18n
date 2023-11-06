// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
      t: Awaited<ReturnType<typeof import('$lib/poly-i18n').getTranslator>>;
      locale: import('$lib/poly-i18n/locales').LocaleCode;
    }
		// interface Platform {}
	}
}

export {};
