#!/usr/bin/env bash

echo '
- run build
'
npm run build || exit 1

echo '
- lint js code
'
npm run test:jshint || exit 1 
#npm run test:eslint || exit 1 

echo '
- test using mocha
'
npm run test:mocha || exit 1 

echo '
- test using playwright
'
npm run test:playwright || exit 1 

echo '
- lint lockfile
'
npm run test:lockfile-lint || exit 1 