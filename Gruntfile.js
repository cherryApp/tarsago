module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/**/*.js',
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                files: [
                // includes files within path 
                    {
                        expand: true,
                        src: ['index.html'],
                        dest: 'build/',
                        filter: 'isFile'
                },

                // includes files within path and its sub-directories 
                    {
                        expand: true,
                        src: ['css/**'],
                        dest: 'build/'
                    }
            ],
                options: {
                    process: function (content, srcpath) {
                        content = content.replace(/\<script.*\<\/script\>/g, "");
                        return content.replace(/\<\!\-\- min\.js \-\-\>/,
                            "<script src=\"js/tarsago.min.js\"></script>");
                    }
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);

};