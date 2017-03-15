/**
 * Created by yanyj on 2017/3/8.
 */

gl.clearColor(0.0,0.0,0.0,1.0);//清空画面所使用的颜色

//初始深度
gl.clearDepth(1.0);

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);//使用默认的黑色初始化画面

//生成定点着色器和碎片着色器
var vs = create_shader("vshader");
var fs = create_shader("fshader");

//生成程序对象 并 连接
var program = create_program(vs, fs);

var attLocation = gl.getAttribLocation(program, "position");

var attStride =  3;

// 模型（顶点）数据
var vertex_position = [
	0.0, 1.0, 0.0,
	1.0, 0.0, 0.0,
	-1.0, 0.0, 0.0
];

//生成vbo
var vbo = create_vbo(vertex_position);

//绑定vbo
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

// 设定attribute属性有効
gl.enableVertexAttribArray(attLocation);

// 添加attribute属性
gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);

// 使用minMatrix.js对矩阵的相关处理
// matIV对象生成
var m = new matIV();

// 各种矩阵的生成和初始化
var mMatrix = m.identity(m.create());
var vMatrix = m.identity(m.create());
var pMatrix = m.identity(m.create());
var mvpMatrix = m.identity(m.create());

// 视图变换坐标矩阵
m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);

// 投影坐标变换矩阵
m.perspective(90, 500 / 350, 0.1, 100, pMatrix);

// 各矩阵想成，得到最终的坐标变换矩阵
m.multiply(pMatrix, vMatrix, mvpMatrix);
m.multiply(mvpMatrix, mMatrix, mvpMatrix);

// uniformLocation的获取
var uniLocation = gl.getUniformLocation(program, 'mvpMatrix');

// 向uniformLocation中传入坐标变换矩阵
gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

// 绘制模型
gl.drawArrays(gl.TRIANGLES, 0, 3);

// context的刷新
gl.flush();