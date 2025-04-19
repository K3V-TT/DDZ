/* search.js */
document.getElementById('searchInput').addEventListener('keyup', e => {
    const query = e.target.value;
    if (query.length < 0) return;
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('results');
        container.innerHTML = '';
        data.forEach(game => {
          const div = document.createElement('div');
          div.className = 'result-card';
          div.innerHTML = `<h3>${game.external}</h3>
            <img src="${game.thumb}" alt="${game.external}" style="width:100px">
            <a class="view-button" href="game.html?gameID=${game.gameID}">View Details</a>`;

            const bookmarkBtn = createBookmarkButton(game.gameID, game.title, game.thumb);
            div.appendChild(bookmarkBtn);
           
          container.appendChild(div);
        });
      });
  });

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