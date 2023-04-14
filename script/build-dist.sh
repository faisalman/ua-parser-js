#!/usr/bin/env bash

SRC_PATH="src/ua-parser.js"
MIN_PATH="dist/ua-parser.min.js"
PACK_PATH="dist/ua-parser.pack.js"

# minified
echo "Generate ${MIN_PATH}"
uglifyjs $SRC_PATH -o $MIN_PATH --comments "/^ UA/"

# packed
echo "Generate ${PACK_PATH}"
uglifyjs $SRC_PATH -o $PACK_PATH --comments "/^ UA/" --compress --mangle