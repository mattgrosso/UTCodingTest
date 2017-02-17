module.exports = function(grunt) {
  'use strict';
    require('jit-grunt')(grunt);

    grunt.initConfig({

      jshint: {
        options: {
          jshintrc: true
        },
        all: ['src/**/*.js']
      },

      sass: {
        project: {
          files: {
            'build/css/main.css':'src/scss/main.scss'
          }
        }
      },

      watch: {
        js: {
          files: ['src/**/*.js'],
          tasks: ['js-build']
        },
        sass: {
          files: ['src/**/*.scss'],
          tasks: ['css-build']
        },
        html: {
          files: ['src/**/*.html'],
          tasks: ['copy:html']
        }
      },

      clean: ['build/'],

      concat: {
        options: {
          seperator: ';',
          sourceMap: true
        },
        js: {
          src: ['src/**/*.js'],
          dest: 'build/js/main.js'
        }
      },

      copy: {
        html: {
          expand: true,
          src: ['**/*.html'],
          dest: 'build/',
          cwd: 'src/'
        },
        js:{
          expand: true,
          src: ['angular-telephone-filter.min.js'],
          dest: 'build/js/',
          cwd: 'node_modules/angular-telephone-filter/dist/'
        },
        img: {
          expand: true,
          src: ['**/*.png', '**/*.ico', '**/*.jpg'],
          dest: 'build/',
          cwd: 'src/'
        }
      }

    });

    require('time-grunt')(grunt);

    grunt.registerTask('js-build', ['concat:js', 'jshint']);
    grunt.registerTask('css-build', ['sass']);
    grunt.registerTask('default', ['clean', 'copy', 'concat', 'jshint', 'sass']);

};
