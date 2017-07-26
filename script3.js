var camera, renderer, scene;

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x000000, 100, 200);

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
camera.position.set(0, 20, 0);

}

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 10;
effect.setSize(window.innerWidth, window.innerHeight);

var light = new THREE.PointLight();
scene.add(light);
light.position.set(0, 0, 10);

var cubes = [];
const CUBES = 60;
for(var i = 0; i < CUBES; i++){
var a = new THREE.Mesh(new THREE.BoxBufferGeometry(5, 5, 5), new THREE.MeshStandardMaterial({metalness: 1.0, roughness: 0.5}));
var b = Math.random() * Math.PI * 2;
var c = Math.random() * Math.PI * 2;
var d = Math.random() * 10 + 10;
a.position.set(Math.sin(b) * Math.cos(c) * d, Math.sin(c) * d, Math.cos(b) * Math.cos(c) * d);
a.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
cubes.push(a);
scene.add(a);
}

var x = 0;

function render() {
	requestAnimationFrame(render);
	controls.update();
light.position.set(Math.sin(x) * 10, 0, Math.cos(x) * 10);
	x += 0.01;
for(var i = 0; i < CUBES; i++){
cubes[i].rotation.x += 0.01;
cubes[i].rotation.y += 0.01;
cubes[i].rotation.z += 0.01;
}
effect.render(scene, camera);
}
render();