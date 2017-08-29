//@TODO Set up the online part of this

function start(vr){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	var renderer = new THREE.WebGLRenderer();
	var color = new THREE.Color(0x000000);
	scene.background = color;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	var element = renderer.domElement;
	document.body.appendChild(element);
	element.style.filter = "url(#bloom)";
	element.style.position = "absolute";
	element.style.top = 0;
	if(mobile)
		controls = new THREE.DeviceOrientationControls(camera);
	document.getElementById("bar").style.display = "";
	else{
		document.getElementById("bar").outerHTML = "";
		//controls = new THREE.OrbitControls(camera, element);
	}
	var effect = new THREE.StereoEffect(renderer);
	effect.eyeSeparation = .5;
	effect.setSize(window.innerWidth, window.innerHeight);
	
	var p = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(10, 20, 10, 20),
		new THREE.MeshBasicMaterial({wireframe: true, color: 0x75ceff})
	);
	p.position.set(0, -5, 0);
	p.rotation.set(Math.PI / 2, 0, 0);
	scene.add(p);
	var p1 = p.clone();
	p1.position.set(-5, 0, 0);
	p1.rotation.set(0, Math.PI / 2, Math.PI / 2);
	scene.add(p1);
	var p2 = p.clone();
	p2.position.set(5, 0, 0);
	p2.rotation.set(0, Math.PI / 2, Math.PI / 2);
	scene.add(p2);
	var p3 = p.clone();
	p3.position.set(0, 5, 0);
	p3.rotation.set(Math.PI / 2, 0, 0);
	scene.add(p3);
	
	scene.add(new THREE.PointLight());
	
	var b = new THREE.Mesh(
		new THREE.SphereBufferGeometry(0.25, 32, 32),
		new THREE.MeshBasicMaterial({color: 0xffffff})
	);
	for(var i = -2; i < 3; i++){
		var b2 = b.clone();
		b2.position.set(i, -6, 11);
		scene.add(b2);
	}
	
	camera.rotation.set(0, 0, 0);
	camera.position.set(0, 0, 20);
	function render() {
		requestAnimationFrame(render);
		if(mobile){
			controls.update();
			camera.rotation.y += Math.PI / 2;
			if(vr)
				effect.render(scene, camera);
			else
				renderer.render(scene, camera);
		}else{
			renderer.render(scene, camera);
		}
	}
	
	render();
}
