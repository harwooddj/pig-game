/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var player, roundTotal, playerTotal, dice, gameWon;

init();

function init(){
    player = 0;
    roundTotal = 0;
    playerTotal = [0,0];
    dice = 1;
    gameWon = false;
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

// roll dice
document.querySelector('.btn-roll').addEventListener('click', () => {
    if(!gameWon){
        dice = Math.floor(Math.random()*6)+1;
        document.querySelector('.dice').src = 'static/dice-' + dice + '.png';
        if(dice !== 1){
            roundTotal += dice;
        }else{
            roundTotal = 0;
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
    if(playerTotal[player] >= 100){
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