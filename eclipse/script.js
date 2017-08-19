var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
var renderer = new THREE.WebGLRenderer();
var color = new THREE.Color(0x95bcf9);
scene.background = color;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
var element = renderer.domElement;
document.body.appendChild(element);
element.style.filter = "blur(3px)";
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else{
	controls = new THREE.OrbitControls(camera, element);
	camera.position.set(0, 0, 10);
}
var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 2;
effect.setSize(window.innerWidth, window.innerHeight);

var loader = new THREE.TextureLoader().load("sun.png");
var sprite = new THREE.Sprite(new THREE.SpriteMaterial({
	map: loader,
	color: 0xffffff
}));
sprite.scale.set(20, 20, 20);
scene.add(sprite);
sprite.position.set(0, 0, -25);

var loader2 = new THREE.TextureLoader().load("ringy.png");
var ring = new THREE.Sprite(new THREE.SpriteMaterial({
	map: loader2,
	color: 0xffffff,
	opacity: 0
}));
ring.scale.set(16, 16, 16);
scene.add(ring);
ring.position.set(0, 0, -25);

var moon = new THREE.Mesh(
	new THREE.SphereBufferGeometry(5, 32, 32),
	new THREE.MeshBasicMaterial({color: color})
);
moon.rotation.set(Math.PI / 2, 0, 0);
moon.position.set(0, 0, -20);
scene.add(moon);

var x = Math.PI / 2;
function render() {
	requestAnimationFrame(render);
	moon.position.set(-(Math.abs((x + Math.PI / 2) % (Math.PI * 2) - Math.PI) - Math.PI / 2) * 8, 0, -20);
	x += 0.0005;
	color.setRGB(0x96 / 0xff * Math.abs(Math.sin(x)), 0xbc / 0xff * Math.abs(Math.sin(x)), 0xf9 / 0xff * Math.abs(Math.sin(x)));
	moon.material.color.set(color);
	ring.material.opacity = 1 - Math.abs(Math.sin(x));
	sprite.material.opacity = Math.abs(Math.sin(x));
	controls.update();
	camera.rotation.y += Math.PI;
	effect.render(scene, camera);
}
render();
