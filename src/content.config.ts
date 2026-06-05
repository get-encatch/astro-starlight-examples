import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({
			extend: z.object({
				'docsFeedback.helpfulQuestion': z.string(),
				'docsFeedback.yes': z.string(),
				'docsFeedback.no': z.string(),
				'docsFeedback.suggestEdits': z.string(),
				'docsFeedback.raiseIssue': z.string(),
			}),
		}),
	}),
};
