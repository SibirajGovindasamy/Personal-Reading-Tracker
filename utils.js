// utils.js

function exportBooks() {
  const books = getBooks();
  const csvRows = [
    ["Title", "Authors", "Status", "Rating", "Review", "Pages Read", "Total Pages"]
  ];

  books.forEach(book => {
    csvRows.push([
      book.title,
      book.authors.join(', '),
      book.status,
      book.rating,
      book.review.replace(/\n/g, ' '),
      book.pagesRead,
      book.totalPages
    ]);
  });

  const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'reading_log.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function importBooks() {
  const fileInput = document.getElementById('importFile');
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split('\n');
    const [header, ...rows] = lines;
    const books = rows.map(row => {
      const [title, authors, status, rating, review, pagesRead, totalPages] = row.split(',').map(cell => cell.replace(/"/g, ''));
      return {
        title,
        authors: authors.split(', '),
        status,
        rating: Number(rating),
        review,
        pagesRead: Number(pagesRead),
        totalPages: Number(totalPages)
      };
    });
    books.forEach(book => addBook(book));
    alert('Books imported successfully!');
    renderBooks();
  };
  reader.readAsText(file);
}
