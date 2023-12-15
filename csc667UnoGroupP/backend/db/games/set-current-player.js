//Responsible for updating the game state to indicate
//the player's turn

function setCurrentPlayer(game){
    let nextPlayerIndex = game.currentPlayerIndex + 1;

    if (nextPlayerIndex >= game.players.length){
        nextPlayerIndex = 0;
    }

    return {
        game,
        currentPlayerIndex: nextPlayerIndex
    };
}

module.exports = setCurrentPlayer;