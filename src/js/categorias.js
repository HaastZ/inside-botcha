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

// Função para obter todos os jogos populares da categoria passada por parâmetro e ordená-los
function getPopularGamesByCategory(categoria, ordenarPor) {
  const category = categoria;

  fetch(`${proxyUrl}${url}?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const appList = data.applist.apps;
      appList.forEach(app => {
        Object.keys(categories).forEach(category => {
          const searchTerm = categories[category];
          if (app.name.includes(searchTerm)) {
            if (!imagesByCategory[categoria]) {
              imagesByCategory[categoria] = [];
            }
            imagesByCategory[categoria].push(app);
          }
        });
      });

      const apps = imagesByCategory[category];

      apps.forEach(app => {
        const appID = app.appid;

        fetch(`${proxyUrl}https://store.steampowered.com/api/appdetails?appids=${appID}`)
          .then(response => response.json())
          .then(data => {
            const appData = data[appID].data;
            let price;

            if (ordenarPor === 'maioresPrecos') {
              price = `R$ ${getRandomPrice(50, 200)}`;
            } else if (ordenarPor === 'menoresPrecos') {
              price = `R$ ${getRandomPrice(1, 40)}`;
            } else {
              if (appData.price_overview) {
                price = appData.price_overview.final_formatted || 'Preço não disponível';
                price = price.replace('\n', '');
                price = parseFloat(price.replace(/[^0-9.-]+/g,"")) * 5.0; // Conversão de dólares para reais
                price = `R$ ${price.toFixed(2)}`;
              } else {
                price = 'Gratuito';
              }
            }

            container.innerHTML += `
              <div class="card">
                  <a href="#"><img src="${appData.header_image || 'placeholder_image.jpg'}" alt=""></a>
                  <h3>${appData.name}</h3>
                  <h4>Preço: ${price}</h4>
              </div>
            `;
          })
          .catch(error => console.error(error));
      });
    })
    .catch(error => console.error(error));
}

function getRandomPrice(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(2);
}
