'use strict';

var fs = require('fs');

function parse() {
  var that = this;

  var topics = that.input.map(function (entry) {
    return entry.topics;
  });

  return [].concat.apply([], topics).reduce(function (prev, current) {
    var prev0 = prev;
    if (prev.indexOf(current) === -1) {
      prev0 = prev.concat(current);
    }

    return prev0;
  }, []);
}


// this.topics
// this.computedTemplate

function ListProject(input) {
  this.input = input;

  if (typeof input === 'string') {
    this.input = JSON.parse(input);
  }

  this.topics = parse.call(this);
}

ListProject.prototype.toMD = function (template) {
  this['md_' + template] && this['md_' + template]() || this.md_table();
  return this;
};

ListProject.prototype.md_table = function () {
  var that = this;
  var str = '# TABLE OF CONTENT\n';

  var toc = this.topics.map(function (topic) {
    return '* [' + topic.toUpperCase() + '](#' + topic + ')\n';
  });

  str += toc.join('');

  var sections = this.topics.map(function (topic) {
    return '\n# ' + topic.toUpperCase() + ' \n'
      + '| TITLE | DESCRIPTION | NPM | GITHUB | \n'
      + '| ----- | ----------- | --- | ------ |\n'

      + that.input.filter(function (entry) {
        var result = false;
        if (entry.topics.indexOf(topic) > -1) {
          result = true;
        }
        return result;
      }).map(function (entry) {
        return '| ' + entry.title + ' | ' + entry.desc + ' | ' + (entry.package && ('[' + entry.package + '](http://www.npmjs.com/package/' + entry.package + ')')) + ' | [' + entry.title + '](' + entry.repository + ')  |';
      }).join('\n')
      + '\n';
  });

  str += sections.join('');

  this.computedTemplate = str;


  return this;
};


ListProject.prototype.toString = function () {
  return this.computedTemplate;
};

ListProject.prototype.toFile = function (path) {
  return fs.writeFileSync(path, this.computedTemplate, 'utf-8');
};

ListProject.prototype.computedTemplate = '';


module.exports = ListProject;
