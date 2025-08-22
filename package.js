Package.describe({
  name: 'faisalman:ua-parser-js',
  version: '2.0.4',
  summary: 'Lightweight JavaScript-based user-agent string parser',
  git: 'https://github.com/faisalman/ua-parser-js.git',
  documentation: 'readme.md'
});

Package.onUse(function (api) {
  api.addFiles("src/ua-parser.js");
  api.export("UAParser");
});
