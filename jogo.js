const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const inputPalavra = document.getElementById('palavra-secreta');
const btnComecar = document.getElementById('btn-comecar');

let palavraSecreta = '';
let letrasChutadas = [];
let tracos = [];
let erros = 0;
let maxErros = 6;
let imagem = document.getElementById('imagem');
let textoPalavra = document.getElementById('palavra');
let textoMensagem = document.getElementById('mensagem');
let textoErros = document.getElementById('erros');
let botoesLetras = document.querySelectorAll('.letra');

btnComecar.addEventListener('click', function () {
    palavraSecreta = inputPalavra.value.trim().toUpperCase();

    if (palavraSecreta === "") {
        alert("Por favor, insira uma palavra antes de começar!");
        return;
    }

    telaInicio.classList.add('hidden');
    telaJogo.classList.remove('hidden');

    iniciarJogo();
});

function iniciarJogo() {
    letrasChutadas = [];
    erros = 0;
    tracos = [];
    for (let i = 0; i < palavraSecreta.length; i++) {
        tracos.push('_');
    }
    textoPalavra.textContent = tracos.join(' ');
    textoMensagem.textContent = '';
    textoMensagem.className = '';
    textoErros.textContent = 'Erros: 0 de ' + maxErros;
    imagem.src = 'img/img1.png';

    botoesLetras.forEach(function (botao) {
        botao.disabled = false;
    });
}

botoesLetras.forEach(function (botao) {
    botao.addEventListener('click', function () {
        botao.disabled = true;
        verificarLetra(botao.textContent);
    });
});

function verificarLetter(letra) { 
    verificarLetra(letra);
}

function verificarLetra(letra) {
    letrasChutadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
                tracos[i] = letra;
            }
        }
        textoPalavra.textContent = tracos.join(' ');
    } else {
        erros++;
        imagem.src = 'img/img' + (erros + 1) + '.png';
        textoErros.textContent = 'Erros: ' + erros + ' de ' + maxErros;
    }
    verificarFimDeJogo();
}

function verificarFimDeJogo() {
    if (!tracos.includes('_')) {
        textoMensagem.textContent = 'Parabéns, você venceu!';
        textoMensagem.className = 'vitoria';
        desativarTeclado();
    }

    if (erros === maxErros) {
        textoMensagem.textContent = 'Fim de Jogo! A palavra era: ' + palavraSecreta;
        textoMensagem.className = 'derrota';
        textoPalavra.textContent = palavraSecreta.split('').join(' ');
        imagem.src = 'img/img7.png';
        desativarTeclado();
    }
}

function desativarTeclado() {
    botoesLetras.forEach(function (botao) {
        botao.disabled = true;
    });
}

function reiniciarJogo(){
    window.location.reload()
}
