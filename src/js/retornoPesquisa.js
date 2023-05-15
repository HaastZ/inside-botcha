

const results = document.getElementById('results');

// Obtém os resultados da pesquisa armazenados na sessionStorage
const searchResults = JSON.parse(sessionStorage.getItem('searchResults'));

if (searchResults && searchResults.length > 0) {
  searchResults.forEach(result => {
    const gameHtml = `
      <div class="card">
          <img src="${result.image}" alt="">
          <h3>${result.name}</h3>
          <h4>Preço: ${result.price}</h4>
      </div>
    `;
    results.insertAdjacentHTML('beforeend', gameHtml);
  });
} else {
  results.innerHTML = 'Não foram encontrados jogos com o termo de pesquisa inserido.';
}
