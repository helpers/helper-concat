/*!
 * helper-concat <https://github.com/jonschlinkert/helper-concat>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var glob = require('globby');
var async = require('async');
var extend = require('extend-shallow');

/**
 * Expose `concat`
 */

module.exports = concat;

/**
 * Get the contatenated content from a glob of files.
 *
 * ```js
 * var concat = require('helper-concat');
 *
 * concat('files/*.md', function(err, content) {
 *   //=> 'AAA\nBBB\nCCC'
 * });
 * ```
 * As a helper:
 *
 * ```handlebars
 * {{concat 'files/*.md'}}
 * ```
 * @param {String} `patterns`
 * @param {Options} `options`
 * @return {String}
 * @api public
 */

function concat(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({sep: '\n'}, options);

  glob(patterns, options, function(err, files) {
    async.concatSeries(files, fs.readFile, function(err, arr) {
      if (err) return cb(err);
      cb(null, arr.join(opts.sep));
    });
  });
};

/**
 * Synchronously get the contatenated content from a glob of files.
 *
 * ```js
 * var concat = require('helper-concat');
 *
 * concat('files/*.md');
 * //=> 'AAA\nBBB\nCCC'
 * ```
 * As a helper:
 *
 * ```handlebars
 * {{concat 'files/*.md'}}
 * ```
 * @param {String} `patterns`
 * @param {Options} `options`
 * @return {String}
 * @api public
 */

module.exports.sync = function concatSync(patterns, options) {
  var files = glob.sync(patterns, options);
  var opts = extend({sep: '\n'}, options);

  return files.map(function (fp) {
    return fs.readFileSync(fp, 'utf8');
  }).join(opts.sep);
};
