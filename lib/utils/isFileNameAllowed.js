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

import path from "path";
import fs from "fs/promises";

async function isFileNameAllowed(filename){
    if(typeof filename === "object") return false;
    else if(filename == true) return false;
    let forbiddenFileNames = await getDir(path.resolve(path.dirname(filename)));
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

export {
    isFileNameAllowed as default,
    getDir,
    
}
