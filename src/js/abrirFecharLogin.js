/* 
Este arquivo serve apenas para abrir e fechar os olhos na página de login

*/

const senha = document.getElementById('senha');
const olho = document.getElementById('eyeSvg');

function clicarNoOlho() {
    let tipoDoInput = senha.type == "password";

    if(tipoDoInput){
        mostrar();
    }
    else{
        esconder();
    }
}

function mostrar() {
    senha.setAttribute("type", "text");
    olho.setAttribute("src", "./img/olho-fechado.png")
    
}

function esconder() {
    senha.setAttribute("type", "password");
    olho.setAttribute("src", "./img/olho-aberto.png")
}