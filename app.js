const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const div = document.createElement("div");
const btn = document.createElement("button");
btn.textContent = "Game Reset";
btn.addEventListener('click', ()=> {
    //reset game
    player1.score = 0;
    player2.score = 0;
    ballReset();
    player1.x = 50;
    player1.y = canvas.height/2;
    player2.x = canvas.width - 85;
    player2.y = canvas.height/2;

});
document.body.prepend(div);
div.append(btn);
let speed = 7;
const player1 = {
    x: 50
    , y: canvas.height/2 - 50
    , speed: 5
    , width: 35
    , height: 100
    , score: 0
};
const player2 = {
    x: canvas.width - 85
    , y: canvas.height/2 - 50
    , speed: 5
    , width: 35
    , height: 100
    , score: 0
};
const ball = {
    x: canvas.width/2
    , y: canvas.height/2
    , width: 7
    , height: 7
    , xs: speed
    , ys: -speed
};
const keyz1= {ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false};
const keyz2 = {KeyA: false, KeyS: false, KeyW: false, KeyX: false};
requestAnimationFrame(draw);

document.addEventListener('keydown', KeyDown);
document.addEventListener('keyup', KeyUp);

function KeyDown(event) {
    //console.log(event);
    if (event.code in keyz1) { keyz1[event.code] = true; };
    if (event.code in keyz2) { keyz2[event.code] = true; };
}

function KeyUp(event) {
    if (event.code in keyz1) { keyz1[event.code] = false; };
    if (event.code in keyz2) { keyz2[event.code] = false; };
}

function ballReset(){
    let rx = (-1)**(Math.floor(Math.random()*10)%2);
    let ry = (-1)**(Math.floor(Math.random()*10)%2);
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.xs = rx*speed;
    ball.ys = ry*speed;
}

function move() {
    if (keyz1.ArrowRight && player1.x < canvas.width/3 - player1.width) {
        player1.x+=player1.speed;
        //player1.x = Math.min(player1.x,canvas.width-player1.width);
    } else if (keyz1.ArrowLeft && player1.x > 0) {
        player1.x-=player1.speed;
        //player1.x = Math.max(player1.x,0);
    };

    if (keyz1.ArrowUp && player1.y >= 0) {
        player1.y-=player1.speed;
       // player1.y = Math.max(player1.y,0);
    } else if (keyz1.ArrowDown && player1.y < canvas.height-player1.height) {
        player1.y+=player1.speed;
        //player1.y = Math.min(player1.y,canvas.height-player1.height);
    };


    if (keyz2.KeyS && player2.x < canvas.width-player2.width) {
        player2.x+=player2.speed;
        //player2.x = Math.min(player2.x,canvas.width-player2.width);
    } else if (keyz2.KeyA && player2.x > 2*canvas.width/3) {
        player2.x-=player2.speed;
        //player2.x = Math.max(player2.x,0);
    };
    if (keyz2.KeyW && player2.y >= 0) {
        player2.y-=player2.speed;
        //player2.y = Math.max(player2.y,0);
    } else if (keyz2.KeyX && player2.y < canvas.height-player2.height) {
        player2.y+=player2.speed;
        //player2.y = Math.min(player2.y,canvas.height-player2.height);
    };
    ball.x += ball.xs;
    ball.y += ball.ys;
    if (ball.x<0 ) {
        player2.score++;
        ballReset();
   };
   if (ball.x>canvas.width) {
        player1.score++;
        ballReset();
   };
    // if (ball.x<0  || ball.x>canvas.width) {
    //      ball.xs*=-1;
    // };
    if (ball.y<0  || ball.y>canvas.height) {
         ball.ys*=-1;
    };

    let cmyball = (ball.y + ball.height)/2;

    if(checkCollision(ball,player1)) {
        ball.xs*=-1;
        let cmyl1 =(player1.y + player1.height)/2;
        if(cmyl1 < cmyball){
            ball.ys = speed;
        } else {
            ball.ys = -speed;
        }
    }

    if(checkCollision(ball,player2)) {
        ball.xs*=-1;
        let cmyl2 =(player2.y + player2.height)/2;
        if(cmyl2 < cmyball){
            ball.ys = speed;
        } else {
            ball.ys = -speed;
        }
    }

}

function checkCollision (ob1, ob2) {
    return ob1.x < ob2.x + ob2.width && ob1.x + ob1.width > ob2.x && ob1.y < ob2.y + ob2.height && ob1.y + ob1.height > ob2.y
}


function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    move();
    checkCollision(player1, player2);
    ctx.fillStyle = 'blue';
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    //ctx.rect(player.x, player.y, 100,100);
    //ctx.fill();

    ctx.fillStyle = 'white';
    //ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.width,0,2*Math.PI);
    ctx.fill();


    //Text
    let output = `Player 1:  ${player1.score}  vs Player 2:  ${player2.score}`;
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(output,300,30);
    requestAnimationFrame(draw);

    // //Triangle
    // ctx.beginPath();
    // ctx.fillStyle = 'blue';
    // ctx.moveTo(50,200);
    // ctx.lineTo(150,250);
    // ctx.lineTo(150,150);
    // ctx.fill();


    // //circle
    // ctx.beginPath();
    // ctx.strokeStyle = 'cyan';
    // ctx.arc(150,300,50,0,2*Math.PI)
    // ctx.stroke();
    // ctx.fill();
}
