'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'templateType',
          message: 'Which kind of template should be used',
	  choices: [
	      '.hbs',
	      '.twig',
	      '.njk',
	      '.mustache'
	  ],
        default: '.hbs'
      },
	 {
        type: 'list',
        name: 'cssType',
          message: 'Which kind of template should be used',
	  choices: [
	      '.scss',
	      '.less'
	  ],
        default: '.scss'
      },
    ];
      if (this.config.get('templateType') && this.config.get('cssType') ) {
	  this.props = this.config.getAll();
      } else {
	  return this.prompt(prompts).then(props => {
	      this.props = props;
	      this.config.set(props);
	  });
      }
  }

    initializing() {
	this.argument('atomicType', {required: true, type: String});
	this.argument('name', {required: true, type: String});
	this.argument('block', {required: true, type: String});
	this.argument('element', {required: false, type: String});
	this.argument('modifier', {required: false, type: String});
    }

    writing() {
	var templateType =this.props.templateType;
	var cssType =this.props.cssType;
	
	var atomicType = this.options['atomicType']
	var name = this.options['name'];
	var base = 'design/components/' + atomicType + '/' + name + '/' + name;

	var block = this.options['block'];
	var element = this.options['element'];
	var modifier = this.options['modifier'];
	
	if (this.options['element']) {
	    this.options['element'] = block+ '__' + element;
	}
	if (modifier) {
	    this.options['modifier'] = this.options['element'] + '--' + modifier;
	}
	
	this.fs.copyTpl(
	    this.templatePath('markup.html'),
	    this.destinationPath(base + templateType),
	    this.options
	);

	this.fs.copyTpl(
	    this.templatePath('styles' + cssType),
	    this.destinationPath(base + cssType),
	    this.options
	);

	this.fs.copyTpl(
	    this.templatePath('config.js'),
	    this.destinationPath(base + '.config.js'),
	    this.options
	);
  }

};
