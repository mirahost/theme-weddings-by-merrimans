'use strict';

module.exports = function(grunt) {
    
      grunt.initConfig({

        copy: {
            config: {
                files: [{
                    expand: true,
                    cwd: './bower_components/owlcarousel/owl-carousel/',
                    src: '**',
                    flatten: true,
                    dest: '../assets/css/vendor/owlcarousel/'
                }]
            }
        },

        concat: {
            config: {
                options: {
                    separator: ';',
                },
                src: [
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/what-input/what-input.js',
                    './bower_components/foundation-sites/js/foundation.core.js',
                    './bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
                    './bower_components/foundation-sites/js/foundation.util.timerAndImageLoader.js',
                    './bower_components/owlcarousel/owl-carousel/owl.carousel.js',
                    './scripts/utilities/utilities.js',
                    './scripts/utilities/components/ElephantCarousel.js',
                    './scripts/utilities/components/OwlPanel.js',
                    './scripts/pages/**/*.js',
                    './scripts/*.js',
                ],
                dest: '../assets/js/script.js',
            }
        },

        sass: {
            config: {
                options: {
                  style: 'compact',
                },
                files: {
                  '../assets/css/style.css':'./styles/style.scss',
                }
            }
        },

        uglify: {
            options: {
                mangle: true // Use if you want the names of your functions and variables unchanged
            },
            config: {
                files: {
                    '../assets/js/script.js': '../assets/js/script.js',
                }
            },
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['ie 9-11, last 4 versions']
                    })
                ]
            },
            dist: {
                src: '../assets/css/style.css'
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                processImport: false
            },
            target: {
                files: {
                    '../assets/css/style.css': '../assets/css/style.css'
                }
            }
        },

        watch: {

            config_js: {
                files: [
                    './scripts/**/*.js',
                ],   
                tasks: ['concat'],
                options: {
                    livereload: true
                }
            },
            
            config_css: {
                files: [
                    './styles/**/*.scss'
                ],
                tasks: ['sass', 'postcss'],
                options: {
                    livereload: true
                }
            },

            config_view: {
                files: [
                    '../views/**/*.html'
                ],
                options: {
                    livereload: true
                }
            }
        }
     });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Task definition
    grunt.registerTask('default', ['dev', 'watch']);
    grunt.registerTask('dev', ['concat', 'sass', 'postcss']);
    grunt.registerTask('deploy', ['concat', 'uglify', 'sass', 'postcss', 'cssmin']);
};