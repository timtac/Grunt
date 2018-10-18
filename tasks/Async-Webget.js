var request = require('request');
const url = '';

module.exports = function (grunt) {
    grunt.registerTask('webget', function () {
        const done = this.async();
        request(url, function(err, response, contents) {
            if (err){
                done(err);
            }
            else if (response.statusCode !== 200) {
                done( new Error('Not Ok'));
            }
            else {
                grunt.file.write('FILE.md', contents);
                grunt.log.ok('FILE.md successfully created');
                done();
            }
        });
    });
};