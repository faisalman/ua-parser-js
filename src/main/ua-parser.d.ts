// Type definitions for UAParser.js v2.0.4
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

import type { IncomingHttpHeaders } from 'http';
import type { Headers as FetchAPIHeaders } from 'node-fetch';

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
        type?: 'crawler' | 'cli' | 'email' | 'fetcher' | 'inapp' | 'mediaplayer' | 'library';
    }

    interface ICPU extends IData<ICPU> {
        architecture?: 'ia32' | 'ia64' | 'amd64' | 'arm' | 'arm64' | 'armhf' | 'avr' | 'avr32' | 'irix' | 'irix64' | 'mips' | 'mips64' | '68k' | 'pa-risc' | 'ppc' | 'sparc' | 'sparc64';
    }

    interface IDevice extends IData<IDevice> {
        type?: 'mobile' | 'tablet' | 'console' | 'smarttv' | 'wearable' | 'xr' | 'embedded';
        vendor?: string;
        model?: string;
    }

    interface IEngine extends IData<IEngine> {
        name?: 'Amaya' | 'ArkWeb' | 'Blink' | 'EdgeHTML' | 'Flow' | 'Gecko' | 'Goanna' | 'iCab' | 'KHTML' | 'LibWeb' | 'Links' | 'Lynx' | 'NetFront' | 'NetSurf' | 'Presto' | 'Servo' | 'Tasman' | 'Trident' | 'w3m' | 'WebKit';
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
    type UAParserHeaders = Record<string, string> | IncomingHttpHeaders | FetchAPIHeaders;

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