// aumentar o intervalo de tentativas
// limitar o numero de tentativas
// desabilitar e habilitar o input

let secret_number = getSecretNumber();
let tentativas = 2;

function getSecretNumber(){
    return Math.floor(Math.random() * 10 + 1);
}

function exibeTextoTag(tag, texto){
    let varTag = document.querySelector(tag);
    varTag.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {pitch: 1});
}

function inicializaTexto(){
    exibeTextoTag('h1', 'Número Secreto');
    exibeTextoTag('p', 'Escolha um número entre 1 e 10');
}

inicializaTexto();

function verificarChute() {
    let guess = parseInt(document.querySelector('input').value, 10);
    
    if (isNaN(guess) || guess < 1 || guess > 10) {
        exibeTextoTag('p', 'Por favor, insira um número válido entre 1 e 10.');
        return; // Não descontar tentativas se o input for inválido
    }

    tentativas--;

    if (guess === secret_number) {
        exibeTextoTag('h1', 'Parabéns, você acertou!');
        const word_attempts = (5 - tentativas) > 1 ? 'tentativas' : 'tentativa';
        exibeTextoTag('p', `Você acertou o número secreto em ${5 - tentativas} ${word_attempts}!`);
        finalizarJogo();
    } else {
        if (tentativas > 0) {
            if (guess < secret_number) {
                exibeTextoTag('p', 'Tente novamente, o número é maior.');
            } else {
                exibeTextoTag('p', 'Tente novamente, o número é menor.');
            }
        } else {
            exibeTextoTag('h1', 'Game Over');
            exibeTextoTag('p', `Você esgotou suas tentativas. O número secreto era ${secret_number}.`);
            finalizarJogo();
        }
    }
    limpaInput();
}

function limpaInput(){
    document.querySelector('input').value = '';
}

function finalizarJogo() {
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('chutar').setAttribute('disabled', true);
    document.querySelector('input').setAttribute('disabled', true);
}

function reiniciarJogo() {
    tentativas = 5;
    secret_number = getSecretNumber();
    inicializaTexto();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
    document.querySelector('input').removeAttribute('disabled');
    limpaInput();
}
