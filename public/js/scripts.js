let nav = document.getElementById("topNav");
let main = document.getElementById("main");
let menu = document.getElementsByClassName("menuitems");
let close = document.getElementById("closebtn");
let balance = document.getElementById("balance");

if (document.getElementById("type") !== null) {
	let type = document.getElementById("type").textContent
	if (type === 'income') {
		document.getElementById('income').setAttribute('selected', 'selected')
	} else {
		document.getElementById('expense').setAttribute('selected', 'selected')
	}
}

if (balance) {
	if (parseFloat(balance.textContent) < 0) {
		document.getElementById('balanceDiv').classList.toggle('red');
	} else {
		document.getElementById('balanceDiv').classList.toggle('green');
	}
}

if (document.getElementById('month')) {
	document.getElementById(document.getElementById('month').textContent).setAttribute('selected', 'selected')
	let month = document.getElementById('month')
	month.textContent = month.textContent.charAt(0).toUpperCase() + month.textContent.slice(1)
}

nav.style.height = "70px";
main.style.marginTop = "70px";
for (i = 0; i < menu.length; i++){
	menu[i].style.marginTop="100px";
	menu[i].style.display="none";
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
			menu[i].style.display="inline-block";
	  }
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}

}
