module.exports = {
	mode: "jit",
	content: ["./src/routes/**/*.{svelte,js,ts}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
	},
	plugins: [require("daisyui")],
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
};
