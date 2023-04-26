const elementoNomeDeUsuario = document.getElementById('usuario');
const URLpaginaPerfil = document.getElementById('pagina-perfil');
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
// Colocar o código da api da steam aqui em baixo

const url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';
const apiKey = '14549840C8937416FF2DC4B3C3CAF9C6';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const categories = {
  'Ação': 'Action',
  'Aventura': 'Adventure',
  'RPG': 'RPG',
  'Estratégia': 'Strategy',
  'Simulação': 'Simulation',
  'Casual': 'Casual',
  'Animação': 'Animation',
  'Corrida': 'Race'
};

const container = document.getElementById('cards-categorias');
const imagesByCategory = {};

// Função para encontrar o jogo mais popular de uma categoria

function findMostPopularGame(appIds) {
  let mostPopularGame = appIds[0];
  for (let i = 1; i < appIds.length; i++) {
    if (appIds[i].popularity > mostPopularGame.popularity) {
      mostPopularGame = appIds[i];
    }
  }
  return mostPopularGame;
}

fetch(`${proxyUrl}${url}?key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const appList = data.applist.apps;
    appList.forEach(app => {
      Object.keys(categories).forEach(category => {
        const searchTerm = categories[category];
        if (app.name.includes(searchTerm)) {
          if (!imagesByCategory[category]) {
            imagesByCategory[category] = [];
          }
          imagesByCategory[category].push(app);
        }
      });
    });

    // Percorre o objeto de imagens por categoria e exibe uma imagem para cada categoria
    Object.keys(imagesByCategory).forEach(category => {
      const appIds = imagesByCategory[category];
      const mostPopularGame = findMostPopularGame(appIds);
      const appID = mostPopularGame.appid;

      fetch(`${proxyUrl}https://store.steampowered.com/api/appdetails?appids=${appID}`)
        .then(response => response.json())
        .then(data => {
          let imageUrl = data[appID].data.header_image;

          if (imageUrl == null) {
            return;
          }

          container.innerHTML += `
          <div class="card">
            <img src="${imageUrl}" alt="">
            <h1>${category}</h1>
            <a href="#"><button class="botao">Ver Jogos</button></a>
          </div>
          `;
        })
        .catch(error => console.error(error));
    });
  })
  .catch(error => console.error(error));

