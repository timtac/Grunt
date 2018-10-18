module.exports = function(grunt) {
    grunt.registerMultiTask('copy', function () {
        this.files.forEach(function (file) {
            grunt.file.copy(file.src, file.dest);
        });
        grunt.log.writeln('Copied ' + this.files.length + ' files');
    });

    grunt.initConfig({
        copy: {
            target1: {
                files: {
                    'dest/file1.txt': 'src/file3.txt',
                    'dest/file4.txt': 'src/file4.txt'
                }
            }
        }
    });
};
