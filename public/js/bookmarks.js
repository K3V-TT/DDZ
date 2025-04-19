document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bookmark-list');
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  
    function updateBookmarks() {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      renderBookmarks();
    }
  
    function renderBookmarks() {
      container.innerHTML = '';
      if (bookmarks.length === 0) {
        container.innerHTML = '<p>No bookmarks yet.</p>';
        return;
      }
      bookmarks.forEach((game, index) => {
        const div = document.createElement('div');
        div.className = 'deal-card';
        div.innerHTML = `<h3>${game.title}</h3>
          <img src="${game.thumb}" alt="${game.title}" style="width:120px">
          <a class="view-button" href="game.html?gameID=${game.gameID}">View Details</a>
          <button class="remove-button" data-index="${index}">Remove</button>`;
        container.appendChild(div);
      });
  
      document.querySelectorAll('.remove-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          bookmarks.splice(index, 1);
          updateBookmarks();
        });
      });
    }
  
    renderBookmarks();
  });
  