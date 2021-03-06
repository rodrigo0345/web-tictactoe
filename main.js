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
    let newGame = true;

    cells.forEach(cell => {
        cell.addEventListener('click', (e)=>{
            if(newGame)
            {
                game.resetBoard();
                newGame = false;
            }

            const cell_id = cell.id;
            const cell_number = cell_id.split('-')[1];

            const cell_value = document.getElementById(cell_id).innerText;

            if(cell_value){return}

            document.getElementById(cell_id).innerText = 'X';

            /* player move */
            let player = 'Player';
            game.modifyBoard(cell_number, player);
            let result = game.logic(player);

            /* bot move */
            if(result.match === 'none' || result === null)
            {
                let bot = Bot();
                let bot_move = bot.bestMove(game);

                document.getElementById('cell-' + bot_move).innerText = 'O';
                player = 'bot';
                game.modifyBoard(bot_move, player);
                result = game.logic(player);
            }
            
            if(result.match !== 'none')
            {
                const final_board = document.getElementById('final-board');
                const msg = document.getElementById('msg');

                if(result.match.toLowerCase() === 'draw') msg.innerText = `Draw!`;
                else
                {
                    if(result.match === 'won' && result.player.toLowerCase() === 'bot')
                    {
                        msg.innerText = `You lost!`;
                        msg.classList.add('lost');
                    }
                    else
                    {
                        msg.innerText = `You won!`;
                        msg.classList.add('won');
                    }                     
                }

                final_board.classList.add('winner');
                final_board.classList.remove('hide');

                setTimeout(() => { 
                    final_board.classList.add('hide');
                    final_board.classList.remove('winner');

                    msg.classList.remove('won');
                    
                    restartGame(cells);
                    newGame = true;
                }, 1800);   
            }
        }
        );
    })
});