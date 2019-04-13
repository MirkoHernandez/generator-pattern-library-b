'use strict';

// Gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var taskListing = require('gulp-task-listing');

// Gulp config
var watchOptions = {
    usePolling: true, // required when using inside VMs.
}

// Paths
var paths = {
    fractal: {
	assets: `${__dirname}/design/public`,
	components: `${__dirname}/design/components`,
	docs: `${__dirname}/design/docs`
    },
    styles: {  
	src: './design/scss/*.scss',
	watch: './design/**/*.scss',
	dest: './design/public/css/'
    }
};

// Tasks
function styles() {
    return gulp.src(paths.styles.src)
	.pipe(sassGlob())
	.pipe(sass())
	.pipe(gulp.dest(paths.styles.dest));
}

function watch () {
    gulp.watch(paths.styles.watch,watchOptions, styles);
}


// Fractal config
var  fractal = require('@frctl/fractal').create();

fractal.set('project.title', '<%= projectName %>');               // title 
fractal.web.set('builder.dest', 'build');                         // destination for the static export
fractal.web.set('static.path', paths.fractal.assets);            // location of assets
fractal.docs.set('path', paths.fractal.docs);             // location of the documentation directory.
fractal.components.set('path', paths.fractal.components); // location of the component directory.

var  logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

gulp.task('fractalServer', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});


gulp.task('default',taskListing);

// main tasks
exports.fractal = gulp.parallel(gulp.series('fractalServer'),watch)
exports.watch = watch;

// sub-tasks
exports.styles = styles;

