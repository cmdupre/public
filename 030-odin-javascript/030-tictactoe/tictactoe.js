const X = "X";
const O = "O";

const engine = (function()
{
    // private:

    let cells = [];

    function evaluateCells(c1, c2, c3)
    {
        if (!cells[c1] || !cells[c2] || !cells[c3]) 
            return null;

        return (cells[c1] === cells[c2] && cells[c1] === cells[c3]);
    }

    // public:

    function markCell(mark, cell)
    {
        cells[cell] = mark;
    }

    function getEmptyCells()
    {
        let emptyCells = [];

        for (i = 0; i < 9; i++)
        {
            if (!cells[i]) emptyCells.push(i);
        }

        return emptyCells;
    }

    function getRandomUnmarkedCell()
    {
        let emptyCells = getEmptyCells();

        // return the value of a random index from empty cells
        // undefined if no cells available
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    function getWinner()
    {
        if (evaluateCells(0, 1, 2) ||
            evaluateCells(0, 3, 6) ||
            evaluateCells(0, 4, 8)) 
                return cells[0];

        if (evaluateCells(1, 4, 7)) 
            return cells[1];

        if (evaluateCells(2, 4, 6) ||
            evaluateCells(2, 5, 8))
                return cells[2];

        if (evaluateCells(3, 4, 5)) 
            return cells[3];

        if (evaluateCells(6, 7, 8)) 
            return cells[6];

        return null;
    }

    function logCells()
    {
        console.log((cells[0] ?? '*') + (cells[1] ?? '*') + (cells[2] ?? '*'));
        console.log((cells[3] ?? '*') + (cells[4] ?? '*') + (cells[5] ?? '*'));
        console.log((cells[6] ?? '*') + (cells[7] ?? '*') + (cells[8] ?? '*'));
    }

    function reset()
    {
        cells = [];
    }
    
    return {
        markCell,
        getEmptyCells,
        getComputerChoice: getRandomUnmarkedCell,
        getWinner,
        logCells,
        reset
    };
}());

const gameBoard = (function() 
{
    // private:

    const cells = [];

    function markCell(mark, cell)
    {
        cells[cell].textContent = mark;
    }

    function resetGame()
    {
        engine.reset();

        for (cell of cells)
        {
            cell.textContent = null;
        }
        
        const divResult = document.querySelector('.result');
        divResult.classList.add('hidden');
    }

    function showResult()
    {
        const result = engine.getWinner();
        const divResult = document.querySelector('.result');
        const divResultSpan = document.querySelector('.result span');

        if (result === X)
        {
            divResultSpan.textContent = "Player wins!";
        }
        else if (result === O)
        {
            divResultSpan.textContent = "Computer wins!";
        }
        else
        {
            divResultSpan.textContent = "It's a tie!";
        }

        divResult.classList.remove('hidden');
    }
    
    function playRound(e)
    {
        const cell = document.querySelector('#' + e.target.id);
        const playerChoice = cell.id.slice(4);

        if (cells[playerChoice].textContent) return;

        engine.markCell(X, playerChoice);
        markCell(X, playerChoice);

        if (engine.getWinner() || engine.getEmptyCells().length < 1)
        {
            showResult(engine.getWinner());
            return;
        }

        const computerChoice = engine.getComputerChoice();
        if (computerChoice === null)
        {
            alert('program error (getComputerChoice): failed to find an available cell');
        }

        engine.markCell(O, computerChoice);
        markCell(O, computerChoice);

        if (engine.getWinner())
        {
            showResult(engine.getWinner());
        }
    }

    // public:

    function create()
    {
        const domBoard = document.querySelector('.game-board');
        const ul = document.createElement('ul');
        domBoard.appendChild(ul);

        for (i = 0; i < 9; i++)
        {
            cells[i] = document.createElement('li');
            cells[i].id = `cell${i}`;
            cells[i].classList.add('cell');
            cells[i].addEventListener('click', playRound);
            ul.appendChild(cells[i]);
        }

        const resetBtn = document.querySelector('#resetBtn');
        resetBtn.addEventListener('click', resetGame);
    }

    return { 
        create,
    };
}());

gameBoard.create();