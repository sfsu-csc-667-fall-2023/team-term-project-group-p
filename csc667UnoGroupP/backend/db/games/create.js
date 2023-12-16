//Responsible for the creating of a new game instance
const initializeGame =  require('./initialize.js');

function createGame(){
    const newGame = initializeGame();

    return newGame;
}

module.exports = createGame;