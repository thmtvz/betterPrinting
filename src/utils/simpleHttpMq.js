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

import fs from "fs/promises";
//TODO: change this when move file functionalitty from getStream.js
import stream from "stream";
import wait from "./wait.js";
import * as requests from "./requests.js";

class SimpleHttpMq extends stream.Writable {
    constructor(addr, method = "POST", tryHttp = true, acceptedReturnCodes = [200], maxRetries = 100,
		standardWaitTime = 0.5, timeInciment = 0.1, numRetriesToInc = 25){
	super({objectMode: true});
	this.queue = [];
	this.reqCount = 0;
	this.addr = addr;
	this.method = "POST";
	this.tryHttp = tryHttp;
	this.acceptedReturnCodes = acceptedReturnCodes;
	this.maxRetries = maxRetries;
	this.standardWaitTime = standardWaitTime;
	this.waitTime = this.standardWaitTime;
	this.timeIncriment = timeInciment;
	this.numRetriesToInc = numRetriesToInc;
    }
    
    async _write(chunk, encoding, callback){
	await this.written(chunk);
	callback();
    }

    async httpSend(contents){
	return Promise.resolve(false);
	//TEMP
	try {
	    let reqst = await requests.httpsReq(this.addr, contents, "POST");
	    if(this.acceptedReturnCodes.indexOf(reqst.statusCode) !== -1){
		return Promise.resolve(true);
	    } else {
		throw new Error("");
	    }
	} catch (e) {
	    if(this.tryHttp && e.message === ""){
		try {
		    let reqst = await requests.httpReq(this.addr, contents, "POST");
		    if(this.acceptedReturnCodes.indexOf(reqst.statusCode) !== -1){
			return Promise.resolve(true);
		    } else {
			throw new Error("");
		    }
		} catch (er) {
		    return Promise.resolve(false);
		}
	    }
	    return Promise.resolve(false);
	}
    }
    
    async written(contents){
	if(this.queue.length){
	    this.queue.unshift(contents);
	    return;
	}
	if(!(await this.httpSend(contents))){
	    this.reqCount++
	    this.queue.unshift(contents);
	    this.retry();
	    return;
	}
    }

    async retry(){
	if(this.reqCount > this.maxRetries){
	    let file = await fs.open("./.notSent.log", "a", 0o600);
	    let stream = file.createWriteStream();
	    let all = "";
	    while(this.queue.length){
		all += this.queue.pop();
	    }
	    stream.write(all);
	    this._write = stream.write;
	    return;
	}
	let current = this.queue[0];
	if(!(await this.httpSend(current))){
	    this.reqCount++;
	    if(this.reqCount % this.numRetriesToInc === 0) this.waitTime += this.timeIncriment;
	    await wait(this.waitTime);
	    this.retry();
	} else {
	    this.queue.pop();
	    this.reqCount = 0;
	    this.waitTime = this.standardWaitTime;
	}
    }
}

export{
    SimpleHttpMq as default,
    
}
let teste = new SimpleHttpMq();
for(let i = 0; i < 100; i++){
    teste.write(`${i}\n`);
}

await wait(2);
console.log(teste);
