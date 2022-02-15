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

function printFactory(fn){
    return function(...args){
	console.log(fn)
	fn(...args);
    }
}

var print = printFactory(cons.log);
var warn = printFactory(cons.warn); // this is a alias for cons.error
var dir = printFactory(cons.dir); // TODO: make dir better, by using global constants as options 
var table = printFactory(cons.table);
var count = printFactory(cons.count); // TODO: make this as the timing  
var assert = printFactory(cons.assert);
var clear = printFactory(cons.clear);
var debug; // debug is a alias for console.log, so is print, then, no debug();
var error = printFactory(cons.error);
var trace = printFactory(cons.trace);


export {
    print as default,
    warn,
    dir,
    table,
    count,
    assert,
    clear,
    error,
    trace,
    
};
