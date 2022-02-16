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

import atof from "./atof.js";
import {
    env
} from "process";

function getEnv(envvar){
    let value = env[envvar];
    
    if(!value || (value === "undefined")){
	return undefined;
    } else if(value === "null"){
	return null;
    } else if((value == "true") ||
	      (value == "false")){
	return value == "true" ? true : false;
    } else if(!isNaN(atof(value))){
	return atof(value);
    }
    try{
	var finalValue = JSON.parse(value);
    } catch(e) {
	finalValue = value;
    }
    
    return finalValue;
}

export {
    getEnv as default,
    
}
