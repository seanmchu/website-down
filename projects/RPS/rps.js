let s_user = 0;
let s_comp = 0;
const s_user_span = document.getElementById("playerScore");
const s_comp_span = document.getElementById("compScore");
const scoreboard_div = document.querySelector(".scoreboard");
const result_div = document.getElementById("result");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissors");

function chooseComp(){
    const choices = ["r","p","s"];
    return choices[Math.floor(Math.random() * 3)];
}

function letter_to_word (letter){
    switch(letter) {
        case "r":
            return "rock";
            break;
        case "p":
            return "paper";
            break;
        case "s":
            return "scissors";
            break;
    }
}

function win (userChoice,compChoice){
    s_user++;
    s_user_span.innerHTML = s_user;
    result_div.innerHTML = "You chose " + letter_to_word(userChoice) + ", comp chose " + letter_to_word(compChoice) + ", you win!";
}
function lose (userChoice,compChoice){
    s_comp++;
    s_comp_span.innerHTML = s_comp;
    result_div.innerHTML = "You chose " + letter_to_word(userChoice) + ", comp chose " + letter_to_word(compChoice) + ", you lose!";
}
function tie (userChoice,compChoice){
    result_div.innerHTML = "You chose " + letter_to_word(userChoice) + ", comp chose " + letter_to_word(compChoice) + ", tie!";
}

function rps(Userchoice) {
    compChoice = chooseComp();
    const game = Userchoice + compChoice;
    switch(game) {
        case "rr":
        case "ss":
        case "pp":
            tie(Userchoice,compChoice);
            break;
        case "rp":
        case "sr":
        case "ps":
            lose(Userchoice,compChoice);
            break;
        case "pr":
        case "rs":
        case "sp":
            win(Userchoice,compChoice);
            break;
    }
}



function main(){
    rock_div.addEventListener("click",function(){
        rps("r");
    });
    paper_div.addEventListener("click",function(){
        rps("p");
    });
    scissor_div.addEventListener("click",function(){
        rps("s");
    });
}

main();