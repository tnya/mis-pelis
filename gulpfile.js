var gulp = require('gulp');
var concat = require ('gulp-concat');
var uglify = require ('gulp-uglify');
var sass = require ('gulp-sass');
var minifyCSS = require ('gulp-minify-css');
var webserver = require ('gulp-webserver');

// 1era tarea: "Script" concatena archivos js
gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.js', 'assets/js/*.js'])
	.pipe(concat('script.js'))//guardados en script.js
	.pipe(gulp.dest('dist/js'));//en la carpeta "dist"
});

// 2da tarea: "Style" concatena y minifica main.css
gulp.task('style', function(){
	gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', 'assets/sass/main.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(concat('style.min.css'))//lo convierte en style.min.css
	.pipe(gulp.dest('dist/css/'));//en la carpeta "dist"
});

// 3era tarea: "Webserver" crea un servidor web de desarrollo 
// ejecutado en el localhost puerto 8000
gulp.task('webserver', function(){
	gulp.src('../mis_pelis/')
	.pipe(webserver({
		fallback:'details.html',/* dejar solo un index y a ese linkearle todos los demas para q gulp los lea */ 
		/* RECORDAR CAMBIARLO A INDEX.HTML^ welcome solo x ahora para probar */
		livereload: true,
		directoryListing: false,
		open: true
	}));
});

// Watch SASS
gulp.task('watch', function(){
	gulp.watch('assets/sass/*.scss',['style']);
});

// Tareas que se ejecutan al correr el comando "gulp" en la terminal
gulp.task('default', ['script', 'style', 'webserver', 'watch']);