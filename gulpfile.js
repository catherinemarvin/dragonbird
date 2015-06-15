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
  return gulp.src(config.bowerDir + "/phaser-official/build/phaser.js").pipe(gulp.dest("vendor/js/"));
});

gulp.task("webserver", function () {
  connect.server();
});

gulp.task("default", [ "bower", "phaser", "webserver" ]);
