var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');

var fileName = "gradient";
var folderSource = "src/";
var folderDestination = "dist/";
var folderDestinationDocs = "docs/assets/js/";

gulp.task("build-js", function (callback) {
	pump([
		gulp.src(folderSource + "*.js"),
		uglify(),
		concat(fileName + ".min.js"),
        gulp.dest(folderDestination),
        gulp.dest(folderDestinationDocs)
	], callback);
});

gulp.task("default", ["build-js"]);