/*
Este código serve para pegar os jogos da categoria passada por parametro e inserir todos os jogos populares da categoria no HTML
*/


// Colocar o código da api da steam aqui em baixo

const url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';
const apiKey = '14549840C8937416FF2DC4B3C3CAF9C6';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const categories = {
  'Ação': 'Action',
  'Aventura': 'Adventure',
  'RPG': 'RPG',
  'Estrategia': 'Strategy',
  'Simulacao': 'Simulation',
  'Casual': 'Casual',
  'Indie': 'Indie',
  'Arcade': 'Arcade'
};

const container = document.getElementById('container');
const imagesByCategory = {};

// Função para obter todos os jogos populares da categoria passada por parametro
function getPopularGamesByCategory(categoria) {
  const category = categoria;

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

      const appIds = imagesByCategory[category];
      const sortedApps = appIds.sort((a, b) => b.playtime_forever - a.playtime_forever);

      sortedApps.forEach(app => {
        const appID = app.appid;

        fetch(`${proxyUrl}https://store.steampowered.com/api/appdetails?appids=${appID}`)
          .then(response => response.json())
          .then(data => {
            const appData = data[appID].data;
            let imageUrl = appData.header_image || 'placeholder_image.jpg';
            
            // Verifica se a imagem é nula
            if (imageUrl !== 'placeholder_image.jpg') {
              let price = '';
              
              if (appData.price_overview) {
                price = appData.price_overview.final_formatted || 'Preço não disponível';
                price = price.replace('\n', '');
                price = parseFloat(price.replace(/[^0-9.-]+/g,"")) * 5.0; // Conversão de dólares para reais
                price = `R$ ${price.toFixed(2)}`;
              } else {
                price = 'Gratuito';
              }
    
              container.innerHTML += `
                <div class="card">
                    <img src="${imageUrl}" alt="">
                    <h3>${appData.name}</h3>
                    <h4>Preço: ${price}</h4>
                </div>
              `;
            }
          })
          .catch(error => console.error(error));
      });
    })
    .catch(error => console.error(error));
}

