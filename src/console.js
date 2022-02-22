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
import getClassMethodsAndProps from "./utils/getClassMethodsAndProps.js";
import getStream from "./utils/getStream.js";
import getEnv from "./utils/getEnv.js";
import { Console } from "console";

class Cons {
    constructor(options){
	this.console = undefined;
	this.proxy = undefined;
	this.options = options;
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

var propsAndMethods = getClassMethodsAndProps(Cons, new Cons({}));

var OPTIONS = await optionsFactory(
    getEnv("STDOUT"),
    getEnv("STDERR"),
    getEnv("IGNORE_ERRORS"),
    getEnv("COLOR_MODE"),
    getEnv("GROUP_INDENTATION")
);

var c = new Cons(OPTIONS);
var p = new Proxy(c, {
    get: function(target, prop, receiver){
	// Lazy init for the console object,
	// only start it when someone tries to use it!
	// on start, makes itself the console or proxy object.
	if(!(propsAndMethods.includes(prop))){
	    p = c.getCons();
	    return p[prop];
	}
	return target[prop];
    }
})

export {
    p as default,
}

async function optionsFactory(
    stdout,
    stderr,
    ignoreErrors,
    colorMode,
    groupIndentation){
    let opt = {};
    opt.stdout = await getStream(stdout, "STDOUT") || STDOUT;
    opt.stderr = await getStream(stderr, "STDERR") || STDERR;
    opt.ignoreErrors = ignoreErrors || true;
    opt.colorMode = colorMode || "auto";
    opt.groupIndentation = groupIndentation || 2;
    return opt;
}
