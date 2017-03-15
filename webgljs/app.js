/**
 * Created by yanyj on 2017/3/9.
 */
var webgl = document.getElementById("webgl");

var gl = webgl.getContext("webgl");

var vertexSource;
var fragmentSource;
Promise.all([get("webgljs/vert/source.vert"), get("webgljs/vert/source.frag")]).then(function (sources) {
	vertexSource = sources[0];
	fragmentSource = sources[1];


//定点着色器
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexSource);
gl.compileShader(vertexShader);

//片段着色器
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentSource);
gl.compileShader(fragmentShader);

//着色器链接到程序对象
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

var modelViewMatrix = mat4.create();
mat4.lookAt(modelViewMatrix, [4, 4, 8], [0, 0, 0], [0, 1, 0]);

var uModelViewMatrix = gl.getUniformLocation(program, "uModelViewMatrix");
gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);

var projectionMatrix = mat4.create();
mat4.perspective(projectionMatrix, Math.PI / 6, webgl.width / webgl.height, 0.1, 100);

var uProjectionMatrix = gl.getUniformLocation(program, "uProjectionMatrix");
gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);

//定点信息
var vertices = [
	//前
	1.0, 1.0, 1.0, 0.0, 0.8, 0.0,
	-1.0, 1.0, 1.0, 0.0, 0.8, 0.0,
	-1.0, -1.0, 1.0, 0.0, 0.8, 0.0,
	1.0, -1.0, 1.0, 0.0, 0.8, 0.0,
	//后
	1.0, 1.0, -1.0, 0.6, 0.9, 0.0,
	-1.0, 1.0, -1.0, 0.6, 0.9, 0.0,
	-1.0, -1.0, -1.0, 0.6, 0.9, 0.0,
	1.0, -1.0, -1.0, 0.6, 0.9, 0.0,
	//上
	1.0, 1.0, -1.0, 1.0, 1.0, 0.0,
	-1.0, 1.0, -1.0, 1.0, 1.0, 0.0,
	-1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
	1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
	//下
	1.0, -1.0, -1.0, 1.0, 0.5, 0.0,
	-1.0, -1.0, -1.0, 1.0, 0.5, 0.0,
	-1.0, -1.0, 1.0, 1.0, 0.5, 0.0,
	1.0, -1.0, 1.0, 1.0, 0.5, 0.0,
	//右
	1.0, 1.0, -1.0, 0.9, 0.0, 0.2,
	1.0, 1.0, 1.0, 0.9, 0.0, 0.2,
	1.0, -1.0, 1.0, 0.9, 0.0, 0.2,
	1.0, -1.0, -1.0, 0.9, 0.0, 0.2,
	//左
	-1.0, 1.0, -1.0, 0.6, 0.0, 0.6,
	-1.0, 1.0, 1.0, 0.6, 0.0, 0.6,
	-1.0, -1.0, 1.0, 0.6, 0.0, 0.6,
	-1.0, -1.0, -1.0, 0.6, 0.0, 0.6
];

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

var aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 24, 0);
gl.enableVertexAttribArray(aVertexPosition);

var aVertexColor = gl.getAttribLocation(program, "aVertexColor");
gl.vertexAttribPointer(aVertexColor, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(aVertexColor);

var indices = [
	0, 1, 2, 0, 2, 3,
	4, 6, 5, 4, 7, 6,
	8, 9, 10, 8, 10, 11,
	12, 14, 13, 12, 15, 14,
	16, 17, 18, 16, 18, 19,
	20, 22, 21, 20, 23, 22
];

var indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
});