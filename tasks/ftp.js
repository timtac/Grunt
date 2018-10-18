
module.exports = function(grunt) {
    // Load the plugin that provides the "ftp-deploy" task.
    grunt.loadNpmTasks('grunt-ftp-deploy');
    // Project configuration.
    grunt.initConfig({
        'ftp-deploy': {
            target1: {
                auth: {
                    host: 'localhost',
                    port: 21,
                    authKey: 'my-key' //a .ftppass file containing username and password
                },
                src: 'build',
                dest: 'build'
            } }
    });
    // Define the default task
    grunt.registerTask('default', ['ftp-deploy']);
};


module.exports = function(grunt) {
    // Load the plugin that provides the "sftp" task.
    grunt.loadNpmTasks('grunt-ssh');
    // Project configuration.
    grunt.initConfig({
        credentials: grunt.file.readJSON('credentials.json'),
        sftp: {
            options: {
                host: 'localhost',
                username: '<%= credentials.username %>',
                    password: '<%= credentials.password %>',
                    path: '/tmp/',
                    srcBasePath: 'build/'
            }, target1: {
                src: 'build/{foo,bar,bazz}.html'
            }
        } });
    // Define the default task
    grunt.registerTask('default', ['sftp']);
};

// .ftppass file
// {
//     "my-key":
//     {
//         "username":"john",
//         "password":"smith"
//     }
// }
