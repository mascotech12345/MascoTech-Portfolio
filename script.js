AOS.init();

var typed = new Typed("#typing", {
strings:[
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Web Designer",
    "Freelancer",
    "Building modern web experiences"
],
typeSpeed:60,
backSpeed:40,
loop:true
});

function downloadCV(){
    alert("Am sorry. My CV is not avalaible for download at the moment.")
}

window.onload=function(){
document.getElementById("loader").style.display="none";
}

document.getElementById("menuBtn").onclick=function(){
document.getElementById("sidebar").classList.toggle("active");
}

/* PARTICLE GALAXY WITH MOUSE INTERACTION */

const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

const hero = document.querySelector(".hero");

function resizeCanvas(){
canvas.width = hero.offsetWidth;
canvas.height = hero.offsetHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let mouse = {
x: null,
y: null,
radius: 120
};

window.addEventListener("mousemove", function(event){
mouse.x = event.x;
mouse.y = event.y;
});

class Particle{
constructor(){
this.x = Math.random()*canvas.width;
this.y = Math.random()*canvas.height;
this.size = 2;
this.speedX = Math.random()*1 - 0.5;
this.speedY = Math.random()*1 - 0.5;
}

update(){

this.x += this.speedX;
this.y += this.speedY;

let dx = mouse.x - this.x;
let dy = mouse.y - this.y;
let distance = Math.sqrt(dx*dx + dy*dy);

if(distance < mouse.radius){
this.x -= dx/20;
this.y -= dy/20;
}

if(this.x > canvas.width) this.x = 0;
if(this.x < 0) this.x = canvas.width;

if(this.y > canvas.height) this.y = 0;
if(this.y < 0) this.y = canvas.height;

}

draw(){
ctx.fillStyle = "#2ea043";
ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fill();
}

}

function initParticles(){
particles = [];
for(let i=0;i<120;i++){
particles.push(new Particle());
}
}

function connectParticles(){

for(let a=0;a<particles.length;a++){
for(let b=a;b<particles.length;b++){

let dx = particles[a].x - particles[b].x;
let dy = particles[a].y - particles[b].y;

let distance = dx*dx + dy*dy;

if(distance < 12000){

ctx.strokeStyle = "rgba(46,160,67,0.2)";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();

}

}
}

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<particles.length;i++){
particles[i].update();
particles[i].draw();
}

connectParticles();

requestAnimationFrame(animateParticles);

}

initParticles();
animateParticles();

/* CURSOR GLOW TRAIL */

const cursor = document.getElementById("cursor-trail");

document.addEventListener("mousemove", function(e){
cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";
});

const heroSection = document.querySelector(".hero");


/* SKILLS ANIMATION */

const skillBars = document.querySelectorAll(".skill-progress");

function animateSkills(){

skillBars.forEach(bar=>{
bar.style.width = bar.dataset.width;
});

}

const skillSection = document.getElementById("skills");

window.addEventListener("scroll", function(){

const sectionTop = skillSection.offsetTop - 400;

if(window.scrollY > sectionTop){

animateSkills();

}

});

document.querySelectorAll(".sidebar a").forEach(link=>{
link.addEventListener("click",function(e){
e.preventDefault();
document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior:"smooth"
});
});
});