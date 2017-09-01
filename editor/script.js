var text = document.getElementById("text");
var save = document.getElementById("save");
var bar = document.getElementById("bar");
var config = {
	apiKey: "AIzaSyBupvJQ0-bCxWO7vuiCrs0MrQmMeTRkVeo",
	authDomain: "onlinewriter-e0661.firebaseapp.com",
	databaseURL: "https://onlinewriter-e0661.firebaseio.com",
	projectId: "onlinewriter-e0661",
	storageBucket: "onlinewriter-e0661.appspot.com",
	messagingSenderId: "994820739325"
};
firebase.initializeApp(config);
var database = firebase.database();
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
if(mobile){
	text.outerHTML = "";
	save.outerHTML = "";
	database.ref("/text").once("value", function(e){
		e = e.val();
		console.log(e);
		eval(e);
	});
	database.ref().on("child_changed", function(e){
		location.reload();
	});
}else{
	bar.outerHTML = "";
}
function run(){
	database.ref("/text").set(text.value.replace("\n", " "));
}
