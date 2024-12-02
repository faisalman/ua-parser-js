// Type definitions for Device Utils submodule of UAParser.js v2.0.0
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import type { IResult, IDevice } from "../main/ua-parser";

declare function isMobile(val: IResult | IDevice | string): boolean;
declare function isSmartTV(val: IResult | IDevice | string): boolean;
declare function isTablet(val: IResult | IDevice | string): boolean;
declare function isWearable(val: IResult | IDevice | string): boolean;
declare function isXR(val: IResult | IDevice | string): boolean;

export {
    isMobile,
    isSmartTV,
    isTablet,
    isWearable,
    isXR
};
