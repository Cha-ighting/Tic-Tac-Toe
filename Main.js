//selecting all required elementsplay-board
const selectBox = document.querySelector(".select-box");
const selectXBtn = selectBox.querySelector(".playerX");
const selectOBtn = selectBox.querySelector(".playerO");
const playBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const restartBtn = resultBox.querySelector("button");
const replayBtn = document.getElementById("replay-button");
const previousBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const exitBtn = document.querySelector("#exit-btn");

console.log(previousBtn, nextBtn, exitBtn);

window.onload = ()=> { //once window loaded
    for (let i = 0; i < allBox.length; i++){ //add onclick attribute in all available section's spans
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () =>{
        selectBox.classList.add("hide"); //hide the select box on player X button clicked 
        playBoard.classList.add("show"); //show the playboard button on playerX button clicked
    }
    selectOBtn.onclick = () =>{
        selectBox.classList.add("hide"); //hide the select box on player O button clicked 
        playBoard.classList.add("show"); //show the playboard button on playerO button clicked
        players.setAttribute("class", "players active player");//adding three class names in player element
    }
}

let playerXIcon = "fas fa-times"; //classname of cross icon
let playerOIcon = "far fa-circle"; //classname of circle icon
let playerSign = "X"; //suppose player will be X
let runBot = true;

//user click function
function clickedBox(element) {
    //console.log(element);
    if (players.classList.contains("player")){ //if players element has contains .player
        element.innerHTML = `<i class="${playerOIcon}"></i>`;//adding circle icon tag inside user clicked element
        players.classList.add("active");
        //if player select O then we'll change the playersign value to O
        playerSign = "O"; //if player will be O then we'll change the sign
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;//adding cross icon tag inside user clicked element
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); //calling the winner function
    playBoard.style.pointerEvents = "none"; //once user select then user can't select any other box until box select.
    element.style.pointerEvents = "none"; //once user select any box then that box can't be selected again.
    let randomDelayTime = ((Math.random() * 1000 ) + 200).toFixed(); //generating random time delay so bot will delay randomly to select box
    setTimeout(()=>{
        bot(runBot); //calling bot function
    }, randomDelayTime); //passing random delay time
}

//bot click function
function bot (runBot){
    if(runBot){ //if runbot is true then run the following codes
        //first change the playerSign...so if user has X value in ID then bot will have O
    playerSign = "O";
    let array = []; //creating empty array.. we'll store unselected box index in this array
    for (let i = 0; i < allBox.length; i++){
        if(allBox[i].childElementCount === 0){ //if span has any child element
            array.push(i); //inserting unclicked or unselected boxes inside array means which span has no children
            //console.log(i + " " + "has no children");
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
    console.log(randomBox);
    if(array.length > 0){
        if (players.classList.contains("player")){ //if players element has contains .player
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;//adding cross icon tag inside user clicked element
            players.classList.remove("active");
            // if user is O then the box ID value will be X
            playerSign = "X";
            allBox[randomBox].setAttribute("id", playerSign);
        }else{
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;//adding circle icon tag inside user clicked element
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id", playerSign);
        }
        selectWinner(); //calling the winner
    }
    allBox[randomBox].style.pointerEvents = "none"; //once bot select any box then user can't select or click on that box
    playBoard.style.pointerEvents = "auto";
    playerSign = "X"; // passing the x value
    }
}

//let work on select the winner
function getClass(idname){
    return document.querySelector(".box" + idname).id; //returning id name
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign){
        return true;
    }
}

function selectWinner(){ //if one combination of them matched then select the winner
    if(checkClass(1,2,3, playerSign) || checkClass(4,5,6, playerSign) || checkClass(7,8,9, playerSign) || checkClass(1,4,7, playerSign) || checkClass(2,5,8, playerSign) || checkClass(3,6,9, playerSign) || checkClass(1,5,9, playerSign)|| checkClass(3,5,7, playerSign)){
        console.log(playerSign + " " + "is the winner");
        //once match won by someone then stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(()=>{ //we'll delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); //700 ms delay

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game`;
    }else{
        //if match has drawn
        //first we'll check all id...if all span has id and no one won the game then we'll draw the game
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != ""  && getClass(7) != "" && getClass(8) != "" && getClass(9) != "" ){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{ //we'll delay to show result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
    }, 700); //700 ms delay

        wonText.textContent = `It's a tie!`;
        }
    }
}

restartBtn.onclick = ()=>{
    window.location.reload(); //reload the current page
}
  
replayBtn.onclick = ()=>{
    playBoard.classList.add("show");
    resultBox.classList.remove("show");
}


previousBtn.addEventlistener('click', showPreviousMove);
nextBtn.addEventListener('click', showNextMove);
exitBtn.addEventListener('click', reloadPage);

function showPreviousMove() {
    // check if there is a previous move
    if (currentMove > 0) {
      currentMove--; // decrement current move index
      drawBoard(gameMoves[currentMove]); // draw board for current move
      // enable next button since there is at least one more move
      nextBtn.disabled = false;
    }
    // disable previous button if we've reached the first move
    if (currentMove === 0) {
      previousBtn.disabled = true;
    }
    console.log("previous");
  }
  
  function showNextMove() {
    // check if there is a next move
    if (currentMove < gameMoves.length - 1) {
      currentMove++; // increment current move index
      drawBoard(gameMoves[currentMove]); // draw board for current move
      // enable previous button since there is at least one previous move
      previousBtn.disabled = false;
    }
    // disable next button if we've reached the last move
    if (currentMove === gameMoves.length - 1) {
      nextBtn.disabled = true;
    }
    console.log("next");
  }

  function reloadPage() {
    location.reload();
    console.log("reload");
  }

