window.onload = function(){
	var camera, renderer, scene;
	
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	var element = renderer.domElement;
	document.body.appendChild(element);
	
	var cubemap = new THREE.CubeTextureLoader()
	.setCrossOrigin("")
	.load([
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/right.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/left.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/top.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/bottom.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/front.png",
		"https://raw.githubusercontent.com/jchabin/MyImageHostingMagic/master/orange/back.png"
	]);
	cubemap.format = THREE.RGBFormat;
	scene.background = cubemap;
	
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
	
	controls = new THREE.DeviceOrientationControls(camera);
	
	var effect = new THREE.StereoEffect(renderer);
	effect.eyeSeparation = 10;
	effect.setSize( window.innerWidth, window.innerHeight );
	
	var x = 0;
	function render() {
		requestAnimationFrame(render);
		controls.update();
		cube.rotation.y = x;
		x += 0.01;
		effect.render(scene, camera);
	}
	render();
}
