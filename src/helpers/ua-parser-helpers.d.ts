// Type definitions for Helpers submodule of UAParser.js v2.0.0-beta.2
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import { IResult } from "../main/ua-parser";

declare function isAppleSilicon(res: IResult): boolean;
declare function isChromiumBased(res: IResult): boolean;
declare function isFrozenUA(ua: string): boolean;

export {
    isAppleSilicon,
    isChromiumBased,
    isFrozenUA
}