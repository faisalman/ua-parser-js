interface IBrowser {
    brand: string;
    version: string;
}

interface ClientHintsJSLowEntropy {
    brands: Array<IBrowser>;
    mobile: boolean;
    platform: string;
}

export interface ClientHintsJSHighEntropy extends ClientHintsJSLowEntropy {
    architecture?: string;
    bitness?: string;
    formFactor?: string;
    fullVersionList?: Array<IBrowser>;
    model?: string;
    platformVersion?: string;
    wow64?: boolean;
};

export interface ClientHintsHTTPHeaders {
    'sec-ch-ua-arch'?: string;
    'sec-ch-ua-bitness'?: string;
    'sec-ch-ua'?: string;
    'sec-ch-ua-form-factor'?: string;
    'sec-ch-ua-full-version-list'?: string;
    'sec-ch-ua-mobile'?: string;
    'sec-ch-ua-model'?: string;
    'sec-ch-ua-platform'?: string;
    'sec-ch-ua-platform-version'?: string;
    'sec-ch-ua-wow64'?: string;
}

export function isFrozenUA(ua: string): boolean;
export function unfreezeUA(): Promise<string>;
export function UACHParser(headers: ClientHintsHTTPHeaders): ClientHintsJSHighEntropy;