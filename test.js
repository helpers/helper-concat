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
var concatHelper = require('./');

describe('concat helper', function () {
  it('should return the contents of a file:', function () {
    concatHelper('fixtures/a.txt').should.equal('AAA');
  });

  it('should return the concatenated contents of a list of files:', function () {
    concatHelper('fixtures/*.txt').should.equal('AAA\nBBB\nCCC');
  });
});

describe('handlebars:', function () {
  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('concat', concatHelper);
    handlebars.compile('{{concat "fixtures/*.txt"}}')().should.equal('AAA\nBBB\nCCC');
  });
});

describe('lodash:', function () {
  it('should work as a lodash mixin:', function () {
    _.mixin({concat: concatHelper});
    _.template('<%= _.concat("fixtures/*.txt") %>', {}).should.equal('AAA\nBBB\nCCC');
  });

  it('should work when passed to lodash on the context:', function () {
    var settings = {imports: {concat: concatHelper}};
    _.template('<%= concat("fixtures/*.txt") %>', {concat: concatHelper}).should.equal('AAA\nBBB\nCCC');
  });

  it('should work as a lodash import:', function () {
    var settings = {imports: {concat: concatHelper}};
    _.template('<%= concat("fixtures/*.txt") %>', {}, settings).should.equal('AAA\nBBB\nCCC');
  });
});