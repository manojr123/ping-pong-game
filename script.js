/* 
    Creation : 21-Jan-2023 
    Author   : Manoj Raghavan
    File     : script.js

    Version history and changes:
    1.0 - Creation - Ping Pong Game using HTML/CSS/JAVASCRIPT/LocalStorage
    2.0 - 
*/

// Get the Tags for all the key elements Rods, Ball and divLayout
var divTag = document.getElementById('div-layout');
console.log(divTag);
var rod1Tag = document.getElementById('rod1');
console.log(rod1Tag);
var rod2Tag = document.getElementById('rod2');
console.log(rod1Tag);
var ballTag = document.getElementById("ball");
var ballInterval="";

// Ball pixel move
var pixelMove = 4; // eg 5 means 5px;

//Rod pixel move
var rodPixelMove = 60; // eg 5 means 5px;

// Directions
var up = false;
var right = false;
var down = false;
var left = false;

var score1 = 0;
var score2 = 0;
var winner = "";
var maxScore = 0;
var maxScorePlayer="";

// Player who will play first. Initially Rod2 will play first
var nextPlayerStartingFirst = "Rod2";

// Bool indicating game start
var gameStart = false;

// add eventlistener for 'a', 'd' and 'enter' keypress events
document.addEventListener('keypress', handleEvents);

// Place the Ball for initial position based on which player played first in the last game
placeBall();

/*
  Function : placeBall()
  Description : Place the ball based on which player played first in last game

*/
function placeBall() {

    up=true;
    down=false;
    right=true;
    left=false;

    clearInterval(ballInterval);

    score1=0;
    score2=0;
    ballTag.style.top = divTag.offsetHeight - ballTag.offsetHeight-rod1Tag.offsetHeight + "px";
    console.log("divTag.offsetHeight " + divTag.offsetHeight);
    ballTag.style.left = divTag.offsetWidth/2 -ballTag.offsetWidth/2 + "px";


    if ( nextPlayerStartingFirst == "Rod2" ) {
        // Since Rod1 was first player, Rod2 will start first now
        ballTag.style.top = divTag.offsetHeight - ballTag.offsetHeight-rod1Tag.offsetHeight + "px";
        ballTag.style.left = divTag.offsetWidth/2 -ballTag.offsetWidth/2 + "px";
        up=true;
        down=false;
        right=true;
        left=false;
        rod1Tag.style.left = divTag.offsetWidth/2 -  rod1Tag.offsetWidth/2 + "px"; 
        rod2Tag.style.left = divTag.offsetWidth/2 -  rod1Tag.offsetWidth/2 + "px"; 

    } else if (nextPlayerStartingFirst == "Rod1" ) {
        // Since Rod2 was first player, Rod1 will start first now
        ballTag.style.top = rod1Tag.offsetHeight + "px";
        ballTag.style.left = divTag.offsetWidth/2 -ballTag.offsetWidth/2 + "px";
        up=false;
        down=true;
        right=false;
        left=true;
        rod1Tag.style.left = divTag.offsetWidth/2 -  rod1Tag.offsetWidth/2 + "px"; 
        rod2Tag.style.left = divTag.offsetWidth/2 -  rod1Tag.offsetWidth/2 + "px"; 

    }
}

/*
  Function : handleEvents()
  Description : Main event handler. Handle 'a', 'd' and 'enter' events

*/
function handleEvents(event)  {
    console.log("Key pressed");

    var keyCode = (event.which) ? event.which : event.keyCode;
    console.log(keyCode);

    if ( ( keyCode == '100') )  {

        // Key 'd' pressed
        if ( gameStart) {
            console.log("Key 'd' pressed");
            if ( (rod1Tag.offsetLeft + rod1Tag.offsetWidth+ rodPixelMove) < divTag.offsetWidth )  {
                rod1Tag.style.left = rod1Tag.offsetLeft + rodPixelMove + "px"; 
                rod2Tag.style.left = rod2Tag.offsetLeft + rodPixelMove + "px";
            } else {
                rod1Tag.style.left = divTag.offsetWidth - rod1Tag.offsetWidth + "px"; 
                rod2Tag.style.left = divTag.offsetWidth - rod1Tag.offsetWidth + "px"; 
            }
        }
      
    } else if ( keyCode == '97') {

        // Key 'a' pressed
        if (gameStart) {
            console.log("Key 'aaa' pressed");
            if ( (rod1Tag.offsetLeft - rodPixelMove) > 0 )  {
                rod1Tag.style.left = rod1Tag.offsetLeft - rodPixelMove + "px"; 
                rod2Tag.style.left = rod2Tag.offsetLeft - rodPixelMove + "px";
            } else {
                rod1Tag.style.left = 0 + "px"; 
                rod2Tag.style.left = 0 + "px"; 
            }
        }

    } else if ( keyCode == '13'){

        // Enter Key pressed to start the game
        console.log("Enter pressed");

        // Set gameStart to true
        if ( gameStart == true) {
            //Game is already on. Ignore till game ends
            return;
        } else {
            gameStart=true;
        }        
        console.log(divTag.offsetWidth/2 -  rod1Tag.offsetWidth/2);
        rod1Tag.style.left = divTag.offsetWidth/2 -  rod1Tag.offsetWidth/2 + "px"; 
        rod2Tag.style.left = divTag.offsetWidth/2 -  rod1Tag.offsetWidth/2 + "px"; 
        maxScore = localStorage.getItem("maxScore");
        maxScorePlayer = localStorage.getItem("maxScorePlayer");
        if ((maxScore != null) && (maxScore >= 0) ) {
            window.alert("Max Score is : " + maxScore + " by " + maxScorePlayer);
        } else {
            window.alert("This is first time...Max Score is 0");
        }
        ballInterval = setInterval(handleBall  , 15);   
    } else {
        // ignore other keys
    }    
}

/*
  Function : handleBall()
  Description : Function to handle the Ball movement

*/
function handleBall() {

    console.log("width " + rod1Tag.offsetWidth);
    console.log(ball.offsetLeft);
    console.log(ball.offsetWidth);

    if ( up== false && down==false && left == false && right == false) {
        up = true;
        right = true;      
    }
    console.log("up " + (up === true) );
    
    // If movement is "up-right"
    if ( up === true && right === true) {
        console.log(" up , right  = true "  );

        // Check if right boundary is exceeded
        if ( (ballTag.offsetLeft + ballTag.offsetWidth+5) >= divTag.offsetWidth) {
            up = true;
            left = true;
            down = false;
            right = false;
        } 
        // Check if top boundary is exceeded or reached
        else if ( ballTag.offsetTop - rod1Tag.offsetHeight - 5 <= 0) {
            if ( isRodBlockSuccess() ) {
                score1 += 100;
                up = false;
                left = false;
                down = true;
                right = true;    
            } else
            {
                winner = "Rod2";
                //declareWinner
                declareWinner("Rod2");
            }
        // Right or Top boundary not exceeded...continue "up-right"
        } else {
            ballTag.style.left = ballTag.offsetLeft + pixelMove + "px"; 
            ballTag.style.top = ballTag.offsetTop - pixelMove + "px";
            console.log("ballTag.style.left" +ballTag.style.left);
        }
    }   

    // Movement is "up-left"
    else if (up==true && left == true )
    {
        // Check if Top boundary is crossed
        if ( ballTag.offsetTop - rod1Tag.offsetHeight - 5 <= 0) 
        {
            if ( isRodBlockSuccess() ) {
                score1 += 100;
                up = false;
                left = true;
                down = true;
                right = false;
            }
            else
            {
                winner = "Rod2";
                //declareWinner
                declareWinner("Rod2");

            }
        } 
        // Check if Left boundary is crossed
        else if (ballTag.offsetLeft - 5 <= 0 )
        {
            up = true;
            left = false;
            down = false;
            right = true;
        } 
        else
        {
            ballTag.style.left = ballTag.offsetLeft - pixelMove + "px"; 
            ballTag.style.top = ballTag.offsetTop - pixelMove + "px";
        }
    }
    // Movement is "down-left"
    else if (down==true && left == true ) 
    {
        // Check if Left boundary is crossed 
        if ( ballTag.offsetLeft - 5 <= 0) 
        {
            console.log("Left boundary is crossed")

            up = false;
            left = false;
            down = true;
            right = true;
        } 
        // Check if bottom boundary is crossed
        else if ( ( ballTag.offsetTop + 5) >= (divTag.offsetHeight-rod1Tag.offsetHeight ) )
        {
            console.log("bottom boundary is crossed")
            if ( isRodBlockSuccess() ) {
                score2 += 100;
                up = true;
                left = true;
                down = false;
                right = false;
            } else
            {
                winner = "Rod1";
                //declareWinner
                declareWinner("Rod1");
            }

        }
        else {
            ballTag.style.left = ballTag.offsetLeft - pixelMove + "px"; 
            ballTag.style.top = ballTag.offsetTop + pixelMove + "px";
        }
        console.log("Down left")
        //clearInterval(ballInterval);
    }
    // Movement is "down-right"
    else if (down==true && right == true ) 
    {
        // Check if Bottom is crossed 
        if ( ( ballTag.offsetTop + 5) >= (divTag.offsetHeight-rod1Tag.offsetHeight ) ) 
        {

            if ( isRodBlockSuccess() ) {
                score2 += 100;
                up = true;
                left = false;
                down = false;
                right = true;    
            } 
            else
            {
                winner = "Rod1";
                //declareWinner
                declareWinner("Rod1");
            }
        }
        // Check if Right boundary is crossed
        else if  ( (ballTag.offsetLeft + ballTag.offsetWidth+5) >= divTag.offsetWidth)
        {
            up = false;
            left = true;
            down = true;
            right = false;
        } 
        else 
        {
            ballTag.style.left = ballTag.offsetLeft + pixelMove + "px"; 
            ballTag.style.top = ballTag.offsetTop + pixelMove + "px";
        }
    }       
    //clearInterval(ballInterval);
}


/*
  Function : isRodBlockSuccess()
  Description : Function to check if Rod was able to successfully bounce the ball

*/
function isRodBlockSuccess() {
        if (  ballTag.offsetLeft >= (rod1Tag.offsetLeft) &&
            ballTag.offsetLeft <= (rod1Tag.offsetLeft+rod1Tag.offsetWidth)  )
        {           
            return true;   
        } 
        else 
        {
            // Initialize
            console.log("score1 " + score1);
            console.log("score2 " + score2);
            
            return false;

        }
}

/*
  Function : declareWinner()
  Description : Function to declare the winner
*/
function declareWinner(winner) {
    clearInterval(ballInterval);

    var winningScore;

    if ( score1==0 && score2==0) 
    {
        window.alert("Match Drawn : Score 0" +". Max Score is :" +maxScore);
    } else 
    {          
        console.log("score1" + score1);
        console.log("score2" + score2);

        if ( winner == "Rod1") {
            nextPlayerStartingFirst ="Rod2";
        } else {
            nextPlayerStartingFirst ="Rod1";
        }

        if (score1 >= score2 ) 
        {
            winningScore=score1;            
        }
        else 
        {
            winningScore=score2;            
        } 
        
        if ( ( score1 >= score2 ) && (score1 > maxScore) ) {
            maxScore = score1;
        } else if ( ( score2 >= score1 ) && (score2 > maxScore) ) {
            maxScore = score2;
    
        }
        localStorage.setItem("maxScore",maxScore);
        localStorage.setItem("maxScorePlayer",winner);
        window.alert(winner + " wins with a score of : " + winningScore +". Max Score is :" +maxScore);
    }

    console.log("score1 " + score1);
    console.log("score2 " + score2);
    initialize()

}

/*
  Function : initialize()
  Description : Function to initialize all data for the next game
*/
function initialize() {
    clearInterval(ballInterval);
    placeBall();
    gameStart=false;

    console.log("ballTag.offsetHeight " + ballTag.offsetHeight)
    console.log("balltag offset top " + ballTag.style.top);
    
}
