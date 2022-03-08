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

import {
    print,
    log,
    warn,
    dir,
    table,
    count,
    assert,
    clear,
    debug,
    error,
    trace,
} from "./print.js";
import {
    time,
    elapsedTime,
    stop,
    currentTiming,
} from "./timing.js";
import {
    setOption,
    setConsProxy,
    OptSettings,
    PrxSettings,
} from "./settings.js";

export {
    print as default,
    print,
    log,
    warn,
    dir,
    table,
    count,
    assert,
    clear,
    debug,
    error,
    trace,
    time,
    elapsedTime,
    stop,
    currentTiming,
    setOption,
    setConsProxy,
    OptSettings,
    PrxSettings,
};

//TODO: make this via package.json and not here
