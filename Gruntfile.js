/*
 * less-with-include
 * https://github.com/itsick/less-with-include
 *
 * Copyright (c) 2017 Itsick
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    less_with_include: {
      all: {
        options: {
          include : [{
              src: 'test/include/*.less'
              }
            ]
          },
        include : [{
              src: 'test/include/*.less'
              }
            ],
        files: [{
            expand: true,        // Enable dynamic expansion.
            cwd: 'test/fixtures',  // Src matches are relative to this path.
            src: ['*.less'],     // Actual pattern(s) to match.
            dest: 'tmp',  // Destination path prefix.
            ext: '.css',         // Dest filepaths will have this extension.

        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'less_with_include', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
