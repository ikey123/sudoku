document.addEventListener('DOMContentLoaded', () => {
    const sudokuGrid = document.getElementById('sudoku');
    const generateButton = document.getElementById('generate');
    const solveButton = document.getElementById('solve');
    let solution = null; // 存储当前数独解决方案

    solution = generateFullSolution();
    const puzzle = createPuzzleFromSolution(solution, 0.5); // 50% 的格子为空
    initializeGrid(puzzle);

    // 初始化数独网格
    function initializeGrid(puzzle) {
        sudokuGrid.innerHTML = '';
        for (let i = 0; i < 81; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            if (puzzle && puzzle[i] != null) {
                input.value = puzzle[i];
                input.readOnly = true; // 已填入的数字不允许修改
            } else {
                input.addEventListener('input', handleInput(i));
            }
            sudokuGrid.appendChild(input);
        }
    }

    // 处理输入事件
    function handleInput(index) {
        return function (event) {
            const value = parseInt(event.target.value, 10);
            if (value === solution[index]) {
                event.target.style.color = 'green'; // 正确答案显示绿色
            } else {
                event.target.style.color = 'red';   // 错误答案显示红色
            }
        };
    }

    // 生成新的数独谜题
    generateButton.addEventListener('click', () => {
        solution = generateFullSolution();
        const puzzle = createPuzzleFromSolution(solution, 0.5); // 50% 的格子为空
        initializeGrid(puzzle);
    });

    // 处理“给出答案”按钮的点击
    solveButton.addEventListener('click', () => {
        if (solution) {
            fillAllAnswers();
        }
    });

    function fillAllAnswers() {
        const inputs = sudokuGrid.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                inputs[i].value = solution[i];
                inputs[i].style.color = 'blue'; // 将文字颜色设置为黄色
            }else{

            }
        }
    }

    // 从完整的解决方案中创建一个数独谜题
    function createPuzzleFromSolution(solution, blankProbability) {
        return solution.map(num => (Math.random() < blankProbability ? null : num));
    }

    // 生成一个有效的数独解决方案
    function generateFullSolution() {
        let board = Array(81).fill(null);
        fillBoard(board, 0);
        return board;
    }

    // 尝试填充数独板
    function fillBoard(board, index) {
        if (index >= board.length) {
            return true;
        }

        const row = Math.floor(index / 9);
        const col = index % 9;

        const shuffledNumbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of shuffledNumbers) {
            if (isSafe(board, row, col, num)) {
                board[index] = num;
                if (fillBoard(board, index + 1)) {
                    return true;
                }
                board[index] = null;
            }
        }

        return false;
    }

    // 检查数字是否安全
    function isSafe(board, row, col, num) {
        // 检查行
        for (let x = 0; x < 9; x++) {
            if (board[row * 9 + x] === num) {
                return false;
            }
        }

        // 检查列
        for (let x = 0; x < 9; x++) {
            if (board[col + x * 9] === num) {
                return false;
            }
        }

        // 检查 3x3 方块
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (board[(startRow + x) * 9 + (startCol + y)] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // 打乱数组
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

const testDB = document.getElementById('testDB');
testDB=addEventListener('click', () => {
     handler();
    });


    
});
