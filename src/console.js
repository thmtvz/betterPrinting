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

import "./globals.js";
import { Console } from "console";

const OPTIONS = {
    stdout: getStream(process.env.STDOUT) || STDOUT,
    stderr: getStream(process.env.STDERR) || STDERR,
    ignoreErrors: getStream(process.env.IGNORE_ERRORS) || true,
    colorMode: getStream(process.env.COLOR_MODE) || 'auto',
    groupIndentation: getStream(process.env.GROUP_INDENTATION) || 2
};

var cons = new Console(OPTIONS)

function getStream(intended){
    if(!intended) return undefined;
    //if is a filename, fs.get...
    //if is a adress, net.write...
    //if is something weird, throw error
} //TODO if filename, write to file instead, if net, write to it then.

export {
    cons as default,
}
