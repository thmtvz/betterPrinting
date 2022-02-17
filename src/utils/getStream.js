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

import "../globals.js";
import fs from "fs/promises";
import fSync from "fs";
import path from "path";


function getStream(intendedValue, intendedFor){
    if(!intendedValue) return Promise.resolve(undefined);
    else if(isAddress(intendedValue)) return getNetWriteStream(intendedValue);
    else if(isFileNameAllowed(intendedValue)) return getFileAppendStream(intendedValue);
    throw new Error(`Unrecognized or invalid value for ${intendedFor}: ${intendedValue}`);
}

export {
    getStream as default,

}

function isFileNameAllowed(filename){
    if(typeof filename === "object") return false;
    let forbiddenFileNames = getDir(path.dirname(filename));
    forbiddenFileNames = forbiddenFileNames.filter(name => name.slice(-4) !== ".log");
    filename = path.basename(filename);
    if(filename === true) return false;
    else if(forbiddenFileNames.includes(filename)) return false;
    return true;
}

async function getFileAppendStream(filename){
    let file =  await fs.open(filename, "a");
    let stream = file.createWriteStream();
    return stream;
}

function getDir(dirname){
    try{
	var dir = fSync.readdirSync(dirname, {});
    } catch(error){
	throw error;
    }
    return dir;
}

function isAddress(){
    return false;
}

function getNetWriteStream(){}
