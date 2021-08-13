
// To add IntelliSense in VS Code for recognizing the "canvas" type, we need to add a type hint like
/**@type {HTMLCanvasElement} */

var cvs = document.getElementById('canvas');
var ctx = cvs.getContext("2d");
// var apple =document.getElementById("apple");
var showscore=document.querySelector(".heading");
// apple.width=10;
// apple.height="10";

var snakeW = 10;
var snakeH = 10;

// ctx.clearRect(0,0,cvs.width,cvs.height);

//create Food

function drawSnake(x, y) {
    ctx.fillStyle = "white";
    // ctx.fillRect(x,y,w,h);

    // ctx.fillRect(x, y, snakeW, snakeH);//we are not using these as will not be in block) 
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);//here the pos of snake is in block  like it will move in multiple of snake Width and snake height

    //10%width of total width
    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH)
}

//food
var food={
    x:Math.floor(Math.random() * (cvs.width/snakeW-1)+1),    
    y:Math.floor(Math.random() * (cvs.height/snakeH-1)+1),    
}

function drawfood(x,y){
    ctx.fillStyle = "Red";
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);
    // ctx.drawImage(apple, 30, 30);

     ctx.fillStyle = "black";
     ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH)
    
}

//create snake
var len = 4;
snake = [];
var dir="right";
for (var i = len - 1; i >= 0; i--) {
    snake.push(
        {
            x: i,
            y: 0,
        }
    )
}
var score=0;
var myVar=setInterval(draw,40);
function draw() {
        //it clears all the fill like snake block but not bg black bcuz its given css 
    ctx.clearRect(0,0,cvs.width,cvs.height);

    for (var i = 0; i < snake.length; i++) {
        var X = snake[i].x;
        var Y = snake[i].y;
        drawSnake(X, Y);
    }
    
    drawfood(food.x,food.y);
    

    //snake head
    var snakeHeadX=snake[0].x;
    var snakeHeadY=snake[0].y;
    
     //when it touches it body
     snake.forEach((element,index) => {
        if(index!=0&&element.x==snakeHeadX&&element.y==snakeHeadY){
            

            clearInterval(myVar);
            showscore.innerHTML=`Your Score is: ${score}`;
           
        }
    });
    if(dir=="right")snakeHeadX++;
    else if(dir=="left")snakeHeadX--;
    else if(dir=="up")snakeHeadY--;
    else if(dir=="down")snakeHeadY++;
    //boarder touch
    if(snakeHeadX<0||snakeHeadY<0||snakeHeadX*snakeW>=cvs.width||snakeHeadY*snakeH>=cvs.height){
        
       
        clearInterval(myVar);
        showscore.innerHTML=`Your Score is: ${score}`;


    }

   

    if(snakeHeadX==food.x&&snakeHeadY==food.y){
        food={
            x:Math.floor(Math.random() * (cvs.width/snakeW-1)+1),    
            y:Math.floor(Math.random() * (cvs.height/snakeH-1)+1),    
        }
        score++;
        
    }
    else snake.pop();

    snake.unshift({
        x:snakeHeadX,
        y:snakeHeadY,
    })
    
   

}

// if(snakeHeadX==48){
//     clearInterval(time);
// }

document.onkeydown=(e)=>{
    
    // console.log(e.keyCode)
    if(e.keyCode==37&&dir!="right"){
        //left
        dir="left"
       

    }
    else if(e.keyCode==38&&dir!="down"){
        //up
        dir="up"
    }
    else if(e.keyCode==39&&dir!="left"){
        //right
        dir="right"
    }
    else if(e.keyCode==40&&dir!="up"){
        //down
        dir="down"
    }
}


   
    
    
    // clearInterval();
    
    





