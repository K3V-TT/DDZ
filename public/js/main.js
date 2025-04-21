document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('deal-list');
  const carouselContainer = document.getElementById('game-carousel');
  
  fetch('https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating&pageSize=50')
      .then(res => res.json())
      .then(data => {
          const uniqueGames = new Map();
          
          // Create carousel first (show first 6 unique games)
          let carouselGames = [];
          data.forEach(deal => {
              if (!uniqueGames.has(deal.gameID) && carouselGames.length < 6) {
                  carouselGames.push(deal);
                  uniqueGames.set(deal.gameID, deal);
              }
          });
          createImageCarousel(carouselGames, carouselContainer);
          
          // Process remaining deals for main list
          data.forEach(deal => {
              if (!uniqueGames.has(deal.gameID)) {
                  uniqueGames.set(deal.gameID, deal);
              }
          });
          
          // Display all unique games
          uniqueGames.forEach(deal => {
              const dealCard = createDealCard(deal);
              container.appendChild(dealCard);
          });
      })
      .catch(error => {
          console.error('Error:', error);
          container.innerHTML = '<p>Failed to load deals. Please try again later.</p>';
      });
});

function createImageCarousel(games, container) {
  if (!container || games.length === 0) return;
  
  container.innerHTML = `
      <div class="carousel">
          <button class="carousel-button prev">&lt;</button>
          <div class="carousel-track-container">
              <div class="carousel-track"></div>
          </div>
          <button class="carousel-button next">&gt;</button>
      </div>
  `;
  
  const track = container.querySelector('.carousel-track');
  const prevBtn = container.querySelector('.carousel-button.prev');
  const nextBtn = container.querySelector('.carousel-button.next');
  
  // Create slides
  games.forEach((deal, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.innerHTML = `
          <a href="game.html?gameID=${deal.gameID}">
              <img src="${deal.thumb}" alt="${deal.title}" class="carousel-image">
              <div class="carousel-title">${deal.title}</div>
          </a>
      `;
      track.appendChild(slide);
  });
  
  // Carousel functionality
  let currentIndex = 0;
  const slides = Array.from(track.children);
  const slideWidth = slides[0].getBoundingClientRect().width;
  
  // Arrange slides
  const setSlidePosition = (slide, index) => {
      slide.style.left = `${slideWidth * index}px`;
  };
  slides.forEach(setSlidePosition);
  
  const moveToSlide = (track, currentIndex) => {
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  };
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      moveToSlide(track, currentIndex);
  });
  
  nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      moveToSlide(track, currentIndex);
  });
  
  // Auto-advance every 5 seconds (optional)
  let slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      moveToSlide(track, currentIndex);
  }, 5000);
  
  // Pause on hover
  container.addEventListener('mouseenter', () => clearInterval(slideInterval));
  container.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          moveToSlide(track, currentIndex);
      }, 5000);
  });
}
function createDealCard(deal) {
  const div = document.createElement('div');
  div.className = 'deal-card';
  
  div.innerHTML = `
      <h3>${deal.title}</h3>
      <a href="game.html?gameID=${deal.gameID}">
          <img src="${deal.thumb}" alt="${deal.title}" class="game-image">
      </a>
      <p>Normal Price: $${deal.normalPrice}</p>
      <p>Sale Price: $${deal.salePrice}</p>
      <p>Savings: ${Math.round(deal.savings)}%</p>
      <a class="view-button" href="game.html?gameID=${deal.gameID}">View Details</a>
  `;
  
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