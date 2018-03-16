'use strict';
const express = require('express');
var app = express()

//db
var mysql      = require('mysql');
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'db'
});

// Create a server with a host and port


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/api/domains.json', function (req, res) {
	//if (err)
	//    return(buildResponse(400, "error" + err));
	pool.query('SELECT id, slug, name, description FROM domain', function (err, results){
	    //pool.release();
	    if (err)
		res.status(400).json({ code: 400, message: "not found", datas:[] });
		//		return(buildResponse(400, "error" + err));
	    else
		res.status(200).json({ code: 200, message: "sucess", datas:[results] });
	    //return(buildResponse(200, undefined, results));
	    
	});
})

app.use('*', function(req, res) {
    res.status(404).json({ code: 404, message: "not found" });
});

//start server

app.listen(8080);

//err
/*
const buildResponse = function(code, message, datas) {
    return (JSON.stringify({
	"code": code,
	"message": message,
	"datas": datas,
    }));
};
*/
