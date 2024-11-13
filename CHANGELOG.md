# UAParser.js Changelog

# Version 2.0 
## Migrating from v1 to v2

- What's breaking:
  - Licensed under AGPLv3 (open-source) or PRO License (commercial)
  - Browser detection on mobile device: `"Chrome" => "Mobile Chrome"`, `"Firefox" => "Mobile Firefox"`
  - OS detection: `"Mac OS" => "macOS"`, `"Chromium OS" => "Chrome OS"`
- What's new:
  - New device type: `xr`, to identify AR/VR devices 
  - New browser property: `browser.type`, to identify the type of the browser: `crawler`, `cli`, `email`, `fetcher`, `inapp`, `library`, `mediaplayer`
  - New methods in result object (all of `get*()` return value): 
    - Enhance detection using client hints: `withClientHints()`
    - Enhance detection using feature check: `withFeatureCheck()`
    - Utility for easy comparison: `is()`
    - Utility to print full-name: `toString()`
  - Parse user-agent directly from command line using `npx ua-parser-js "[User-Agent]"`
  - Extensions can be passed as a list to `UAParser()`
  - Support for ES module & TypeScript `import { UAParser } from 'ua-parser-js'`
  - Provided Enums submodule `'ua-parser-js/enums'`
  - Provided Extensions submodule `'ua-parser-js/extensions'`
  - Provided Helpers submodule `'ua-parser-js/helpers'`:
    - `getDeviceVendor()`: guess for a device vendor based on its model name
    - `isAppleSilicon()`: check if the device has Apple Silicon Mac device properties
    - `isBot()`: check if the browser is identified as a bot
    - `isChromeFamily()`: check if the browser is Chrome-based (has Blink engine, i.e: New Opera, New Edge, Vivaldi, Brave, Arc, etc.)
    - `isElectron()`: check if current window is running inside Electron
    - `isFromEU()`: check if current window is from an EU (European Union) country
    - `isFrozenUA()`: check if a user-agent string match with the reduced/frozen user-agent pattern
    - `isStandalonePWA()`: check if current window is a standalone PWA

---

## Version 2.0.0-rc.3

- Add support for Headers object
- Add new device: Advan, Cat, Energizer, Honor, IMO, Micromax, Smartfren
- Add new engine: Servo
- `ua-parser-js/extensions` submodule:
    - Breaking change: rename `module` to `library`
    - Add new email clients: Evolution, KMail, Kontact
    - Add new bots: 360Spider, Archive.org Bots, CCBot, DataForSeoBot, DuckAssistBot, Exabot, Google Bots, Meta Bots, MojeekBot, PerplexityBot, PetalBot, TurnitinBot, Yeti, YisouSpider

## Version 2.0.0-rc.2

- Fix incorrect import path in ESM files
- Add new browser: 115, SlimBoat, Slimjet, LibreWolf
- Improve browser detection: 2345, 360, Dragon, Iron, Maxthon
- `ua-parser-js/enums` submodule:
    - Add Chromecast OS variants: Android/Fuchsia/Linux/SmartSpeaker
- `ua-parser-js/helpers` submodule:
    - Add new method: `isBot()` to check if the browser is identified as a bot

## Version 2.0.0-rc.1

- Fix Python Request mistakenly identified as Meta Quest
- Add new browser: Helio
- Add new device: itel, Nothing, Pico, TCL
- Add new engine: ArkWeb
- Add new OS: OpenHarmony, Pico
- Improve browser detection: Quark
- Improve device detection: Xiaomi, Amazon Echo Show, Google Chromecast, Samsung Galaxy Watch
- `ua-parser-js/helpers` submodule:
    - Add new method: 
        - `getDeviceVendor()` to guess for a device vendor based on its model name
        - `isElectron()` to check if current window is running inside Electron
        - `isFromEU()` to check if current window is from an EU (European Union) country
        - `isStandalonePWA()` to check if current window is a standalone PWA
    - Rename `isChromiumBased()` to `isChromeFamily()`
    - Update `isAppleSilicon()` to also checks for WebGL renderer info
- `ua-parser-js/extensions` submodule:
    - Restore `Bots` as a compilation of all these browser types: `cli`, `crawler`, `fetcher`, and `library`

## Version 2.0.0-beta.3

- Breaking:
  - AR/VR devices moved to new device type: `xr`
  - New property in `browser`: `type`
- New features:
  - Parse directly from command line using `npx ua-parser-js`
  - Extensions can be passed as a list to `UAParser()`
- Add new browser: Pico Browser, Twitter, Wolvic
- Improve browser detection: DuckDuckGo, ICEBrowser, Klar, QQ, Sleipnir
- Improve device detection: Oculus Quest & Oppo Pad
- Update latest client hints spec: `formFactor` -> `formFactors`
- In `ua-parser-js/extensions` submodule, `bots` divided into `crawler` / `fetcher` 

## Version 2.0.0-beta.2

- Increase UA_MAX_LENGTH to 500
- Add TypeScript declaration file in `ua-parser-js/extensions` submodule
- Improve TypeScript module resolution
- Add new methods in `ua-parser-js/helpers` submodule: `isAppleSilicon()` & `isChromiumBased()`
- Fix misidentified WebView token as device model
- Add new browser: Alipay, Klarna, Opera GX, Smart Lenovo Browser, Vivo Browser
- Rename browser: Avant, Baidu, Samsung Internet, Sogou Explorer, Sogou Mobile, WeChat
- Improve client-hints detection: Edge, Xbox

## Version 2.0.0-beta.1

- Update Client Hints Form-Factor
- Provide in-package type definitions
- Add new device: Ulefone
- Improve device detection: Realme, Xiaomi Redmi

## Version 2.0.0-alpha.3

- Add `withFeatureCheck()` method
- Add `isFrozenUA()` method in `ua-parser-js/helpers` submodule
- Add `MediaPlayers` & `Modules` in `ua-parser-js/extensions` submodule
- Fix issue with ESM import

## Version 2.0.0-alpha.2

- Fix browser result always returning Chromium when using withClientHints()
- Fix infinite-loop when await-ing withClientHints() in non-client-hints browser

## Version 2.0.0-alpha.1

- Initial work on new major version

---

## Version 0.7.38 / 1.0.38
- Fix error on getOS() when userAgentData.platform is undefined
- Add new browser: Opera GX, Twitter
- Improve browser detection: DuckDuckGo
- Improve device detection: OPPO Pad, Oculus Quest

## Version 0.7.37 / 1.0.37
- Fix misidentified WebView token as device model
- Increase UA_MAX_LENGTH to 500
- Add new browser: Alipay, Klarna, Smart Lenovo Browser, Vivo Browser
- Add new device: Ulefone
- Improve device detection: Realme, Xiaomi Redmi
- Rename browser: Avant, Baidu, Samsung Internet, Sogou Explorer, Sogou Mobile, WeChat

## Version 0.7.36 / 1.0.36
- Add new browser: Snapchat
- Add new devices: Infinix, Tecno
- Improve device detection: Amazon Fire TV, Xiaomi POCO 
- Improve OS detection: iOS

## Version 0.7.35 / 1.0.35
- Fix result from user-supplied user-agent being altered
- Add new browser: Heytap, TikTok
- Add new engine: LibWeb
- Add new OS: SerenityOS
- Improve browser detection: Yandex
- Improve device detection: iPhone, Amazon Echo
- Improve OS detection: iOS

## Version 0.7.34 / 1.0.34
- Fix Sharp Mobile detected as Huawei Tablet
- Fix IE8 bug
- Add new devices : Kobo e-Reader, Apple Watch, and some new SmartTV devices
- Add new OS : watchOS
- Improve browser detection : Kakao, Naver, Brave
- Improve device detection : Oculus, iPad
- Improve OS detection : Chrome OS
- Using navigator.userAgentData as fallback for device.type & os.name

## Version 0.7.33 / 1.0.33

- Add new browser : Cobalt
- Identify Macintosh as an Apple device
- Fix ReDoS vulnerability

## Version 0.7.32 / 1.0.32

- Add new browser : DuckDuckGo, Huawei Browser, LinkedIn
- Add new OS : HarmonyOS
- Add some Huawei models
- Add Sharp Aquos TV
- Improve detection Xiaomi Mi CC9 
- Fix Sony Xperia 1 III misidentified as Acer tablet
- Fix Detect Sony BRAVIA as SmartTV 
- Fix Detect Xiaomi Mi TV as SmartTV 
- Fix Detect Galaxy Tab S8 as tablet 
- Fix WeGame mistakenly identified as WeChat
- Fix included commas in Safari / Mobile Safari version
- Increase UA_MAX_LENGTH to 350

## Version 0.7.31 / 1.0.2

- Fix OPPO Reno A5 incorrect detection
- Fix TypeError Bug
- Use AST to extract regexes and verify them with safe-regex

## Version 0.7.30 / 1.0.1

- Add new browser : Obigo, UP.Browser, Klar
- Add new device : Oculus, Roku
- Add new OS: Maemo, HP-UX, Android-x86, Deepin, elementary OS, GhostBSD, Linspire, Manjaro, Sabayon
- Improve detection for Sony Xperia 1ii, LG Android TV, and some more devices
- Improve detection for ARM64 CPU
- Improve detection for Windows Mobile, Netscape, Mac on PowerPC
- Categorize PDA as mobile
- Fix Sharp devices misjudged as Huawei
- Fix trailing comma for ES3 compatibility
- Some code refactor

## Version 0.7 / 1.0

Version 1.0.x is basically the equivalent of version 0.7.x (mirror/duplicate). See [#536](https://github.com/faisalman/ua-parser-js/issues/536) for the reason behind this confusion.

## Version 0.8

Version 0.8 was created by accident. This version is now deprecated and no longer maintained, please update to version 0.7 / 1.0.