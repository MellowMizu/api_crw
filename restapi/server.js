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

// Create route


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/api/domains.:ext', function (req, res) {
    pool.query('SELECT id, slug, name, description FROM domain', function (err, results){
	if (err || req.params.ext != 'json')
	    res.status(400).json({ code: 400, message: "error", datas:[] });
	    else
		res.status(200).json({ code: 200, message: "sucess", datas:results });	    
	});
})

app.use('*', function(req, res) {
    res.status(404).json({ code: 404, message: "not found" });
});

//start server

app.listen(3000);

//err
