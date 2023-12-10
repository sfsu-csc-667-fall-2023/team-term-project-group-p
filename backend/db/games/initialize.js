
//function that creates a new deck of UNO cards
function createDeck(){
    const colors = ['Red', 'Yellow','Green','Blue'];
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'Skip', 'Reverse', 'Draw Two'];
    const specialCards = ['Wild','Wild Draw Four'];
    let deck = [];

    //creating the deck
    //Regular cards
    for(let color of colors){
        for (let value of values) {
            deck.push({ color, value}) {
                deck.push({color, value});
                //each number card except 0 has dups
                if (value !== '0'){
                    deck.push({color,value})
                }
            }
        }
        
    //Special cards
    for(let i = 0; i < 4; i++){
        deck.push({color: 'Wild', value: specialCards[0]});
        deck.push({color: 'Wild', value: specialCards[1]})
        }
    return deck;
    }
}

//Deck is created now we need to shuffle
function shuffleDeck(deck){
    for(let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Initialize the game
function initializeGame(){
    let deck = createDeck();
    deck = shuffleDeck(deck);

    //Player setup
    let players = [];
    let currentPLayerIndex = Math.floor(Math.random() * players.length);

    //Deal the cards
    players.forEach(player => {
        player.hand = deck.splice(0,7);
    })

    //Draw and deiscard piles
    let discardPile = [deck.pop()];
    let drawPile = deck;

    //Game rules
    let direction = 'clockwise';
    let gameStatus = 'in progess';
    let lastPLayedCard = discardPile[discardPile.length - 1];

    return{
        deck,
        players,
        currentPlayerIndex,
        drawPile,
        discardPile,
        direction,
        gameStatus,
        lastPlayedCard
    };

}

module.exports = initializeGame;