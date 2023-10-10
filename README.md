<p align="center">
    <a href="https://uaparser.js.org"><img src="https://raw.githubusercontent.com/faisalman/ua-parser-js/gh-pages/images/uap-header.png"></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/ua-parser-js"><img src="https://img.shields.io/npm/dw/ua-parser-js?color=red&logo=npm&label=NPM%20DOWNLOADS&style=for-the-badge"></a>
<a href="https://www.jsdelivr.com/package/npm/ua-parser-js"><img src="https://img.shields.io/jsdelivr/gh/hw/faisalman/ua-parser-js?logo=jsdelivr&style=for-the-badge"></a>
<a href="https://github.com/faisalman/ua-parser-js"><img src="https://img.shields.io/github/stars/faisalman/ua-parser-js?color=yellow&logo=github&style=for-the-badge"></a>
<a href="https://bundlephobia.com/package/ua-parser-js@1.0.35"><img src="https://img.shields.io/bundlephobia/minzip/ua-parser-js?logo=hackthebox&logoColor=white&style=for-the-badge"/></a>
<a href="https://github.com/faisalman/ua-parser-js/graphs/contributors"><img src="https://img.shields.io/github/contributors/faisalman/ua-parser-js?color=purple&logo=githubsponsors&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/ua-parser-js"><img src="https://img.shields.io/npm/v/ua-parser-js.svg?logo=npm&color=red&style=for-the-badge"></a>
<a href="https://cdnjs.com/libraries/UAParser.js"><img src="https://img.shields.io/cdnjs/v/UAParser.js.svg?color=orange&style=for-the-badge"></a>
<img src="https://img.shields.io/ossf-scorecard/github.com/faisalman/ua-parser-js?label=openssf%20scorecard&style=for-the-badge">
</p>

# UAParser.js

The most comprehensive, compact, & up-to-date JavaScript library to detect 
user's Browser, Engine, OS, CPU, and Device type/model. Runs either in browser 
(client-side) or node.js (server-side).

# Version 2.0
Before upgrading from `v0.7` / `v1.0`, please read [CHANGELOG](CHANGELOG.md) to 
see what's new & breaking.

<table>
    <thead>
        <tr>
            <th></th>
            <th>Version 1.0</th>
            <th colspan="4">Version 2.0</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>License</td>
            <td>MIT</td>
            <td>AGPLv3</td>
            <td>PRO Personal</td>
            <td>PRO Business</td>
            <td>PRO Enterprise</td>
        </tr>
        <tr>
            <td>Browser detection</td>
            <td><a href="#" title="Basic detection">⚠️</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>CPU detection</td>
            <td><a href="#" title="Basic detection">⚠️</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Device detection</td>
            <td><a href="#" title="Basic detection">⚠️</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Engine detection</td>
            <td><a href="#" title="Basic detection">⚠️</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>OS detection</td>
            <td><a href="#" title="Basic detection">⚠️</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Enhanced detection</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Client Hints support</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Extras (Apps, Bots, Libs, Emails, Media Players, etc)</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>CommonJS support</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>ES modules support</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>npm module available</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>TypeScript declarations available</td>
            <td><a href="#" title="Community version">⚠️</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Allowed for commercial use</td>
            <td>✅</td>
            <td>✅</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Permissive license</td>
            <td>✅</td>
            <td><a href="#" title="Copyleft license">⚠️</a></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Unlimited use per 1 license</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td><a href="#" title="1 project per 1 license">⚠️</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td>1-year support</td>
            <td>⛔️</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Lifetime updates</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Price</td>
            <td><a href="#" title="Pay as you want">FREE</a></td>
            <td><a href="#" title="Pay as you want">FREE</a></td>
            <td><a href="#" title="$12 (one-time fee)">$12</a></td>
            <td><a href="#" title="$25 (one-time fee)">$25</a></td>
            <td><a href="#" title="$500 (one-time fee)">$500</a></td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th align="right" colspan="6">
                <a target="_blank" href="https://store.faisalman.com/checkout/buy/e236ea87-9b2b-400e-9683-24367f731b35"> GET THE PACKAGE 📥</a>
            </th>
        </tr>
    </tfoot>
</table>

# Documentation

  * v1.0: https://github.com/faisalman/ua-parser-js/tree/1.0.35#documentation
  * v2.0: https://docs.uaparser.js.org/v2 

# Development

## Contributors

Large or small, your contribution is valuable here. Please read [CONTRIBUTING](CONTRIBUTING.md) 
guide first for the instruction details.

<a href="https://github.com/faisalman/ua-parser-js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=faisalman/ua-parser-js" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Backers & Sponsors

<a href="https://opencollective.com/ua-parser-js"><img src="https://opencollective.com/ua-parser-js/organizations.svg?avatarHeight=64"></a>
<a href="https://opencollective.com/ua-parser-js"><img src="https://opencollective.com/ua-parser-js/individuals.svg?avatarHeight=64"></a>

# License

AGPLv3 License

Copyright (c) 2012-2023 Faisal Salman <<f@faisalman.com>>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
