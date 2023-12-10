//responsible for updating the state of the game's cards 
//such as draw pile, discard pile after actions

function setGameCards(game, newDrawPile, newDiscardPile){
    return {
        game,
        drawPile: newDrawPile,
        discardPile: newDiscardPile
    };
}

module.exports = setGameCards;