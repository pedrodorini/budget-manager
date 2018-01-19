let nav = document.getElementById("topNav");
let main = document.getElementById("main");
let menu = document.getElementsByClassName("menuitems");
let close = document.getElementById("closebtn");

nav.style.height = "70px";
main.style.marginTop = "70px";
for (i = 0; i < menu.length; i++){
  menu[i].style.marginTop="100px";
};

close.addEventListener("click", function(){
  var menuIcon = close.children;
  for (i = 0; i < menuIcon.length; i++){
    menuIcon[i].classList.toggle("active");
  }   
});

function navToggle() {	
	if (nav.style.height <= "275px") {
	  nav.style.height = "70px";
	  main.style.marginTop = "70px";
    let i = 0;
    for (i = 0; i < menu.length; i++){
	    menu[i].style.opacity="0.0";
	    menu[i].style.marginTop="100px";
	  }
    document.body.style.backgroundColor = "rgba(0,0,0,0.0)";
	} 
	else if (nav.style.height <= "70px") {
	  nav.style.height = "275px";
	  main.style.marginTop = "275px";
    var i = 0;
    for (i = 0; i < menu.length; i++){
	    menu[i].style.opacity="1.0";
	    menu[i].style.marginTop="0px";
	  }
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}
}
