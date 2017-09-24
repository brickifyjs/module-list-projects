'use strict';

var o = require('ospec');

var fs = require('fs');
var ListProject = require('../index.js');

o.spec('ListProject', function () {
  var md;

  o('create instance', function () {
    md = new ListProject([
      {
        'repository': 'URL',
        'package': 'PACKAGE_NAME',
        'title': 'PROJECT TITLE',
        'desc': 'PROJECT DESCRIPTION',
        'topics': [
          'JAVASCRIPT'
        ]
      },
      {
        'repository': 'URL',
        'package': 'PACKAGE_NAME',
        'title': 'PROJECT TITLE',
        'desc': 'PROJECT DESCRIPTION',
        'topics': [
          'JAVASCRIPT'
        ]
      }
    ]);

    o(md instanceof ListProject).equals(true);
  });

  o('create instance from string', function () {
    md = new ListProject('[{"repository": "URL","package": "PACKAGE_NAME","title": "PROJECT TITLE","desc": "PROJECT DESCRIPTION","topics": ["JAVASCRIPT"]}]');

    o(md instanceof ListProject).equals(true);
  });

  o('compute', function () {
    md.toMD();
    o(md.hasOwnProperty('computedTemplate')).equals(true);
  });

  o('export to string', function () {
    o(typeof md.toString()).equals('string');
  });

  o('export to file', function (done, timeout) {
    var path = './tests/test.md';

    md.toFile(path);

    timeout(250);

    fs.stat(path, function () {
      fs.unlink(path, function () {
        setTimeout(done, true);
      });
    });
  });
});
