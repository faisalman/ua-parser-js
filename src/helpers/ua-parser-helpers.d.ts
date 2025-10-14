// Type definitions for Helpers submodule of UAParser.js v2.0.5
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import type { IResult } from "../main/ua-parser";

export function isFrozenUA(ua: string): boolean;

/**
 * @deprecated Moved to `device-detection` submodule
 */
export function getDeviceVendor(model: string): string | undefined;
/**
 * @deprecated Moved to `device-detection` submodule
 */
export function isAppleSilicon(resultOrUA: IResult | string): boolean;
/**
 * @deprecated Moved to `bot-detection` submodule
 */
export function isAIBot(resultOrUA: IResult | string): boolean;
/**
 * @deprecated Moved to `bot-detection` submodule
 */
export function isBot(resultOrUA: IResult | string): boolean;
/**
 * @deprecated Moved to `browser-detection` submodule
 */
export function isChromeFamily(resultOrUA: IResult | string): boolean;
/**
 * @deprecated Moved to `browser-detection` submodule
 */
export function isElectron(): boolean;
/**
 * @deprecated Moved to `browser-detection` submodule
 */
export function isFromEU(): boolean;
/**
 * @deprecated Moved to `browser-detection` submodule
 */
export function isStandalonePWA(): boolean;