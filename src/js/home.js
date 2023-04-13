const elementoNomeDeUsuario = document.getElementById('usuario');
const URLpaginaPerfil = document.getElementById('pagina-perfil');
const caminho = window.location.search;

// Extrair o nome de usuário do caminho
const partesDoCaminho = caminho.split('/');
const nomeDeUsuario = partesDoCaminho[1];
const email = partesDoCaminho[2];
const senha = partesDoCaminho[3];
// Exibir o nome de usuário na página

elementoNomeDeUsuario.innerHTML = `
    <h4>${nomeDeUsuario}</h4>
`
URLpaginaPerfil.addEventListener('click', ()=>{
    const urlDestino = `./perfil.html?/${nomeDeUsuario}/${email}/${senha}`;
    window.location = urlDestino;
})
// Colocar o código da api da steam aqui em baixo