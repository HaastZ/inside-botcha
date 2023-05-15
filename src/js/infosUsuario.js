const elementoNomeDeUsuario = document.getElementById('usuario');
const URLpaginaPerfil = document.getElementById('pagina-perfil');
const URLpaginaPrincipal = document.getElementById('pagina-principal');
const caminho = window.location.search;

// Extrair o nome de usuário do caminho
const partesDoCaminho = caminho.split('/');
const nomeDeUsuario = partesDoCaminho[1];
const email = partesDoCaminho[2];
const senha = partesDoCaminho[3];
const id = partesDoCaminho[4];
// Exibir o nome de usuário na página

elementoNomeDeUsuario.innerHTML = `
    <h4>${nomeDeUsuario}</h4>
`
URLpaginaPerfil.addEventListener('click', ()=>{
    const urlDestino = `./perfil.html?/${nomeDeUsuario}/${email}/${senha}/${id}`;
    window.location = urlDestino;
})

URLpaginaPrincipal.addEventListener('click', ()=>{
  const urlDestino = `./home.html?/${nomeDeUsuario}/${email}/${senha}/${id}`;
  window.location = urlDestino;
})