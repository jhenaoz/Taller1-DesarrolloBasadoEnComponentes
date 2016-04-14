//IMPORT THE REQUIRED LIBS
var gulp = require('gulp');
var path = require('path');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var wiredep = require('wiredep').stream;
var open = require('gulp-open');
var ghPages = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
// var usemin = require('gulp-usemin');
var rev = require('gulp-rev');

//DEFINE GLOBAL PATHS
var config = {
  app: 'app',
  dist: 'dist'
};
gulp.task('reload', function () {
  gulp.src('./app/**/*.*')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});
gulp.task('connect:dist', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('clean:temp', function(option){
  return gulp.src('.tmp', {read: false})
  .pipe(clean());

});
gulp.task('clean:dist', function(option){
  return gulp.src(config.dist, {read: false})
  .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['reload']);
  gulp.watch(['./app/**/*.js'], ['reload']);
  gulp.watch(['./app/styles/*.css'], ['reload']);
  gulp.watch(['./server/**/*.js'], ['reload']);
});

//Inject the bower.json dependencies in index.html file
gulp.task('wiredep', function () {
  gulp.src( path.join(config.app, '/index.html'))
    .pipe(wiredep(
      //Wiredepp special configuration
    )).pipe(gulp.dest(config.app));
});

gulp.task('inject', function () {
  var target = gulp.src( path.join(config.app, '/index.html'));
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([
    path.join('!' + config.app, '/bower_components/**/*'),
    // path.join('!' + config.app, '/scripts/templates.js'),
    path.join(config.app, '/**/*.js'), //this are equivalent'./app/**/*.js'
    path.join(config.app, '/styles/*.css')
  ], {read: false});
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(config.app));
});

gulp.task('open', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8080'}));
});

gulp.task('deploy',['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


gulp.task('styles', function(){
  gulp.src(config.app + '/styles/**/*.css')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(config.dist +'/styles/'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(config.dist +'/styles/'));
});

gulp.task('scripts', function(){
  return gulp.src(config.app + '/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.dist + '/scripts/'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist + '/scripts/'));
});

gulp.task('default', [
  'clean:temp',
  'wiredep',
  'inject',
  'connect',
  'open',
  'watch'
]);
