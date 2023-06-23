const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

const performSearch = () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    return;
  }

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  fetch(`${proxyUrl}https://api.steampowered.com/ISteamApps/GetAppList/v2/`)
    .then(response => response.json())
    .then(data => {
      const games = data.applist.apps;
      const searchResults = [];

      const fetchPromises = [];

      let delay = 0;

      games.forEach(game => {
        const appId = game.appid;
        const gameName = game.name.toLowerCase();

        if (gameName.includes(searchTerm.toLowerCase())) {
          const fetchPromise = new Promise(resolve => {
            setTimeout(() => {
              fetch(`${proxyUrl}https://store.steampowered.com/api/appdetails?appids=${appId}&key=14549840C8937416FF2DC4B3C3CAF9C6`)
                .then(response => response.json())
                .then(data => {
                  const appData = Object.values(data)[0];

                  if (appData && appData.success) {
                    const gameData = appData.data;

                    if (gameData.type === 'game') {
                      let imageUrl = gameData.header_image || 'placeholder_image.jpg';

                      if (imageUrl !== 'placeholder_image.jpg') {
                        let price = '';

                        if (gameData.price_overview) {
                          price = gameData.price_overview.final_formatted || 'Preço não disponível';
                          price = price.replace('\n', '');
                          price = parseFloat(price.replace(/[^0-9.-]+/g, '')) * 5.0;
                          price = `R$ ${price.toFixed(2)}`;
                        } else {
                          price = 'Gratuito';
                        }

                        resolve({
                          name: gameData.name,
                          image: imageUrl,
                          price: price
                        });
                      } else {
                        resolve(null);
                      }
                    } else {
                      resolve(null);
                    }
                  } else {
                    resolve(null);
                  }
                })
                .catch(error => {
                  console.error(error);
                  resolve(null);
                });
            }, delay);

            delay += 100;
          });

          fetchPromises.push(fetchPromise);
        }
      });

      Promise.all(fetchPromises).then(results => {
        const filteredResults = results.filter(result => result !== null);

        if (filteredResults.length > 0) {
          sessionStorage.setItem('searchResults', JSON.stringify(filteredResults));
          window.location.href = `./pesquisado.html?/${nomeDeUsuario}/${email}/${senha}/${id}`;
        } else {
          alert('Não foram encontrados jogos com o termo de pesquisa inserido.');
        }
      });
    })
    .catch(error => console.error(error));
};

searchButton.addEventListener('click', performSearch);
