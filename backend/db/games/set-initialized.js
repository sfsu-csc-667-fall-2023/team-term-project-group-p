//Responsible for updating the game state to initialized

function setInitialized(game, status){
    if(typeof status !== 'boolean'){
        throw new Error('Initialization status must be a boolean');
    }

    return {
        game,
        isInitialized: status
    };
}

module.exports = setInitialized;