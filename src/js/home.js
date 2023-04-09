const caminho = window.location.search;

// Extrair o nome de usuário do caminho
const partesDoCaminho = caminho.split('/');
const nomeDeUsuario = partesDoCaminho[1];

// Exibir o nome de usuário na página
const elementoNomeDeUsuario = document.getElementById('usuario');
elementoNomeDeUsuario.innerHTML = `
    <img src="./img/perfil-icon.png" alt="">
    <h4>${nomeDeUsuario}</h4>
`
// Colocar o código da api da steam aqui em baixo