document.addEventListener('DOMContentLoaded', () => {
    const words = [
        'carro', 'flor', 'livro', 'chave', 'computador',
        'caneta', 'árvore', 'cidade', 'tigre', 'música',
        'avião', 'cachorro', 'lua', 'montanha', 'pintura',
        'telefone', 'praia', 'geladeira', 'sol', 'mesa',
        'janela', 'bicicleta', 'praça', 'quadro', 'lâmpada',
        'guitarra', 'espelho', 'cadeira', 'nuvem', 'pássaro',
        'relógio', 'bolsa', 'sapato', 'ônibus', 'futebol',
        'guarda-chuva', 'televisão', 'notebook', 'telefone', 'chocolates',
        'avião', 'livro', 'refrigerante', 'porta', 'chaveiro'
    ];
    
    let selectedWord;
    const maxAttempts = 6;
    let currentAttempt;

    const gridContainer = document.querySelector('.grid-container');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const feedback = document.getElementById('feedback');

  
    function startNewGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        currentAttempt = 0;
        createGrid();
        feedback.textContent = '';
        guessButton.disabled = false;
        guessInput.value = '';
        guessInput.focus();
    }

    
    function createGrid() {
        gridContainer.innerHTML = ''; 
        gridContainer.style.gridTemplateColumns = `repeat(${selectedWord.length}, 1fr)`; 
        gridContainer.style.gridTemplateRows = `repeat(${maxAttempts}, auto)`; 

        for (let i = 0; i < maxAttempts * selectedWord.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            gridContainer.appendChild(cell);
        }
    }

    
    function updateGrid(guess) {
        const cells = document.querySelectorAll('.grid-cell');
        const startIdx = currentAttempt * selectedWord.length;

        for (let i = 0; i < selectedWord.length; i++) {
            const cell = cells[startIdx + i];
            const char = guess[i] || '';
            cell.textContent = char;

            if (char === selectedWord[i]) {
                cell.classList.add('correct');
            } else if (selectedWord.includes(char)) {
                cell.classList.add('present');
            } else {
                cell.classList.add('absent');
            }
        }
    }

    // Handle the guess
    function handleGuess() {
        const guess = guessInput.value.trim().toLowerCase();

        if (guess.length !== selectedWord.length) {
            feedback.textContent = `A palavra deve ter ${selectedWord.length} letras.`;
            return;
        }

        updateGrid(guess);
        currentAttempt++;

        if (guess === selectedWord) {
            feedback.textContent = 'Parabéns! Você acertou!';
            guessButton.disabled = true;
            setTimeout(startNewGame, 2000); 
        } else if (currentAttempt >= maxAttempts) {
            feedback.textContent = `Game Over! A palavra era "${selectedWord}".`;
            guessButton.disabled = true;
            setTimeout(startNewGame, 2000); 
        } else {
            feedback.textContent = `Tentativas restantes: ${maxAttempts - currentAttempt}`;
        }
        guessInput.value = '';
        guessInput.focus();
    }

   
    startNewGame();

    guessButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });
});
