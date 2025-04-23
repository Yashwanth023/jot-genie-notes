import type { Config } from "tailwindcss";

// Custom dark & modern palette, night look (gray/charcoal/blue/teal gold highlights)
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#21D4FD',        // Light blue
					foreground: '#041c32'
				},
				secondary: {
					DEFAULT: '#16213e',        // Charcoal
					foreground: '#E2FCEF',
				},
				destructive: {
					DEFAULT: '#EE4266',
					foreground: '#fff',
				},
				muted: {
					DEFAULT: '#181F2A',
					foreground: '#9BB5CE',
				},
				accent: {
					DEFAULT: '#21D4FD',
					foreground: '#222831',
				},
				popover: {
					DEFAULT: '#0F172A',
					foreground: '#E5E7EB',
				},
				card: {
					DEFAULT: '#202230',
					foreground: '#F4F6FB',
				},
				sidebar: {
					DEFAULT: '#181c22',
					foreground: '#D6E1E8',
					primary: '#ffd700',              // Gold highlight
					'primary-foreground': '#1A1F2C',
					accent: '#21D4FD',
					'accent-foreground': '#181c22',
					border: '#2B3142',
					ring: '#21D4FD'
				},
				note: {
					yellow: '#323223',  // More subtle card colors for dark
					blue: '#273c52',
					green: '#233635',
					pink: '#352936',
					purple: '#302742',
					peach: '#352e28',
				}
			},
			borderRadius: {
				lg: '1rem',
				md: '0.75rem',
				sm: '0.5rem'
			},
			keyframes: {
				"fade-in": {
					from: { opacity: "0", transform: "translateY(10px)" },
					to: { opacity: "1", transform: "translateY(0)" }
				},
				"fade-out": {
					from: { opacity: "1", transform: "translateY(0)" },
					to: { opacity: "0", transform: "translateY(10px)" }
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
			},
			animation: {
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-out",
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			boxShadow: {
				lg: "0 8px 32px rgba(21,25,35,0.30)",
				card: "0 2px 16px 0 rgba(33,212,253,0.12), 0 0.5px 2px 0 rgba(21, 212, 253, 0.04)",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
