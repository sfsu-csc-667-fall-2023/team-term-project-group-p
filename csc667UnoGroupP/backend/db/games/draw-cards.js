//Responsible for the functionality of drawing cards from the pile
function drawCards(game, playerID, numberOfCards){
    const player = game.players.find(p => p.id === playerID);

    if(!player){
        throw new Error('Player not found');
    }

    if(game.drawPile.length < numberOfCards){
        throw new Error('No more cards in the draw pile');
    }

    const drawnCards = game.drawPile.splice(0, numberOfCards);
    player.hand = player.hand.concat(drawnCards);

    return{
        game,
    }
}

module.exports = drawCards;