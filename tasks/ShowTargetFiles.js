
module.exports = function (grunt) {
	grunt.registerTask("showTargetFiles", function () {
		
		this.files.foreach(function(file) {
			console.log("sources: " + file.src + " -> " + "destination: " + file.dest);
		});
	});
};