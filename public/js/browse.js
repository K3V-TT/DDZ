document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('deal-list');
  
  // Fetch game deals from API
  fetch('https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating&pageSize=20')
      .then(res => res.json())
      .then(data => {
          const uniqueGames = new Map(); // Using Map to store unique games by gameID
          
          // Process each deal and keep only unique games
          data.forEach(deal => {
              if (!uniqueGames.has(deal.gameID)) {
                  uniqueGames.set(deal.gameID, deal);
              }
          });
          
          // Create and display cards for unique games
          uniqueGames.forEach(deal => {
              const dealCard = createDealCard(deal);
              container.appendChild(dealCard);
          });
      })
      .catch(error => {
          console.error('Error fetching deals:', error);
          container.innerHTML = '<p>Failed to load deals. Please try again later.</p>';
      });
});

function createDealCard(deal) {
  const div = document.createElement('div');
  div.className = 'deal-card';
  
  div.innerHTML = `
      <h3>${deal.title}</h3>
      <img src="${deal.thumb}" alt="${deal.title}" style="width:120px">
      <p>Normal Price: $${deal.normalPrice}</p>
      <p>Sale Price: $${deal.salePrice}</p>
      <p>Savings: ${Math.round(deal.savings)}%</p>
      <a class="view-button" href="game.html?gameID=${deal.gameID}">View Details</a>
  `;
  
  // Add bookmark button
  const bookmarkBtn = createBookmarkButton(deal);
  div.appendChild(bookmarkBtn);
  
  return div;
}

function createBookmarkButton(deal) {
  const btn = document.createElement('button');
  btn.textContent = 'Bookmark';
  btn.className = 'bookmark-button';
  
  btn.addEventListener('click', () => {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      
      if (!bookmarks.some(b => b.gameID === deal.gameID)) {
          bookmarks.push({
              gameID: deal.gameID,
              title: deal.title,
              thumb: deal.thumb,
              normalPrice: deal.normalPrice,
              salePrice: deal.salePrice,
              storeID: deal.storeID
          });
          
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          btn.textContent = 'Bookmarked!';
          setTimeout(() => btn.textContent = 'Bookmark', 2000);
      } else {
          btn.textContent = 'Already Bookmarked';
          setTimeout(() => btn.textContent = 'Bookmark', 2000);
      }
  });
  
  return btn;
}