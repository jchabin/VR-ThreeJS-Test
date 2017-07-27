var camera, renderer, scene;

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 100, 200);

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

var x = 0;

function render() {
	requestAnimationFrame(render);
	controls.update();
	x += 0.01;
effect.render(scene, camera);
}render();