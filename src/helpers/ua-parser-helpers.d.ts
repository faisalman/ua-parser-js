// Type definitions for Helpers submodule of UAParser.js v2.0.0-beta.3
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import { IResult } from "../main/ua-parser";

declare function getDeviceVendor(model: string): string | undefined;
declare function isAppleSilicon(res: IResult): boolean;
declare function isBot(res: IResult): boolean;
declare function isChromeFamily(res: IResult): boolean;
declare function isElectron(): boolean;
declare function isFromEU(): boolean;
declare function isFrozenUA(ua: string): boolean;
declare function isStandalonePWA(): boolean;

export {
    getDeviceVendor,
    isAppleSilicon,
    isBot,
    isChromeFamily,
    isElectron,
    isFromEU,
    isFrozenUA,
    isStandalonePWA
}