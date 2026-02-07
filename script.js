const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const total = 110;

for(let i=0;i<total;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    dx:(Math.random()-0.5)*0.7,
    dy:(Math.random()-0.5)*0.7
  });
}

function animate(){
  ctx.fillStyle="#0b0f19";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for(let i=0;i<particles.length;i++){
    let p=particles[i];

    p.x+=p.dx;
    p.y+=p.dy;

    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,2.5,0,Math.PI*2);
    ctx.fillStyle="#00eaff";
    ctx.fill();

    for(let j=i+1;j<particles.length;j++){
      let p2=particles[j];
      let dist=Math.hypot(p.x-p2.x,p.y-p2.y);

      if(dist<120){
        ctx.strokeStyle=`rgba(0,234,255,${1-dist/120})`;
        ctx.lineWidth=0.6;
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});
