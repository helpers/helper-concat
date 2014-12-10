/*!
 * helper-concat <https://github.com/jonschlinkert/helper-concat>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var handlebars = require('handlebars');
var _ = require('lodash');
var concat = require('./');

describe('async', function () {
  describe('concat helper', function () {
    it('should return the contents of a file:', function (done) {
      concat('fixtures/a.txt', function  (err, content) {
        content.should.equal('AAA');
        done();
      });
    });

    it('should return the concatenated contents of a list of files:', function (done) {
      concat('fixtures/*.txt', function  (err, content) {
        content.should.equal('AAA\nBBB\nCCC');
        done();
      });
    });

    it('should use a custom separator:', function (done) {
      concat('fixtures/*.txt', {sep: '~~'}, function  (err, content) {
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
    it('should work as a lodash mixin:', function () {
      _.mixin({concat: concat.sync});
      _.template('<%= _.concat("fixtures/*.txt") %>', {}).should.equal('AAA\nBBB\nCCC');
    });

    it('should work when passed to lodash on the context:', function () {
      _.template('<%= concat("fixtures/*.txt") %>', {concat: concat.sync}).should.equal('AAA\nBBB\nCCC');
    });

    it('should work as a lodash import:', function () {
      var settings = {imports: {concat: concat.sync}};
      _.template('<%= concat("fixtures/*.txt") %>', {}, settings).should.equal('AAA\nBBB\nCCC');
    });
  });
});