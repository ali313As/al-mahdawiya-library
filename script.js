async function loadBooks() {
    try {
        const response = await fetch("data/books.json");
        const books = await response.json();

        const booksGrid = document.getElementById("booksGrid");
        booksGrid.innerHTML = "";

        books.forEach(book => {
            const card = document.createElement("div");
            card.className = "book-card";
            card.innerHTML = `
                <div class="book-cover">
                    <div class="book-cover-icon">📚</div>
                    <div class="book-cover-title">${book.title}</div>
                </div>

                <div class="book-info">
                    <div class="book-title">${book.title}</div>

                    <div class="book-author-box">
                        <div class="author-avatar">✍️</div>
                        <div class="book-author">${book.author}</div>
                    </div>

                    <div class="book-meta-footer">
                        <span class="card-tag">${book.category}</span>
                        <span class="read-btn">تصفح الآن ←</span>
                    </div>
                </div>
            `;
            card.addEventListener("click", () => {
                window.location.href = `reader.html?id=${encodeURIComponent(book.id)}`;
            });
            booksGrid.appendChild(card);
        });

        document.getElementById("count-books").textContent = books.length;

    } catch (error) {
        console.error(error);
    }
}

loadBooks();
