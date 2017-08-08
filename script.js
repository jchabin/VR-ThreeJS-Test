var camera, renderer, scene;

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

var color = 0xFFFFFF;
scene.background = new THREE.Color(color);
scene.fog = new THREE.Fog(color, 1, 500);

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

THREE.ImageUtils.crossOrigin = "";
var cubemap = new THREE.CubeTextureLoader()
	.load([
		"../cubemap/IMG_5203.PNG",
		"../cubemap/IMG_5202.PNG",
		"../cubemap/IMG_5204.PNG",
		"../cubemap/IMG_5200.PNG",
		"../cubemap/IMG_5201.PNG",
		"../cubemap/IMG_5199.PNG"
	]);
cubemap.format = THREE.RGBFormat;

var ground = new THREE.Mesh(
	new THREE.IcosahedronBufferGeometry(10, 2),
	new THREE.MeshStandardMaterial({metalness: 0, roughness: 1, shading: THREE.FlatShading}));
ground.position.set(0, -11, 0);
ground.rotation.x = 0.3735005;
scene.add(ground);

const SHAPES = 200;
const SIDES = 7;
var shards = [];
for(var i = 0; i < SHAPES; i++){
	var g = new THREE.Geometry();
	for(var c = 0; c < SIDES; c++)
		g.vertices.push(new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100));
	for(var c = 0; c < SIDES; c++)
		for(var f = c + 1; f < SIDES; f++)
			for(var z = f + 1; z < SIDES; z++)
				g.faces.push(new THREE.Face3(c, f, z));
	
	/* g.faces.push(new THREE.Face3(0, 1, 2));
	g.faces.push(new THREE.Face3(1, 2, 3));
	g.faces.push(new THREE.Face3(2, 3, 0));
	g.faces.push(new THREE.Face3(3, 0, 1)); */
	g.mergeVertices();
	g.computeFaceNormals();
	g.computeVertexNormals();
	var a = new THREE.Mesh(g, new THREE.MeshStandardMaterial({side: THREE.DoubleSide, roughness: 0.5, metalness: 1, shading: THREE.FlatShading}));
	var xr = Math.random() * 2 * Math.PI;
	var yr = Math.random() * 2 * Math.PI;
	var d = Math.random() * 500 + 200;
	a.x = Math.cos(xr) * Math.cos(yr) * d;
	a.y = Math.sin(xr) * d;
	a.z = Math.cos(xr) * Math.sin(yr) * d;
	a.position.set(a.x, a.y, a.z);
	scene.add(a);
	shards.push(a);
}

var light = new THREE.PointLight();
light.position.set(0, 5, 0);
scene.add(light);

var x = 0;

var balls = new THREE.Object3D();
var b = new THREE.Mesh(new THREE.BoxBufferGeometry(2, 2, 2, 3, 3, 3), new THREE.MeshBasicMaterial({color: 0xdddddd, wireframe: true}));
balls.add(b);
var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), new THREE.MeshBasicMaterial({color: 0xdddddd}));
plane.position.set(0, -1, 0);
plane.rotation.set(-Math.PI / 2, 0, 0);
balls.add(plane);
balls.position.set(0, 0, 5);
var ball = new THREE.Mesh(new THREE.SphereBufferGeometry(.2, 32, 32), new THREE.MeshStandardMaterial({envMap: cubemap, roughness: 0.9, metalness: 1.0, envMapIntensity: 3}));
ball.position.set(0, -.8, 0);
balls.add(ball);
scene.add(balls);

function render() {
	requestAnimationFrame(render);
	controls.update();
	x += 0.001;
	for(var i = 0; i < SHAPES; i++){
		shards[i].position.set(Math.sin(x + shards[i].x) * 50 + shards[i].x, Math.cos(x + shards[i].y)* 50 + shards[i].y, Math.sin(x / 2 + shards[i].z) * 50 + shards[i].z);
		shards[i].rotation.set(x * Math.sin(shards[i].y), x * Math.cos(shards[i].z), x * Math.sin(shards[i].x));
	}
	effect.render(scene, camera);
}
render();
