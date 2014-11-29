# helper-concat [![NPM version](https://badge.fury.io/js/helper-concat.svg)](http://badge.fury.io/js/helper-concat)

> Template helper for concatenating a list of files using glob patterns. Should work with handlebars, lodash or any template engine that allows helper functions.

## Install with [npm](npmjs.org)

```bash
npm i helper-concat --save
```

## Run tests

```bash
npm test
```

## Register the helper

> This should work with any engine, here are a few examples

### [template]

Register the helper for use with any template engine

```js
template.helper('concat', require('helper-concat'));
```

### [assemble]

To register the helper for use with [assemble] v0.6.x:

```js
assemble.helper('concat', require('helper-concat'));
```

### [verb]

Register the helper for use with [verb]:

```js
var verb = require('verb');
verb.helper('concat', require('helper-concat'));

verb.task('default', function() {
  verb.src('.verb*.md')
    .pipe(verb.dest('./'));
});
```

### [handlebars]

```js
var handlebars = require('handlebars');
handlebars.registerHelper('concat', require('helper-concat'));
```

### [Lo-Dash] or [underscore]

```js
var handlebars = require('handlebars');
handlebars.registerHelper('concat', require('helper-concat'));

// as a mixin
_.mixin({concat: concatHelper});
_.template('<%= _.concat("fixtures/*.txt") %>', {});
//=> 'AAA\nBBB\nCCC'

// passed on the context
var settings = {imports: {concat: concatHelper}};
_.template('<%= concat("fixtures/*.txt") %>', {concat: concatHelper});
//=> 'AAA\nBBB\nCCC'

// as an import
var settings = {imports: {concat: concatHelper}};
_.template('<%= concat("fixtures/*.txt") %>', {}, settings);
//=> 'AAA\nBBB\nCCC'
```

## Example usage

With Handlebars:

```handlebars
{{concat ""}}
```

With Lo-Dash or Underscore:

```js
<%= concat("") %>
```

With Verb (lo-dash, with special delimiters to avoid delimiter collision in markdown docs):

```js
{%= concat('') %}
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/helper-concat/issues)

To request or contribute a helper to the [github.com/helpers][helpers] org, please read [this contributing guide][guide] to get started.

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on November 29, 2014._

[assemble]: https://github.com/assemble/assemble
[generator-verb]: https://github.com/assemble/generator-verb
[handlebars-helpers]: https://github.com/assemble/handlebars-helpers/
[handlebars]: https://github.com/wycats/handlebars.js/
[helpers]: https://github.com/helpers
[Lo-Dash]: https://lodash.com/
[template]: https://github.com/jonschlinkert/template
[underscore]: https://github.com/jashkenas/underscore
[verb]: https://github.com/assemble/verb
[guide]: https://github.com/helpers/requests