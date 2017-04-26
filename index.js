
const request = require('request');
const LOGLITE_URL = 'https://loglite.herokuapp.com/api/v1/log/new';
const q = require('q');
function LogLite(token, loglite_url) {

	this.loglite_url = LOGLITE_URL;
	if(loglite_url){
		this.loglite_url = loglite_url;
	}

	if(!token) throw new Error("Token is required");

	this.token = token;

}

LogLite.prototype.log = function(data, optionalKey, type) {

	var _this = this;

	return q.fcall( function() {

		var d = q.defer();

		if(!data) d.reject( new Error("Must pass data") );

		

		request.post(_this.loglite_url, {
			body:{token:_this.token, data:data, key:optionalKey, type:type},
			json:true
		}, function (err, resp, body){

			if(err) {
				d.reject(err);
				return;
			}

			if(body && body.status && body.status == 'error'){
				d.reject(body.message || "Some error occured");
				return;
			} 

			d.resolve(body);

		});

		return d.promise;
	
	});

	return d.promise;

}

LogLite.prototype.info = function (data, optionalKey) {

	return this.log(data, optionalKey, "INFO");

}

LogLite.prototype.warning = function (data, optionalKey) {

	return this.log(data, optionalKey, "WARNING");

}

LogLite.prototype.error = function (data, optionalKey) {

	return this.log(data, optionalKey, "ERROR");

}

LogLite.prototype.errorX = function (data, optionalKey) {

	var formatted = {};

	formatted._raw = data;
	if(data.stack) formatted.stack = data.stack;

	return this.log(formatted, optionalKey, "ERROR-X");

}

function init(token, url){
	return new LogLite(token, url);
}
module.exports = init;