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

import {
    tm,
    tl,
    te,
} from "./print.js";

class Timing {
    constructor(){
	this.labels = new Set();
    }

    start(label){
	if(!label) throw new Error("No label provided");
	if(this.labels.has(label)) throw new Error("Label already in use!");
	this.labels.add(label);
	tm(label);
    }

    elapsed(label){
	if(!label) throw new Error("No label provided");
	if(!this.labels.has(label)) throw new Error(`Can't find \"${label}\" label`);
	tl(label);
    }

    stop(label){
	if(!label) throw new Error("No label provided");
	if(!this.labels.has(label)) throw new Error(`Can't find \"${label}\" label`);
	this.labels.delete(label);
	te(label);
    }

    currentTimings(){
	let labels = [];
	this.labels.forEach((e) => {
	    labels.push(e);
	});
	return labels;
    }
}

var chrono = new Timing();
var time = chrono.start;
var elapsedTime = chrono.elapsed;
var stop = chrono.stop;
var currentTiming = currentTiming;

export {
    time,
    elapsedTime,
    stop,
    currentTiming,
    
}
