let canvas = document.getElementById("canvas");
let contexto = canvas.getContext("2d");
let desenhando = false;
let cor = "#000000"; // Cor padrão, preta
let colorPicker = document.getElementById("colorPicker");
let brushSizeInput = document.getElementById("brushSize");
let eraserToolButton = document.getElementById("eraserTool");
let isErasing = false;
let undoButton = document.getElementById("undoButton");
let desenhos = []; // Array para armazenar os desenhos

colorPicker.addEventListener("input", function() {
    cor = colorPicker.value;
});

brushSizeInput.addEventListener("input", function() {
    let newSize = parseInt(brushSizeInput.value);
    contexto.lineWidth = newSize;
});

// Evento para ativar ou desativar a ferramenta de borracha
eraserToolButton.addEventListener("click", function() {
    if (isErasing) {
        isErasing = false;
        eraserToolButton.textContent = "Borracha";
        contexto.globalCompositeOperation = "source-over"; // Restaura a operação de desenho padrão
    } else {
        isErasing = true;
        eraserToolButton.textContent = "Desenhar";
        contexto.globalCompositeOperation = "destination-out"; // Define a operação para apagar
        contexto.strokeStyle = "rgba(0,0,0,0)"; // Define a cor do traço como transparente para a borracha
    }
});

// Evento para desfazer a última ação
undoButton.addEventListener("click", function() {
    if (desenhos.length > 0) {
        desenhos.pop(); // Remove o último desenho do array
        limparCanvas(); // Limpa o canvas
        redesenharDesenhos(); // Redesenha todos os desenhos, exceto o último
    }
});

canvas.addEventListener("mousedown", function(event) {
    desenhando = true;
    contexto.beginPath();
    contexto.moveTo(event.offsetX, event.offsetY);
    contexto.strokeStyle = cor;
});

canvas.addEventListener("mousemove", function(event) {
    if (desenhando) {
        contexto.lineTo(event.offsetX, event.offsetY);
        contexto.stroke();
    }
});

canvas.addEventListener("mouseup", function(event) {
    desenhando = false;
    salvarDesenho(); // Salva o desenho atual no array
});

function salvarDesenho() {
    let desenho = contexto.getImageData(0, 0, canvas.width, canvas.height);
    desenhos.push(desenho);
}

function limparCanvas() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
}

function redesenharDesenhos() {
    for (let i = 0; i < desenhos.length; i++) {
        contexto.putImageData(desenhos[i], 0, 0);
    }
}

