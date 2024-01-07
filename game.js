function Player(){
    let playerSymbol;
    let playerTurn;

    const setPlayer = (symbol,turn) =>{
        playerSymbol = symbol; 
        playerTurn = turn;
    }

    const getSymbol = () =>{
        return playerSymbol;
    }

    const getTurn = () =>{
        return playerTurn;
    }

    return { setPlayer,getSymbol,getTurn };

    
}

function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0;i < rows;i++){
        board[i] = [];
        for(let j = 0;j < columns;j++){
            board[i].push([])
        }
    }

    const alignMark = (player,col,row) => {
        for(let i = 0; i < row;i++){
                
            for(let j = 0;j < col;j++){
                if((i+1 === row || row === 0) && (j+1 === col || col === 0)){
                    board[i][j] = player;
                }
            }
        }
        
    }

    const printBoard = () => board;

    const placeMark = (player,col,row) => {
        alignMark(player,col,row)
    }

    return {printBoard,placeMark}
}


const GameController = (function(){
    let game = 'off';
})



    


const board = Gameboard();

console.log(board.printBoard())

board.placeMark('X',1,1);

console.log(board.printBoard())

board.placeMark('O',3,2);

console.log(board.printBoard())

