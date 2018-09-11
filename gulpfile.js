var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var lessPluginCleanCSS = require('less-plugin-clean-css');

var cleanCSSPlugin = new lessPluginCleanCSS({
	advanced: true
});

var fileName = "gradient";
var folderSource = "src/";
var folderDestination = "dist/";
var folderDestinationDocs = "docs/assets/js/";

gulp.task("build-less", function(callback) {
	pump([
		gulp.src(folderSource + "app/main.less"),
		less({
			plugins: [
				cleanCSSPlugin
			]
		}),
		concat("main.min.css"),
		gulp.dest("docs/assets/styles/")
	], callback);
});

gulp.task("build-js", function (callback) {
	pump([
		gulp.src(folderSource + "*.js"),
		uglify(),
		concat(fileName + ".min.js"),
        gulp.dest(folderDestination),
        gulp.dest(folderDestinationDocs)
	], callback);
});

gulp.task("default", [
	"build-less",
	"build-js"
]);