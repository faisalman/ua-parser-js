// Type definitions for Helpers submodule of UAParser.js v2.0.5
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import type { IResult } from "../main/ua-parser";

export function getDeviceVendor(model: string): string | undefined;
export function isAppleSilicon(resultOrUA: IResult | string): boolean;
export function isAIBot(resultOrUA: IResult | string): boolean;
export function isBot(resultOrUA: IResult | string): boolean;
export function isChromeFamily(resultOrUA: IResult | string): boolean;
export function isElectron(): boolean;
export function isFromEU(): boolean;
export function isFrozenUA(ua: string): boolean;
export function isStandalonePWA(): boolean;
