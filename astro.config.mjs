// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
	integrations: [
		react(),
		starlight({
			title: 'Encatch example',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/get-encatch/starlight-examples',
				},
			],
			editLink: {
				baseUrl:
					'https://github.com/get-encatch/starlight-examples/edit/main/src/content/docs/',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			sidebar: [
				{
					label: 'Start',
					items: ['index', 'docs-feedback'],
				},
			],
			customCss: ['./src/styles/encatch.css'],
			components: {
				Footer: './src/components/EncatchFooter.astro',
				PageFrame: './src/components/EncatchPageFrame.astro',
			},
		}),
	],
});
