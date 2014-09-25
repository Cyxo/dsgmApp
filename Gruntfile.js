module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    shell: {
      wipeBuild: {
        command: 'rm -rf build'
      },
      startBuild: {
        command: 'mkdir build'
      },
      endBuild: {
        command: [
          'cp index.html build/index.html',
          'sass sass/myApplication.scss:build/myApplication.css --cache-location "sass/cache" --style compressed',
        ].join("&&")
      }
    },

    copyto: {
      main: {
        files: [{
          src: ['*/**'],
          dest: 'build',
          expand: true
        }],
        options: {
          ignore: [
            'build',
            'node_modules',
            'node_modules/**/*',
            'sass',
            'sass/**/*'
          ]
        }
      }
    },

    htmlmin: {
      main: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', [
    'shell:wipeBuild',
    'shell:startBuild',
    'copyto:main',
    'shell:endBuild',
    'htmlmin:main'
  ]);

  grunt.registerTask('clean', [
    'shell:wipeBuild'
  ]);

};