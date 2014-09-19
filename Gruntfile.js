module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    shell: {
      wipeBuild: {
        command: 'rm -rf build'
      },
      build: {
        command: [
          'mkdir build',
          'for i in $(find * -type d -maxdepth 0 | grep -viw "node_modules\\|build\\|sass"); do cp -rf $i build/$i ; done',
          'cp index.html build/index.html',
          'sass sass/myApplication.scss:build/myApplication.css --cache-location "sass/cache" --style compressed',
        ].join("&&")
      },
      stats: {
        command: [
          'rm build/css/myApplication.css',
          'rm -rf build/css/sass-cache',
          'rm -rf build/css/fonts',
          'rm build/js/*.*',
          'rm -rf build/img',
        ].join("&&")
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', [
    'shell:wipeBuild',
    'shell:build',
  ]);

  grunt.registerTask('stats', [
    'shell:wipeBuild',
    'copy:build',
    'shell:stats'
  ]);

  grunt.registerTask('clean', [
    'shell:wipeBuild'
  ]);

};