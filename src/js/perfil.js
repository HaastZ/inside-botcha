const caminho = window.location.search;
const partesCaminho = caminho.split('/');
const nomeHTML = document.getElementById('nome-usuario');
const emailHTML = document.getElementById('email-usuario');
const senhaHTML = document.getElementById('senha-usuario');
const elementoNomeDeUsuario = document.getElementById('usuario');
const nomeDeUsuario = partesCaminho[1];
const emailUsuario = partesCaminho[2];
const senhaUsuario = partesCaminho[3];
const idUsuario = partesCaminho[4];
const homeURL = document.getElementById('homeURL');
const atualizaURL = document.getElementById('atualizaURL');
elementoNomeDeUsuario.innerHTML = `
    <h4>${nomeDeUsuario}</h4>
`
nomeHTML.innerHTML = `
    <p>${nomeDeUsuario}</p>
`
emailHTML.innerHTML = `
    <p>${emailUsuario}</p>
`
senhaHTML.innerHTML = `
    <p>${senhaUsuario}</p>
`

homeURL.addEventListener('click', ()=>{
    const urlDestino = `./home.html?/${nomeDeUsuario}/${emailUsuario}/${senhaUsuario}`;
    window.location = urlDestino;
})

atualizaURL.addEventListener('click', ()=>{
    const urlDestino = `./perfil.html?/${nomeDeUsuario}/${emailUsuario}/${senhaUsuario}/${idUsuario}`;
    window.location = urlDestino;
})