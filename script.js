var camera, renderer, scene;

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

scene.background = new THREE.Color(0x84b9ff);

camera = new THREE.PerspectiveCamera(
	90,
	window.innerWidth / window.innerHeight,
	0.01,
	3000
);
scene.add(camera);
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else{
	controls = new THREE.OrbitControls(camera, element);
	camera.position.set(0, 0, -5);
}

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 50;
effect.setSize(window.innerWidth, window.innerHeight);

var ground = new THREE.Mesh(
	new THREE.IcosahedronBufferGeometry(10, 0),
	new THREE.MeshStandardMaterial());
ground.position.set(0, -11, 0);
ground.rotation.x = 0.3735005;
scene.add(ground);

var light = new THREE.PointLight();
scene.add(light);

var x = 0;

function render() {
	requestAnimationFrame(render);
	controls.update();
	x += 0.01;
	effect.render(scene, camera);
}
render();
