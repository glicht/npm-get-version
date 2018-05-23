#!/usr/bin/env node

import { convertNpmVersion } from "../lib";

if(process.argv.length !== 3) {
  console.error(`Usage: npm-get-version <package>@<tag>~<N>`);
  process.exit(1);
}

try {
  const res = convertNpmVersion(process.argv[2]);
  console.log(res);
} catch (error) {
  console.error(`Error [${error.code}]: ${error.message}`);
  process.exit(1);
}
