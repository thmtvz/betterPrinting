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

import cons from "./console.js";

//TODO: make an option for warning the aliases; 
var print = printFactoryLazy("log");
var warn = printFactoryLazy("warn");
var dir = printFactoryLazy("dir");
var table = printFactoryLazy("table");
var count = printFactoryLazy("count");
var assert = printFactoryLazy("assert");
var clear = printFactoryLazy("clear");
var debug = function(){
    throw new Error("Use print() instead"); // debug is a alias for console.log, so is print, then, no debug();
}
var error = printFactoryLazy("error");
var trace = printFactoryLazy("trace");

export {
    print as default,
    print,
    warn,
    dir,
    table,
    count,
    assert,
    clear,
    debug,
    error,
    trace,

};

function printFactoryLazy(fn){
    return function(...args){
	cons[fn](...args)
    }
}
