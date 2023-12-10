//Responsiblke for retrieving a player's info based on seating

function getPlayerBySeat(game, seatNumber){
    if (seatNumber < 0 || seatNumber >= game.players.length){
        console.error('Invalid seat number');
        return null;
    }

    return game.players[seatNumber];

}

module.exports = getPlayerBySeat;