//Function to add a new user to the game
//Takes the current game state (game) and the user (newPlayer)
//Returns updated game state with new user
function addUser(game, newPlayer){
    const isExistingPlayer = game.players.some(player => player.id === newPlayer.id);

    if(isExistingPlayer){
        console.error('Player with ID ${newPlayer.id} already exists');
        return game;
    }

    //initialize player's properties
    newPlayer.hand = [];
    newPlayer.score = 0;

    game.players.push(newPlayer);

    return game;
}

module.exports = addUser;