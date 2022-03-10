betterPrinting
==============

```js
import print from "betterPrinting";

print("Hello, world!");
```

#### console extending framework! ####

betterPrinting at its most basic usage spares a few keystrokes, providing aliases for every console function, along with adding the print() method(console.log alias). It exposes facilities to control the ending output of aconsole call, along with interfaces to configure the behaviour of the outputign itself eg. to a file instead ofstandard output.

#### Simple usage ####
```js
import {
	print,
	globals,
	PrxSettings,
} from "betterPrinting";

new PrxSettings()
	.augment(globals.PRINT, Date.now)
	.inject();
	
print("Hello :)"); //1646933984106 Hello :)
```
