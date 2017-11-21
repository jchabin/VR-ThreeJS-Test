var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;

var camera, renderer, scene; 
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);
document.body.style.backgroundColor = "white";

scene.background = new THREE.Color(0x000000);
//scene.fog = new THREE.Fog(0x000000, 0, 50);

camera = new THREE.PerspectiveCamera(
	90,
	window.innerWidth / window.innerHeight,
	0.01,
	1000
);
// camera = new THREE.OrthographicCamera(-10, 10, -10, 10, 1, 1000);
camera.position.set(0, -0.1, 6.7);

var effect;
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile){
	controls = new THREE.DeviceOrientationControls(camera);
	effect = new THREE.StereoEffect(renderer);
	effect.setEyeSeparation(0.01);
	effect.setSize(window.innerWidth, window.innerHeight);
}else{
	effect = renderer;
	document.getElementById("bar").outerHTML = "";
}

var l = new THREE.DirectionalLight(0xffffff, 0.03);
l.position.set(0, 10, 0);
scene.add(l);

var cam = new THREE.CubeCamera(1, 100, 16);
scene.add(cam);
cam.position.set(0, 0, 5);
var loader = new THREE.OBJLoader();
loader.load("../chair.obj", function(chair){
	console.log(chair);
	var bumps;
	(new THREE.TextureLoader()).load("../fabric.png", function(t){
		t.minFilter = THREE.LinearFilter;
		t.magFilter = THREE.LinearFilter;
		t.format = THREE. RGBFormat;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		console.log(t);
		//chair.children[0].geometry = generateUV(new THREE.Geometry().fromBufferGeometry(chair.children[0].geometry));
		chair.children[0].material = new THREE.MeshStandardMaterial({color: 0x888888, envMap: cam.renderTarget, roughness: 0.5, metalness: 1});
		chair.children[1].geometry = generateUV(new THREE.Geometry().fromBufferGeometry(chair.children[1].geometry));
		chair.children[1].material = new THREE.MeshStandardMaterial({color: 0xffffff, envMap: cam.renderTarget, roughness: 0.5, metalness: 0.5, bumpMap: t, bumpScale: 0.001});
		chair.scale.set(0.03, 0.03, 0.03);
		chair.rotation.set(-Math.PI / 2, 0, Math.PI / 2, "YXZ");
		for(var r = 6; r <= 8; r++)
			for(var c = -2; c <= 2; c++){
				var ch = chair.clone();
				ch.position.set(c + 0.32, r / 4 - 3, r);
				scene.add(ch);
			}
	});
});

var starwars = document.createElement("DIV");
starwars.innerHTML = '<video width="100vw" style="position: absolute; top: 0; left: 0; z-index: 10;" autoplay loop onclick="this.style.zIndex = -1;"><source src="../Star%20Wars_%20The%20Last%20Jedi%20Trailer%20(Official).mp4"></video>';
//starwars.innerHTML = '<video width="100vw" style="position: absolute; top: 0; left: 0; z-index: 10;" autoplay loop onclick="this.style.zIndex = -1;"><source src="../HEYYEYAAEYAAAEYAEYAA.mp4"></video>';
document.body.appendChild(starwars);
var video = starwars.children[0];
var texture = new THREE.VideoTexture(video);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
texture.format = THREE.RGBFormat;
var screen = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(20, video.clientHeight / video.clientWidth * 20),
	new THREE.MeshBasicMaterial({color: 0xffffff, map: texture})
);
screen.position.set(0, 2, 0);
scene.add(screen);

(new THREE.TextureLoader()).load("../floor.jpg", function(t){
	var floor = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(10, 20),
		new THREE.MeshStandardMaterial({color: 0xffffff, envMap: cam.renderTarget, roughness: 1, metalnessMap: t, metalness: 0.3})
	);
	floor.rotation.set(-Math.PI / 2 - 0.3, 0, 0);
	floor.position.set(0, 0, 10);
	scene.add(floor);
});

var mouse = false;

var speed = 0.5;

var x = 0;
function render() {
	requestAnimationFrame(render);
	if(mobile){
		controls.update();
		camera.rotation.y -= Math.PI / 2;
	}
	x += 0.01;
	effect.render(scene, camera);
	cam.updateCubeMap(renderer, scene);
}

render();

window.ontouchstart = function(){
	mouse = true;
}

window.ontouchend = function(){
	mouse = false;
}

function generateUV(g){
	console.log(g);
	for (i = 0; i < g.faces.length ; i++) {
		var a = g.vertices[g.faces[i].a], b = g.vertices[g.faces[i].b], c = g.vertices[g.faces[i].c];
		var dist = [
			a.distanceTo(b),
			b.distanceTo(c),
			c.distanceTo(a)
		];
		var max = dist.reduce(function(a, b){ return Math.max(a, b); });
		var min= dist.reduce(function(a, b){ return Math.min(a, b); });
		g.faceVertexUvs[0].push([
			new THREE.Vector2(0, 0),
			new THREE.Vector2(0, 1),
			new THREE.Vector2(1, 1)
		]);
	}
	return g;
}
