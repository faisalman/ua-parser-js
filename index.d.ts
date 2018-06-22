export as namespace UAParser;


/**
 * Detected browser name & version
 */
export interface BrowserResult {
	name: "Amaya"
		| "Android Browser"
		| "Arora"
		| "Avant"
		| "Baidu"
		| "Blazer"
		| "Bolt"
		| "Bowser"
		| "Camino"
		| "Chimera"
		| "Chrome"
		| "Chrome WebView"
		| "Chromium"
		| "Comodo Dragon"
		| "Conkeror"
		| "Dillo"
		| "Dolphin"
		| "Doris"
		| "Edge"
		| "Epiphany"
		| "Fennec"
		| "Firebird"
		| "Firefox"
		| "Flock"
		| "GoBrowser"
		| "iCab"
		| "ICE Browser"
		| "IceApe"
		| "IceCat"
		| "IceDragon"
		| "Iceweasel"
		| "IE"
		| "IEMobile"
		| "Iron"
		| "Jasmine"
		| "K-Meleon"
		| "Konqueror"
		| "Kindle"
		| "Links"
		| "Lunascape"
		| "Lynx"
		| "Maemo"
		| "Maxthon"
		| "Midori"
		| "Minimo"
		| "MIUI Browser"
		| "Safari"
		| "Mobile Safari"
		| "Mosaic"
		| "Mozilla"
		| "Netfront"
		| "Netscape"
		| "NetSurf"
		| "Nokia"
		| "OmniWeb"
		| "Opera"
		| "Opera Mini"
		| "Opera Mobi"
		| "Opera Tablet"
		| "PhantomJS"
		| "Phoenix"
		| "Polaris"
		| "QQBrowser"
		| "QQBrowserLite"
		| "Quark"
		| "RockMelt"
		| "Silk"
		| "Skyfire"
		| "SeaMonkey"
		| "Sleipnir"
		| "SlimBrowser"
		| "Swiftfox"
		| "Tizen"
		| "UCBrowser"
		| "Vivaldi"
		| "w3m"
		| "Waterfox"
		| "WeChat"
		| "Yandex"
		| undefined;
	
	version: string | undefined;
}


/**
 * Detected device type/size, vendor & model/name
 */
export interface DeviceResult {
	model: string | undefined;
	
	type: "console" | "mobile" | "tablet" | "smarttv" | "wearable" | "embedded" | undefined;
	
	vendor: "Acer"
		| "Alcatel"
		| "Amazon"
		| "Apple"
		| "Archos"
		| "Asus"
		| "BenQ"
		| "BlackBerry"
		| "Dell"
		| "GeeksPhone"
		| "Google"
		| "HP"
		| "HTC"
		| "Huawei"
		| "Jolla"
		| "Lenovo"
		| "LG"
		| "Meizu"
		| "Microsoft"
		| "Motorola"
		| "Nexian"
		| "Nintendo"
		| "Nokia"
		| "Nvidia"
		| "OnePlus"
		| "Ouya"
		| "Palm"
		| "Panasonic"
		| "Pebble"
		| "Polytron"
		| "RIM"
		| "Samsung"
		| "Sharp"
		| "Siemens"
		| "Sony"
		| "SonyEricsson"
		| "Sprint"
		| "Xbox"
		| "Xiaomi"
		| "ZTE"
		| undefined;
}


/**
 * Detected browser engine name & version
 */
export interface EngineResult {
	name: "Amaya"
		| "EdgeHTML"
		| "Gecko"
		| "iCab"
		| "KHTML"
		| "Links"
		| "Lynx"
		| "NetFront"
		| "NetSurf"
		| "Presto"
		| "Tasman"
		| "Trident"
		| "w3m"
		| "WebKit"
		| undefined;
	
	version: string | undefined;
}


/**
 * Detected user operating system name & version
 */
export interface OSResult {
	name: "AIX"
		| "Amiga OS"
		| "Android"
		| "Arch"
		| "Bada"
		| "BeOS"
		| "BlackBerry"
		| "CentOS"
		| "Chromium OS"
		| "Contiki"
		| "Fedora"
		| "Firefox OS"
		| "FreeBSD"
		| "Debian"
		| "DragonFly"
		| "Gentoo"
		| "GNU"
		| "Haiku"
		| "Hurd"
		| "iOS"
		| "Joli"
		| "Linpus"
		| "Linux"
		| "Mac OS"
		| "Mageia"
		| "Mandriva"
		| "MeeGo"
		| "Minix"
		| "Mint"
		| "Morph OS"
		| "NetBSD"
		| "Nintendo"
		| "OpenBSD"
		| "OpenVMS"
		| "OS/2"
		| "Palm"
		| "PC-BSD"
		| "PCLinuxOS"
		| "Plan9"
		| "Playstation"
		| "QNX"
		| "RedHat"
		| "RIM Tablet OS"
		| "RISC OS"
		| "Sailfish"
		| "Series40"
		| "Slackware"
		| "Solaris"
		| "SUSE"
		| "Symbian"
		| "Tizen"
		| "Ubuntu"
		| "Unix"
		| "VectorLinux"
		| "WebOS"
		| "Windows"
		| "Windows Phone"
		| "Windows Mobile"
		| "Zenwalk"
		| undefined;
	
	version: string | undefined;
}


/**
 * Detected user CPU architecture
 */
export interface CPUResult {
	architecture: "68k"
		| "amd64"
		| "arm"
		| "arm64"
		| "avr"
		| "ia32"
		| "ia64"
		| "irix"
		| "irix64"
		| "mips"
		| "mips64"
		| "pa-risc"
		| "ppc"
		| "sparc"
		| "sparc64"
		| undefined;
}


/**
 * User-Agent-String and all data that was detected for it
 */
export interface Result {
	ua: string;
	
	browser: BrowserResult;
	cpu:     CPUResult;
	device:  DeviceResult;
	engine:  EngineResult;
	os:      OSResult;
}



/**
 * Represents a single User-Agent-String that may be parsed
 */
declare class UAParserObject {
	constructor(uastring?: string, extensions?: object);
	
	getBrowser(): BrowserResult;
	getDevice(): DeviceResult;
	getEngine(): EngineResult;
	getOS(): OSResult;
	getCPU(): CPUResult;
	
	/**
	 * Parse the current User-Agent-String and return a result object that
	 * contains all other parsed results
	 */
	getResult(): Result;
	
	/**
	 * Return the User-Agent-String of this instance
	 */
	getUA(): string;
	
	/**
	 * Set a new User-Agent-String to parse and return the current parser
	 * instance
	 * 
	 * @param uastring A User-Agent-String
	 */
	setUA(uastring: string): UAParserObject;
}


// Workaround interface that allows both the functional and the object-oriented
// interface to be used by consumers
/**
 * UAParser.js
 */
declare interface UAParserCallable {
	/**
	 * Object-oriented interface: stores the given User-Agent string and performs
	 * all parsing on-demand
	 * 
	 * @param uastring   The User-Agent-String to parse
	 * @param extensions Extra rules that extend the built-in matching rules
	 */
	new(uastring?: string, extensions?: object): UAParserObject;
	
	/**
	 * Functional interface: Directly returns the entire parsed result for
	 * the given `uastring`
	 * 
	 * @param uastring   The User-Agent-String to parse
	 * @param extensions Extra rules that extend the built-in matching rules
	 */
	(uastring?: string, extensions?: object): Result;
	
	
	
	// Re-export self so that CommonJS consumers can also use these definitions
	// although their target object is located in a sub-object within the
	// returned export instead of being exported directly
	readonly UAParser: UAParserCallable;
	
	
	
	/* Extension API constants */
	// Declare all exported constants as opaque values so that people don't
	// consider copy-pasting their values
	readonly VERSION: string;
	
	readonly BROWSER: {
		NAME:    string,
		VERSION: string,
	};
	
	readonly CPU: {
		ARCHITECTURE: string,
	};
	
	readonly DEVICE: {
		MODEL:    string,
		VENDOR:   string,
		TYPE:     string,
		CONSOLE:  string,
		MOBILE:   string,
		SMARTTV:  string,
		TABLET:   string,
		WEARABLE: string,
		EMBEDDED: string,
	};
	
	readonly ENGINE: {
		NAME:    string,
		VERSION: string,
	};
	
	readonly OS: {
		NAME:    string,
		VERSION: string,
	};
}

// Get this interface exported as top-level object type
declare const UAParser: UAParserCallable;
export = UAParser;
