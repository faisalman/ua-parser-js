#!/usr/bin/env bash

echo '
- lint js code
'
jshint src && jshint script || exit 1 

echo '
- test using mocha
'
mocha -R list test/mocha*js || exit 1 

echo '
- test using playwright
'
npx playwright test || exit 1 

echo '
- lint lockfile
'
npx lockfile-lint -p package-lock.json || exit 1 