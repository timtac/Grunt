
module.exports = function(grunt){
	grunt.registerTask('stringCheck', function () {
		grunt.config.requires('stringCheck.file');
		grunt.config.requires('stringCheck.string');
		
		var file = grunt.config('stringCheck.file');  //retrieves the file name
		var content = grunt.file.read(file);  //retrieves file content
		//retrieve string to search for
		var string = grunt.config('stringCheck.string');
		
		if (content.indexOf(string >= 0)){ 
			grunt.fail.warn('"' + string + '" found in "' + file + '"' );
		}
	});
};