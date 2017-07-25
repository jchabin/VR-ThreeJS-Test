window.onload = function(){
	var camera, renderer, scene;
	
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	var element = renderer.domElement;
	document.body.appendChild(element);
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
	
	controls = new THREE.OrbitControls(camera, element);
	function setOrientationControls(e) {
		if (!e.alpha) {
			return;
		}
		controls = new THREE.DeviceOrientationControls(camera, true);
		controls.connect();
		controls.update();
		element.addEventListener("click", fullscreen, false);
		window.removeEventListener("deviceorientation", setOrientationControls, true);
	}
	window.addEventListener("deviceorientation", setOrientationControls, true);
	
	var effect = new THREE.StereoEffect(renderer);
	effect.eyeSeparation = 10;
	effect.setSize( window.innerWidth, window.innerHeight );
	
	var x = 0;
	function render() {
		requestAnimationFrame(render);
		cube.rotation.y = x;
		x += 0.01;
		effect.render(scene, camera);
	}
	render();
}
