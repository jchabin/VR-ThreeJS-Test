const BALLS = 20;
var index = 0;

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
camera.position.set(0, 0, 10);
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

var ball = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), new THREE.MeshStandardMaterial({envMap: cubemap, roughness: 0.9, metalness: 1.0, envMapIntensity: 3}));
ball.position.set(0, 0, 0);
ball.xv = Math.random() - 0.5;
ball.yv = Math.random() - 0.5;
ball.zv = Math.random() - 0.5;
//scene.add(ball);

const BOUNCE = 0.01;
var balls = [];

function render() {
	requestAnimationFrame(render);
	controls.update();
for(var i = 0; i < balls.length; i++){
	balls[i].position.x += balls[i].xv;
	balls[i].position.y += balls[i].yv;
	balls[i].position.z += balls[i].zv;
balls[i].yv -= 0.01;
if(balls[i].position.y < -4){
balls[i].position.y = -4;
balls[i].yv *= -0.3;
}
if(balls[i].position.y > 4){
balls[i].position.y = 4;
balls[i].yv *= -0.3;
}
if(balls[i].position.x < -4){
balls[i].position.x = -4;
balls[i].xv *= -0.3;
}
if(balls[i].position.x > 4){
balls[i].position.x = 4;
balls[i].xv *= -0.3;
}
if(balls[i].position.z < -4){
balls[i].position.z = -4;
balls[i].zv *= -0.3;
}
if(balls[i].position.z > 4){
balls[i].position.z = 4;
balls[i].zv *= -0.3;
}

for(var n = 0; n < balls.length; n++)
if(n != i && balls[n].position.distanceTo(balls[i].position) < 2){
balls[i].xv += (balls[i].position.x - balls[n].position.x) * BOUNCE;
balls[i].yv += (balls[i].position.y - balls[n].position.y) * BOUNCE;
balls[i].zv += (balls[i].position.z - balls[n].position.z) * BOUNCE;
}

balls[i].xv *= 0.98;
balls[i].yv *= 0.98;
balls[i].zv *= 0.98;
}
effect.render(scene, camera);
}render();

element.onclick = function(e){
var b;
if(balls.length < BALLS)
b = ball.clone();
else
b = balls[index % BALLS];
b.position.set(0, 0, 0);
b.xv = Math.sin(camera.rotation.y) * -Math.cos(camera.rotation.x);
b.yv = Math.sin(camera.rotation.x);
b.zv = Math.cos(camera.rotation.y) * -Math.cos(camera.rotation.x);
if(balls.length < BALLS){
balls.push(b);
scene.add(b);
}else
index++;
}