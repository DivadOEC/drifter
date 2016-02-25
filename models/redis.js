var redis = require('redis'),
	client = redis.createClient();
var debug = require('debug')('drifter:main');	
	
// Post a drifter
exports.throw = function(bottle, callback){
	bottle.time = bottle.time || Date.now();
	
	// Gen unique ID
	var bottleId = Math.random().toString(16);
	var type = {male: 0, female: 1};
	
	// route database by type
	client.SELECT(type[bottle.type], function(){
		// save drifter as HashObject
		client.HMSET(bottleId, bottle, function(err, result){
			if(err){
				return callback({code: 0, msg: "Oh,Your sister!Pls Try again later!"});
			}
			// return success result
			callback({code: 1, msg: result});
			client.EXPIRE(bottleId, 60 * 60 * 24);			// 1 day,delete from redis auto when expired
		});
	});
}

exports.pick = function(info, callback){
	var type = {all: Math.round(Math.random()), male: 0, female: 1};
	info.type = info.type || 'all';
	debug(info.type);
	client.SELECT(type[info.type], function(){
		debug('SELECTed');
		client.RANDOMKEY(function(err, bottleId){
			debug('RANDOMKEY');
			if(err){
				return callback({code: 0, msg: "Oops, the ocean is empty...."});
			}
			client.HGETALL(bottleId, function(err, bottle){
				debug('HGETALL');
				callback({code: 1, msg: bottle});
				client.DEL(bottleId);
				debug('DEL');
			});
		});
	});
}