module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    directories: {
      source: 'source',
      build: 'build'
    },

    shell: {
      wipeBuild: {
        command: 'rm -rf <%= directories.build %>'
      },
      createBuild: {
        command: 'mkdir <%= directories.build %>'
      },
      compileJava: {
        command: 'javac <%= directories.source %>/*.java -d <%= directories.build %>'
      },
      packageJava: {
        command: 'javafxpackager -createjar -appclass DSGameMaker -srcdir <%= directories.build %> -outfile "<%= directories.build %>/DSGameMaker.jar" -v'
      },
      cleanJava: {
        command: 'rm -rf <%= directories.build %>/*.class'
      },
      runJava: {
        command: 'java -jar DSGameMaker.jar',
        options: {
          execOptions: {
            cwd: '<%= directories.build %>'
          }
        }
      },
      cleanAppFolder: {
        command: [
          'rm -rf <%= directories.build %>/app/css/sass',
          'rm -rf <%= directories.build %>/app/css/sass-cache'
        ].join("&&")
      },
      downloadOfflineData: {
        command: [
          'mkdir <%= directories.build %>/store',
          'cp -rf /home/james/Dropbox/Projects/DSGameMaker/store <%= directories.build %>'
        ].join("&&")
      },
      stats: {
        command: [
          'rm <%= directories.build %>/app/css/myApplication.css',
          'rm -rf <%= directories.build %>/app/css/sass-cache',
          'rm -rf <%= directories.build %>/app/css/fonts',
          'rm <%= directories.build %>/app/js/*.*',
          'rm -rf <%= directories.build %>/app/img',
          'mkdir <%= directories.build %>/java',
          'cp source/*.* <%= directories.build %>/java',
        ].join("&&")
      },
      moveAppFolderContentsUp1: {
        command: [
          'cp -rf . ..',
          'rm -rf *',
          'cd ../',
        ].join("&&"),
        options: {
          execOptions: {
            cwd: '<%= directories.build %>/app'
          }
        }
      },
      moveAppFolderContentsUp2: {
        command: 'rmdir app',
        options: {
          execOptions: {
            cwd: '<%= directories.build %>'
          }
        }
      },
    },

    copy: {
      copyAppFolder: {
        cwd: 'app',
        src: '**/*',
        dest: '<%= directories.build %>/app',
        expand: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'shell:wipeBuild',
    'shell:createBuild',
    'shell:compileJava',
    'shell:packageJava',
    'shell:cleanJava',
    'copy:copyAppFolder',
    'shell:downloadOfflineData',
    'shell:cleanAppFolder',
    'shell:runJava'
  ]);

  grunt.registerTask('server', [
    'shell:wipeBuild',
    'shell:createBuild',
    'copy:copyAppFolder',
    'shell:cleanAppFolder',
    'shell:moveAppFolderContentsUp1',
    'shell:moveAppFolderContentsUp2'
  ]);

  grunt.registerTask('stats', [
    'shell:wipeBuild',
    'shell:createBuild',
    'copy:copyAppFolder',
    'shell:stats'
  ]);

  grunt.registerTask('run', [
    'shell:runJava'
  ]);

  grunt.registerTask('clean', [
    'shell:wipeBuild'
  ]);

};