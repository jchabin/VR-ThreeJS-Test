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
	new THREE.MeshStandardMaterial({color: 0x00ff00, metalness: 0, roughness: 1}));
ground.position.set(0, -11, 0);
ground.rotation.x = 0.3735005;
scene.add(ground);

const SHAPES = 500;
var a;
for(var i = 0; i < SHAPES; i++){
	var g = new THREE.Geometry();
	for(var c = 0; c < 4; c++)
		g.vertices.push(new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10));
	g.faces.push(new THREE.Face3(0, 1, 2));
	g.faces.push(new THREE.Face3(1, 2, 3));
	g.faces.push(new THREE.Face3(2, 3, 0));
	g.faces.push(new THREE.Face3(3, 0, 1));
	g.mergeVertices();
	g.computeFaceNormals();
	g.computeVertexNormals();
	a = new THREE.Mesh(g, new THREE.MeshStandardMaterial({side: THREE.DoubleSide, roughness: 0.5, metalness: 1}));
	var xr = Math.random() * 2 * Math.PI;
	var yr = Math.random() * 2 * Math.PI;
	var d = Math.random() * 100 + 25;
	a.position.set(Math.cos(xr) * Math.cos(yr) * d, Math.sin(xr) * d, Math.cos(xr) * Math.sin(yr) * d);
	scene.add(a);
}

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
