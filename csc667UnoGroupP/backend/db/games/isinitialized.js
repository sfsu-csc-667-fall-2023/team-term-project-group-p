//checks if the game has been initialized

function isInitialized(game){
    const isDeckReady = Array.isArray(game.deck) && game.deck.length > 0;

    const arePlayersSet = Array.isArray(game.players) && game.players.length > 0;

    return isDeckReady && arePlayersSet;
}

module.exports = isInitialized;