// api.js

async function searchBooks() {
  const query = document.getElementById('bookSearch').value;
  if (!query) return;

  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = 'Searching...';

  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    displaySearchResults(data.items);
  } catch (error) {
    resultsContainer.innerHTML = 'Error fetching results.';
    console.error(error);
  }
}

function displaySearchResults(books) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';

  if (!books || books.length === 0) {
    resultsContainer.innerHTML = 'No results found.';
    return;
  }

  books.forEach(book => {
    const info = book.volumeInfo;
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = `
      <strong>${info.title || 'Untitled'}</strong> by ${info.authors ? info.authors.join(', ') : 'Unknown'}
      <button onclick='addBookFromSearch(${JSON.stringify({
        title: info.title,
        authors: info.authors || [],
        status: "Want to Read",
        rating: 0,
        review: "",
        pagesRead: 0,
        totalPages: info.pageCount || 0
      }).replace(/"/g, "&quot;")})'>Add</button>
    `;
    resultsContainer.appendChild(bookItem);
  });
}

function addBookFromSearch(bookData) {
  addBook(bookData);
  alert('Book added to your library!');
  document.getElementById('searchResults').innerHTML = '';
  renderBooks();
}
