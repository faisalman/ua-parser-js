# getCPU():IData

Get type of CPU architecture from user-agent string.

```js
// Result object is structured as follow:
{ architecture: '' }
```

## `architecture:string`

```sh
# List of possible values for `cpu.architecture`
68k, amd64, arm[64/hf], avr, ia[32/64], irix[64], 
mips[64], pa-risc, ppc, sparc[64]
```

::: info
Our convention here for 32-bit version of **'x86'** is referred as `ia32`, while its 64-bit extension (also known as **'x86-64'** or simply **'x64'**) is referred as `amd64`.
:::

## Code Example

```js
const powerpc = 'Mozilla/4.0 (compatible; MSIE 5.17; Mac_PowerPC Mac OS; en)'
const parser = new UAParser(powerpc);

console.log(parser.getCPU());
// { architecture : "ppc" }
```