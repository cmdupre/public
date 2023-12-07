import aiFactory from "./aiFactory.js";
import gameboardFactory from "./gameboardFactory.js";
import humanFactory from "./humanFactory.js";
import pointFactory from "./pointFactory.js";
import shipFactory from "./shipFactory.js";

const dom = {
    form: document.getElementById('new-player-form'),
    nameInput: document.getElementById('player-name-input'),
    name: document.getElementById('player-name'),
    dashboard: document.getElementById('dashboard'),
    startNewGameButton: document.getElementById('start-new-game-button'),
    human: {
        gameboard: document.getElementById('gameboard'),
        shipHealth: {
            1: document.getElementById('ship-1-health'),
            2: document.getElementById('ship-2-health'),
            3: document.getElementById('ship-3-health'),
            4: document.getElementById('ship-4-health'),
            5: document.getElementById('ship-5-health'),
        },
    },
    ai: {
        gameboard: document.getElementById('ai-gameboard'),
        shipHealth: {
            1: document.getElementById('ai-ship-1-health'),
            2: document.getElementById('ai-ship-2-health'),
            3: document.getElementById('ai-ship-3-health'),
            4: document.getElementById('ai-ship-4-health'),
            5: document.getElementById('ai-ship-5-health'),
        },
    },
};

let human = null;
let ai = null;

// todo: would like to link html/css/consts for the grid size.
const gbSizeX = 10;
const gbSizeY = 10;

dom.startNewGameButton.addEventListener('click', onStartNewGameButton);

reset();

function reset() {
    dom.dashboard.classList.add('hidden');
    dom.form.classList.remove('hidden');
    const newHumanGameboard = document.createElement('div');
    const newAiGameboard = document.createElement('div');
    const newAiGameboardTitle = document.createElement('span');
    newAiGameboardTitle.textContent = 'RADAR';
    newAiGameboard.appendChild(newAiGameboardTitle);
    for (let y = gbSizeY - 1; y >= 0; y--) {
        for (let x = 0; x < gbSizeX; x++) {
            let cell = document.createElement('span');
            cell.id = x + '-' + y;
            cell.classList.add('cell');
            cell.addEventListener('click', cellClicked);
            newHumanGameboard.appendChild(cell);
            cell = document.createElement('span');
            cell.id = 'ai-' + x + '-' + y;
            cell.classList.add('ai-cell');
            newAiGameboard.appendChild(cell);
        }
    }
    newHumanGameboard.id = dom.human.gameboard.id;
    dom.human.gameboard.replaceWith(newHumanGameboard);
    newAiGameboard.id = dom.ai.gameboard.id;
    dom.ai.gameboard.replaceWith(newAiGameboard);
}

function onStartNewGameButton(e) {
    e.preventDefault();
    // todo: validation
    const humanGb = gameboardFactory.create(gbSizeX, gbSizeY);
    const aiGb = gameboardFactory.create(gbSizeX, gbSizeY);
    humanGb.placeShipsRandom([
        shipFactory.createHorizontal(5),
        shipFactory.createVertical(4),
        shipFactory.createHorizontal(3),
        shipFactory.createVertical(2),
        shipFactory.createHorizontal(1),
    ]);
    aiGb.placeShipsRandom([
        shipFactory.createHorizontal(5),
        shipFactory.createVertical(4),
        shipFactory.createHorizontal(3),
        shipFactory.createVertical(2),
        shipFactory.createHorizontal(1),
    ]);
    human = humanFactory.create(dom.nameInput.value, aiGb);
    ai = aiFactory.create(humanGb);
    dom.name.textContent = `Greetings, Captain ${human.getName()}`;
    updateHealth();
    dom.form.classList.add('hidden');
    dom.dashboard.classList.remove('hidden');
}

function cellClicked(e) {
    if (e.target.textContent !== '') return;
    if (!isLive()) return;
    const x = Number(e.target.id.split('-')[0]);
    const y = Number(e.target.id.split('-')[1]);
    let point = pointFactory.create(x, y);
    const result = human.attack(point);
    updateHealth();
    e.target.textContent = 'X';
    if (result) {
        e.target.classList.add('hit');
        updateHealth();
        if (!human.getGameboard().isLive())
            dom.name.textContent = "VICTORY!";
        return;
    }
    e.target.classList.add('miss');
    while (true) {
        const aiAttack = ai.attack(gbSizeX, gbSizeY);
        const aiAttackCell = document.getElementById(`ai-${aiAttack.point.x}-${aiAttack.point.y}`);
        updateHealth();
        aiAttackCell.textContent = 'X';
        if (!aiAttack.result) {
            aiAttackCell.classList.add('miss');
            return;
        }
        aiAttackCell.classList.add('hit');
        updateHealth();
        if (!ai.getGameboard().isLive())
            dom.name.textContent = "You LOSE!";
    }
}

function isLive() {
    if (human === null || ai === null) return false;
    if (!human.getGameboard().isLive()) return false;
    if (!ai.getGameboard().isLive()) return false;
    return true;
}

function updateHealth() {
    for (let s of ai.getGameboard().getShips()) {
        const length = s.getLength();
        dom.human.shipHealth[length].textContent = length - s.getHits();
        if (s.isSunk()) dom.human.shipHealth[length].classList.add('sunk');
    }
    for (let s of human.getGameboard().getShips()) {
        const length = s.getLength();
        dom.ai.shipHealth[length].textContent = length - s.getHits();
        if (s.isSunk()) dom.ai.shipHealth[length].classList.add('sunk');
    }
}