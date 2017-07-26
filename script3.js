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
scene.add(camera);
	
const BOXES = 7;
	
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else{
	controls = new THREE.OrbitControls(camera, element);
	camera.position.set(0, BOXES * 2.5, 0);
}

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 50;
effect.setSize(window.innerWidth, window.innerHeight);

for(var x = 0; x < BOXES; x++)
	for(var y = 0; y < BOXES; y++)
		for(var z = 0; z < BOXES; z++){
			var a = new THREE.Mesh(
				new THREE.BoxBufferGeometry(5, 5, 5),
				new THREE.MeshStandardMaterial()
			);
			a.position.set((x - BOXES / 2) * 10 + 5, (y - BOXES / 2) * 10 + 5, (z - BOXES / 2) * 10 + 5);
			if(!(a.position.x == 0 && a.position.y == 0 && a.position.z == 0))
				scene.add(a);
		}
		
var light = new THREE.PointLight();
scene.add(light);

var x = 0;

function render() {
	requestAnimationFrame(render);
	controls.update();
	light.position.set(20 * Math.sin(x), 20 * Math.cos(x), 20 * Math.tan(x));
	x += 0.01;
	effect.render(scene, camera);
}
render();