var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
var renderer = new THREE.WebGLRenderer();
var color = new THREE.Color(0x9ed3ff);
scene.background = color;
scene.fog = new THREE.Fog(0x9ed3ff, 0, 100);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
var element = renderer.domElement;
document.body.appendChild(element);
element.style.filter = "blur(1px)";
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else{
	controls = new THREE.OrbitControls(camera, element);
	camera.position.set(0, 0, -10);
}
var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = .5;
effect.setSize(window.innerWidth, window.innerHeight);

const WAVE = 301;
var plane = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(200, 200, WAVE - 1, WAVE - 1),
	new THREE.MeshPhongMaterial({shading: THREE.FlatShading, color: 0x289dff})
);
plane.position.set(0, -5, 0);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane);
var light = new THREE.DirectionalLight();
light.position.set(-25, 25, 25);
scene.add(light);

var waves = [];
for(var i = 0; i < WAVE; i++){
	waves.push([]);
	for(var n = 0; n < WAVE; n++)
		waves[i].push(Math.random() * Math.PI * 2);
}

const SMOOTH = 10;
for(var c = 0; c < SMOOTH; c++){
var wa = [];
	for(var i = 1; i < WAVE - 1; i++){
wa.push([]);
		for(var n = 1; n < WAVE - 1; n++){
wa[i - 1].push((waves[i][n] + waves[i + 1][n + 1] + waves[i + 1][n - 1] + waves[i - 1][n - 1] + waves[i - 1][n + 1]) / 5);
		}
}
for(var i = 1; i < WAVE - 1; i++)
for(var n = 1; n < WAVE - 1; n++)
waves[i][n] = wa[i - 1][n - 1];
}

var x = 0;
function render() {
	requestAnimationFrame(render);
	controls.update();
	var arr = plane.geometry.attributes.position;
	for(var i = 2; i < arr.count * 3; i += 3)
		arr.array[i] = 2 * Math.sin(waves[Math.floor((i - 2) / 3 / 301)][(i - 2) / 3 % 301] + x);
	arr.needsUpdate = true;
	x += 0.01;
	if(mobile)
		camera.rotation.y -= Math.PI / 2;
//plane.material.color = new THREE.Color(0xff0000 * (0.5 + Math.sin(x) / 2) + 0x00ff00 * (0.5 + Math.sin(x * Math.PI / 2) / 2));
	effect.render(scene, camera);
}

render();
