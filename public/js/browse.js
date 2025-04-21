document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('deal-list');
    const filterBtn = document.getElementById('filterBtn');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
  
    let allDeals = []; // Store all deals for filtering
  
    // Fetch game deals from API
    fetch('https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating&pageSize=50')
        .then(res => res.json())
        .then(data => {
            allDeals = data;
            applyFilters(); // Initial display with default filters
        })
        .catch(error => {
            console.error('Error fetching deals:', error);
            container.innerHTML = '<p>Failed to load deals. Please try again later.</p>';
        });
  
    // Set up filter button click handler
    filterBtn.addEventListener('click', applyFilters);
  
    function applyFilters() {
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        
        // Clear previous results
        container.innerHTML = '';
        
        const uniqueGames = new Map(); // Using Map to store unique games by gameID
        
        // Filter and process deals
        allDeals
            .filter(deal => {
                const salePrice = parseFloat(deal.salePrice);
                return salePrice >= minPrice && salePrice <= maxPrice;
            })
            .forEach(deal => {
                if (!uniqueGames.has(deal.gameID)) {
                    uniqueGames.set(deal.gameID, deal);
                }
            });
        
        // Display filtered results
        if (uniqueGames.size === 0) {
            container.innerHTML = '<p>No deals found matching your price range.</p>';
        } else {
            uniqueGames.forEach(deal => {
                const dealCard = createDealCard(deal);
                container.appendChild(dealCard);
            });
        }
    }
  
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
  });