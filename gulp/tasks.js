var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function (done) {
    runSequence(
        'build',
        'server', done)
});

gulp.task('dev', function (done) {
    runSequence(
        'build',
        'lint-client',
        'test',
        'watch',
        'server', done)
});

gulp.task('build', function (done) {
    runSequence(
        'clean',
        'generate-assets',done)
});

gulp.task('generate-assets', function (done) {
    runSequence(
        'copy-govuk-modules',
        'sass',
        'copy-assets', done)
});

gulp.task('watch', function (done) {
    runSequence(
        'watch-sass',
        'watch-assets',
        'watch-tests', done)
});




