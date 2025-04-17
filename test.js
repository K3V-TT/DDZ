const dealsContainer = document.getElementById('deals');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const storeSelect = document.getElementById('storeSelect');

function fetchDeals(title = '', storeID = '1') {
  let url = `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&upperPrice=15&pageSize=10`;
  if (title) {
    url += `&title=${encodeURIComponent(title)}&sortBy=price`;
  }

  dealsContainer.innerHTML = 'Loading deals...';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      dealsContainer.innerHTML = '';
      if (data.length === 0) {
        dealsContainer.innerHTML = '<p>No deals found.</p>';
        return;
      }

      data.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game';
        div.innerHTML = `
          <h3>${game.title}</h3>
          <img src="${game.thumb}" alt="${game.title}">
          <p>Normal Price: $${game.normalPrice}</p>
          <p>Sale Price: <strong>$${game.salePrice}</strong></p>
          <a href="https://www.cheapshark.com/redirect?dealID=${game.dealID}" target="_blank">View Deal</a>
        `;
        dealsContainer.appendChild(div);
      });
    })
    .catch(error => {
      dealsContainer.innerHTML = '<p>Failed to load deals.</p>';
      console.error(error);
    });
}

// Initial fetch
fetchDeals();

// Search button event
searchBtn.addEventListener('click', () => {
  const title = searchInput.value.trim();
  const storeID = storeSelect.value;
  fetchDeals(title, storeID);
});
