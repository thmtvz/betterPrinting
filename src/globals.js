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

//Private, please avoid outside core!
const _STDOUT = process.stdout;
const _STDERR = process.stderr;
const _DIRNAME = process.cwd();

//Non private, usable for users
const PRINT = "print";
const LOG = "log";
const WARN = "warn";
const DIR = "dir";
const TABLE = "table";
const COUNT = "count";
const ASSERT = "assert";
const CLEAR = "clear";
const DEBUG = "debug";
const ERROR = "error";
const TRACE = "trace";
const TIME = "time";
const TIMELOG = "timelog";
const TIMEEND = "timeend";

export {
    _STDOUT,
    _STDERR,
    _DIRNAME,
    PRINT,
    LOG,
    WARN,
    DIR,
    TABLE,
    COUNT,
    ASSERT,
    CLEAR,
    DEBUG,
    ERROR,
    TRACE,
    TIME,
    TIMELOG,
    TIMEEND,
    
}
