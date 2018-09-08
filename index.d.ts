
interface UAParseDevice {
  model: string
  type: string
  vendor: string
}

interface UAParseBrowserOsEngine {
  name: string
  version: string
}

interface UAParseCPU {
  architecture: string
}

interface UAParse {
  device: UAParseDevice
  browser: UAParseBrowserOsEngine
  os: UAParseBrowserOsEngine
  engine: UAParseBrowserOsEngine
  cpu: UAParseCPU
}

declare module 'ua-parser-js' {
  const parser: (userAgent: string) => UAParse
  export = parser
}
