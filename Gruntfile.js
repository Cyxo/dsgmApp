module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    directories: {
      source: 'source',
      build: 'build'
    },

    shell: {
      versionize: {
        command: [
          'rm -rf',
          'touch "<%= pkg.version %>"'
        ].join("&&"),
        options: {
          execOptions: {
            cwd: 'app/store/version'
          }
        }
      },
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
        command: 'java -jar <%= directories.build %>/DSGameMaker.jar'
      },
      cleanAppFolder: {
        command: [
          'rm -rf <%= directories.build %>/app/css/sass',
          'rm -rf <%= directories.build %>/app/css/sass-cache'
        ].join("&&")
      },
      cleanAppAPIFolder: {
        command: 'rm -rf <%= directories.build %>/app/api-v1'
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
    'shell:versionize',
    'shell:wipeBuild',
    'shell:createBuild',
    'shell:compileJava',
    'shell:packageJava',
    'shell:cleanJava',
    'copy:copyAppFolder',
    'shell:cleanAppFolder',
    'shell:cleanAppAPIFolder',
    'shell:runJava'
  ]);

  grunt.registerTask('server', [
    'shell:versionize',
    'shell:wipeBuild',
    'shell:createBuild',
    'copy:copyAppFolder',
    'shell:cleanAppFolder',
    'shell:moveAppFolderContentsUp1',
    'shell:moveAppFolderContentsUp2'
  ]);

  grunt.registerTask('run', [
    'shell:runJava'
  ]);

  grunt.registerTask('clean', [
    'shell:wipeBuild'
  ]);

};