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

//TODO: remove path and fs from here
import path from "path";
import fs from "fs/promises";
import getFileAppendStream from "./getFileAppendStream.js";
import getNetWriteStream from "./getNetWriteStream.js";

async function getStream(intendedValue, intendedFor){
    //This is intended for settings via enviroment only.
    if(!intendedValue) return undefined;
    else if(isAddress(intendedValue)) return getNetWriteStream(intendedValue);
    else if(await isFileNameAllowed(intendedValue)) return getFileAppendStream(intendedValue);
    throw new Error(`Unrecognized or invalid value${(intendedFor ? " for " + intendedFor + ": " + intendedValue : ": " + intendedValue)}`);
}

export {
    getStream as default,

}

async function isFileNameAllowed(filename){
    if(typeof filename === "object") return false;
    else if(filename == true) return false;
    let forbiddenFileNames = await getDir(path.dirname(filename));
    forbiddenFileNames = forbiddenFileNames.filter(name => name.slice(-4) !== ".log");
    filename = path.basename(filename);
    if(forbiddenFileNames.includes(filename)) return false;
    return true;
}

async function getDir(dirname){
    try{
	var dir = fs.readdir(dirname, {});
    } catch(error){
	throw error;
    }
    return dir;
}

function isAddress(value){
    let addrRgx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/; //Got from https://ihateregex.io/expr/url/
    let ipAddrRgx = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
    if(addrRgx.test(value) || ipAddrRgx.test(value)) return true;
    return false;
}
