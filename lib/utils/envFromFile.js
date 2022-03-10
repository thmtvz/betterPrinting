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

import fs from "fs/promises";
import * as _glbs from "../_globals.js";
import {getDir} from "./isFileNameAllowed.js";

await (async function populateEnvFromFile(){
    let files = await getDir(_glbs.DIRNAME);
    if(files.indexOf(".env") === -1) return;
    try {
	let file = await fs.readFile(".env");
	file = file.toString().split("\n");
	for(let line of file){
	    let envVar = line.split("=");
	    process.env[envVar[0]] = envVar[1];
	} 
    } catch (e) {
	throw new Error(e);
    }
})();
