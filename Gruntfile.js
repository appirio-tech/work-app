// Generated on 2014-07-11 using generator-angular 0.9.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'src/client/app',
    dist: 'dist',
    cdnPath: 's3.amazonaws.com'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      haml: {
        files: ['<%= yeoman.app %>/{,**/}*.haml'],
        tasks: ['newer:haml:dist', 'includes']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      coffee: {
        files: ['<%= yeoman.app %>/**/*.coffee'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['newer:coffee:test', 'karma:unit']
      },
      compass: {
        files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.{html,js,css}',
          '.tmp/**/*.{html,js,css}',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35730
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              require('connect-modrewrite')([
                '!admin/*|bower_components/*|blocks/*|core/*|layout/*|project/*|widgets/*|images/*|fonts/*|\\.ico$|\\.html$ /index.html [L]'
              ]),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      },
      server: {
        proxies: [{ // https://github.com/drewzboto/grunt-connect-proxy for docs
          context: [
            '/api',
            '/index.json'
          ],
          host: 'localhost',
          port: 8083
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    includes: {
      html: {
        src: ['.tmp/**/*.html'], // Source files
        dest: '', // Note, dest is always relative to root
        cwd: '',
        options: {
          debug: true,
          includePath: '.tmp'
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: ''
      },
      app: {
        src: ['.tmp/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= yeoman.app %>/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '**/*.coffee',
          dest: '.tmp',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    haml: {
      options: {
        language: 'ruby',
        rubyHamlCommand: 'haml -t ugly --double-quote-attributes'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            src: '**/*.haml',
            dest: '.tmp',
            ext: '.html'
          }
        ]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>',
        cssDir: '.tmp',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/fonts',
        importPath: './bower_components',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated',
          httpImagesPath: '/images',
          httpFontsPath: '/fonts',
          httpGeneratedImagesPath: '/images/generated',
        }
      },
      server: {
        options: {
          debugInfo: true,
          httpImagesPath: '/images',
          httpGeneratedImagesPath: '/images/generated',
          httpFontsPath: '/fonts',
        }
      }
    },

    'string-replace': {
      cdnify: {
        files: [{
          expand: true,
          src: [
            '<%= yeoman.dist %>/**/*.js',
            '<%= yeoman.dist %>/**/*.css',
            '<%= yeoman.dist %>/**/*.html'
          ],
          dest: '.' // Note, dest is always relative to root
        }],
        options: {
          replacements: [{
            pattern: /\/(locales|images|styles|scripts|views)\//gi,
            replacement: '//<%= yeoman.cdnPath %>/$1/'
          }]
        }
      }
    },

    // Renames files for browser caching/CDN purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/**/*.js',
          '<%= yeoman.dist %>/locales/**/*.json',
          '<%= yeoman.dist %>/styles/**/*.css',
          '<%= yeoman.dist %>/views/**/*.html',
          '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg,ico}',
          '<%= yeoman.dist %>/fonts/**/*.{eot,svg,ttf,woff,otf}'
        ]
      }
    },

    // Configure a mocha task
    mocha: {
      test: {
        src: ['test/**/*.html'],
        options: {
          run: true,
        },
      },
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['.tmp/index.html'],
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html   : ['<%= yeoman.dist %>/*.html'],
      views  : ['<%= yeoman.dist %>/{scripts,views}/*.{js,html}'],
      css    : ['<%= yeoman.dist %>/**/*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>'
        ],
        patterns: {
          views: [
            [/(views\/.*?\.html)/gm, 'Update JS files to reference revved html files.'],
            [/(locales\/.*?\.json)/gm, 'Update JS files to reference revved locale files.']
          ]
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true,
          removeComments: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Add, remove and rebuild AngularJS dependency injection annotations.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '**/*.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'images/**/*',
            'fonts/**/*',
            'locales/**/*'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'favicon.ico'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, { // copy html files generated from haml
          expand: true,
          cwd: '.tmp',
          dest: '<%= yeoman.dist %>',
          src: ['**/*.html']
        }]
      },

      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '**/*.css'
      },
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'coffee:dist',
        'haml:dist',
        'compass:server'
      ],
      test: [
        'coffee',
        'haml',
        'compass'
      ],
      dist: [
        'coffee',
        'haml:dist',
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.coffee',
        singleRun: true
      },
      server: {
        configFile: 'test/karma.conf.coffee',
        singleRun: false
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'includes',
      'wiredep',
      'configureProxies:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'includes',
    'wiredep',
    'useminPrepare',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'string-replace:cdnify',
    'clean:server',
    'concurrent:server'
  ]);

  grunt.registerTask('develop', [
    'clean:dist',
    'concurrent:dist',
    'includes',
    'wiredep',
    'useminPrepare',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'clean:server',
    'concurrent:server'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
