module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['assets/src/js/*.js'],
                tasks: ['copy', 'shell:rollup']
            }
        },
        shell: {
            rollup: {
                command: 'node rollup.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/material-design-icons/iconfont/',
                        src: ['**'],
                        dest: 'assets/build/fonts/material-design-icons/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/materialize-css/dist/css/materialize.min.css',
                            'assets/src/css/site.css'
                        ],
                        dest: 'assets/build/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/jquery/dist/jquery.min.js',
                            'node_modules/materialize-css/dist/js/materialize.min.js'
                        ],
                        dest: 'assets/build/js/',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy', 'shell:rollup']);
    grunt.registerTask('dev', ['copy', 'shell:rollup', 'watch']);
};