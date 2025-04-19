/* game.js */
const params = new URLSearchParams(window.location.search);
const gameID = params.get('gameID');

// First fetch the list of stores to map storeID to storeName
fetch('https://www.cheapshark.com/api/1.0/stores')
  .then(res => res.json())
  .then(stores => {
    const storeMap = {};
    stores.forEach(store => {
      storeMap[store.storeID] = store.storeName;
    });

    fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('game-details');
        const info = data.info;
        const deals = data.deals;
        const div = document.createElement('div');
        div.innerHTML = `<h2>${info.title}</h2>
          <img src="${info.thumb}" alt="${info.title}" style="width:200px">
          <h3>Deals:</h3>`;
        deals.forEach(deal => {
          const storeName = storeMap[deal.storeID] || `Store ${deal.storeID}`;
          div.innerHTML += `<p><strong>Store:</strong> ${storeName} - <strong>Price:</strong> $${deal.price}</p>`;
        });
        // Add bookmark button
        div.appendChild(createBookmarkButton(info.gameID, info.title, info.thumb));
        container.appendChild(div);
      });
  });


// Bookmark button function
function createBookmarkButton(gameID, title, thumb) {
    const btn = document.createElement('button');
    btn.textContent = 'Bookmark';
    btn.className = 'bookmark-button';
    btn.onclick = () => {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      if (!bookmarks.some(b => b.gameID === gameID)) {
        bookmarks.push({ gameID, title, thumb });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert('Game bookmarked!');
      } else {
        alert('Already bookmarked.');
      }
    };
    return btn;
}