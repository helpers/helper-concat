/*!
 * helper-concat <https://github.com/jonschlinkert/helper-concat>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var _ = require('lodash');
var handlebars = require('handlebars');
var concat = require('./');
require('should');

describe('async', function () {
  var orig = process.cwd();
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });
  after(function () {
    process.chdir(orig);
  });

  describe('concat helper', function () {
    it('should return the contents of a file:', function (done) {
      concat('a.txt', function  (err, content) {
        content.should.equal('AAA');
        done();
      });
    });

    it('should return the concatenated contents of a list of files:', function (done) {
      concat('*.txt', function  (err, content) {
        content.should.equal('AAA\nBBB\nCCC');
        done();
      });
    });

    it('should use a custom separator:', function (done) {
      concat('*.txt', {sep: '~~'}, function  (err, content) {
        content.should.equal('AAA~~BBB~~CCC');
        done();
      });
    });
  });
});

describe('sync', function () {
  describe('concat helper', function () {
    it('should return the contents of a file:', function () {
      concat.sync('fixtures/a.txt').should.equal('AAA');
    });

    it('should return the concatenated contents of a list of files:', function () {
      concat.sync('fixtures/*.txt').should.equal('AAA\nBBB\nCCC');
    });

    it('should use a custom separator:', function () {
      concat.sync('fixtures/*.txt', {sep: '~'}).should.equal('AAA~BBB~CCC');
    });
  });

  describe('handlebars:', function () {
    it('should work as a handlebars helper:', function () {
      handlebars.registerHelper('concat', concat.sync);
      handlebars.compile('{{concat "fixtures/*.txt"}}')().should.equal('AAA\nBBB\nCCC');
    });
  });

  describe('lodash:', function () {
    var settings;

    beforeEach(function () {
      settings = {imports: {concat: concat.sync}};
    })
    it('should work as a lodash mixin:', function () {
      _.mixin({concat: concat.sync});
      _.template('<%= _.concat("fixtures/*.txt") %>', {})().should.equal('AAA\nBBB\nCCC');
    });

    it('should work when passed to lodash on the context:', function () {
      _.template('<%= concat("fixtures/*.txt") %>', settings)().should.equal('AAA\nBBB\nCCC');
    });

    it('should work as a lodash import:', function () {
      var settings = {imports: {concat: concat.sync}};
      _.template('<%= concat("fixtures/*.txt") %>', settings)().should.equal('AAA\nBBB\nCCC');
    });

    it('should read a glob of files and concatenate them.', function() {
      _.template('<%= concat("fixtures/*.js") %>', settings)().should.equal([
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}',
        'function bar(x, y, z) {',
        '  return x + y + z;',
        '}'
      ].join('\n'));
    });
  });
});
