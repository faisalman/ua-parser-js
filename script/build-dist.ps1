$SRC_PATH = "src/main/ua-parser.js"
$MIN_PATH = "dist/ua-parser.min.js"
$PACK_PATH = "dist/ua-parser.pack.js"

$SRC_PATH_MJS = "src/main/ua-parser.mjs"
$MIN_PATH_MJS = "dist/ua-parser.min.mjs"
$PACK_PATH_MJS = "dist/ua-parser.pack.mjs"

# minified
Write-Host "Generate $MIN_PATH"
uglifyjs $SRC_PATH -o $MIN_PATH --comments "/^ UA/"

Write-Host "Generate $MIN_PATH_MJS"
uglifyjs $SRC_PATH_MJS -o $MIN_PATH_MJS --comments "/^ UA/" --module

# packed
Write-Host "Generate $PACK_PATH"
uglifyjs $SRC_PATH -o $PACK_PATH --comments "/^ UA/" --compress --mangle

Write-Host "Generate $PACK_PATH_MJS"
uglifyjs $SRC_PATH_MJS -o $PACK_PATH_MJS --comments "/^ UA/" --compress --mangle --module