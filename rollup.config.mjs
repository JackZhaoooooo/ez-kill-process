import terser from '@rollup/plugin-terser'
import del from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'

export default {
	input: 'src/main.ts',
	output: {
		file: 'dist/main.js',
		format: 'cjs',
		sourcemap: false,
	},
	plugins: [
		typescript(),
		terser(),
		del({ targets: 'dist/*' }),
		copy({
			targets: [{ src: 'src/static/*', dest: 'dist/' }],
		}),
	],
}
