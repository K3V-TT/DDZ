document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('deal-list');
    fetch('https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating&pageSize=20')
      .then(res => res.json())
      .then(data => {
        // Create a Set to track unique game IDs
        const uniqueGameIds = new Set();
        
        data.forEach(deal => {
          // Only process if we haven't seen this game ID before
          if (!uniqueGameIds.has(deal.gameID)) {
            uniqueGameIds.add(deal.gameID);
            
            const div = document.createElement('div');
            div.className = 'deal-card';
            div.innerHTML = `<h3>${deal.title}</h3>
              <img src="${deal.thumb}" alt="${deal.title}" style="width:120px">
              <p>Normal Price: $${deal.normalPrice}</p>
              <p>Sale Price: $${deal.salePrice}</p>
              <a class="view-button" href="game.html?gameID=${deal.gameID}">View Details</a>`;
            container.appendChild(div);
          }
        });
      })
      .catch(error => console.error('Error fetching deals:', error));
});

