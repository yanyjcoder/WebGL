/**
 * Created by yanyj on 2017/3/14.
 */
function mulitipy(input) {
	return new Promise(function (resolve, reject) {
		console.log("calculating " + input + " X " + input);
		setTimeout(resolve, 1000, input * input);
		console.log("mulitipy result = " + input * input);
	})
}

function add(input) {
	return new Promise(function (resolve, reject) {
		console.log("calculating " + input + " + " + input);
		setTimeout(resolve, 1000, input + input);
		console.log("mulitipy result = " + (input + input));
	})
}

var p = new Promise(function (resolve, reject) {
	console.log("start new Promise!");
	resolve(123);
});

p.then(mulitipy)
	.then(add)
	.then(mulitipy)
	.then(add)
	.then(function (result) {
		console.log("Get result value = "  + result);
	});