# UAParser.js Changelog

# Version 0.7 / 1.0

Version 1.0.x is basically the equivalent of version 0.7.x. See [#536](https://github.com/faisalman/ua-parser-js/issues/536) for the reason behind this confusion.

## Version 0.7.41 / 1.0.41
- Add new browser: Daum, Ladybird
- Add new device vendor: HMD
- Add new engine: LibWeb
- Add new os: Windows IoT, Ubuntu Touch
- Improve cpu detection: ARM, x86
- Improve device vendor detection: Apple, Archos, Generic, Google, Honor, Huawei, Infinix, Nvidia, Lenovo, Nokia, OnePlus, Xiaomi
- Improve device type detection: smarttv, wearables
- Improve os detection: Linux, Symbian

## Version 0.7.40 / 1.0.40
- Add new browser: 115, LibreWolf, Slimboat, Slimjet
- Add new device: Advan, Cat, Energizer, IMO, Micromax, Smartfren
- Add new engine: ArkWeb, Servo
- Add new os: OpenHarmony
- Improve browser detection: 2345, 360, Dragon, Iron, Maxthon
- Recognize Honor as a separate device vendor from Huawei
- Fix Python Request mistakenly identified as Meta Quest

## Version 0.7.39 / 1.0.39
- Add new feature: executable command using `npx ua-parser-js "[INSERT-UA-HERE]"`
- Add new browser: Helio, Pico Browser, Wolvic
- Add new device vendor: itel, Nothing, TCL
- Improve browser detection: ICEBrowser, Klar, QQBrowser, Quark, Rekonq, Sleipnir
- Improve device detection: Xiaomi Pro, Amazon Echo Show, Samsung Galaxy Watch
- Removed from browser: Viera

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

# Version 0.8

Version 0.8 was created by accident. This version is now deprecated and no longer maintained, please update to version 0.7 / 1.0.