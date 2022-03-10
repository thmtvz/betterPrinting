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

function getClassMethodsAndProps(className, dummyInstance){
    let methods = Object.getOwnPropertyNames(className.prototype);
    let cSym = Object.getOwnPropertySymbols(className.prototype);
    let props = Object.getOwnPropertyNames(dummyInstance);
    let oSym = Object.getOwnPropertySymbols(dummyInstance);
    let all = methods.concat(cSym, props, oSym).filter(function(element){
	return element !== 'constructor';
    });
    return all ;
}

export {
    getClassMethodsAndProps as default,

}
