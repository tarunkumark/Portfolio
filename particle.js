const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// create a randomised particle 
class Particle{
    constructor(x,y,directionX,directionY,size,color){
        this.x=x;
        this.y=y;
        this.directionX=directionX;
        this.directionY=directionY;
        this.size=size;
        this.color=color;
    }
    //method to draw individual particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2, false);
        ctx.fillStyle = "#73b5f5";
        ctx.fill();
    }
    //check particle pos
    update(){
        if(this.x>canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y<0){
            this.directionY = -this.directionY;
        }

        //move particle
        this.x+=this.directionX/2;
        this.y+=this.directionY/2;
        //draw particle
        this.draw();
    
    }
}

function init(){
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 18000;
    for(let i=0;i< numberOfParticles; i++){
        let size = (Math.random()*5)+1;
        let x = (Math.random() * ((innerWidth - size * 2)-(size*2))+size*2);
        let y = (Math.random() * ((innerHeight - size * 2)-(size*2))+size*2);
        let directionX = (Math.random()*5)-2.5;
        let directionY = (Math.random()*5)-2.5;
        let color = '#8c5523';
        particlesArray.push(new Particle(x,y,directionX,directionY,size,color));

    }
}
function connect(){
    for(let a=0;a<particlesArray.length;a++){
        for(let b=a; b<particlesArray.length;b++){
            let distance = (( particlesArray[a].x - particlesArray[b].x ) *( particlesArray[a].x - particlesArray[b].x ) + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if(distance < (canvas.width/7) * (canvas.height/7)){
                ctx.strokeStyle='#304961';
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x,particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x,particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);
    for(let i=0; i<particlesArray.length;i++){
        particlesArray[i].update();
    }
    connect();
}
function assignToDiv(){
    dataUrl=canvas.toDataURL();
    document.getElementById("div1").style.background='url("+dataUrl")';
}

init();
animate();
assignToDiv();