const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    return;
  }

  fetch(`${proxyUrl}https://api.steampowered.com/ISteamApps/GetAppList/v2/`)
    .then(response => response.json())
    .then(data => {
      const games = data.applist.apps;
      const searchResults = [];

      games.forEach(game => {
        const appId = game.appid;
        const gameName = game.name.toLowerCase();

        if (gameName.includes(searchTerm.toLowerCase())) {
          searchResults.push(
            fetch(`${proxyUrl}https://store.steampowered.com/api/appdetails?appids=${appId}&key=${apiKey}`)
              .then(response => response.json())
              .then(data => {
                const appData = data[appId].data;

                if (appData.type === 'game') {
                  let imageUrl = appData.header_image || 'placeholder_image.jpg';

                  // Verifica se a imagem é nula
                  if (imageUrl !== 'placeholder_image.jpg') {
                    let price = '';

                    if (appData.price_overview) {
                      price = appData.price_overview.final_formatted || 'Preço não disponível';
                      price = price.replace('\n', '');
                      price = parseFloat(price.replace(/[^0-9.-]+/g, "")) * 5.0; // Conversão de dólares para reais
                      price = `R$ ${price.toFixed(2)}`;
                    } else {
                      price = 'Gratuito';
                    }

                    return {
                      name: appData.name,
                      image: imageUrl,
                      price: price
                    };
                  }
                }

                return null;
              })
              .catch(error => {
                console.error(error);
                return null;
              })
          );
        }
      });

      Promise.all(searchResults).then(results => {
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
});
