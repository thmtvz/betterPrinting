/*
Better names for printing in the console!
Copyright (C) 2022  Thiago Vaz

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

"use strict";

import "./globals.js";
import { Console } from "console";

class Cons {
    constructor(){
	this.console = undefined;
	this.proxy = undefined;
	this.options = {
	    stdout: getStream(process.env.STDOUT) || STDOUT,
	    stderr: getStream(process.env.STDERR) || STDERR,
	    ignoreErrors: getStream(process.env.IGNORE_ERRORS) || true,
	    colorMode: getStream(process.env.COLOR_MODE) || 'auto',
	    groupIndentation: getStream(process.env.GROUP_INDENTATION) || 2,
	} // TODO: fix this, not all options need the getStream!
    }
    
    getCons(){
	this.console = new Console(this.options);
	if(this.proxy) return new Proxy(this.console, this.proxy);
	return this.console;
    }

    makeProxy(handler){
	this.proxy = handler; // TODO: make this a factory.
    }

    setOption(option, value){
	this.options[option] = value;
    }
}

var c = new Cons();
//FIXME this is not working as intended!
var p = new Proxy(c, {
    get: function(target, prop, receiver){
	// Lazy init for the console object,
	// only start it when someone tries to use it!
	// then, makes itself the console or proxy object.
	//FIXME
	p = c.getCons();
    }
})


function getStream(intended){
    if(!intended) return undefined;
    //if is a filename, fs.get...
    //if is a adress, net.write...
    //if is something weird, throw error
} //TODO if filename, write to file instead, if net, write to it then.

export {
    p as default,
}
