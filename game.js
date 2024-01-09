


const screenController = (function(){
    let turns = 0;
    const game = GameController();
    const header = document.querySelector('.header');
    const screenBoard = document.querySelector('.board');
    
    const startGame = function(){
            game.setOrder()
            updateScreen()
            game.playGame()
        
        
    }

    const finishGame = function(){
        console.log("GAME OVER")
        //game.endGame()
    }

   

    const updateScreen = function(){
        screenBoard.textContent = "";
        let num = 1;
        const currBoard = game.getBoard();

        
        for(let i = 0;i < 3;i++){
            for(let k = 0;k< 3;k++){
                const cellButton = document.createElement('button')
                cellButton.id = String(num);
                cellButton.textContent = currBoard[i][k]
                cellButton.addEventListener('click',handleClick)



                num++;
                currBoard[i][k] = cellButton.textContent
                screenBoard.appendChild(cellButton)


              
            }
        }
        console.log(`BOARD: ${currBoard}`)

        
    }

    const handleClick = function(event){
        turns++;
        if(turns < 9){
            let currBoard = game.getBoard()
            const clicked = event.target
            console.log(clicked)
            clicked.textContent = "X"
            let place = clicked.id
            let num = 1
            for(let i = 0;i < 3;i++){
                for(let k = 0;k < 3;k++){
                    if(num === parseInt(place)){
                        currBoard[i][k] = clicked.textContent
                    }
                    num++
                }
            }
            //currBoard.board
            console.log('Button clicked! Updating screen...');
            let players = game.getPlayers();
            players[0].turn = false
        
            players[1].turn = true;
            updateScreen();

            game.playGame()
        }
        else{
            let currBoard = game.getBoard()
            const clicked = event.target
            console.log(clicked)
            clicked.textContent = "X"
            let place = clicked.id
            let num = 1
            for(let i = 0;i < 3;i++){
                for(let k = 0;k < 3;k++){
                    if(num === parseInt(place)){
                        currBoard[i][k] = clicked.textContent
                    }
                    num++
                }
            }
            //currBoard.board
            console.log('Button clicked! Updating screen...');
            let players = game.getPlayers();
            players[0].turn = false
        
            players[1].turn = true;
            updateScreen();
        }
        
    }

    const getTurns = function(){
        return turns
    }

    const setTurns = function(newTurns){
        turns = newTurns
    }

    

    

    return { startGame,updateScreen,finishGame,getTurns,setTurns }

    

    

    


    

})();

//const runGame = screenController();
screenController.startGame();





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
        screenController.setTurns(screenController.getTurns()+1)
        //let gameStatus;

        if(player1.turn === true){
            //active = player1.symbol;
           // gameStatus = gameboard.placeMark(active);
            //gameboard.placeMark(player1)
        }
        else{
            active = player2.symbol;
           // gameStatus = gameboard.placeMark(active);
            gameStatus = gameboard.placeMark(player2)
        }

        console.log(`It is ${active}'s turn...`)

        
        
        /*
        if(gameStatus === true){
            return 'off'
        }
        */
        
        

        
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

        //return 

        /*
        if(gameboard.getSpots() === gameboard.MAXSIZE){
            //GameController.endGame()
            //screenController.endGame();
            return true;
        }
        */
        


        

        




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
    let humanInput;
    const rows = 3;
    const columns = 3;
    const board = [];
    let currentSpots = 0;
    const MAXSIZE = 9;

    for(let i = 0;i < rows;i++){
        board[i] = [];
        for(let j = 0;j < columns;j++){
            board[i].push("")
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

    const getInput = function(player){
        let rowColList = [];
        if(player.humanOrcpu === 'cpu'){
            rowColList[0] = (Math.floor(Math.random() * 3) + 1);
            rowColList[1] = (Math.floor(Math.random() * 3) + 1)
        }
        else{
           // humanInput = true;
           /* while(humanInput === true){

            }
            */
        }
        return rowColList;
    }
    /*
    const setHumanInput = function(human){
        humanInput = human;
    }
    */

    const alignMark = (player,placedMark) => {
        // possible future imlementation, if computer use this method of input, if human use other method of input
        let holder = getInput(player)
        let col = holder[0];
        let row = holder[1];
        if(currentSpots === MAXSIZE){
            //GameController.endGame();
            screenController.finishGame();
            //endGame();
            //return true;
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
                                    holder = getInput(player)
                                    col = holder[0];
                                    row = holder[1];
                                    break;
                                    //alignMark(player,false);
    
                                }
                                else{
                                    currentSpots++;
                                    placedMark = true;
                                    board[i][k] = player.symbol
                                    let rowCount = 0;
                                    let colCount = 0;
                                    for(let j = 0;j < 3;j++){
                                        if(board[i][j] === player.symbol){
                                            rowCount = rowCount + 1;
                                        }
                                    }
                                    if(rowCount === 3){
                                        console.log(`${player.symbol} wins!`)
                                        //GameController.endGame();
                                        screenController.finishGame();
                                        //endGame();
                                        //return true;
                                    }
                                    
                                    for(let h = 0;h < 3;h++){
                                        if(board[h][k] === player.symbol){
                                            colCount = colCount + 1;
                                        }
                                    }
                                    if(colCount === 3){
                                        console.log(`${player.symbol} wins!`)
                                        //GameController.endGame();
                                        screenController.finishGame();
                                        //endGame();
                                        //return true;
                                    }

                                    let diag = checkDiagnol(player.symbol,board);

                                    if(diag === true){
                                        console.log(`${player.symbol} wins!`)
                                        //GameController.endGame();
                                        screenController.finishGame();
                                        //endGame();
                                        //return true;
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
        let didGameEnd = alignMark(player,placedMark)
        return didGameEnd;
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


function GameController(){
    //let keepPlaying = 'off';
    let gameOver = false;
    
    

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

    let game = Game(players,board);
    
    
    const playGame = function(){
        if(screenController.getTurns() === 0){
            game.decideOrder
            
        }
        /*
        currentGame = Game(players,board);
        screenController.updateScreen();
        console.log(`${players[0].symbol} is the humie. ${players[1].symbol} is the cpu`)
        currentGame.decideOrder();
        */
        /*
        while(keepPlaying === 'on'){
            currentGame.takeTurn();
        }
        */
       if(players[1].turn === true){
           game.takeTurn()
           screenController.updateScreen()
       }
       else{
           console.log("Human turn")
       }
       /*
        while(keepPlaying==='on'){
            
            keepPlaying = currentGame.takeTurn();
            screenController.updateScreen();
        }
        */
       /*
        if(keepPlaying === 'off'){
            endGame();
        }
        */
       
        
        
    }

    const endGame = function(){
        //keepPlaying = 'off';
        gameOver = true
        console.log("Game has ended");
    }
    
   const displayNewRound = function(){
        console.log(board.printBoard());
   }

    const setStatus = function(status){
        keepPlaying = status;
        
    }

    

    const setBoard = function(sboard){
        board.setHumanInput(sboard)
    }

    const getGame = function(){
        return game;
    }

    const getBoard = function(){
        return board.printBoard();
    }

    const getGameOver = function(){
        return gameOver;
    }

    const setGameOver = function(status){
        gameOver = status;
    }

    const getPlayers = function(){
        return players
    }

    const reportPlayers = function(){
        console.log(`${player1} is the human, ${player2} is the cpu`);
    }

    const setOrder = function(){
        game.decideOrder()
    }


    return{
            
            setStatus,getGame,reportPlayers,displayNewRound,playGame,endGame,getBoard,setBoard,getPlayers,getGameOver,setGameOver,setOrder
        }
    
}










