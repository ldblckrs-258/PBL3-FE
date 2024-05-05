/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					1: '#2898C8',
					2: '#64B8DC',
					3: '#64CCDC',
				},
				secondary: {
					1: '#52B69A',
					2: '#76C893',
				},
				tertiary: {
					1: '#E75A51',
					2: '#ee685e',
					3: '#F6A894',
				},
				bgCol: {
					1: '#F6FAF9',
					2: '#FFFFFF',
				},
				txtCol: {
					1: '#0C0C20',
					2: '#555555',
					3: '#999999',
				},
				borderCol: {
					1: '#D4D4D4',
					2: '#F4F4F4',
				},
			},
		},
	},
	plugins: [],
}
