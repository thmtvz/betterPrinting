# betterPrinting #

```js
import print from "betterPrinting";

print("Hello, world!");
```

#### console extending framework! ####

betterPrinting at its most basic usage spares a few keystrokes, providing aliases for every console function, along with adding the print method(console.log alias). It exposes facilities to control the ending output of aconsole call, along with interfaces to configure the behaviour of the outputign itself eg. to a file instead of standard output.

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

#### Configuring ####

betterPriting starts checking if you have an .env file, in the format "PROPERTY=value". The casing don't really matter, but the values expected to configuring the behaviour are all uppercased by convention. The values it looks for are the following:

**envVar**
* STDOUT
* STDERR
* IGNORE_ERRORS
* COLOR_MODE
* GROUP_INDENTATION

It's advised to only mess with STDOUT and STDERR, but you have total freedom to config in you liking.

Both STDOUT and STDERR expect either a filename, an http adress or an ip address. The other options are further covered in the docs.

---

##### extending console output #####

The extending is made by proxying the Console object. betterPrinting provides a few facilities for this:

*PrxSettings
*setConsProxy

setConsProxy function lets you use a totaly custom proxy. This is furthered covered in docs.

PrxSettings is the main method for extendind the Console behaviour. It provides a interface with the following facilities:

* augmenting
* replacing
* filtering
* intercepting
* observing

The names are enougthly sugesting. They take the input values for the Console call, and operate on it before calling the Console itself. You can use plain values, but you can also work with functions, so you get a very dynamical experience. See examples for further clarification.

---

```js
/* consider .env contains:
STDOUT=out.log
*/

import {
	print,
	error
} from "betterPrinting";
import {PrxSettings} from "betterPrinting/settings";

new PrxSettings()
	.augment("print", "LOG: ", "start") // prefer using the PRINT constant from the globals module!
	.replace("print", "sad emoji :(", "happy emoji :)")
	.inject(); // you can get the final proxy via .build() method, inject automate the proxy insertion into console object
	
print("sad emoji :("); // outputs happy emoji :) in a out.log file
error("im not in a file"); // im not in a file
```

