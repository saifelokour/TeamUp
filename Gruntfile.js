module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: { 
      dist_client: {
        files: {
          'client/dist/app.js' : ['client/app/auth/*.js', 'client/app/game/*.js', 'client/app/profile/*.js', 'client/app/category/*.js', 'client/app/find/*.js','client/app/services/*.js', 'client/app/*.js'],
          'client/dist/jsFiles.js' : ["client/js/InitializePubNub.js"]
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/spec/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    uglify: { 
      options: {
            mangle: false
          },
      target: {
        files: {
         'client/dist/app.min.js' : ['client/dist/app.js']
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'client/styles/style.min.css' : ['client/styles/*.css']
          
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'client/app/**/*.js',
          'client/app/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/styles/*.css',
        tasks: ['cssmin']
      }
    },

    karma: {
        unit: {
            configFile: 'karma.conf.js'
        }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest',
    'karma'
  ]);

  //grunt.registerTask('heroku:development', 'cssmin');
  grunt.registerTask('heroku', ['concat', 'uglify', 'cssmin']);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('karma', ['karma']);

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};
