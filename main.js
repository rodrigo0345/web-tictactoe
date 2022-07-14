import {tictactoe} from './tictactoe.js';

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
                return
            }
            else if(result.match === 'draw'){
                alert('Draw!');
                return
            }

            /* bot move */
            let random = Math.floor(Math.random() * 10) + 1;
            let cell_value_bot;
            do
            {   
                random -= 1;

                if(random < 1){
                    random = 9;
                }
                cell_value_bot = document.getElementById('cell-' + random).innerText;
   
            }while(cell_value_bot !== '');

            document.getElementById('cell-' + random).innerText = 'O';
            player = 'bot';
            game.modifyBoard(random, player);
            result = game.logic(player);
            if(result.match === 'won'){
                alert(`${result.player} won!`);
            }
            else if(result.match === 'draw'){
                alert('Draw!');
            }
        }
        );
    })
});