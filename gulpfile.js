const gulp = require('gulp');
const less = require('gulp-less');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const pump = require('pump');
const lessPluginCleanCSS = require('less-plugin-clean-css');
const cleanCSSPlugin = new lessPluginCleanCSS({
	advanced: true
});

const src = {
	styles: 'src/styles/',
	scripts: 'src/js/'
};

const dist = {
	styles: 'docs/assets/styles/',
	scripts: 'docs/assets/js/',
	lib: 'dist/'
};

const filename = {
	styles: 'styles.min.css',
	scripts: 'scripts.min.js',
	lib: 'gradient.min.js'
};

gulp.task('build-less', function (callback) {
	pump([
		gulp.src(`${src.styles}main.less`),
		less({
			plugins: [
				cleanCSSPlugin
			]
		}),
		concat(filename.styles),
		gulp.dest(dist.styles)
	], callback);
});

gulp.task('build-js-gh-page', function (callback) {
	pump([
		gulp.src([
			`${src.scripts}gradient.js`,
			`${src.scripts}app.js`
		]),
		uglify(),
		concat(filename.scripts, {
			newLine: ';'
		}),
		gulp.dest(dist.scripts)
	], callback);
});

gulp.task('build-js-gradient-lib', function (callback) {
	pump([
		gulp.src(`${src.scripts}gradient.js`),
		uglify(),
		concat(filename.lib),
		gulp.dest(dist.lib),
	], callback);
});

gulp.task('default', [
	'build-less',
	'build-js-gh-page',
	'build-js-gradient-lib'
]);