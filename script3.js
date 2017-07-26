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

var c = new THREE.Mesh(new THREE.CylinderBufferGeometry(15, 15, 40, 6), new THREE.MeshToonMaterial({color: 0x888888}));
c.rotation.set(0, 0, -Math.PI / 2);
scene.add(c);

var x = 0;
var spikes = [];

function render() {
	requestAnimationFrame(render);
	controls.update();
c.rotation.set(x * Math.PI, 0, -Math.PI / 2);
if((x * 6) % 2 == 0){
var a = new THREE.Mesh(new THREE.BoxBufferGeometry(2, 2, 2), new THREE.MeshToonMaterial({color: 0xff0000}));
scene.add(a);
spikes.push({s: x, o: a});
}
for(var i = 0; i < spikes.length; i++){
var a = spikes[i];
a.o.position.set(0, Math.sin((x - a.s) * Math.PI), Math.cos((x - a.s) * Math.PI));
}
	x += 0.005;
effect.render(scene, camera);
}
render();