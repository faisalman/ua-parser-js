export function isFrozenUA(ua: string): boolean;
export function unfreezeUA(): Promise<string>;
export function unfreezeUA(ua: string, ch: ClientHintsJSHighEntropy): Promise<string>;
export function unfreezeUA(headers: ClientHintsHTTPHeaders): Promise<string>;