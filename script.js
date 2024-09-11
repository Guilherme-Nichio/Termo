document.addEventListener('DOMContentLoaded', () => {
    const words = [
        'abacaxi', 'aberta', 'abismo', 'abóbora', 'aborto', 'abstrato', 'abuso', 'acacia', 'acerto', 'adotar',
        'afetar', 'agente', 'alface', 'alegria', 'alergia', 'aluno', 'amargo', 'amigo', 'ampla', 'anexo',
        'andor', 'anima', 'apelo', 'aroma', 'artigo', 'ascenso', 'atual', 'banco', 'barco', 'basta',
        'beijo', 'belo', 'bicho', 'bingo', 'bloco', 'bola', 'bolo', 'bora', 'bote', 'brava',
        'brisa', 'broto', 'bufalo', 'cabra', 'cacho', 'cadeira', 'caldo', 'campo', 'cana', 'carro',
        'carta', 'caso', 'censo', 'ceva', 'chave', 'cheio', 'chinelo', 'chope', 'cima', 'cinto',
        'claro', 'cobra', 'colher', 'corpo', 'cravo', 'croma', 'crua', 'cuba', 'cubro', 'dados',
        'dado', 'dança', 'deixa', 'denso', 'desenho', 'dieta', 'doido', 'dolor', 'dor', 'dente',
        'duas', 'ecra', 'egito', 'eleito', 'enxuto', 'escuro', 'esfera', 'extra', 'faro', 'feira',
        'festa', 'fila', 'final', 'folha', 'forte', 'futebol', 'galho', 'garfo', 'gato', 'gelado',
        'gente', 'grava', 'grito', 'havia', 'homem', 'horo', 'hotel', 'ilha', 'invasão', 'isolado',
        'jovem', 'juiz', 'letra', 'linda', 'lupa', 'macaco', 'manga', 'marco', 'mato', 'meia',
        'mesa', 'messa', 'milha', 'morte', 'nado', 'natal', 'navio', 'novo', 'olho', 'opção',
        'orlando', 'ouvido', 'painel', 'pano', 'para', 'pasta', 'pedra', 'peixe', 'pelo', 'pensar',
        'perda', 'peso', 'piso', 'plano', 'prata', 'primeira', 'quase', 'raiva', 'remar', 'risco',
        'rocha', 'rosto', 'salto', 'seco', 'sede', 'seguir', 'sentar', 'seu', 'som', 'sopa',
        'sorte', 'sua', 'tabua', 'tela', 'temor', 'tenda', 'teor', 'terra', 'tigre', 'toalha',
        'topo', 'trago', 'troca', 'unico', 'urso', 'vaso', 'vela', 'venda', 'verão', 'veto',
        'viagem', 'vivo', 'voo', 'voltar', 'vulcão', 'abate', 'abóbora', 'adaga', 'afins', 'agile',
        'ajuda', 'alva', 'anjo', 'aula', 'barro', 'beira', 'bicho', 'bico', 'borda', 'broto',
        'bruta', 'cabelo', 'calor', 'cabelo', 'caminho', 'câncer', 'carro', 'caso', 'ciclo', 'clima',
        'comer', 'couro', 'cravo', 'cria', 'crua', 'cuba', 'cura', 'dado', 'dente', 'dica', 'dieta',
        'droga', 'duas', 'fada', 'fama', 'fauna', 'feliz', 'folha', 'fuma', 'fundo', 'furo',
        'garra', 'garfo', 'gema', 'gelo', 'globo', 'grava', 'guelra', 'guitarra', 'havia', 'hotel',
        'hugo', 'igreja', 'ilha', 'inova', 'junho', 'juro', 'leite', 'livro', 'lona', 'lugar',
        'maca', 'massa', 'meia', 'melo', 'metro', 'morte', 'moto', 'nado', 'neta', 'ninja',
        'norte', 'ocasião', 'olho', 'onça', 'ora', 'paca', 'pago', 'panela', 'pasta', 'pato',
        'peca', 'pelo', 'pelo', 'pelo', 'pequeno', 'piso', 'plano', 'prata', 'quase', 'raiva',
        'relva', 'roda', 'sapo', 'seiva', 'serio', 'tela', 'temor', 'tigre', 'topo', 'tudo',
        'vale', 'vão', 'viva', 'você', 'zebra', 'zelo', 'zincado'
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
