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
import path from "path";


function getStream(intendedValue, intendedFor){
    if(!intendedValue) return undefined;
    else if(isAddress(intendedValue)) return getNetWriteStream(intendedValue);
    else if(isFileName(intendedValue)) return getFileAppendStream(intendedValue);
    throw new Error(`Unrecognized value for: ${intendedFor}, ${intendedValue}`);
}

export {
    getStream as default,

}

function isFileName(str){
    let regex = /jonas/;
    return regex.test(str) ? true : false;
}

async function getFileAppendStream(str){
    let dir = getDir("./");
    let file = await fs.open(str, "a");
    let stream = await file.createWriteStream();
    return stream;
}// TODO: assume str is a path.

async function getDir(dirname){
    try{
	var dir = await fs.readdir(dirname, {});
    } catch(error){
	throw error;
    }
    return dir;
}
