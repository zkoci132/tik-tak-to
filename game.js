let screenBoard = document.querySelector('.grid-container');



function Game(players,board){
    let active;
    let player1 = players[0];
    let player2 = players[1];
    let gameboard = board;
    

   

    const decideOrder = function(){
        let playerHolder = [];
        playerHolder.push(player1);
        playerHolder.push(player2);
        const firstPlayer = playerHolder[Math.floor(Math.random() * playerHolder.length)];
        
        setActive(firstPlayer.symbol)
        if(player1.symbol === firstPlayer.symbol){
            console.log(`${firstPlayer.symbol} is first!`);
            player1.turn = true;
        }
        else{
            console.log(`${firstPlayer.symbol} is first!`);
            player2.turn = true;
        }

        active = firstPlayer.symbol
        
    }

    const takeTurn = function(){
        
        
        if(player1.turn === true){
            active = player1.symbol;
        }
        else{
            active = player2.symbol;
        }

        console.log(`It is ${active}'s turn...`)

        
        gameboard.placeMark(active);
        
        

        
        if(player1.turn === true){
            active = player2.symbol
            player1.turn = false;
            player2.turn = true;
        }
        else{
            active = player1.symbol
            player2.turn = false;
            player1.turn = true;
        }

        console.log(gameboard.printBoard());

        if(gameboard.getSpots() === gameboard.MAXSIZE){
            GameController.endGame()
            return
        }
        


        

        




    };


    const setActive = function(curr){
        active = curr;
    }

    const getActive = () => active;

    return{
        decideOrder,takeTurn
    }

    

}

function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];
    let currentSpots = 0;
    const MAXSIZE = 9;

    for(let i = 0;i < rows;i++){
        board[i] = [];
        for(let j = 0;j < columns;j++){
            board[i].push(Cell())
        }
    }

    const checkDiagnol = function(player,board){
        if(board[0][0] === player && board[1][1] === player && board[2][2] === player || board[0][2] === player && board[1][1] === player && board[2][0] === player){
            return true
        }
        else{
            return false
        }
    }

    const alignMark = (player,placedMark) => {
        // possible future imlementation, if computer use this method of input, if human use other method of input
        let col = Math.floor(Math.random() * 3) + 1;
        let row = Math.floor(Math.random() * 3) + 1;
        if(currentSpots === MAXSIZE){
            GameController.endGame();
        }
        else{
            while(placedMark === false && currentSpots < MAXSIZE){
                console.log(`column: ${col}, row: ${row}`)
                for(let i = 0; i < row;i++){
                    if(i+1 === row){
                        for(let k = 0; k < 3;k++){
                            if(k+1 === col){
                                if(board[i][k] === 'X' || board[i][k] === 'O'){
                                    console.log(`This spot is occupied!`)
                                    col = Math.floor(Math.random() * 3) + 1;
                                    row = Math.floor(Math.random() * 3) + 1;
                                    break;
                                    //alignMark(player,false);
    
                                }
                                else{
                                    currentSpots++;
                                    placedMark = true;
                                    board[i][k] = player
                                    let rowCount = 0;
                                    let colCount = 0;
                                    for(let j = 0;j < 3;j++){
                                        if(board[i][j] === player){
                                            rowCount = rowCount + 1;
                                        }
                                    }
                                    if(rowCount === 3){
                                        console.log(`${player} wins!`)
                                        GameController.endGame();
                                        return ;
                                    }
                                    
                                    for(let h = 0;h < 3;h++){
                                        if(board[h][k] === player){
                                            colCount = colCount + 1;
                                        }
                                    }
                                    if(colCount === 3){
                                        console.log(`${player} wins!`)
                                        GameController.endGame();
                                        return ;
                                    }

                                    let diag = checkDiagnol(player,board);

                                    if(diag === true){
                                        console.log(`${player} wins!`)
                                        GameController.endGame();
                                        return ;
                                    }
                                    
                                    

                                    return
                                        
                                   
                                    
                                }
                            }
                        }
                    }
            }

        }
        

        };
        
        
    }
    const getSpots = () => currentSpots
    const printBoard = () => board

    const placeMark = (player) => {
        let placedMark = false;
        alignMark(player,placedMark)
    }

    return {printBoard,placeMark,getSpots}
}


function Cell() {
    let mark = "";
  
    
    const displayMark = (symbol) => {
      mark = symbol;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getMark = () => mark;
  
    return {
      displayMark,
      getMark
    };
  }


const GameController = (function(){
    let keepPlaying = 'off';

    const players = [
        {
            symbol: 'X',
            turn: false,
            humanOrcpu: 'human'
        },
        {
            symbol: 'O',
            turn: false,
            humanOrcpu: 'cpu'
        }
    ]
    

    const board = Gameboard();

    
    const playGame = function(){
        keepPlaying = 'on';
        currentGame = Game(players,board);
        console.log(`${players[0].symbol} is the humie. ${players[1].symbol} is the cpu`)
        currentGame.decideOrder();
        /*
        while(keepPlaying === 'on'){
            currentGame.takeTurn();
        }
        */

        while(keepPlaying==='on'){
            currentGame.takeTurn();
        }
       
        
        
    }

    const endGame = function(){
        keepPlaying = 'off';
        console.log("Game has ended");
    }
    
   const displayNewRound = function(){
        console.log(board.printBoard());
   }

    const setStatus = function(status){
        keepPlaying = status;
        
    }

    const getGame = function(){
        return game;
    }

    const reportPlayers = function(){
        console.log(`${player1} is the human, ${player2} is the cpu`);
    }


    return{
            
            setStatus,getGame,reportPlayers,displayNewRound,playGame,endGame
        }
    
})();

/*
const playGame = function(player1,player2){
    player1 = player1;
    player2 = player2;
    game = 'on';
    


    announce();

    console.log("Ending game...");
    GameController.setStatus("off");
    
}
*/



    

/*
const board = Gameboard();

console.log(board.printBoard())

board.placeMark('X',1,1);

console.log(board.printBoard())

board.placeMark('O',3,2);

console.log(board.printBoard())

GameController.displayNewRound();

console.log("Done")
*/

GameController.playGame();



