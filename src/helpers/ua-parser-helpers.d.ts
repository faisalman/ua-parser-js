// Type definitions for Helpers submodule of UAParser.js v2.0.3
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import type { IResult } from "../main/ua-parser";

declare function getDeviceVendor(model: string): string | undefined;
declare function isAppleSilicon(resultOrUA: IResult | string): boolean;
declare function isAIBot(resultOrUA: IResult | string): boolean;
declare function isBot(resultOrUA: IResult | string): boolean;
declare function isChromeFamily(resultOrUA: IResult | string): boolean;
declare function isElectron(): boolean;
declare function isFromEU(): boolean;
declare function isFrozenUA(ua: string): boolean;
declare function isStandalonePWA(): boolean;

export {
    getDeviceVendor,
    isAppleSilicon,
    isAIBot,
    isBot,
    isChromeFamily,
    isElectron,
    isFromEU,
    isFrozenUA,
    isStandalonePWA
}