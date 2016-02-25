var debug = require('debug')('drifter:main');
var request = require('request');

var content = ["希姐姐,你在哪?","小馨,我想你!","下一个亿万富翁"];
var content_f = ["达达,我来啦!","dav,我也想你!","你就是下一个亿万富翁"];

debug('begin');
for(var i=1; i<=5; i++){
	(function(i){
		debug(i);
		request.post({
			url:	"http://127.0.0.1:3000",
			json:	{"owner":	"bottle" + i, "type":	"male",	"content":	content[Math.round(Math.random()*3)]}
		});
	})(i);
	
}

for(var i=6; i<=10; i++){
	(function(i){
		request.post({
			url:	"http://127.0.0.1:3000",
			json:	{"owner":	"bottle" + i, "type":	"female",	"content":	content_f[Math.round(Math.random()*3)]}
		});
	})(i);
}