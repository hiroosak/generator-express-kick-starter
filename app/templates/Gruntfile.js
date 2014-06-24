/* global module:false, require:false, console:false*/
/* jshint camelcase:false*/

module.exports = function(grunt) {
  "use strict";

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['assets/javascripts/**/*.js'],
        dest: 'public/javascripts/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'public/javascripts/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        jshintrc: true,
        globals: {},
        ignores: ['test/coverage/**/*.js']
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['assets/javascripts/**/*.js', 'test/**/*.js']
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: "assets/stylesheets/",
          cssDir:  "public/stylesheets/"
        }
      }
    },
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      files: {
        'public/stylesheets/<%= pkg.name %>.min.css': ['public/stylesheets/**/*.css']
      }
    },
    mocha: {     // grunt-mocha(client-side mocha test)
      test: {
        src: ["test/client/**/*.js"]
      }
    },
    mochaTest: {     // grunt-mocha(client-side mocha test)
      options: {
        reporter: 'spec'
      },
      test: {
        src: ["test/app/**/*_spec.js"]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      },
      test: {
        files: ['app/**/*.js', 'test/app/**/*.js'],
        tasks: 'coverage'
      },
      server: {
        files: ['assets/**/*.js', 'assets/**/*.css'],
        tasks: 'compile'
      }
    },
    nodemon: {
      options: {
        callback: function(nodemon) {
          nodemon.on('log', function(event) {
            console.log(event.colour);
          });
        }
      },
      dev: {
        script: "./bin/www",
        options: {
          nodeArgs: ['--debug'],
          env: {
            NODE_ENV: 'development'
          }
        }
      },
      stg: {
        script: "./bin/www",
        options: {
          env: {
            NODE_ENV: 'staging'
          }
        }
      }
    },
    concurrent: { // grunt-concurrent
      test: ['jshint', 'spec'],
      concat: ['compass', 'concat'],
      minify: ['uglify', 'cssmin'],
      dev: {
        tasks: ['nodemon:dev', 'node-inspector', 'watch:server'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    "node-inspector": {
      dev: {}
    },
    clean: {
      coverage: {
        src: ['test/coverage/']
      }
    },
    copy: {
      database: {
        expand: true,
        flatten: true,
        src: ['database/*'],
        dest: 'test/coverage/instrument/database'
      },
      views: {
        expand: true,
        flatten: true,
        src: ['app/views/*'],
        dest: 'test/coverage/instrument/app/views'
      }
    },
    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../coverage/instrument/app/'
      },
      test: {
        NODE_ENV: 'test'
      }
    },
    instrument: {
      files: 'app/**/*.js',
      options: {
        lazy: true,
        basePath: 'test/coverage/instrument/'
      }
    },
    storeCoverage: {
      options: {
        dir: 'test/coverage/reports'
      }
    },
    makeReport: {
      src: 'test/coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'test/coverage/reports',
        print: 'detail'
      }
    }
  });

  grunt.registerTask('default', ['spec']);
  grunt.registerTask('serve', ['compile', 'concurrent:dev']);
  grunt.registerTask('quick-serve', ['concurrent:dev']);

  grunt.registerTask('compile', ['concurrent:test', 'concurrent:concat', 'concurrent:minify']);

  grunt.registerTask('spec', ['jshint', 'env:test', 'fixture', 'mochaTest']);
  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('coverage', ['jshint', 'clean', 'copy:database', 'copy:views', 'env:coverage', 'env:test', 'fixture',
                     'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);

  grunt.registerTask('fixture', 'Setup mongodb database', function() {
    if (process.env.NODE_ENV !==  'test') {
      throw "You can not use this task in " + process.env.NODE_ENV + " environment.";
    }
    var done = this.async();
    var config = require('config').mongoose;
    var mongoose = require('mongoose');

    mongoose.connection.once('open', function () {
      mongoose.connection.db.dropDatabase(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('Successfully dropped db');
        }
        done();
      });
    });
    mongoose.connect(config.db, config.options);
  });
};
