/*
Aliases with fewer keystrokes, and extension framework for node.js
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

import cons from "./cons.js";

var print = printFactoryLazy("print");
var log = printFactoryLazy("log");
var warn = printFactoryLazy("warn");
var dir = printFactoryLazy("dir");
var table = printFactoryLazy("table");
var count = printFactoryLazy("count");
var assert = printFactoryLazy("assert");
var clear = printFactoryLazy("clear");
var debug = printFactoryLazy("debug");
var error = printFactoryLazy("error");
var trace = printFactoryLazy("trace");
var time = printFactoryLazy("time");
var timeLog = printFactoryLazy("timeLog");
var timeEnd = printFactoryLazy("timeEnd");

export {
    print as default,
    time as tm,
    timeLog as tl,
    timeEnd as te,
    print,
    log,
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
