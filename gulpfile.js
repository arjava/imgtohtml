var gulp = require("gulp"),
		sass = require("gulp-sass"),
		uglify = require("gulp-uglify"),
		pump = require("pump"),
		sourcemaps = require("gulp-sourcemaps"),
		autoprefixer = require("gulp-autoprefixer"),
		browserSync = require("browser-sync").create();

// minify javaSripts
gulp.task("uglify", function (cb) {
	pump([
			gulp.src("builds/js/main.js"),
			uglify(),
			gulp.dest("public/js")
		],
		cb
	)
	.pipe(browserSync.reload({ stream : true })); // livereload
});

// compile sass
// sourcemaps
// automatic browser prefixing
gulp.task("sass", function() {
	return gulp.src("builds/sass/**/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: "compressed"
	}).on("error", sass.logError))
	.pipe(autoprefixer({
		browsers : ["last 20 versions"]
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("public/css"))
	.pipe(browserSync.reload({ stream : true })); // livereload
});

// html
gulp.task("html", function() {
	return gulp.src("*.html")
	.pipe(browserSync.reload({ stream : true })); // livereload
});

// watch
// livereload
gulp.task("watch", function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch(["*.html"], ["html"]);
	gulp.watch("builds/sass/**/*.scss", ["sass"]);
	gulp.watch("builds/js/main.js", ["uglify"]);
});

gulp.task("default", ["watch"]);
