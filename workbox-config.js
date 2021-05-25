module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,ico,html,json,txt,js}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};