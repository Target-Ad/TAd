require!  <[fs gulp gulp-livescript]>

paths =
  ls: \./server/*.ls
  lib: \./server/

gulp.task \js ->
  ls-app = gulp.src paths.ls
    .pipe gulp-livescript {+bare}
    .pipe gulp.dest paths.lib

gulp.task \server ->
  require \./server/server.ls

gulp.task \watch <[js server]> ->
  gulp.watch [paths.ls], <[js]>

gulp.task \build <[js]>
gulp.task \default <[watch]>

# vi:et:ft=ls:nowrap:sw=2:ts=2
