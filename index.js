/*!
 * helper-concat <https://github.com/jonschlinkert/helper-concat>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var glob = require('globby');
var fs = require('fs');

/**
 * Return the contatenated content from a list of files
 * using glob patterns.
 *
 * ```handlebars
 * {{concat 'files/*.md'}}
 * ```
 * @param {String} `patterns`
 * @param {Options} `options`
 * @return {String}
 */

module.exports = function(patterns, options) {
  var files = glob.sync(patterns, options);

  return files.map(function (fp) {
    return fs.readFileSync(fp, 'utf8');
  }).join('\n');
};
