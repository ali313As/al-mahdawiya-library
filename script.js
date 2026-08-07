const firebaseConfig = {
  apiKey: "AIzaSyCe-DH4E9CMgKmlcr3pCbvH40hu4q0P798",
  authDomain: "maktaba-mahdawiya-f2f2e.firebaseapp.com",
  projectId: "maktaba-mahdawiya-f2f2e",
  storageBucket: "maktaba-mahdawiya-f2f2e.firebasestorage.app",
  messagingSenderId: "849503316576",
  appId: "1:849503316576:web:88be3ac2d6ff46c24db105",
  measurementId: "G-JR1Y9ZFBCQ"
};let allBooks = [];

// جلب الفهرس من data/books.json
document.addEventListener('DOMContentLoaded', () => {
    fetch('data/books.json')
        .then(res => {
            if (!res.ok) throw new Error("تعذر الوصول لملف الفهرس");
            return res.json();
        })
        .then(data => {
            allBooks = data;
            renderBooks(allBooks);
        })
        .catch(err => {
            console.error('خطأ الفهرس:', err);
            const grid = document.getElementById('booksGrid');
            if (grid) grid.innerHTML = '<p style="text-align:center; color:#888; grid-column:1/-1;">جاري تحديث قائمة الكتب...</p>';
        });
});

// عرض بطاقات الكتب
function renderBooks(books) {
    const grid = document.getElementById('booksGrid');
    if (!grid) return;
    grid.innerHTML = '';

    books.forEach(book => {
        // تحديد مسار الملف داخل مجلد books تلقائياً
        const filePath = book.file

        const card = `
            <div class="book-card" onclick="openBookText('${filePath}')">
                <div class="book-cover">
                    <div class="book-cover-icon">📖</div>
                    <div class="book-cover-title">${book.title}</div>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-meta-footer">
                        <span class="card-tag">${book.category || 'عام'}</span>
                        <span class="read-btn">اقرأ النص ←</span>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', card);
    });
}

// قراءة نص الكتاب من مجلد books
function openBookText(filePath) {
    const modalBody = document.getElementById('modalBookBody');
    const modalTitle = document.getElementById('modalBookTitle');

    modalTitle.innerText = "جاري التحميل...";
    modalBody.innerHTML = "<p style='text-align:center;'>جاري قراءة نص الكتاب...</p>";
    document.getElementById('readerModal').style.display = 'flex';

    fetch(filePath)
        .then(res => {
            if (!res.ok) throw new Error("الملف غير موجود في مجلد books");
            return res.json();
        })
        .then(data => {
            modalTitle.innerText = data.title || "عرض النص";
            modalBody.innerHTML = '';

            if (Array.isArray(data.content)) {
                data.content.forEach(paragraph => {
                    modalBody.innerHTML += `<div class="text-paragraph">${paragraph}</div>`;
                });
            } else if (typeof data.content === 'string') {
                const paragraphs = data.content.split('\n\n').map(p => `<div class="text-paragraph">${p}</div>`).join('');
                modalBody.innerHTML = paragraphs;
            } else {
                modalBody.innerHTML = `<pre style="white-space: pre-wrap; font-family: 'Amiri', serif;">${JSON.stringify(data, null, 2)}</pre>`;
            }
        })
        .catch(err => {
            modalTitle.innerText = "تنبيه";
            modalBody.innerHTML = `<p style="color:#ef4444; text-align:center;">تعذر تحميل هذا الكتاب.<br><small>تأكد من وجود الملف في مجلد books</small></p>`;
        });
}

function closeReader() {
    document.getElementById('readerModal').style.display = 'none';
}
