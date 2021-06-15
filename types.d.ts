
declare module 'ua-parser-js' {
    type UAModelKey = 'model';
    type UANameKey = 'name';
    type UATypeKey = 'type';
    type UAVendorKey = 'vendor';
    type UAVersionKey = 'version';
    type UAArchitectureKey = 'architecture';
    type UAConsoleKey = 'console';
    type UAMobileKey = 'mobile';
    type UATabletKey = 'tablet';
    type UASmarttvKey = 'smarttv';
    type UAWearableKey = 'wearable';
    type UAEmbeddedKey = 'embedded';

    type UAParserExtensions = {
        browser: Array<RegExp[] | Array<UANameKey | [UANameKey, string] | UAVersionKey>>,
        cpu: Array<RegExp[] | Array<UAArchitectureKey | [UAArchitectureKey, string] | [UAArchitectureKey, (str: string) => string]>>
        device: Array<RegExp[] | Array<
            UAModelKey | [UAModelKey, string] | [UAModelKey, (str: string, map: { [key: string]: string | string[] }) => string, { [key: string]: string | string[] }]
            | UAVendorKey | [UAVendorKey, string]
            | [UATypeKey, UATabletKey | UASmarttvKey | UAMobileKey | UAConsoleKey | UAWearableKey]
            >>
        engine: Array<RegExp[] | Array<
            UAVendorKey | [UANameKey, string]
            >>,
        os: Array<RegExp[] | Array<
            UANameKey | [UANameKey, string]
            | UAVersionKey | [UAVersionKey, string]
            | [UAVersionKey, (str: string, map: { [key: string]: string | string[] }) => string, { [key: string]: string | string[] }]
            >>,
    };

    type UABrowserResult = { name: string, version: string };
    type UADeviceResult = { model: string, type: string, vendor: string };
    type UAEngineResult = { name: string, version: string };
    type UAOSResult = { name: string, version: string };
    type UACpuResult = { architecture: string };

    class UAParser {
        constructor();
        constructor(uastring: string);
        constructor(extensions: UAParserExtensions);
        constructor(uastring: string, extensions: UAParserExtensions);
        getBrowser(): UABrowserResult;
        getDevice(): UADeviceResult;
        getEngine(): UAEngineResult;
        getOS(): UAOSResult;
        getCPU(): UACpuResult;
        getResult(): { ua: string, browser: UABrowserResult, cpu: UACpuResult, device: UADeviceResult, engine: UAEngineResult, os: UAOSResult };
        getUA(): string;
        setUA(uastring: string): void;

        static VERSION: string;

        static BROWSER: {
            NAME: UANameKey,
            VERSION: UAVersionKey,
        };

        static CPU: {
            ARCHITECTURE : UAArchitectureKey,
        };

        static DEVICE: {
            MODEL: UAModelKey,
            VENDOR: UAVendorKey,
            TYPE: UATypeKey,
            CONSOLE: UAConsoleKey,
            MOBILE: UAMobileKey,
            SMARTTV: UASmarttvKey,
            TABLET: UATabletKey,
            WEARABLE: UAWearableKey,
            EMBEDDED: UAEmbeddedKey
        };

        static ENGINE: {
            NAME: UANameKey,
            VERSION: UAVersionKey,
        };

        static OS: {
            NAME: UANameKey,
            VERSION: UAVersionKey,
        };
    }

    export default UAParser;
}
