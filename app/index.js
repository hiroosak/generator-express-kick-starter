'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var crypto = require('crypto');

var randomStringGen = function(size) {
  size = size || 32;
  var buf = crypto.randomBytes(size)
  return buf.toString('hex');
};

var ExpressKickStarterGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous ExpressKickStarter generator!'));

    var prompts = [];
    var prompts = [{
      type: 'input',
      name: 'appname',
      message: 'What is your project name?',
      default: this.appname
    }];

    this.prompt(prompts, function (props) {
      this.appname = props.appname;
      done();
    }.bind(this));
  },
  setSalt: function() {
    this.sessionSalt = randomStringGen();
    this.jwtSalt = randomStringGen();
  },
  app: function () {
    this.directory('app');
    this.directory('bin');
    this.directory('docs');
    this.mkdir('public');
    this.directory('assets');
    this.directory('test');
    this.mkdir('logs');

    this.copy('server.js');
    this.copy('testem.json');
    this.copy('processes.json');
    this.copy('Gruntfile.js');

    this.template('config/default.yaml');
    this.copy('config/test.yaml');
    this.copy('config/development.yaml');
    this.copy('config/staging.yaml');
    this.copy('config/production.yaml');
    this.copy('config/log4js.json');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('bowerrc', '.bowerrc');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.template('_README.md', 'README.md');
  }
});

module.exports = ExpressKickStarterGenerator;
