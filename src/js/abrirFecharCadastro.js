/* 
Este arquivo serve apenas para abrir e fechar os olhos na página de cadastro
*/

const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmar-senha');
const olho = document.getElementById('eyeSvg');
const olho2 = document.getElementById('eyeSvg2');

function clicarNoOlho() {
    let tipoDoInput = senha.type == "password";
    let tipoDoInput2 = confirmarSenha.type == "password";

    if(tipoDoInput || tipoDoInput2){
        mostrar();
    }
    else{
        esconder();
    }
}

function mostrar() {
    senha.setAttribute("type", "text");
    confirmarSenha.setAttribute("type", "text");
    olho.setAttribute("src", "./img/olho-fechado.png")
    olho2.setAttribute("src", "./img/olho-fechado.png")
    
}

function esconder() {
    senha.setAttribute("type", "password");
    confirmarSenha.setAttribute("type", "password");
    olho.setAttribute("src", "./img/olho-aberto.png")
    olho2.setAttribute("src", "./img/olho-aberto.png")
}