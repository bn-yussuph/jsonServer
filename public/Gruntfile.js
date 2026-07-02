(function(){
    'use strict';

module.exports = function (grunt) {
  // Automatically load all grunt tasks from dependencies
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Wipe out older builds to avoid leftover artifacts
    clean: {
      dist: ['dist/', '.tmp/']
    },

    // Cache HTML views directly into AngularJS $templateCache to remove async HTTP requests
    ngtemplates: {
      app: {
        src: 'src/app/**/*.html',
        dest: '.tmp/templates.js',
        options: {
          module: 'wardApp', // Match your exact main angular module name
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true
          }
        }
      }
    },

    // Combine application files and cached templates in a predictable dependency order
    concat: {
      options: {
        separator: ';\n'
      },
      dist: {
        src: [
          'src/app/app.js',          // Entrypoint module declaration
          'src/app/**/*.js',         // Services, factories, components, controllers
          '.tmp/templates.js'        // Generated templates file
        ],
        dest: '.tmp/app.combined.js'
      }
    },

    // Automatically add strict Dependency Injection arrays to safeguard against minification bugs
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: {
          '.tmp/app.annotated.js': ['.tmp/app.combined.js']
        }
      }
    },

    // Compress code into a production bundle
    uglify: {
      options: {
        mangle: true, // Safe to leave true since ngAnnotate secured DI annotations
        compress: true,
        sourceMap: true
      },
      dist: {
        files: {
          'dist/js/app.min.js': ['.tmp/app.annotated.js']
        }
      }
    }
  });

  // Default execution pipeline
  grunt.registerTask('build', [
    'clean:dist',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'uglify'
  ]);
};

})()