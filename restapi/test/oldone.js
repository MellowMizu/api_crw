'use strict';
const Hapi = require('hapi');

//db
var mysql      = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'db'
});

// Create a server with a host and port
const server = new Hapi.Server({
    host: '172.16.237.158',
    port: 80,
});

// Add the route
server.route({
    method: 'GET',
    path:'/helloworld',
    handler: function (request, reply) {
	return 'hello world';
    }
});

server.route({
    method: 'GET',
    path:'/api/domains.json',
    handler: function (request, reply) {
	pool.getConnection(function(err, db) {
	    if (err)
		return(reply(buildResponse(400, "error" + err)));
	    db.query('SELECT * FROM domains', function (err, results){
		db.release();
		if (err)
		    return(reply(buildResponse(400, "error" + err)));
		return(reply(buildResponse(200, undefined, results)));
	    });
	});
    }
});

server.start((err) => {
    if (err) {
	throw err;
    }
    console.log('Server running at:', server.info.uri);
});

//err

const buildResponse = function(code, message, datas) {
    return (JSON.stringify({
	"code": code,
	"message": message,
	"datas": datas,
    }));
};
