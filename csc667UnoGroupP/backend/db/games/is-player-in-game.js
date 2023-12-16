//Checks if a specific player is currently part of a game

function isPlayerInGame(game, playerId) {
    return game.players.some(player => player.id === playerId);
}

module.exports = isPlayerInGame;