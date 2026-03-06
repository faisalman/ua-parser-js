// Type definitions for browser-detection submodule of UAParser.js v2.0.9
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import type { IResult } from "../main/ua-parser";

export function isChromeFamily(resultOrUA: IResult | string): boolean;
export function isElectron(): boolean;
export function isFromEU(): boolean;
export function isStandalonePWA(): boolean;