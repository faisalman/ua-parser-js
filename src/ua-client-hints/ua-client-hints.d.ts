export type UABrowser = {
    brand: string | null,
    version: string | null
};

export type UADataType = boolean | string | Array<UABrowser> | null;
export type UADataField =
    'brands' |
    'mobile' |
    'platform' |
    'architecture' |
    'bitness' |
    'formFactor' |
    'fullVersionList' |
    'model' |
    'platformVersion' |
    'wow64';

export type HeaderType = 'sf-boolean' | 'sf-string' | 'sf-list';
export type HeaderField = 
    'sec-ch-ua-arch' |
    'sec-ch-ua-bitness' |
    'sec-ch-ua' |
    'sec-ch-ua-form-factor' |
    'sec-ch-ua-full-version-list' |
    'sec-ch-ua-mobile' |
    'sec-ch-ua-model' |
    'sec-ch-ua-platform' |
    'sec-ch-ua-platform-version' |
    'sec-ch-ua-wow64';

export class UAClientHints {
    #ch: Map<UADataField, UADataType>;
    #parseHeader(str: string, type: HeaderType): UADataType;
    #serialize(data: UADataType, type: HeaderType): string;
    getSerializedUAData(): Record<HeaderField, string>;
    getUAData(props?: Array<UADataField>): Record<UADataField, UADataType>;
    setUAData(uaData: Record<UADataField, UADataType> | Record<HeaderField, string>): UAClientHints;
};