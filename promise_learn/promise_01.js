/**
 * Created by yanyj on 2017/3/14.
 */
'use strict';

function test1(resolve, reject) {
	var timeOut = Math.random() * 2;
	console.log("set time to " + timeOut + " seconds");

	setTimeout(function () {
		if (timeOut >= 1) {
			console.log("call resolve()");
			resolve("200 OK")
		} else {
			console.log("call reject() ");
			reject("time in " + timeOut + " seconds")
		}
	}, timeOut * 1000)};

// test1(function (text) {
// 	console.log(text);
// }, function (text) {
// 	console.log(text);
// });

new Promise(function (resolve, reject) {
	console.log('start new Promise...');
	var timeOut = Math.random() * 2;
	console.log('set timeout to: ' + timeOut + ' seconds.');
	setTimeout(function () {
		if (timeOut < 1) {
			console.log('call resolve()...');
			resolve('200 OK');
		}
		else {
			console.log('call reject()...');
			reject('timeout in ' + timeOut + ' seconds.');
		}
	}, timeOut * 1000);
}).then(function (r) {
	console.log('Done: ' + r);
}).catch(function (reason) {
	console.log('Failed: ' + reason);
});