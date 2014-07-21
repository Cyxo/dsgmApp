module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    shell: {
      wipeBuild: {
        command: 'rm -rf build'
      },
      createBuild: {
        command: 'mkdir build'
      },
      compileJava: {
        command: 'javac source/*.java -d build'
      },
      packageJava: {
        command: 'javafxpackager -createjar -appclass DSGameMaker -srcdir build -outfile "build/DSGameMaker.jar" -v'
      },
      cleanJava: {
        command: 'rm -rf build/*.class'
      },
      runJava: {
        command: 'java -jar build/DSGameMaker.jar'
      },
      cleanAppFolder: {
        command: [
          'rm -rf build/app/css/sass',
          'rm -rf build/app/css/sass-cache'
        ].join("&&")
      },
      cleanAppAPIFolder: {
        command: 'rm -rf build/app/api-v1'
      },
      moveAppFolderContentsUp1: {
        command: [
          'cp -rf . ..',
          'rm -rf *',
          'cd ../',
        ].join("&&"),
        options: {
          execOptions: {
            cwd: 'build/app'
          }
        }
      },
      moveAppFolderContentsUp2: {
        command: [
          'rmdir app',
        ].join("&&"),
        options: {
          execOptions: {
            cwd: 'build'
          }
        }
      }
    },

    copy: {
      copyAppFolder: {
        cwd: 'app',
        src: '**/*',
        dest: 'build/app',
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
    'shell:cleanAppFolder',
    'shell:cleanAppAPIFolder',
  ]);

  grunt.registerTask('server', [
    'shell:wipeBuild',
    'shell:createBuild',
    'copy:copyAppFolder',
    'shell:cleanAppFolder',
    'shell:moveAppFolderContentsUp1',
    'shell:moveAppFolderContentsUp2',
  ]);

  grunt.registerTask('run', [
    'shell:runJava',
  ]);

  grunt.registerTask('clean', [
    'shell:wipeBuild',
  ]);

};