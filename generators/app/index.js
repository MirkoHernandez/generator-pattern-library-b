'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
      const prompts = [
	     {
		type: 'input',
		name: 'projectName', 
		message: 'Your project name',
		default: this.appname
	    }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

    writing() {
	
      	// Project files and folders
	this.fs.copyTpl(
	    this.templatePath('design/'),
	    this.destinationPath('./design'),
	    this.props
	);

	// Gulp build system
	this.fs.copyTpl(
	    this.templatePath('gulpfile.js'),
	    this.destinationPath('gulpfile.js'),
	    this.props
	);
	this.fs.copy(
	    this.templatePath('fractal.js'),
	    this.destinationPath('fractal.js')
	);

	// Libraries
	this.fs.copyTpl(
	    this.templatePath('package.json'),
	    this.destinationPath('package.json'),
	    this.props
	);
	this.fs.copy(
	    this.templatePath('gitignore'), 
	    this.destinationPath('.gitignore')
	);
  }

    install() {
	this.installDependencies({
	    yarn: true,
	    npm: false,
	    bower: false,
	});
    }
};
