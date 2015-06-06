var gulp = require("gulp");
var notify = require("gulp-notify");
var bower = require("gulp-bower");
var debug = require("gulp-debug");

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

gulp.task("default", [ "bower", "phaser" ]);
