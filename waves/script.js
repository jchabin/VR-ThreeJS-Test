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

var plane = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(200, 200, 300, 300),
	new THREE.MeshPhongMaterial({shading: THREE.FlatShading, color: 0x289dff})
);
plane.position.set(0, -5, 0);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane);
scene.add(new THREE.PointLight());

var x = 0;
function render() {
	requestAnimationFrame(render);
	controls.update();
	var arr = plane.geometry.attributes.position;
	for(var i = 2; i < arr.count * 3; i += 3)
		arr.array[i] = 4.5 * Math.sin(Math.cos(i) + 500 * x + 10 * i / arr.count);
	arr.needsUpdate = true;
	x += 0.01;
	if(mobile)
		camera.rotation.y -= Math.PI / 2;
	effect.render(scene, camera);
}
render();
