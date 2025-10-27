// Type definitions for UAParser.js v2.0.6
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import { BrowserType, CPUArch, DeviceType, EngineName } from "../enums/ua-parser-enums";

declare namespace UAParser {
    
    interface IData<T> {
        is(val: string): boolean;
        toString(): string;
        withClientHints(): PromiseLike<T> | T;
        withFeatureCheck(): PromiseLike<T> | T;
    }

    interface IBrowser extends IData<IBrowser> {
        name?: string;
        version?: string;
        major?: string;
        type?: typeof BrowserType[keyof typeof BrowserType];
    }

    interface ICPU extends IData<ICPU> {
        architecture?: typeof CPUArch[keyof typeof CPUArch];
    }

    interface IDevice extends IData<IDevice> {
        type?: typeof DeviceType[keyof typeof DeviceType];
        vendor?: string;
        model?: string;
    }

    interface IEngine extends IData<IEngine> {
        name?: typeof EngineName[keyof typeof EngineName];
        version?: string;
    }

    interface IOS extends IData<IOS> {
        name?: string;
        version?: string;
    }

    interface IResult extends IData<IResult> {
        ua: string;
        browser: IBrowser;
        cpu: ICPU; 
        device: IDevice;
        engine: IEngine; 
        os: IOS;
    }

    type RegexMap = ((RegExp | string | (string | RegExp | Function)[])[])[];
    type UAParserProps = 'browser' | 'cpu' | 'device' | 'engine' | 'os';
    type UAParserExt = Partial<Record<UAParserProps, RegexMap>> | Partial<Record<UAParserProps, RegexMap>>[];
    export type UAParserHeaders = Record<string, string | string[] | undefined> | Headers;

    export function UAParser(uastring?: string, extensions?: UAParserExt, headers?: UAParserHeaders): IResult;
    export function UAParser(uastring?: string, headers?: UAParserHeaders): IResult;
    export function UAParser(extensions?: UAParserExt, headers?: UAParserHeaders): IResult;
    export function UAParser(headers?: UAParserHeaders): IResult;

    export class UAParser {
        
        static readonly BROWSER: {
            NAME: 'name'; 
            VERSION: 'version'; 
            MAJOR: 'major';
            TYPE: 'type';
        };
        static readonly CPU: { 
            ARCHITECTURE: 'architecture'; 
        };
        static readonly DEVICE: { 
            TYPE: 'type';
            VENDOR: 'vendor'; 
            MODEL: 'model';
            CONSOLE: 'console';
            MOBILE: 'mobile';
            SMARTTV: 'smarttv';
            TABLET: 'tablet';
            WEARABLE: 'wearable';
            XR: 'xr';
            EMBEDDED: 'embedded';
        };
        static readonly ENGINE: { 
            NAME: 'name'; 
            VERSION: 'version'; 
        };
        static readonly OS: { 
            NAME: 'name';
            VERSION: 'version'; 
        };
        static readonly VERSION: string;

        constructor(uastring?: string, extensions?: UAParserExt, headers?: Record<string, string>);
        constructor(uastring?: string, headers?: Record<string, string>);
        constructor(extensions?: UAParserExt, headers?: Record<string, string>);
        constructor(headers?: Record<string, string>);
    
        getUA(): string;
        getBrowser(): IBrowser;
        getCPU(): ICPU;
        getDevice(): IDevice;
        getEngine(): IEngine;
        getOS(): IOS;
        getResult(): IResult;
        setUA(uastring: string): UAParser;
    }
}

export as namespace UAParser;
export = UAParser;