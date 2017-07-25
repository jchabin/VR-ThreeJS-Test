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
camera.position.set(0, 0, 10);
scene.add(camera);

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(3, 4, 1);
scene.add(light);

var cube = new THREE.Mesh(
	new THREE.BoxBufferGeometry(1, 1, 1),
	new THREE.MeshPhongMaterial()
);
scene.add(cube);

var plane = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(100, 100),
	new THREE.MeshStandardMaterial()
);
plane.position.set(0, -10, 0);
plane.rotation.set(-90, 0, 0);
scene.add(plane);

controls = new THREE.DeviceOrientationControls(camera);

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 10;
effect.setSize( window.innerWidth, window.innerHeight );

camera.rotation.set(0, 0, 0);

var x = 0;
function render() {
	requestAnimationFrame(render);
	//controls.update();
	cube.rotation.y = x;
	x += 0.01;
	effect.render(scene, camera);
}
render();
