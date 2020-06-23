
declare module 'ua-parser-js' {
    type UANameKey = 'name';
    type UAVersionKey = 'version';

    type UAParserExtensions = Array<RegExp[] | [UANameKey | [UANameKey, string], UAVersionKey]>;

    type UABrowserResult = { name: string, version: string };
    type UADeviceResult = { model: string, type: string, vendor: string };
    type UAEngineResult = { name: string, version: string };
    type UAOSResult = { name: string, version: string };
    type UACpuResult = { architecture: string };

    interface UAParser {
        new(): UAParser;
        new(uastring: string): UAParser;
        new(extensions: UAParserExtensions): UAParser;
        new(uastring: string, extensions: UAParserExtensions): UAParser;
        getBrowser(): UABrowserResult;
        getDevice(): UADeviceResult;
        getEngine(): UAEngineResult;
        getOS(): UAOSResult;
        getCPU(): UACpuResult;
        getResult(): { ua: string, browser: UABrowserResult, cpu: UACpuResult, device: UADeviceResult, engine: UAEngineResult, os: UAOSResult }
        getUA(): string,
        setUA(uastring: string): void,
    }

    const uap: UAParser;

    export default uap;
}
