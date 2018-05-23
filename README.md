# NPM Get Version

Small utility to get version of npm package going back N versions from specified tag. Can be used via command line or api. Will invoke `npm info` to get package information. Assumes npm is on the path. 

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

