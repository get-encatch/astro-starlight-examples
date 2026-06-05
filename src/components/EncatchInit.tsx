import { useEffect } from 'react';
import { ensureEncatchInitialized, syncEncatchLocale } from './encatch';

export function EncatchInit({ locale }: { locale: string }) {
	useEffect(() => {
		ensureEncatchInitialized();
		syncEncatchLocale(locale);
	}, [locale]);

	return null;
}
