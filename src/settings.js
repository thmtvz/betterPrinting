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
import * as glbs from "./globals.js";

function setOption(option, value){
    cons.setOption(option, value);
}

function setConsProxy(prx){
    cons.makeProxy(prx);
}

//-> augment input
//-> filter input
//-> replace input
//-> intercept calls
//-> observe calls
// make a function that will return a function depending on some factors
class PrxSettings {
    constructor(consObj){
	this.augmentList = new Map();
	this.filterList = new Map();
	this.replaceList = new Map();
	this.interceptList =new Map();
	this.observeList = new Map();
    }
    
    augment(propName, mod, pos){
	let fn = function(...args){
	    let result = typeof mod == "function" ? mod(args) : mod;
	    switch(pos){
	    case (pos === "s" || pos === "start" || pos === 0 ? pos : undefined):
		args.unshift(result);
		break;
	    case (pos === "e" || pos === "end" || pos === -1 ? pos : undefined):
		args.push(result);
		break;
	    case (typeof pos === "number" ? pos : undefined):
		if(pos < -1){
		    args.unshift(result);
		    break;
		} else if (pos > args.length){
		    args.push(result);
		    break;
		} else {
		    let end = args.splice(pos);
		    args.push(result);
		    args.push(...end);
		    break;
		}
	    default:
		args.unshift(result);
		break;
	    }
	    return args;
	}
	this.newFn(this.augmentList, propName, fn);
	return this;
    }

    replace(propName, replacee, replacementValue){
	let rplc = typeof replacee === "function" ? replacee : (ele) => {return ele === replacee};
	let rplcValue = typeof replacementValue === "function" ? replacementValue : (ele) => {return ele};
	let fn = function(...args){
	    return args.map(function(element){
		return rplc(element) ? rplcValue(replacementValue) : element;
	    });
	}
	this.newFn(this.replaceList, propName, fn);
	return this;
    }

    filter(propName, filter){
	let fltr = typeof filter === "function" ? filter : (ele) => {return !(ele === filter)};
	let fn = function(...args){
	    return args.filter(function(element){
		return fltr(element);
	    });
	}
	this.newFn(this.filterList, propName, fn);
	return this;
    }

    intercept(propName, action){
	this.newFn(this.intercepList, propName, action);
	return this;
    }

    observe(propName, callBack){
	let fn = function(startingArgs, endArgs){
	    callBack(startingArgs, endArgs);
	}
	this.newFn(this.observeList, propName, fn);
	return this;
    }

    augmentSome(...args){
	if(args.length < 3) return; // error!
	let mod = args[-2];
	let pos = args[-1];
	for(let i = 0; i < args.length -2; i++){
	    this.augment(args[i], mod, pos);
	}
	return this;
    }

    augmentAll(mod, pos){
	this.augment("all", mod, pos);
	return this;
    }

    filterSome(...args){
	if(args.length > 2) return; //error
	let filter = args[-1];
	for(let i = 0; i < args.length -1;i++){
	    this.filter(args[i], filter);
	}
	return this;
    }

    filterAll(filter){
	this.filter("all", filter);
	return this;
    }

    replaceSome(...args){
	if(args.length < 3) return; //error!
	let replacee = args[-2];
	let replacementValue = args[-1];
	for(let i = 0; i < args.length - 2;i++){
	    this.replace(args[i], replacee, replacementValue);
	}
	return this;
    }

    replaceAll(replacee, replacementValue){
	this.replace("all", replacee, replacecmentValue);
	return this;
    }

    interceptSome(...args){
	if(args.length < 2) return; //error
	let action = args[-1];
	for(let i = 0; i < args.length -1; i++){
	    this.intercept(args[i], action);
	}
	return this;
    }

    interceptAll(action){
	this.intercept("all", action);
	return this;
    }

    observeSome(...args){
	if(args.length < 2) return; //error
	let callBack = args[-1];
	for(let i = 0; i < args.length -1;i++){
	    this.observe(args[i], callBack);
	}
	return this;
    }

    observeAll(callBack){
	this.observe("all", callBack);
	return this;
    }

    build(){
	let prxObj = {};
	prxObj.augmentList = this.augmentList;
	prxObj.filterList = this.filterList;
	prxObj.replaceList = this.replaceList;
	prxObj.interceptList = this.interceptList;
	prxObj.observeList = this.observeList;
	prxObj.get = function(t, p){
	    let augList = this.augmentList;
	    let filtList = this.filterList;
	    let replList = this.replaceList;
	    let intrList = this.interceptList;
	    let obsrList = this.observeList;
	    function callFns(list, prop, args){
		if(!list.has(prop)) return args;
		list.get(prop).concat(list.has("all") ? list.get("all") : []).forEach(function(fn){
		    args = fn(...args);
		});
		if(!args) return;
		return args;
	    }
	    return function(...args){
		let finalArgs = args;
		if(intrList.has(p)){
		    finalArgs = callFns(interceptList, p, finalArgs);
		    t[p](...finalArgs);
		    return;
		}
		finalArgs = callFns(filtList, p, finalArgs);
		finalArgs = callFns(augList, p, finalArgs);
		finalArgs = callFns(replList, p, finalArgs);
		callFns(obsrList, p, args, finalArgs);
		t[p](...finalArgs);
		return;
	    }
	}
	return prxObj;
    }

    inject(){
	let p = this.build();
	cons.makeProxy(p);
    }

    newFn(list, propName, fn){
	if(!list.has(propName)){
	    list.set(propName, [fn]);
	    return;
	}
	list.get(propName).push(fn);
	return;
    }
}

class OptSettings {
    output(out, err){
	this.stdout = out;
	this.stderr = err;
	return this;
    }

    ignoreErrors(ignore){
	this.ignoreErrors = ignore;
	return this;
    }

    color(colorMode){
	this.colorMode = colorMode;
	return this;
    }
    
    gIdentation(groupIdentation){
	this.groupIndentation = groupIdentation;
	return this;
    }

    build(){
	let opt = {};
	opt.stdout = this.stdout;
	opt.stderr = this.stderr;
	opt.ignoreErrors = this.ignoreErrors;
	opt.groupIdentation = this.groupIdentation;
	opt.colorMode = this.colorMode;
	return opt;
    }

    inject(){
	let o = this.build();
	cons.options = o;
    }
}

export {
    setOption,
    setConsProxy,
    OptSettings,
    PrxSettings,
    
}
