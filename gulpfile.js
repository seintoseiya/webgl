const DEBUG = !(process.argv.indexOf('--release') >= 0);
if(DEBUG){
  var htdocsDir = "./htdocs/";
}else{
  var htdocsDir = "./production/";  
}

var gulp = require("gulp");
var sass = require("gulp-sass");
var changed = require('gulp-changed');
var pleeease = require('gulp-pleeease');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var webpack = require("webpack");
var webpackStream = require('webpack-stream');
var webpackConfig = require("./webpack.config.js");
var fs = require('fs');

// html
gulp.task('html', function(){
  gulp.src('src/**/*.html', {base: 'src'})
  .pipe(gulp.dest(htdocsDir))
  .pipe(reload({stream:true}));
});

// ejs
gulp.task('ejs', function(){
  var json = JSON.parse(fs.readFileSync('src/textdata/config.json'));
  gulp.src(['src/ejs/**/*.ejs', '!' + 'src/ejs/**/_*.ejs'])
    .pipe(plumber())
    .pipe(ejs(json,{"ext": ".html"}))
    .pipe(rename(function(path){
      //errorで.ejsファイルが書き出されるのを防ぐ
      path.extname = ".html";
    }))
    .pipe(gulp.dest(htdocsDir))
    .pipe(reload({stream:true}));
});

// sass
gulp.task("sass", function() {
  gulp.src("src/sass/**/*scss")
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sass({errLogToConsole: true}))
  .pipe(pleeease({
    autoprefixer: {
      browsers: ['last 4 versions', 'ie 9']
    }
  }))
  .pipe(gulp.dest(htdocsDir + 'css'))
  .pipe(reload({stream:true}));
});

// js
gulp.task('js', function(){
  gulp.src('')
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(gulp.dest(htdocsDir + 'js'))
  .pipe(reload({stream:true}));
});

// browser sync
gulp.task('browser-sync', function(){
  browserSync({
    port: 5000,
    server: {
      baseDir: htdocsDir
    }
  });
});

// reload all browser
gulp.task('bs-reload', function(){
  browserSync.reload();
});

gulp.task('default', ['browser-sync', 'ejs', 'html', 'sass', 'js'], function(){
  gulp.watch('src/ejs/**/*.ejs',['ejs']);
  gulp.watch('src/textdata/**/*.json',['ejs']);
  gulp.watch('src/**/*.html',['html']);
  gulp.watch('src/sass/**/*.scss',['sass']);
  gulp.watch('src/js/**/*.js',['js']);
  gulp.watch("*.html", ['bs-reload']);
});
