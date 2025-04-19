// Grab references to HTML elements
const dealsContainer = document.getElementById('deals');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const storeSelect = document.getElementById('storeSelect');

// Fetch and display game deals
function fetchDeals(title = '', storeID = '1') {
  // Build the API URL
  let url = `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&upperPrice=15&pageSize=10`;
  if (title) {
    url += `&title=${encodeURIComponent(title)}&sortBy=price`;
  }

  // Show loading message
  dealsContainer.innerHTML = '<p>Loading deals...</p>';

  // Fetch the data
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // Clear previous results
      dealsContainer.innerHTML = '';

      if (data.length === 0) {
        dealsContainer.innerHTML = '<p>No deals found.</p>';
        return;
      }

      // Display each deal
      data.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game';
        div.innerHTML = `
          <h3>${game.title}</h3>
          <img src="${game.thumb}" alt="${game.title}" />
          <p>Normal Price: $${game.normalPrice}</p>
          <p>Sale Price: <strong>$${game.salePrice}</strong></p>
          <a href="https://www.cheapshark.com/redirect?dealID=${game.dealID}" target="_blank">View Deal</a>
        `;
        dealsContainer.appendChild(div);
      });
    })
    .catch(error => {
      dealsContainer.innerHTML = '<p>Failed to load deals. Please try again later.</p>';
      console.error('Error fetching deals:', error);
    });
}

// Initial fetch when the page loads (default store and no title filter)
fetchDeals();

// Search button event listener
searchBtn.addEventListener('click', () => {
  const title = searchInput.value.trim();
  const storeID = storeSelect.value;
  fetchDeals(title, storeID);
});
