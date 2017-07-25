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

var plane = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(100, 100),
	new THREE.MeshStandardMaterial()
);
plane.position.set(0, -10, 0);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane);

var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else
	controls = new THREE.OrbitControls(camera);

const BOXES = 100;
for(var i = 0; i < BOXES; i++){
	var height = Math.random() * 10;
	var a = new THREE.Mesh(
		new THREE.BoxBufferGeometry(1, height, 1),
		new THREE.MeshStandardMaterial()
	);
	a.position.set((Math.random()<0.5?1:-1) * (Math.random() * 10 + 10), height / 2 - 10, (Math.random()<0.5?1:-1) * (Math.random() * 10 + 10));
	scene.add(a);
}

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 10;
effect.setSize( window.innerWidth, window.innerHeight );

camera.rotation.set(0, 0, 0);

var x = 0;
function render() {
	requestAnimationFrame(render);
	controls.update();
	x += 0.01;
	effect.render(scene, camera);
}
render();
