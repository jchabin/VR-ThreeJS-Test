var camera, renderer, scene;

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

scene.background = new THREE.Color(0x2d2c42);

camera = new THREE.PerspectiveCamera(
	90,
	window.innerWidth / window.innerHeight,
	0.01,
	3000
);
camera.position.set(0, 20, 0)
scene.add(camera);
	
const BOXES = 10;
	
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else{
	controls = new THREE.OrbitControls(camera, element);
	camera.position.set(0, BOXES * 2.5, 0);
}

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 50;
effect.setSize(window.innerWidth, window.innerHeight);

for(var r = -0.5 * BOXES; r < BOXES / 2; r++)
for(var c = -0.5 * BOXES; c < BOXES / 2; c++){
var height = Math.random() * 10 + Math.sqrt(r * r + c * c);
var a = new THREE.Mesh(new THREE.BoxBufferGeometry(10, height, 10), new THREE.MeshStandardMaterial());
a.position.set(r * 10, height / 2, c * 10);
scene.add(a);


}

var light = new THREE.PointLight();
scene.add(light);

var x = 0;

function render() {
	requestAnimationFrame(render);
	controls.update();
	light.position.set(20 * Math.sin(x), 20, 20 * Math.cos(x));
	x += 0.01;
	effect.render(scene, camera);
}
render();