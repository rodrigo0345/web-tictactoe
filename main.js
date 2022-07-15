import {tictactoe, Bot} from './tictactoe.js';

function restartGame(cells)
{
    cells.forEach(cell => {
        cell.innerText = '';
    })
}

window.addEventListener('load', ()=>{
    const cells = document.querySelectorAll('.cell');
    const game = tictactoe();

    cells.forEach(cell => {
        cell.addEventListener('click', ()=>{
            const cell_id = cell.id;
            const cell_number = cell_id.split('-')[1];

            const cell_value = document.getElementById(cell_id).innerText;

            if(cell_value){return}

            document.getElementById(cell_id).innerText = 'X';

            /* player move */
            let player = 'Player';
            game.modifyBoard(cell_number, player);
            let result = game.logic(player);
            if(result['match'] === 'won'){
                alert(`${result.player} won!`);
                restartGame(cells);
                return
            }
            else if(result.match === 'draw'){
                alert('Draw!');
                restartGame(cells);
                return
            }

            /* bot move */
            let bot_move = Bot(game).bestMove();

            document.getElementById('cell-' + bot_move).innerText = 'O';
            player = 'bot';
            game.modifyBoard(bot_move, player);
            result = game.logic(player);
            
            if(result.match === 'won'){
                alert(`${result.player} won!`);
                restartGame(cells);
                return;
            }
            else if(result.match === 'draw'){
                alert('Draw!');
                restartGame(cells);
                return;
            }
        }
        );
    })
});