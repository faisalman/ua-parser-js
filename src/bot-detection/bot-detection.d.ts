// Type definitions for bot-detection submodule of UAParser.js v2.0.9
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import type { IResult } from "../main/ua-parser";

export function isAIAssistant(resultOrUA: IResult | string): boolean;
export function isAICrawler(resultOrUA: IResult | string): boolean;
export function isBot(resultOrUA: IResult | string): boolean;