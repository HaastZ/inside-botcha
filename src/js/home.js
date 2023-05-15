
// Colocar o código da api da steam aqui em baixo

const url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';
const apiKey = '14549840C8937416FF2DC4B3C3CAF9C6';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const categories = {
  'FPS': 'FPS',
  'Aventura': 'Adventure',
  'RPG': 'RPG',
  'Estrategia': 'Strategy',
  'Simulacao': 'Simulation',
  'Arcade': 'Arcade',
  'Casual': 'Casual',
  'Corrida': 'Race',
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
            <a href="${category}.html?/${nomeDeUsuario}/${email}/${senha}"><button class="botao">Ver Jogos</button></a>
          </div>
          `;
        })
        .catch(error => console.error(error));
    });
  })
  .catch(error => console.error(error));

