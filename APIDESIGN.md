

Action 1: User Creates Game
    
    Inputs/Data:
        1: owner_id 
        2: game_title
        5: player count

        
    Pre Condition(s):


    Post Condition(s):
        1: A new game is created by created a new gid and did
        2: if game is public, the game is listed in public lobby.
        3: invitation link is generated.
        4: when a new player joins, user id is added to gid
        5: New players are redirected to game room


    API Endpoint:
        1: POST/games/create {game _title, player_count}
        2: Player_id is available in the session.

Action 2: User Plays a Card
    
    Inputs/Data:
        1: cid (card id)
        2: player_id 
        3: gid (game id)
        4: did (deck id)
        5: discard_id 

    Pre Condition(s):
        1: player_id is a player in gid
        2: did is a deck in gid
        3: player_id takes cards from did
        3: it is player_id's turn
        4: player_id has cid in their hand
        5: playing cid is a legam move

    Post Condition(s):
        1: discard pile is updated with cid
        2: cid is changed to played
        3: the next player will become the current player
        4: all users recieve the updated gamestate (updated discard pile, deck, number of cards in player's hand)

    API Endpoint:
        1: POST/game/:id/play { cid}
        2: gid is provided in url, player_id is available in the session.

Action 2: User Wins a Game
    
    Inputs/Data:
        1: player_id
        2: gid
        3: did
        5: discard_id
        6: hid

    Pre Condition(s):
        1: player_id is a player in gid
        2: player_id has only 1 card in hid
        3: 
    

    Post Condition(s):
        1: player_id plays last card and hid has 0 cards left
        2: game displays playeR_un has won the game
        3: Game session is terminated or continued.

    API Endpoint:
