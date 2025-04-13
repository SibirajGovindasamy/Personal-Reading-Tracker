// data.js

function getBooks() {
  const userData = getUserData();
  return userData.books || [];
}

function saveBooks(books) {
  const userData = getUserData();
  userData.books = books;
  saveUserData(userData);
}

function addBook(book) {
  const books = getBooks();
  books.push(book);
  saveBooks(books);
}

function deleteBook(index) {
  const books = getBooks();
  books.splice(index, 1);
  saveBooks(books);
}

function updateBook(index, updatedBook) {
  const books = getBooks();
  books[index] = updatedBook;
  saveBooks(books);
}

function filterBooksByStatus(status) {
  const books = getBooks();
  return status ? books.filter(book => book.status === status) : books;
}
