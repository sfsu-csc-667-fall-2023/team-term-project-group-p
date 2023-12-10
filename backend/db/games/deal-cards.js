//Function to deal cards to each player 
//Takes the current game state and returns the updated game state
function dealCards(game){
    const cardsPerPlayer = 7;

    //check for enough cards
    if (game.drawPile.length < game.players.length * cardsPerPlayer){
        throw new Error('Not enough cards to deal to all players');
    }

    game.players.forEach(player => {
        player.hand = game.drawPile.splice(0, cardsPerPlayer);
    });

    return {
        game,
    };
}

module.exports = dealCards;