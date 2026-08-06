// عناصر الصفحة
const booksGrid = document.getElementById("booksGrid");
const booksCount = document.getElementById("count-books");
const searchInput = document.getElementById("searchInput");

let books = [];

// تحميل الكتب
async function loadBooks() {
    try {
        const response = await fetch("data/books.json");
        books = await response.json();

        renderBooks(books);

        if (booksCount) {
            booksCount.textContent = books.length;
        }

    } catch (err) {
        booksGrid.innerHTML =
        "<h2 style='color:red;text-align:center;'>تعذر تحميل الكتب</h2>";

        console.error(err);
    }
}

// عرض الكتب
function renderBooks(list){

    booksGrid.innerHTML = "";

    list.forEach(book=>{

        booksGrid.innerHTML += `
        <div class="book-card">

            <div class="book-cover">
                <div class="book-cover-icon">📚</div>

                <div class="book-cover-title">
                    ${book.title}
                </div>

            </div>

            <div class="book-info">

                <div class="book-title">
                    ${book.title}
                </div>

                <div class="book-author-box">

                    <div class="author-avatar">
                        ✍️
                    </div>

                    <div class="book-author">
                        ${book.author}
                    </div>

                </div>

                <div class="book-meta-footer">

                    <span class="card-tag">
                        ${book.category}
                    </span>

                    <a class="read-btn"
                    href="reader.html?book=${book.id}">
                    تصفح الآن →
                    </a>

                </div>

            </div>

        </div>
        `;
    });

}

// البحث
function searchBooks(){

    const text = searchInput.value
    .trim()
    .toLowerCase();

    const result = books.filter(book=>{

        return (
            book.title.toLowerCase().includes(text) ||
            book.author.toLowerCase().includes(text)
        );

    });

    renderBooks(result);

}

// تشغيل البحث
searchInput.addEventListener("keyup",searchBooks);

// تشغيل الموقع
loadBooks();
