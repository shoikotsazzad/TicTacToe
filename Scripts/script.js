let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let turn0 = true; //playerX, player0

//Winning Patters with a 2D array
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

//for Reset button, Reset all the boxes
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        //console.log("box is clicked");
        if(turn0){ //turn of player0
            box.innerText = "O";
            turn0 = false;
        }else{ //turn of playerX
            box.innerText = "X";
        turn0 = true;
        }

        //box value cannot be changed
        box.disabled = true;
        //call winner function
        checkWinner();

    });
});

//disableBoxes
const disableBoxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
}
//Enable Boxes
const enableBoxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
//this will be show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is Player${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}



 //check winner function
const checkWinner = () => {
    let isDraw = true;
    for(let pattern of winPatterns){
        
        //printing those value into individual variable
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if ( pos1Val !="" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                // console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
        boxes.forEach(box => {
            if (box.innerText === "") {
                isDraw = false;
            }
        });
        if (isDraw) {
            msg.innerText = "It's a Draw! Play Again.";
            msgContainer.classList.remove("hide");
            disableBoxes();
    }
}
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);