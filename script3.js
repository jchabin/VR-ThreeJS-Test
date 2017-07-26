var camera, renderer, scene;

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

scene.background = new THREE.Color(0x2d2c42);
scene.fog = new THREE.Fog(0x2d2c42, 100, 200);

camera = new THREE.PerspectiveCamera(
	90,
	window.innerWidth / window.innerHeight,
	0.01,
	3000
);
camera.position.set(0, 20, 0)
scene.add(camera);
	
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else{
	controls = new THREE.OrbitControls(camera, element);
}

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 10;
effect.setSize(window.innerWidth, window.innerHeight);

var light = new THREE.PointLight();
scene.add(light);
light.position.set(0, 20, -20);

var c = new THREE.Mesh(new THREE.CylnderBufferGeometry(15, 15, 15, 6), new THREE.MeshStandardMaterial());
c.rotation.set(0, 0, -Math.PI);
scene.add(c);

var x = 0;

function render() {
	requestAnimationFrame(render);
	controls.update();
	x += 0.01;
	effect.render(scene, camera);
}
render();