var debug = require('debug')('drifter:main');
var express = require('express');
var redis = require('./models/redis.js');

var app = express();
app.use(express.bodyParser());

// post a drifter
// POST owner=xxx&type=xxx&content=xxx[&time=xxx]
app.post('/', function(req,res){
	
	if(!(req.body.owner && req.body.type && req.body.content)){
		if(req.body.type && (["male", "female"].indexOf(req.body.type) === -1)){
			return res.json({code: 0, msg: "Drifter Type Error!"});
		}
		return res.json({code: 0, msg: "Drifter Info unComplete!"});
	}

	redis.throw(req.body, function(result){
		res.json(result);
	});
});

// get a drifter
// GET /?user=xxx[&type=xxx]
app.get('/', function(req, res){
	debug('Fast....1');
	if(!req.query.user){
		return res.json({code: 0, msg: "Drifter Info unComplete!"});
	}
	debug('Fast....2');
	if(req.query.type && (["male", "female"].indexOf(req.body.type) === -1)){
		return res.json({code: 0, msg: "Drifter Type Error!"});
	}
	debug('Fast....3');
	redis.pick(req.query, function(result){
		debug('Fast....');
		res.json(result);
	});	
});

app.listen(3000);