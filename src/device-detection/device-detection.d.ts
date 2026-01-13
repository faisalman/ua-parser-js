// Type definitions for device-detection submodule of UAParser.js v2.0.8
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import type { IResult } from "../main/ua-parser";

export function getDeviceVendor(model: string): string | undefined;
export function isAppleSilicon(resultOrUA: IResult | string): boolean;