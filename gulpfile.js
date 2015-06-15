var gulp = require("gulp");
var notify = require("gulp-notify");
var bower = require("gulp-bower");
var debug = require("gulp-debug");
var connect = require("gulp-connect");

var config = {
  bowerDir: "./bower_components"
};

gulp.task("bower", function () {
  return bower()
  .pipe(gulp.dest(config.bowerDir));
});

gulp.task("phaser", function () {
  return gulp.src(config.bowerDir + "/phaser-official/build/phaser.js").pipe(gulp.dest("dist/js/"));
});

gulp.task("assets", function () {
  return gulp.src("assets/*").pipe(gulp.dest("dist/assets/"));
});

gulp.task("scripts", function () {
  return gulp.src("js/*").pipe(gulp.dest("dist/js/"));
});

gulp.task("index", function () {
  return gulp.src("index.html").pipe(gulp.dest("dist/"));
});

gulp.task("webserver", function () {
  connect.server(
    {
      root: [ "dist" ],
      port: 8000
    }
  );
});

gulp.task("default", [ "bower", "phaser", "scripts", "assets", "index", "webserver" ]);
