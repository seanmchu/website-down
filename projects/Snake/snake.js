const start_button = document.getElementById("start");
var dx = 10;
var dy = 0;
var speed = 100;
var food_x = 0;
var food_y = 0;
var score = 0;
let changing = false;
var c = document.getElementById("gameBox");
var ctx = c.getContext("2d");
let snake = [{x: 150, y: 150},{x: 140, y: 150},{x: 130, y: 150},{x: 120, y: 150},{x: 110, y: 150},]
const score_span = document.getElementById("score");
const LEFT = 37;  
const RIGHT = 39;  
const UP= 38;  
const DOWN = 40;
const slow = document.getElementById("slow");
const medium = document.getElementById("medium");
const fast = document.getElementById("fast");
const end_message = document.getElementById("end_message")

slow.addEventListener('click',function(){speed = 150;});
medium.addEventListener('click',function(){speed = 100;});
fast.addEventListener('click',function(){speed = 50;});

function game() {
    if (is_over()) {
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "50px EB Garamond";
        ctx.fillText("Game Over",150,150);
        end_message.style.visibility = "visible";
        return true;
    }
    make_food();
    setTimeout(function(){clear_canvas();draw_food();move(dx,dy);drawSnake();game();},speed);
}


function is_over(){
    //start at 4 because it's the first reachable position
    for (var i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hit_left = snake[0].x < 0;
    const hit_right = snake[0].x > c.width - 10;
    const hit_top = snake[0].y < 0;
    const hit_bottom = snake[0].y > c.height - 10;
    return hit_left || hit_right || hit_top || hit_bottom;
}


function rand_food_pos (max) {
    return Math.round((Math.random() * max) / 10) * 10;
}
function gen_food() {
    food_x = rand_food_pos(c.width - 10);
    food_y = rand_food_pos(c.height - 10);
    make_food();
}

function make_food() {
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == food_x && part.y == food_y;    
        if (foodIsOnSnake) gen_food();  
    }  
    );

}

function draw_food() { 
    ctx.fillStyle = 'gold'; 
    ctx.strokestyle = 'black'; 
    ctx.fillRect(food_x, food_y, 10, 10); 
    ctx.strokeRect(food_x, food_y, 10, 10);
}

function get_direction(event){
    if (changing) return;
    const pressed = event.keyCode;
    const up = dy === -10;
    const down = dy === 10;
    const left = dx === -10;
    const right = dx === 10;
    if (pressed === UP && !down) {
        dy = -10;
        dx = 0;
    }
    if (pressed === DOWN &&  !up) {
        dy = 10;
        dx = 0;
    } 
    if (pressed === LEFT && !right) {
        dx = -10;
        dy = 0;
    }
    if (pressed === RIGHT && !left){
        dx = 10;
        dy = 0;
    } 
    changing = true;
}

function clear_canvas(){
    ctx.clearRect(0,0,c.width,c.height);
}

function move(dx,dy) {
    const head = {x:snake[0].x + dx, y:snake[0].y + dy};
    snake.unshift(head);
    if (!(snake[0].x === food_x && snake[0].y === food_y)) snake.pop();
    else {
        score++;
        score_span.innerHTML = score;
    }   
    changing = false;
}

function drawSnakePart(snakePart) {  
    ctx.fillStyle = "#545663";
    ctx.strokestyle = 'black';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {  
    snake.forEach(drawSnakePart);
}

function main() {
    start_button.addEventListener('click',function(){
        start_button.style.visibility = "hidden";
        game();   
    });

}
document.addEventListener("keydown",get_direction);

gen_food();
main();