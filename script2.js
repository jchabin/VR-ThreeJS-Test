var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	90,
	window.innerWidth / window.innerHeight,
	0.1,
	3000
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
var element = renderer.domElement;
document.body.appendChild(element);

var cubemap = new THREE.CubeTextureLoader()
	.setCrossOrigin("")
	.load([
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/right.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/left.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/top.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/bottom.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/front.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/back.png"
	]);
cubemap.format = THREE.RGBFormat;
scene.background = cubemap;

var cubeCamera = new THREE.CubeCamera(1, 100, 128);
scene.add(cubeCamera);

const BOXES = 10;
var boxes = [];
for (var i = 0; i < BOXES; i++) {
	var cc = new THREE.CubeCamera(0.1, 100, 256);
	scene.add(cc);
	var b = new THREE.Mesh(
		new THREE.SphereBufferGeometry(1, 32, 32),
		new THREE.MeshBasicMaterial({
			envMap: cc.renderTarget
		})
	);
	boxes.push({
		x: Math.random() * 10 - 5,
		y: Math.random() * 10 - 5,
		z: Math.random() * 10 - 5,
		b: b,
		cc: cc
	});
	b.position.set(boxes[i].x, boxes[i].y, boxes[i].z);
	scene.add(b);
}

// var box = new THREE.Mesh(
// 	new THREE.SphereBufferGeometry(0.5, 32, 32),
// 	new THREE.MeshBasicMaterial({
// 		color: 0xffffff,
// 		envMap: cubeCamera.renderTarget
// 	})
// );
// scene.add(box);
controls = new THREE.DeviceOrientationControls(camera);

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 10;
effect.setSize( window.innerWidth, window.innerHeight );

var x = 0;
function render() {
	requestAnimationFrame(render);
	for (var i = 0; i < BOXES; i++) {
		boxes[i].b.position.set(
			boxes[i].x + Math.sin(boxes[i].z + x),
			boxes[i].y + Math.sin(boxes[i].y - x),
			boxes[i].z + Math.cos(x - boxes[i].x)
		);
		boxes[i].b.visible = false;
		boxes[i].cc.position.copy(boxes[i].b.position);
		boxes[i].cc.updateCubeMap(renderer, scene);
		boxes[i].b.visible = true;
	}
	/* 	box.position.set(Math.sin(x), 0, 0);
	updateReflection(); */
	x += 0.01;
	controls.update();
	effect.render(scene, camera);
}
render();
