module.exports = {
	arrowParens: 'always',
	bracketSameLine: true,
	bracketSpacing: true,
	singleQuote: true,
	trailingComma: 'all',
	jsxSingleQuote: true,
	semi: false,
	endOfLine: 'lf',
	jsxBracketSameLine: true,
	printWidth: 130,
	plugins: ['@ianvs/prettier-plugin-sort-imports'],
	importOrder: [
		'<BUILTIN_MODULES>', // Node.js built-in modules
		'<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
		'',
		// "^@asd/(.*)$",
		// "", // Empty line
		'^@/(.*)$',
		'',
		'^[.]{2}',
		'',
		'^[.]',
	],
}
