'use strict';

import chalk from 'chalk';
import yosay from 'yosay';

import Generator from 'yeoman-generator';

export default class AppGeneratorClass extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.log(yosay(
          'Welcome to ' + chalk.red('nodejs-microservice') + ' generator!' 
        ));
    }

    initializing() {
        this.log("Generating Node.js Microservices");
    }

    prompting() {
        const that = this;

        const prompts = [
          {
            type: "string",
            name: "name",
            message: "What is the application name?",
            default: "myservice"
          },
          {
            type: "string",
            name: "description",
            message: "What is the application description?",
            default: "A nodejs microservices"
          },
          {
            type: 'input',
            name: 'srcDir',
            message: 'Where to put the source code?',
            default: that.config.get('srcDir') || 'src'
          },
          {
            type: 'input',
            name: 'author',
            message: function (props) {
              return 'Who is the author of this application?';
            },
            default: that.config.get('author') || 'nobody'
          },
          {
            type: 'input',
            name: 'apiRoot',
            message: function (props) {
              return 'What is the root of your API?';
            },
            default: that.config.get('apiRoot') || '/api'
          },
          {
            type: 'input',
            name: 'apiDir',
            message: function (props) {
              return 'Where to put the API code (inside ./' + props.srcDir + ')?';
            },
            default: that.config.get('apiDir') || 'api'
          }
        ];
    
        return this.prompt(prompts).then(
          function (props) {
            that.props = props;

            that.config.set({
              name: props.name,
              description: props.description,
              srcDir: props.srcDir,
              apiRoot: props.apiRoot,
              apiDir: props.apiDir,
              author: props.author
            });
          });
      }

    writing() {
        const props = this.props;
        const copy = this.fs.copy.bind(this.fs);
        const copyTpl = this.fs.copyTpl.bind(this.fs);
        const tPath = this.templatePath.bind(this);
        const dPath = this.destinationPath.bind(this);

        copyTpl(tPath('api'), dPath(props.srcDir) + '/api', props);
        copyTpl(tPath('express'), dPath(props.srcDir) + '/express', props);
        
        copyTpl(tPath('package.json'), dPath(props.srcDir) + '/package.json', props);
        copyTpl(tPath('index.js'), dPath(props.srcDir) + '/index.js', props);
        copyTpl(tPath('config.js'), dPath(props.srcDir) + '/config.js', props);
    }

    install() {
    }
    
    end() {
      const props = this.props;
      this.log(chalk.green(`Application ${props.name} generated successfully!!!`));
    }
  };