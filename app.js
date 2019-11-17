/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var player, roundTotal, playerTotal, dice1, dice2, gameWon, previousDice1, previousDice2, winTarget;

init();

function init(){
    player = 0;
    roundTotal = 0;
    playerTotal = [0,0];
    dice1 = 1;
    dice2 = 1;
    previousdice1 = 1;
    previousDice2 = 1;
    gameWon = false;
    winTarget = 100;
    document.querySelector('.win-target').value = 100;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//new game
document.querySelector('.btn-new').addEventListener('click', init);

// check if winning target is changed
document.querySelector('.win-target').addEventListener('input', (e) => {
    console.log(e.target.value)
    winTarget = e.target.value
});

// roll dice1
document.querySelector('.btn-roll').addEventListener('click', () => {
    if(!gameWon){
        previousDice1 = dice1;
        previousDice2 = dice2;
        dice1 = Math.floor(Math.random()*6)+1;
        dice2 = Math.floor(Math.random()*6)+1;
        document.querySelector('.dice1').src = 'static/dice-' + dice1 + '.png';
        document.querySelector('.dice2').src = 'static/dice-' + dice2 + '.png';
        //if 2 consequetive 6's are rolled, wipe out player scores
        if(dice1 === 6 && previousDice1 === 6){
            playerTotal[player] = 0;
            dice1 = 1;
        }
        if(dice2 === 6 && previousDice2 === 6){
            playerTotal[player] = 0;
            dice2 = 1;
        }
        //if a 1 is rolled set the round total to zero.  if not add the dice1 to the round total and update the display
        if(dice1 === 1 || dice2 ===1){
            roundTotal = 0;
        }else{
            roundTotal += dice1 + dice2;
        }
        document.getElementById('current-' + player).textContent = roundTotal;
        if(roundTotal === 0) nextRound();
    }   
})

// click hold
document.querySelector('.btn-hold').addEventListener('click', () => {
    if(!gameWon){
        nextRound();
    }
})

//next round
function nextRound(){
    //update scores
    playerTotal[player] += roundTotal;
    roundTotal = 0;
    document.getElementById('current-' + player).textContent = 0;
    document.getElementById('score-' + player).textContent = playerTotal[player];
    
    //check for win
    if(playerTotal[player] >= winTarget){
        document.querySelector('.player-' + player + '-panel').classList.add('winner');
        document.getElementById('name-' + player).textContent = 'Winner!';
        document.querySelector('.player-' + player + '-panel').classList.remove('active');
        gameWon = true;
    }
    if(!gameWon){
        //change player
        document.querySelector('.player-' + player + '-panel').classList.toggle('active');
        player === 0 ? player = 1: player = 0;
        document.querySelector('.player-' + player + '-panel').classList.toggle('active');
    }
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/