// Type definitions for Helpers submodule of UAParser.js v2.0.0-beta.3
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import { IResult } from "../main/ua-parser";

declare function isAppleSilicon(res: IResult): boolean;
declare function isChromeFamily(res: IResult): boolean;
declare function isFrozenUA(ua: string): boolean;
declare function isStandalonePWA(): boolean;

export {
    isAppleSilicon,
    isChromeFamily,
    isFrozenUA,
    isStandalonePWA
}