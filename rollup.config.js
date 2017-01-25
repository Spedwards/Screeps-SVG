import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'src/index.js',
	dest: 'dist/screeps-svg.js',
	format: 'cjs',
	plugins: [
		commonjs()
	]
};
