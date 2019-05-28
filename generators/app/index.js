'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

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

	// components
	this.fs.copy(
	    this.templatePath('./design/components/_preview.hbs'),
	    this.destinationPath('./design/components/_preview.hbs'),
	);

	mkdirp.sync('./design/components/base');
	mkdirp.sync('./design/components/atoms');
	mkdirp.sync('./design/components/molecules');
	mkdirp.sync('./design/components/organisms');
	mkdirp.sync('./design/components/templates');
	mkdirp.sync('./design/components/pages');

	// docs
	this.fs.copyTpl(
	    this.templatePath('./design/docs/index.md'),
	    this.destinationPath('./design/docs/index.md'),
	    this.props
	);

	// public
	mkdirp.sync('./design/public/css');
	mkdirp.sync('./design/public/img');
	mkdirp.sync('./design/public/js');

	// scss
	this.fs.copy(
	    this.templatePath('./design/scss/main.scss'),
	    this.destinationPath('./design/scss/main.scss')
	);

	this.fs.copy(
	    this.templatePath('./design/scss/_variables.scss'),
	    this.destinationPath('./design/scss/_variables.scss')
	);

	mkdirp.sync('./design/scss/mixins');
	
	
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
