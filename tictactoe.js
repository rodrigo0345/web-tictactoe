export const tictactoe = () =>{
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const modifyBoard = (cell_number, player_playing) =>{
        let player_signal;

        if(player_playing.toLowerCase() === 'player'){
            player_signal = 'X';
        }
        else if(player_playing.toLowerCase() === 'bot'){
            player_signal = 'O';
        }

        board[cell_number - 1] = player_signal;
    }
    const logic = (player_playing) => {
        
        let result = { 'player': player_playing, 'match': 'none'};
        result = checkGameStatus(result, player_playing);

        if(result["match"] === 'won' || result["match"] === 'draw')
        {
            resetBoard();
        }

        return result;
    }
    const resetBoard = () => {
        for(let i = 0; i < board.length; i++)
        {
            board[i] = '';
        }
    }
    const checkGameStatus = (result1, player_playing) =>
    {
        let player_signal;

        if(player_playing.toLowerCase() === 'player'){
            player_signal = 'X';
        }
        else if(player_playing.toLowerCase() === 'bot'){
            player_signal = 'O';
        }
        else{
            console.log('Invalid player');
            return;
        }
        
        let full = true;
        board.forEach( cell => {
            if(cell === ''){
                full = false;
            }
        });

        if(full){
            result1 = { 'player': 'draw', 'match': 'draw'};
        }

        winningCombinations.forEach(combination => {
            const [a, b, c] = combination;
            if (board[a] === player_signal && board[b] === player_signal && board[c] === player_signal) {
                result1 = { 'player': player_playing, 'match': 'won'};
            }
        });
    
        return result1;
    }

    const bruteForceTable = (index, symbol) => {
        board[index] = symbol;
    }

    return { logic, board, modifyBoard, checkGameStatus, bruteForceTable }; 
}

export function Bot()
{
    const bestMove = (original_game) =>{
        let best_score = -Infinity;
        let best_move = 0;

        const aux_game = tictactoe();

        // copy state of the game
        original_game.board.forEach((cell, index) => {
            aux_game.bruteForceTable(index, cell);
        });

        // bot playing
        for(let i = 0; i < 9; i++)
        {
            if(original_game.board[i] === '')
            {
                aux_game.modifyBoard(i + 1, 'bot');
                let score = minimax(aux_game, 0, 'player');
                aux_game.bruteForceTable(i, '');

                if(score > best_score)
                {
                    best_score = score;
                    best_move = i + 1;
                }
            }
        }
        return best_move;
    }
    let scores = {
        'bot': 1,
        'player': -1,
        'draw': 0,
    }
    const minimax = (aux_game, depth, player) => {

        // check if game is over
        let result = null;
        player === 'bot' ? result = aux_game.checkGameStatus(result, 'player') :
                            result = aux_game.checkGameStatus(result, 'bot');
        
        if(result !== null)
        {
            let score = scores[result.player.toLowerCase()];
            return score;
        }

        if(player === 'bot')
        {
            let best_score = -Infinity;
            for(let i = 0; i < 9; i++){
                if(aux_game.board[i] === '')
                {
                    aux_game.modifyBoard(i + 1, 'bot');
                    let score = minimax(aux_game, depth + 1, 'player');
                    aux_game.bruteForceTable(i, '');
                    
                    if(score > best_score)
                    {
                        best_score = score;
                    }
                }
            }
            return best_score;
        }
        else
        {
            let best_score = Infinity;
            for(let i = 0; i < 9; i++){
                if(aux_game.board[i] === ''){
                    aux_game.modifyBoard(i + 1, 'player');
                    let score = minimax(aux_game, depth + 1, 'bot');
                    aux_game.bruteForceTable(i, '');

                    if(score < best_score)
                    {
                        best_score = score;
                    }
                }
            }
            return best_score;
        }
    }
    return { bestMove };
}