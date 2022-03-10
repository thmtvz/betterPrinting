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

import http from "http";
import https from "https";


function requestFactory(secure){
    return async function makeRequest(url, body = "", method = "GET"){
	let requestModeFn = secure ? https.request : http.request;
	return new Promise(function(res, rej){
	    try{
		let request = requestModeFn(url,{method: method}, function(response){
		    let resData = "";
		    response.on("data", function(data){
			resData += data.toString();
		    });
		    response.on("error", function(e){
			throw new Error(e);
		    });
		    response.on("end", function(){
			if(!response.complete) throw new Error("Incomplete Response");
			res({
			    statusCode: response.statusCode,
			    content: resData,
			});
		    });
		});
		if(body){
		    request.setHeader("Content-Type", "text/plain");
		    request.write(body);
		} 
		request.end();
	    } catch (e){
		rej(e);
	    }
	});	
    }
}

let httpsReq = requestFactory(true);
let httpReq = requestFactory(false);

export {
    httpsReq,
    httpReq,
}
