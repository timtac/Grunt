
module.exports = function(grunt) {
    //require('load-grunt-tasks')(grunt);//single command to use instead of loadNpmTasks(), goes to our devDependencies and automatically load all grunt plugins.
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");

    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-stylus");
    grunt.loadNpmTasks("grunt-contrib-pug");
    grunt.loadTasks("./tasks");

    grunt.loadNpmTasks('grunt-aws');
	
	grunt.initConfig ({
		aws: grunt.file.readJSON("aws.json"),
		s3:{
			options: {
				accessKeyId: "<%= aws.accessKeyId %>",
				secretAccessKey: "<%= aws.secretAccessKey %>",
				bucket: ""
			},
			build: {
				cwd: "build/",
				src: "**"
			}
		},

		srcFiles: ["./tasks/StringStatus.js", "./tasks/ShowTargetFiles.js", "./tasks/TaskAliasing.js","./tasks/DeployLogTask.js","./tasks/Async.Webget.js", "./tasks/MultiTaskCopy.js", "./tasks/TaskCopy.js", "./tasks/views/app.pug"],
		concat: {
			target1: {
				files: {
					"build/js/app.js": "<%= srcFiles %>"
				}
			}
		},
		watch: {
			scripts: {
				files: "tasks/scripts/**/*.coffee",
				tasks: "scripts"
			},
            styles: {
                files: "tasks/styles/**/*.styl",
                tasks: "styles"
            },
            views: {
                files: "tasks/views/**/*.pug",
                tasks: "views"
            }
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			target1: 'tasks/*.js'
		},
		uglify: {
			compress: {
				src: "<%=coffee.build.dest %>",
				dest: "<%=coffee.build.dest %>"
			}
		},
		cssmin: {
			compress: {
				src: "<%= stylus.build.dest %>", //source path
				dest: "<%= stylus.build.dest %>" //dest path
			}
		},
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				removeOptionalTags: true
			},
			compress: {
				src: "<%= pug.build.dest %>",
				dest: "<%= pug.build.dest %>" //
			}
		},
		coffee: {
			build: {
				options:{
					join: true
				},
				src: ["tasks/scripts/**/*.coffee",
				"!tasks/scripts/app.coffee",
				"tasks/scripts/app.coffee"],
				dest: "build/js/app.js"
			}
		},
		stylus: {
			build: {
				src: "tasks/styles/app.styl",
				dest: "build/css/app.css"
			}
		},
		pug: {
			build: {
				options: {
					pretty: true
				},
				src: "tasks/views/app.pug",
				dest:"build/app.html"
			}
		}
	});

	grunt.registerTask('check', function () {
		if (grunt.file.exists('.jshintrc')) {
			grunt.task.run('jshint');
		} else {
			console.log('.jshintrc Not found')
		}
	});

	//Initialize environment
	var env = grunt.option('env') || 'dev';

	//Environment specific tasks
	if (env === 'prod') {
		grunt.registerTask('scripts', ['coffee', 'uglify']);
		grunt.registerTask('styles', ['stylus', 'cssmin']);
		grunt.registerTask('views', ['pug', 'htmlmin']);
	} else {
        grunt.registerTask('scripts', ['coffee']);
        grunt.registerTask('styles', ['stylus']);
        grunt.registerTask('views', ['pug']);
	}

	grunt.registerTask('deploy', ['build', 's3'])

	grunt.registerTask('build', ['scripts', 'styles', 'views']);

	//grunt.registerTask('default', ['build', 'watch']);
	grunt.registerTask('default', ['build', 'jshint']);
};