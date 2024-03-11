// Type definitions for UAParser.js v2.0.0-beta.2
// Project: https://github.com/faisalman/ua-parser-js
// Definitions by: Faisal Salman <https://github.com/faisalman>

declare namespace UAParser {
    
    interface IData<T> {
        is(val: string): boolean;
        toString(): string;
        withClientHints(): PromiseLike<T> | T;
        withFeatureCheck(): T;
    }

    interface IBrowser extends IData<IBrowser> {
        name?: string;
        version?: string;
        major?: string;
        type?: string;
    }

    interface ICPU extends IData<ICPU> {
        architecture?: 'ia32' | 'ia64' | 'amd64' | 'arm' | 'arm64' | 'armhf' | 'avr' | 'irix' | 'irix64' | 'mips' | 'mips64' | '68k' | 'ppc' | 'sparc' | 'sparc64';
    }

    interface IDevice extends IData<IDevice> {
        type?: 'mobile' | 'tablet' | 'console' | 'smarttv' | 'wearable';
        vendor?: string;
        model?: string;
    }

    interface IEngine extends IData<IEngine> {
        name?: 'Amaya' | 'Blink' | 'EdgeHTML' | 'Flow' | 'Gecko' | 'Goanna' | 'iCab' | 'KHTML' | 'LibWeb' | 'Links' | 'Lynx' | 'NetFront' | 'NetSurf' | 'Presto' | 'Tasman' | 'Trident' | 'w3m' | 'WebKit';
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
    type UAParserExt = Partial<Record<UAParserProps, RegexMap>>;

    export function UAParser(uastring?: string, extensions?: UAParserExt, headers?: Record<string, string>): IResult;
    export function UAParser(uastring?: string, headers?: Record<string, string>): IResult;
    export function UAParser(extensions?: UAParserExt, headers?: Record<string, string>): IResult;
    export function UAParser(headers?: Record<string, string>): IResult;

    export class UAParser {
        
        static readonly BROWSER: {
            NAME: 'name'; 
            VERSION: 'version'; 
            MAJOR: 'major';
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