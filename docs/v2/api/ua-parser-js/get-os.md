# getOS():IData

Get operating system name & version from user-agent string.

```js
// Result object is structured as follow:
{ name: '', version: '' }
```

## `name:string`

```sh
# List of possible values for `os.name`
AIX, Amiga OS, Android[-x86], Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS,
Contiki, Fedora, Firefox OS, FreeBSD, Debian, Deepin, DragonFly, elementary OS, 
Fuchsia, Gentoo, GhostBSD, GNU, Haiku, HarmonyOS, HP-UX, Hurd, iOS, Joli, KaiOS, 
Linpus, Linspire,Linux, Mac OS, Maemo, Mageia, Mandriva, Manjaro, MeeGo, Minix, 
Mint, Morph OS, NetBSD, NetRange, NetTV, Nintendo, OpenBSD, OpenVMS, OS/2, Palm, 
PC-BSD, PCLinuxOS, Plan9, PlayStation, QNX, Raspbian, RedHat, RIM Tablet OS, 
RISC OS, Sabayon, Sailfish, SerenityOS, Series40, Slackware, Solaris, SUSE, Symbian, 
Tizen, Ubuntu, Unix, VectorLinux, Viera, watchOS, WebOS, Windows [Phone/Mobile], 
Zenwalk, ...
```

## `version:string` 

Determined dynamically

## Code Example

```js

const galaxytabs8 = 'Mozilla/5.0 (Linux; Android 12; SM-X706B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36'
const parser = new UAParser(galaxytabs8);

console.log(parser.getOS());
// { name : "Android", version : "12" }
```
