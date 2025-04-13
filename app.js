// app.js

document.addEventListener("DOMContentLoaded", () => {
  if (!getCurrentUser()) {
    window.location.href = "login.html";
    return;
  }
  renderBooks();
});

function renderBooks(filter = "") {
  const booksContainer = document.getElementById("booksContainer");
  booksContainer.innerHTML = "";
  const books = filterBooksByStatus(filter);

  if (!books.length) {
    booksContainer.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book-item";
    bookDiv.innerHTML = `
      <strong>${book.title}</strong><br/>
      <em>${book.authors.join(", ")}</em><br/>
      Status: <select onchange="changeStatus(${index}, this.value)">
        <option${book.status === "Want to Read" ? " selected" : ""}>Want to Read</option>
        <option${book.status === "Currently Reading" ? " selected" : ""}>Currently Reading</option>
        <option${book.status === "Read" ? " selected" : ""}>Read</option>
      </select><br/>
      Rating: <input type="number" min="1" max="5" value="${book.rating}" onchange="updateRating(${index}, this.value)"><br/>
      Review: <textarea onchange="updateReview(${index}, this.value)">${book.review}</textarea><br/>
      Pages Read: <input type="number" value="${book.pagesRead}" onchange="updateProgress(${index}, this.value)"> / ${book.totalPages}<br/>
      <button onclick="deleteBookHandler(${index})">Delete</button>
    `;
    booksContainer.appendChild(bookDiv);
  });
}

function filterBooks(status) {
  renderBooks(status);
}

function changeStatus(index, newStatus) {
  const books = getBooks();
  books[index].status = newStatus;
  saveBooks(books);
  renderBooks();
}

function updateRating(index, rating) {
  const books = getBooks();
  books[index].rating = parseInt(rating);
  saveBooks(books);
}

function updateReview(index, review) {
  const books = getBooks();
  books[index].review = review;
  saveBooks(books);
}

function updateProgress(index, pagesRead) {
  const books = getBooks();
  books[index].pagesRead = parseInt(pagesRead);
  saveBooks(books);
}

function deleteBookHandler(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    deleteBook(index);
    renderBooks();
  }
}
