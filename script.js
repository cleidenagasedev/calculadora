// Seleciona elementos da DOM que iremos usar
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const equalsBtn = document.getElementById('equals');

let currentInput = '0'; // Guarda o que está sendo digitado

// Função que atualiza a tela da calculadora
function updateDisplay() {
    display.textContent = currentInput;
}

// Função para adicionar número ou ponto
function appendNumber(number) {
    // Se o display estiver 0, substitui
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        // Evita dois pontos juntos
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

// Função para adicionar operadores, garantindo que não haja dois operadores seguidos
function appendOperator(operator) {
    const lastChar = currentInput.slice(-1);
    // Se último caractere for operador, troca pelo novo
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        currentInput += operator;
    }
    updateDisplay();
}

// Função para calcular resultado sem usar eval()
function calculateExpression(expression) {
    try {
        // Vamos usar a classe Function para avaliar a expressão segura
        // Apenas depois que validarmos que só tem números e operadores
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error('Expressão inválida');
        }
        // Usamos Function para evitar eval (ainda que com riscos mínimos aqui)
        // Caso queira uma solução mais robusta, teria que implementar parser manual
        const func = new Function('return ' + expression);
        return func();
    } catch (error) {
        return 'Erro';
    }
}

// Função para limpar tudo
function clearAll() {
    currentInput = '0';
    updateDisplay();
}

// Função para apagar último caractere
function deleteLast() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Adiciona eventos a todos os botões
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.getAttribute('data-num'));
        } else if (button.classList.contains('operator')) {
            appendOperator(button.getAttribute('data-op'));
        }
    });
});

// Eventos especiais dos botões limpar, apagar e igual
clearBtn.addEventListener('click', clearAll);
deleteBtn.addEventListener('click', deleteLast);

equalsBtn.addEventListener('click', () => {
    const result = calculateExpression(currentInput);
    currentInput = String(result);
    updateDisplay();
});

// Inicializa display
updateDisplay();


