let speed = 5;
let inputDir = {x: 0, y: 0}; 
let lastPaintTime = 0;
let snakeArr = [ {x: 13, y: 15} ];
let food = {x: 6, y: 7};
let board = document.getElementById("board");

//    --------------  Game Logic  -------------------
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
window.requestAnimationFrame(main);

function gameEngine(){
    if(snakeCollide()){
        gameReset();
    }
    updateGame();
    drawGame();
}

function gameReset(){
    alert("game over");
    inputDir = {x: 0, y: 0};
    snakeArr = [ {x: 13, y: 15} ];
    food = {x: 6, y: 7};
}

function updateGame(){
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){      // snake eat the food
        updateFood();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});  // add extra snake body at start
    }
    updateSnake();   //  make snake move
}

function drawGame(){
    board.innerHTML = "";

    drawSnake();
    drawFood();
}

window.addEventListener("keydown", e =>{
    switch (e.key) {
        case "ArrowUp":
            if(inputDir.y == 1) break;
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            if(inputDir.y == -1) break;
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            if(inputDir.x == 1) break;
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            if(inputDir.x == -1) break;
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

// ---------------  change Speed ----------------------------
speedBox = document.getElementById("speed");
speedBox.innerHTML = "Speed: " + speed;
document.getElementById("speed").addEventListener("click", ()=>{
    let b=prompt("enter speed (3 for easy, 5 for medium, 10 for hard or any custome speed",5);
    let s=parseInt(b);
    if( s>=0 ){
        speed=s;
    }
    else{
        speed=5;
    }
    speedBox.innerHTML = "Speed: " + speed;
})

//  --------------   Snake logics   ------------------------------
function updateSnake(){
    for(var i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
}

function snakeCollide(){
    if(snakeArr[0].x <= 0 || snakeArr[0].x >= 22 || snakeArr[0].y <= 0 || snakeArr[0].y >= 22){
        return true;
    }
    for(var i=1; i<snakeArr.length; i++){
        if(snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y)
            return true;
    }
    return false;
}

function drawSnake(){
    snakeArr.forEach((bodyPiece, index) =>{
        body = document.createElement('div');
        body.style.gridRowStart = bodyPiece.y;
        body.style.gridColumnStart = bodyPiece.x;
        if(index == 0)
            body.classList.add('snake-head'); 
        else 
            body.classList.add('snake');
        board.appendChild(body);
    });
}
//    --------------   Food logics   ------------------------------
function updateFood(){
    food.x = Math.ceil(Math.random()*20);
    food.y = Math.ceil(Math.random()*20);
}

function drawFood(){
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}