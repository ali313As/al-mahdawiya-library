async function loadBooks() {
    try {
        const response = await fetch("data/books.json");
        const books = await response.json();

        console.log("تم تحميل الكتب:", books);
    } catch (error) {
        console.error("خطأ في تحميل الكتب:", error);
    }
}

loadBooks();
