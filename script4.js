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
camera.position.set(0, 5, 0);
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
const CUBES = 10;
for(var r = 0; r < CUBES; r++) for(var c = 0; c < CUBES; c++){
var a = new THREE.Mesh(new THREE.BoxBufferGeometry(5, 5, 5), new THREE.MeshStandardMaterial({metalness: 1.0, roughness: 0.5}));
var b = Math.random() * Math.PI * 2;
a.position.set((r - CUBES / 2) * 5, Math.sin(b), (c - CUBES / 2) * 5);
cubes.push({a: a, b: b});
scene.add(a);
}

var x = 0;

function render() {
	requestAnimationFrame(render);
	controls.update();
light.position.set(Math.sin(x) * 10, 10, Math.cos(x) * 10);
	x += 0.01;
for(var i = 0; i < CUBES; i++){
cubes[i].a.position.y = Math.sin(x + cubes[i].b);
}
effect.render(scene, camera);
}
render();