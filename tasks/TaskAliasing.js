

module.exports = function(grunt) {

    grunt.registerTask('build','Builds the project', function () {
        console.log('building');
    });

    grunt.registerTask('test','Tests the project', function () {
        console.log('testing');
    });

    grunt.registerTask('upload','Uploads the project', function () {
        console.log('uploading');
    });

    grunt.registerTask('deploy', ['build', 'test', 'upload']);

    //running grunt deploy will run all three tasks in sequence
};