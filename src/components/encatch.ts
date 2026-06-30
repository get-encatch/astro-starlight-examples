import { _encatch } from '@encatch/web-sdk';
import type { Theme } from '@encatch/web-sdk';

/**
 * Encatch Web SDK integration for Starlight docs feedback.
 *
 * Configure via PUBLIC_ENCATCH_* env vars (see .env.example).
 * - open*Form: open the combined documentation feedback form with routing
 *   prefilled via logic jumps (page helpful, suggest edit, raise issue).
 */

type DocumentationFeedbackRoute = 'page-helpful' | 'suggest-edit' | 'raise-issue';

function getDocumentationFeedbackEnv() {
	return {
		formSlug: import.meta.env.PUBLIC_ENCATCH_DOCUMENTATION_FEEDBACK_FORM_SLUG?.trim(),
		feedbackTypeQuestionSlug:
			import.meta.env.PUBLIC_ENCATCH_FEEDBACK_TYPE_QUESTION_SLUG?.trim(),
		pageUrlQuestionSlug:
			import.meta.env.PUBLIC_ENCATCH_PAGE_URL_QUESTION_SLUG?.trim(),
		helpfulChoiceQuestionSlug:
			import.meta.env.PUBLIC_ENCATCH_HELPFUL_CHOICE_QUESTION_SLUG?.trim(),
	};
}

/** Ensure `_encatch.init` has run before `showForm` / other SDK calls. */
export function ensureEncatchInitialized(options?: { theme?: Theme }): boolean {
	if (typeof window === 'undefined') {
		return false;
	}
	const apiKey = import.meta.env.PUBLIC_ENCATCH_SDK_PUBLISHABLE_KEY?.trim();
	if (!apiKey) {
		console.warn('PUBLIC_ENCATCH_SDK_PUBLISHABLE_KEY is not set or is empty');
		return false;
	}
	if (!_encatch._initialized) {
		try {
			const theme: Theme = options?.theme ?? 'system';
			_encatch.init(apiKey, { theme });
		} catch (error) {
			console.error('Encatch init failed:', error);
			return false;
		}
	}
	return true;
}

/** Sync Encatch form language with the active locale. */
export function syncEncatchLocale(locale: string): void {
	if (!ensureEncatchInitialized()) {
		return;
	}
	const normalized = locale.trim();
	if (!normalized) {
		return;
	}
	_encatch.setLocale(normalized);
}

function toAbsolutePageUrl(pageUrl: string): string {
	return typeof window !== 'undefined'
		? new URL(pageUrl, window.location.origin).href
		: pageUrl;
}

function openDocumentationFeedbackForm(
	pageUrl: string,
	route: DocumentationFeedbackRoute,
	locale?: string,
	helpfulVote?: 'yes' | 'no',
) {
	const {
		formSlug,
		feedbackTypeQuestionSlug,
		pageUrlQuestionSlug,
		helpfulChoiceQuestionSlug,
	} = getDocumentationFeedbackEnv();

	if (!formSlug) {
		console.warn(
			'PUBLIC_ENCATCH_DOCUMENTATION_FEEDBACK_FORM_SLUG is not set or is empty',
		);
		return;
	}
	if (!feedbackTypeQuestionSlug) {
		console.warn(
			'PUBLIC_ENCATCH_FEEDBACK_TYPE_QUESTION_SLUG is not set or is empty',
		);
		return;
	}
	if (!pageUrlQuestionSlug) {
		console.warn(
			'PUBLIC_ENCATCH_PAGE_URL_QUESTION_SLUG is not set or is empty',
		);
		return;
	}
	if (route === 'page-helpful') {
		if (!helpfulChoiceQuestionSlug) {
			console.warn(
				'PUBLIC_ENCATCH_HELPFUL_CHOICE_QUESTION_SLUG is not set or is empty',
			);
			return;
		}
		if (!helpfulVote) {
			console.warn('Helpful feedback requires a yes/no vote');
			return;
		}
	}
	if (!ensureEncatchInitialized()) {
		return;
	}
	if (locale) {
		syncEncatchLocale(locale);
	}

	_encatch.addToResponse(feedbackTypeQuestionSlug, route);
	_encatch.addToResponse(pageUrlQuestionSlug, toAbsolutePageUrl(pageUrl));
	if (route === 'page-helpful' && helpfulVote) {
		_encatch.addToResponse(helpfulChoiceQuestionSlug, helpfulVote);
	}
	_encatch.showForm(formSlug);
}

export function openHelpfulFeedbackForm(
	pageUrl: string,
	vote: 'yes' | 'no',
	locale?: string,
) {
	openDocumentationFeedbackForm(pageUrl, 'page-helpful', locale, vote);
}

export function openSuggestEditForm(pageUrl: string, locale?: string) {
	openDocumentationFeedbackForm(pageUrl, 'suggest-edit', locale);
}

export function openRaiseIssueForm(pageUrl: string, locale?: string) {
	openDocumentationFeedbackForm(pageUrl, 'raise-issue', locale);
}
