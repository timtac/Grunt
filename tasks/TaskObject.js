
module.exports = function (grunt) {

    grunt.registerTask('foo', function() {
       console.log('My task "%s", has arguments %j', this.name, this.args);
    });
};

// Running this task with foo:bar:bazz