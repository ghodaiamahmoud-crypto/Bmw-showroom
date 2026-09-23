function showDetails(element, car){

let info="";

switch(car){
case "BMW M4":
info="Engine: 3.0L Twin Turbo | 503 HP | 0-100: 3.8s";
break;

case "BMW M5":
info="4.4L V8 Twin Turbo | 617 HP | 0-100: 3.2s";
break;

case "BMW i7":
info="Electric Luxury Sedan | Range: 625 km | 536 HP";
break;

case "BMW X6":
info="Sport SUV | 335 HP | 3.0L Turbo";
break;

case "BMW Z4":
info="Roadster | 255 HP | 2.0L Turbo";
break;

case "BMW X5":
info="Luxury SUV | 375 HP | 3.0L Turbo";
break;

case "BMW i8":
info="Hybrid Supercar | 369 HP";
break;

case "BMW M8":
info="V8 Twin Turbo | 617 HP | 0-100: 3.0s";
break;
}

document.querySelectorAll(".car").forEach(carBox=>{
let d = carBox.querySelector(".details");
if(d){
d.style.display = "none";
d.innerHTML = "";
}
carBox.classList.remove("active");
});

element.classList.add("active");

let box = element.querySelector(".details");

if(box){
box.innerHTML = info;
box.style.display = "block";
}

document.getElementById("carInput").value = car;
}

window.addEventListener("load",function(){
setTimeout(function(){
document.getElementById("loader").style.opacity="0";
setTimeout(function(){
document.getElementById("loader").style.display="none";
},500);
},1200);
});