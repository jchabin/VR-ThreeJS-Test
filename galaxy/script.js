var mobile =
	navigator.userAgent.match("Mobile") != null ||
	navigator.userAgent.match("Linux;") != null;

var camera, renderer, scene;
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

scene.background = new THREE.Color(0x000000);
//scene.fog = new THREE.Fog(0x000000, 0, 50);

camera = new THREE.PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.01,
	1000
);
// camera = new THREE.OrthographicCamera(-10, 10, -10, 10, 1, 1000);
camera.position.set(0, 0, 0);
var player = new THREE.Object3D();
player.add(camera);
//player.add(new THREE.PointLight(0xffffff, 1, 50, 2));
scene.add(player);
player.position.set(0, 20, -100);

var options = {
	position: new THREE.Vector3(),
	color: 0xffffff
};

// galaxy = loader.load("https://jchabin.github.io/VR-ThreeJS-Test/milky.png");
// var p = new THREE.Mesh(
// 	new THREE.PlaneBufferGeometry(200, 200),
// 	new THREE.MeshBasicMaterial({
// 		transparent: true,
// 		blending: THREE.AdditiveBlending,
// 		color: 0xffffff,
// 		map: galaxy
// 	})
// );
// p.rotation.set(-Math.PI / 2, 0, 0);
// scene.add(p);

var mobile =
	navigator.userAgent.match("Mobile") != null ||
	navigator.userAgent.match("Linux;") != null;
if (mobile) controls = new THREE.DeviceOrientationControls(camera);
else {
	controls = new THREE.OrbitControls(camera, element);
	camera.position.set(0, 0, -2);
}

var effect = new THREE.StereoEffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
effect.setEyeSeparation(0.005);
camera.rotation.set(Math.PI / 2, 0, 0);

var stars, gstars, glow;

function milkyWay() {
	var sgeometry = new THREE.Geometry();

	var bgeometry = new THREE.Geometry();

	var ggeometry = new THREE.Geometry();

	var loader = new THREE.TextureLoader();
	loader.setCrossOrigin("");
	map = loader.load("https://jchabin.github.io/VR-ThreeJS-Test/milky.png");

	var colors = [0xffffff, 0x498eff, 0x2c7af9, 0x4183f4, 0xffffff, 0xf44b42];

	for (var i = 0; i < 50000; i++) {
		var d = Math.random() * 12 + i / 800;
		var r = i / 7000 * Math.PI + Math.random() * 2;
		vertex = new THREE.Vector3();
		vertex.x = Math.sin(r) * d;
		vertex.z = Math.cos(r) * d;
		vertex.y = Math.random() * 1 - 2;
		sgeometry.vertices.push(vertex);
		sgeometry.colors.push(
			new THREE.Color(
				colors[Math.floor(Math.random() * colors.length)]
			).multiplyScalar(Math.random())
		);
	}

	for (var i = 0; i < 60; i++) {
		var d = i / 2;
		var r = i / 7 * Math.PI;
		vertex = new THREE.Vector3();
		vertex.x = Math.sin(r) * d;
		vertex.z = Math.cos(r) * d;
		ggeometry.vertices.push(vertex);
		// ggeometry.colors.push(new THREE.Color(colors[Math.floor(Math.random() * colors.length)]));
	}

	bluemap = loader.load(
		"https://jchabin.github.io/VR-ThreeJS-Test/bluestar.png"
	);

	stars = new THREE.Points(
		sgeometry,
		new THREE.PointsMaterial({
			map: map,
			size: 0.5,
			depthTest: false,
			transparent: true,
			blending: THREE.AdditiveBlending,
			opacity: 2,
			vertexColors: THREE.VertexColors
		})
	);

	stars.rotation.set(0, 0, 0);
	scene.add(stars);

	//scene.add(bstars);

	gstars = new THREE.Points(
		ggeometry,
		new THREE.PointsMaterial({
			map: bluemap,
			size: 30,
			depthTest: false,
			transparent: true,
			blending: THREE.AdditiveBlending,
			opacity: 0.2,
			color: 0xffffff
		})
	);

	gstars.rotation.set(0, 0, 0);
	scene.add(gstars);

	glowmap = loader.load("https://jchabin.github.io/VR-ThreeJS-Test/glow.png");
	var glow1 = new THREE.Sprite(
		new THREE.SpriteMaterial({
			color: 0xffffff,
			map: glowmap,
			transparent: true,
			blending: THREE.AdditiveBlending,
			opacity: 1
		})
	);
	glow1.scale.set(100, 100, 100);
	scene.add(glow1);
	glow = new THREE.Sprite(
		new THREE.SpriteMaterial({
			color: 0xffffff,
			map: glowmap,
			transparent: true,
			blending: THREE.AdditiveBlending
		})
	);
	glow.scale.set(200, 50, 100);
	glow.position.set(0, 0, 0.1);
	scene.add(glow);

	var font = new THREE.FontLoader();
	font.load(
		"https://jchabin.github.io/VR-ThreeJS-Test/ThreeJS/font.typeface.json",
		function(f) {
			var text = new THREE.Object3D();
			var title = new THREE.Mesh(
				new THREE.TextBufferGeometry("The Milky Way", {
					font: f,
					size: 10,
					height: 0.4,
					curveSegments: 1,
					bevelEnabled: false
				}),
				new THREE.MeshBasicMaterial({ color: 0xffffff })
			);
			title.position.set(-50, 50, 5);
			text.add(title);

			var sub1 = new THREE.Mesh(
				new THREE.TextBufferGeometry("100,000 Light Years in Diameter", {
					font: f,
					size: 5,
					height: 0.4,
					curveSegments: 1,
					bevelEnabled: false
				}),
				new THREE.MeshBasicMaterial({ color: 0xffffff })
			);
			sub1.position.set(-50, 40, 0);
			text.add(sub1);

			var sub2 = new THREE.Mesh(
				new THREE.TextBufferGeometry("25,000 Light Years to the center", {
					font: f,
					size: 5,
					height: 0.4,
					curveSegments: 1,
					bevelEnabled: false
				}),
				new THREE.MeshBasicMaterial({ color: 0xffffff })
			);
			sub2.position.set(-50, 30, 0);
			text.add(sub2);

			text.rotation.set(0, Math.PI, 0);
			scene.add(text);
		}
	);
}

function sombrero() {
	var sgeometry = new THREE.Geometry();

	var bgeometry = new THREE.Geometry();

	var ggeometry = new THREE.Geometry();

	var loader = new THREE.TextureLoader();
	loader.setCrossOrigin("");
	map = loader.load("https://jchabin.github.io/VR-ThreeJS-Test/eclipse/ringy.png");

	var color = 0x99572f;

	for (var i = 0; i < 50000; i++) {
		var d = i / 1000 + 30 + Math.random() * 2;
		var r = i / 700 * Math.PI;
		vertex = new THREE.Vector3();
		vertex.x = Math.sin(r) * d;
		vertex.z = Math.cos(r) * d;
		vertex.y = Math.random() * 1 - 2;
		sgeometry.vertices.push(vertex);
		sgeometry.colors.push(
			new THREE.Color(color).multiplyScalar(4 - i / 10000)
		);
	}

	// for (var i = 0; i < 60; i++) {
	// 	var d = i / 2;
	// 	var r = i / 7 * Math.PI;
	// 	vertex = new THREE.Vector3();
	// 	vertex.x = Math.sin(r) * d;
	// 	vertex.z = Math.cos(r) * d;
	// 	ggeometry.vertices.push(vertex);
	// 	// ggeometry.colors.push(new THREE.Color(colors[Math.floor(Math.random() * colors.length)]));
	// }

	bluemap = loader.load(
		"https://jchabin.github.io/VR-ThreeJS-Test/bluestar.png"
	);

	stars = new THREE.Points(
		sgeometry,
		new THREE.PointsMaterial({
			map: map,
			size: 2,
			transparent: true,
			depthTest: false,
			blending: THREE.NormalBlending,
			opacity: 0.5,
			vertexColors: THREE.VertexColors,
			renderOrder: 3
		})
	);

	stars.rotation.set(0, 0, 0);

	//scene.add(bstars);

	gstars = new THREE.Points(
		ggeometry,
		new THREE.PointsMaterial({
			map: bluemap,
			size: 30,
			depthTest: false,
			transparent: true,
			blending: THREE.AdditiveBlending,
			opacity: 0.2,
			depthWrite: false,
			color: 0xffffff
		})
	);

	gstars.rotation.set(0, 0, 0);
	scene.add(gstars);

	glowmap = loader.load("https://jchabin.github.io/VR-ThreeJS-Test/eclipse/bigglow.png");
	glow = new THREE.Sprite(
		new THREE.SpriteMaterial({
			color: 0xffffff,
			map: glowmap,
			transparent: true,
			blending: THREE.NormalBlending,
			opacity: 2,
			renderOrder: 1
		})
	);
	glow.scale.set(100, 100, 100);
	scene.add(glow);
	scene.add(stars);

	var font = new THREE.FontLoader();
	font.load(
		"https://jchabin.github.io/VR-ThreeJS-Test/ThreeJS/font.typeface.json",
		function(f) {
			var text = new THREE.Object3D();
			var title = new THREE.Mesh(
				new THREE.TextBufferGeometry("Sombrero Galaxy", {
					font: f,
					size: 10,
					height: 0.4,
					curveSegments: 1,
					bevelEnabled: false
				}),
				new THREE.MeshBasicMaterial({ color: 0xffffff })
			);
			title.position.set(-50, 50, 5);
			text.add(title);

			var sub1 = new THREE.Mesh(
				new THREE.TextBufferGeometry("50,000 Light Years in Diameter", {
					font: f,
					size: 5,
					height: 0.4,
					curveSegments: 1,
					bevelEnabled: false
				}),
				new THREE.MeshBasicMaterial({ color: 0xffffff })
			);
			sub1.position.set(-50, 40, 0);
			text.add(sub1);

			var sub2 = new THREE.Mesh(
				new THREE.TextBufferGeometry("29.35 Million Light Years to the center", {
					font: f,
					size: 5,
					height: 0.4,
					curveSegments: 1,
					bevelEnabled: false
				}),
				new THREE.MeshBasicMaterial({ color: 0xffffff })
			);
			sub2.position.set(-50, 30, 0);
			text.add(sub2);

			text.rotation.set(0, Math.PI, 0);
			scene.add(text);
		}
	);
}

milkyWay();

var mouse = false;

var speed = 0.2;
var acc = 0;
var x = 0;

function render() {
	requestAnimationFrame(render);
	controls.update();

	if (mobile) camera.rotation.y += Math.PI / 2;

	stars.rotation.y = x;
	gstars.rotation.y = x;
	x -= 0.001;

	glow.material.rotation = -camera.rotation.z;

	if (mouse) {
		if (acc < speed) acc += speed / 20;
	} else if (acc > 0) acc -= speed / 20;
	player.position.x +=
		-Math.sin(camera.rotation.y) * Math.cos(camera.rotation.x) * acc;
	player.position.z +=
		-Math.cos(camera.rotation.y) * Math.cos(camera.rotation.x) * acc;
	player.position.y += Math.sin(camera.rotation.x) * acc;
	effect.render(scene, camera);
}

render();

window.ontouchstart = function() {
	mouse = true;
};

window.ontouchend = function() {
	mouse = false;
};
