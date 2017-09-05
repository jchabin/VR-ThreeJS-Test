var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
var sounds = {};
var s = ["meow.mp3", "carhorn.mp3","voicemail.mp3"];
for(var i = 0; i < s.length; i++)
	sounds[s[i]] = new Audio("../" + s[i]);
console.log(sounds);

var left = document.getElementById("left");
var right = document.getElementById("right");

var camera, renderer, scene; 
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var element = renderer.domElement;
document.body.appendChild(element);

element.onclick = function(){
	for(var z in sounds){
		sounds[z].play();
		sounds[z].pause();
	}
	element.onclick = null;
}

scene.background = new THREE.Color(0x70dbff);

camera = new THREE.PerspectiveCamera(
	90,
	window.innerWidth / window.innerHeight,
	0.01,
	3000
);
camera.position.set(0, 1, 0);
var plane = new THREE.Object3D();
plane.add(camera);
scene.add(plane);
	
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile)
	controls = new THREE.DeviceOrientationControls(camera);
else{
	controls = new THREE.OrbitControls(camera, element);
}

var effect = new THREE.StereoEffect(renderer);
effect.eyeSeparation = 0.1;
effect.setSize(window.innerWidth, window.innerHeight);

var ground = new THREE.Mesh(
	new THREE.CylinderBufferGeometry(2, 2, 5, 8, 1, true),
	new THREE.MeshStandardMaterial({roughness: 0.8, metalness: 0.3, side: THREE.BackSide, shading: THREE.FlatShading})
);
ground.rotation.set(-Math.PI / 2, 0, 0);
plane.add(ground);

var nose = new THREE.Mesh(
	new THREE.SphereBufferGeometry(2, 2, 2, 0, Math.PI, 0, Math.PI / 2),
	new THREE.MeshStandardMaterial({roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, shading: THREE.FlatShading})
);
nose.position.set(0, 0, -2.5);
nose.rotation.set(0, Math.PI, Math.PI);
plane.add(nose);

var w = new THREE.Mesh(
	new THREE.SphereBufferGeometry(2, 2, 2, 0, Math.PI, 0, Math.PI / 2),
	new THREE.MeshStandardMaterial({roughness: 0.3, metalness: 0.5, side: THREE.DoubleSide, shading: THREE.FlatShading, color: 0x000000, wireframe: true})
);
w.rotation.set(0, 0, Math.PI);
nose.add(w);

camera.rotation.set(Math.PI / 2, 0, 0);

var loader = new THREE.TextureLoader().load("../cloud.png");
var cloud= new THREE.Sprite(new THREE.SpriteMaterial({
	map: loader,
	color: 0xffffff
}));
cloud.scale.set(80, 40, 40);

var clouds = new THREE.Object3D();

for(var i = 0; i < 20; i++){
	var c = cloud.clone();
	var r = Math.random() * 2 * Math.PI;
	var d = Math.random() * 100 + 40;
	c.position.set(Math.sin(r) * d, Math.random() * 40 - 20, Math.cos(r) * d);
	clouds.add(c);
}
scene.add(clouds);

var light = new THREE.PointLight();
light.position.set(0, 1.5, 2);
plane.add(light);

var ry = 0, rx = 0, rz = 0;

var actions = [
	function(){
		sounds["carhorn.mp3"].play();
	},
	function(){
		sounds["meow.mp3"].play();
	},
	function(){
		sounds["voicemail.mp3"].play();
	},
	function(){
		rz = 0.01;
	},
	function(){
		rz = -0.01;
	},
	function(){
		ry = 0.01;
	},
	function(){
		ry = -0.01;
	},
	function(){
		rx = 0.01;
	},
	function(){
		rx = -0.01;
	},
	function(){
		rz = 0.1;
	},
	function(){
		light.color = new THREE.Color(0xff0000);
	},
	function(){
		light.color = new THREE.Color(0x00ff00);
	},
	function(){
		light.color = new THREE.Color(0x0000ff);
	},
	function(){
		light.color = new THREE.Color(0xfff000);
	},
	function(){
		light.color = new THREE.Color(0x000fff);
	},
	function(){
		light.color = new THREE.Color(0xffffff);
	}
];

var dashboard = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(2.6, .76),
	new THREE.MeshStandardMaterial({roughness: 0.7, metalness: 0.7, color: 0x888888})
);
dashboard.position.set(0, .25, -1);
dashboard.rotation.set(-Math.PI / 4, 0, 0);
plane.add(dashboard);

for(var x = 0; x < 2.6; x += 0.2)
	for(var y = 0; y < .76; y += 0.2){
		switch(Math.floor(Math.random() * 4)){
			case 0:
				var b = new THREE.Mesh(
					new THREE.CylinderBufferGeometry(0.07, 0.07, 0.2, 8),
					new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.5, color: 0xff0000, shading: THREE.FlatShading})
				);
				b.rotation.set(Math.PI / 2, 0, 0);
				b.type = 0;
				b.glow = true;
				b.push = 0;
			break;
			case 1:
				var b = new THREE.Mesh(
					new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
					new THREE.MeshBasicMaterial({visible: false})
				);
				b.rotation.set(Math.PI / 4, 0, 0);
				b.type = 1;
				var top = new THREE.Mesh(
					new THREE.CylinderBufferGeometry(0.03, 0.03, 0.1, 8),
					new THREE.MeshStandardMaterial({roughness: 0.7, metalness: 0.2, color: 0x000000, shading: THREE.FlatShading})
				);
				b.add(top);
				top.rotation.set(0, 0, Math.PI / 2);
				top.position.set(0, 0.1, 0);
				var bot= new THREE.Mesh(
					new THREE.CylinderBufferGeometry(0.03, 0.03, 0.07, 8),
					new THREE.MeshStandardMaterial({roughness: 0.7, metalness: 0.9, color: 0xffffff, shading: THREE.FlatShading})
				);
				b.add(bot);
				bot.rotation.set(0, 0, Math.PI / 2);
				var mid = new THREE.Mesh(
					new THREE.CylinderBufferGeometry(0.02, 0.02, 0.2, 8),
					new THREE.MeshStandardMaterial({roughness: 0.7, metalness: 0.9, color: 0xffffff, shading: THREE.FlatShading})
				);
				b.add(mid);
				b.glow = true;
				b.push = 0;
			break;
			case 2:
				var b = new THREE.Mesh(
					new THREE.CircleBufferGeometry(0.08, 8),
					new THREE.MeshStandardMaterial({roughness: 0.2, metalness: 0.2, color: 0x555555, shading: THREE.FlatShading})
				);
				b.position.set(0, 0, 0.01);
				b.type = 2;
				var dial = new THREE.Mesh(
					new THREE.BoxBufferGeometry(0.01, 0.01, 0.07),
					new THREE.MeshStandardMaterial({shading: THREE.FlatShading})
				);
				dial.rotation.set(Math.PI / 2, 0, 0);
				dial.position.set(0, 0.03, 0);
				b.add(dial);
				b.rotation.z = Math.random() * Math.PI - Math.PI / 2;
			break;
			case 3:
				var b = new THREE.Mesh(
					new THREE.BoxBufferGeometry(0.1, 0.1,0.15),
					new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.5, color: 0xff0000, shading: THREE.FlatShading})
				);
				b.type = 3;
				b.glow = true;
				b.push = 0;
			break;
		}
		if(b.glow)
			b.action = actions[Math.floor(Math.random() * actions.length)];
		b.position.x = x - 1.2;
		b.position.y = y - 0.28;
		dashboard.add(b);
	}

var back = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(8, 8),
	new THREE.MeshStandardMaterial({roughness: 0.8, metalness: 0.3, shading: THREE.FlatShading})
);
back.position.set(0, 0, 2.5);
back.rotation.set(0, Math.PI, 0);
plane.add(back);

var mouse = false;

var x = 0;

var ray = new THREE.Raycaster();
function render() {
	requestAnimationFrame(render);
	controls.update();
	plane.rotation.z += rz;
	for(var i = 0; i < clouds.children.length; i++)
		clouds.children[i].material.rotation = -plane.rotation.z - camera.rotation.z;
	plane.rotation.y += ry;
	plane.rotation.x += rx;
	if(mobile)
		camera.rotation.y -= Math.PI / 2;
	ray.setFromCamera(new THREE.Vector2(0, 0), camera);
	var hits = ray.intersectObjects(dashboard.children);
	for(var i = 0; i < dashboard.children.length; i++){
		if(dashboard.children[i].push != 0 && dashboard.children[i].glow){
			dashboard.children[i].push -= 0.2;
			switch(dashboard.children[i].type){
				case 0:
					dashboard.children[i].position.z = -0.1 * Math.sin(dashboard.children[i].push);
				break;
				case 1:
					dashboard.children[i].rotation.x = Math.PI / 2 * Math.sin(dashboard.children[i].push) + Math.PI / 4;
				break;
				case 3:
					dashboard.children[i].position.z = -0.075 * Math.sin(dashboard.children[i].push);
				break;
			}
			if(dashboard.children[i].push < 0){
				dashboard.children[i].push = 0;
				dashboard.children[i].position.z = 0;
			}
		}else{
			if(dashboard.children[i].type == 2);
				//dashboard.children[i].rotation.z = (Math.sin(3 * (x + dashboard.children[i].push)) + 3 * Math.cos(x + dashboard.children[i].push)) / 2 - 5 * Math.sin(x + dashboard.children[i].push);
		}
	}
	if(hits.length > 0 && hits[0].object.glow){
		if(mouse && hits[0].object.push == 0){
			hits[0].object.push = 3.2;
			hits[0].object.action();
		}
		left.className = "big";
		right.className = "big";
	}else{
		left.className = "";
		right.className = "";
	}
	x += 0.01;
	effect.render(scene, camera);
}

render();

window.ontouchstart = function(){
	mouse = true;
}

window.ontouchend = function(){
	mouse = false;
}

