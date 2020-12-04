NPM Get Version
===============

[![npm package][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Coverage Status][coveralls-image]][coveralls-url] 
[![Dependencies Status][david-image]][david-url]

Small utility to get the version of an npm package going back `N` versions from a specified tag. Can be used via command line or api. Will invoke `npm info` to get package information. Assumes npm executable is available (should be on the PATH). 

Command line syntax for specifying desired package and version:
```
npm-get-version <package_name>@<tag>~<N>
```
Where N specifies the number of versions back. Pre-release versions are ignored when invoked from command line. Will return:
```
<package_name>@<version>
```
Example:
```
npm-get-version babel@latest~3
babel@6.5.0
```

Usage via api example:
```javascript
const {convertNpmVersion} = require('npm-get-version');
console.log(convertNpmVersion('babel@latest~3')); // babel@6.5.0
```

## Installation
Install locally:
```
npm install npm-get-version
```
Or install globally:
```
npm install -g npm-get-version
```

**Note**: Node 6.10 or higher runtime required.

[npm-image]:https://img.shields.io/npm/v/npm-get-version.svg
[npm-url]:http://npmjs.org/package/npm-get-version
[travis-image]:https://travis-ci.com/glicht/npm-get-version.svg?branch=master
[travis-url]:https://travis-ci.com/glicht/npm-get-version
[david-image]:https://david-dm.org/glicht/npm-get-version/status.svg
[david-url]:https://david-dm.org/glicht/npm-get-version
[coveralls-image]:https://coveralls.io/repos/github/glicht/npm-get-version/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/glicht/npm-get-version?branch=master
