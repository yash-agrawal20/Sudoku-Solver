var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}

//Variable to hold sudoku
var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let Get_Easy_Puzzle = document.getElementById('Get_Easy_Puzzle')
let Get_Medium_Puzzle = document.getElementById('Get_Medium_Puzzle')
let Get_Hard_Puzzle = document.getElementById('Get_Hard_Puzzle')
let Get_Random_Puzzle = document.getElementById('Get_Random_Puzzle')
let Backtracking_Solution = document.getElementById('Backtracking_Solution')

Get_Easy_Puzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

Get_Medium_Puzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=medium')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

Get_Hard_Puzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=hard')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

Get_Random_Puzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=random')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

Backtracking_Solution.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function isvalid(board, i, j, num, n){

    for(var k = 0; k < n; k++){

        if(board[i][k] == num){
            return false;
        }

        if(board[k][j] == num){
            return false;
        }

        if(board[3*(Math.floor(i/3)) + Math.floor(k/3)][3*(Math.floor(j/3)) + k%3] == num){
            return false;
        }
    }

    return true;
}

function SudokuSolver(board, i, j, n){

    //Base Case
    if(i == n){
        // Print(board, n);
        FillBoard(board);
        return true;
    }

    if(j == n){
        return SudokuSolver(board, i+1, 0, n);
    }

    if(board[i][j] != 0){
        return SudokuSolver(board, i, j+1, n);
    }
    
    for(var num = 1; num <= 9; num++){

        if(isvalid(board, i, j, num, n) == true){
            board[i][j] = num;
            var ans = SudokuSolver(board, i, j+1, n);

            //Backtracking
            if(ans == true) return true;
            else board[i][j] = 0;
        }
    }

    return false;
}
