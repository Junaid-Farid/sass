module.exports = function (grunt) {
    grunt.initConfig({
        //reading files
        pkg: grunt.file.readJSON("package.json"),
        connect: {
            server: {
                options: {
                    bases: 'grunt/sass_learn',
                    hostname: 'localhost',
                    port: 9000,
                    protocol: 'http',
                    livereload: true,
                    open: true
                }
            }
        },
        uglify: {
            options: {
                mangle: true, //short name
                compress: true, //minifying
                sourceMap: "assets/common/js/application.map", // map files of js
                banner: "/* <%= pkg.author %> <%= pkg.license%> | <%= grunt.template.date(new Date(100), 'yyyy-mm-dd')%> \n */"
                        //banner is the discription to the files          <%= grunt.template.date(new Date(100), 'yyyy-mm-dd')%>
            },
            target: {
                files: {
                    'assets/common/js/application.min.js': 'assets/common/js/application.js'
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    sourceMap: true,
                    banner: "/* <%= pkg.author %> <%= pkg.license%> | <%= grunt.template.date(new Date(100), 'yyyy-mm-dd')%> \n */"
                },
                files: {
                    'assets/common/css/style.min.css': ['assets/common/css/style.css']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'assets/common/css/style.css': 'assets/common/css/sass-style.scss'
                }
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false,
                    nospawn: true
                },
                files: ['*.html', './**/**/*.scss', './**/**/*.css']
            },
            scripts: {
                files: 'assets/common/js/application.js',
                tasks: 'uglify'

            },
            css: {
                files: 'assets/common/css/sass-style.scss',
                tasks: ['sass', 'cssmin']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-livereload');

    grunt.registerTask('default', ['connect', 'sass', 'cssmin', 'uglify', 'watch']);
};