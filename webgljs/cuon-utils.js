/**
 * Created by yanyj on 2017/3/9.
 */

function get(url) {
	return new Promise(function(resolve) {
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(this.responseText);
			};
			xhr.open("get", url);
			xhr.send();
	});
}

