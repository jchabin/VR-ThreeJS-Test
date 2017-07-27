var camera, renderer, scene;

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 100, 200);

var cubemap = new THREE.CubeTextureLoader()
	.load([
		"cubemap/IMG_5203.PNG",
		"cubemap/IMG_5202.PNG",
		"cubemap/IMG_5204.PNG",
		"cubemap/IMG_5200.PNG",
		"cubemap/IMG_5201.PNG",
		"cubemap/IMG_5199.PNG"
	]);
cubemap.format = THREE.RGBFormat;

camera = new THREE.PerspectiveCamera(
	90,
	window.innerWidth / window.innerHeight,
	0.01,
	3000
);
camera.position.set(0, 0, 0);
scene.add(camera);
	
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else{
	controls = new THREE.OrbitControls(camera, element);
camera.position.set(0, 10, 0);
}

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 10;
effect.setSize(window.innerWidth, window.innerHeight);

var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), new THREE.MeshBasicMaterial({color: 0xeeeeee}));
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.position.set(0, -5, 0);
scene.add(plane);

var b = new THREE.Mesh(new THREE.BoxBufferGeometry(10, 10, 10, 5, 5, 5), new THREE.MeshBasicMaterial({color: 0xeeeeee, wireframe: true}));
scene.add(b);

var ball = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), new THREE.MeshBasicMaterial({envMap: cubemap}));
ball.position.set(0, 0, 0);
ball.xv = Math.random() * 0.1 - 0.05;
ball.yv = Math.random() * 0.1 - 0.05;
ball.zv = Math.random() * 0.1 - 0.05;
scene.add(ball);

function render() {
	requestAnimationFrame(render);
	controls.update();
	ball.position.x += ball.xv;
	ball.position.y += ball.yv;
	ball.position.z += ball.zv;
ball.yv -= 0.01;
if(ball.position.y < -4){
ball.position.y = -4;
ball.yv *= -0.3;
}
if(ball.position.y > 4){
ball.position.y = 4;
ball.yv *= -0.3;
}
if(ball.position.x < -4){
ball.position.x = -4;
ball.xv *= -0.3;
}
if(ball.position.x > 4){
ball.position.x = 4;
ball.xv *= -0.3;
}
if(ball.position.z < -4){
ball.position.z = -4;
ball.zv *= -0.3;
}
if(ball.position.z > 4){
ball.position.z = 4;
ball.zv *= -0.3;
}
ball.xv *= 0.98;
ball.yv *= 0.98;
ball.zv *= 0.98;
effect.render(scene, camera);
}render();