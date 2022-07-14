export const tictactoe = () =>{
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    const player = 'X';
    const computer = 'O';
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

        let result = { 'player': player_playing, 'match': 'none'};

        winningCombinations.forEach(combination => {
            const [a, b, c] = combination;
            if (board[a] === player_signal && board[b] === player_signal && board[c] === player_signal) {
                result = { 'player': player_playing, 'match': 'won'};
            }
        });

        if(result["match"] === 'won')
        {
            resetBoard();
            return result;
        };

        /* check for draw */
        let full = true;
        board.forEach( cell => {
            if(cell === ''){
                full = false;
            }
        });
        if(full){
            result = { 'player': 'draw', 'match': 'draw'};
            resetBoard();
        }

        return result;
    }
    const resetBoard = () => {
        board = [
            '', '', '',
            '', '', '',
            '', '', ''
        ];
    }

    return { logic, board, modifyBoard }; 
}