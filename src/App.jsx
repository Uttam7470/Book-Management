import { useState, useEffect } from "react";
import { BookOpen, Tag, ClipboardList } from "lucide-react";
import Header       from "./components/Header";
import SearchBar    from "./components/SearchBar";
import BookList     from "./components/BookList";
import BookForm     from "./components/BookForm";
import Modal        from "./components/Modal";
import Loader       from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import DeleteConfirm from "./components/DeleteConfirm";
import { fetchBooks, createBook, updateBook, deleteBook } from "./services/bookApi";

function App() {
  // ── State ──────────────────────────────────────────────────────────────
  const [books,       setBooks]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [saving,      setSaving]      = useState(false);

  const [showForm,    setShowForm]    = useState(false);
  const [editBook,    setEditBook]    = useState(null);   // null = add mode
  const [deleteId,    setDeleteId]    = useState(null);   // _localId to delete

  const [search,      setSearch]      = useState("");
  const [genre,       setGenre]       = useState("All");

  const [toast,       setToast]       = useState(null);

  // ── Load books on mount ────────────────────────────────────────────────
  async function loadBooks() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks();
      // MockAPI seed books have no id — give each a local key so we can
      // identify them for edit / delete without a real server id.
      const books = data.map((book, i) => ({
        ...book,
        _localId: book.id ?? `local-${i}`,
      }));
      setBooks(books);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadBooks(); }, []);

  // ── Toast helper ───────────────────────────────────────────────────────
  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // ── Add or Update book ─────────────────────────────────────────────────
  async function handleSave(formData) {
    setSaving(true);
    try {
      if (editBook) {
        // Only call API when the book has a real server id
        if (editBook.id) await updateBook(editBook.id, formData);

        // Always update local state with the new values
        setBooks((prev) =>
          prev.map((b) =>
            b._localId === editBook._localId ? { ...b, ...formData } : b
          )
        );
        showToast("Book updated!");
      } else {
        const created = await createBook(formData);
        setBooks((prev) => [{ ...created, _localId: created.id }, ...prev]);
        showToast("Book added!");
      }
      setShowForm(false);
      setEditBook(null);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  }

  // ── Delete book ────────────────────────────────────────────────────────
  async function handleDelete() {
    setSaving(true);
    try {
      const book = books.find((b) => b._localId === deleteId);
      if (book?.id) await deleteBook(book.id);  // only if has real id
      setBooks((prev) => prev.filter((b) => b._localId !== deleteId));
      showToast("Book deleted.");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
      setDeleteId(null);
    }
  }

  // ── Filter books (search + genre) ─────────────────────────────────────
  const filtered = books.filter((book) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      book.title?.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q);
    const matchGenre = genre === "All" || book.genre === genre;
    return matchSearch && matchGenre;
  });

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f0f2f8]">

      <Header
        onAddBook={() => { setEditBook(null); setShowForm(true); }}
      />

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats cards */}
        {!loading && !error && (
          <div className="grid grid-cols-3 gap-4 mb-6">

            {/* Total Books */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-4">
              <div className="bg-indigo-600 rounded-xl p-2.5">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Books</p>
                <p className="text-2xl font-bold text-gray-900">{books.length}</p>
              </div>
            </div>

            {/* Genres */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-4">
              <div className="bg-purple-500 rounded-xl p-2.5">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Genres</p>
                <p className="text-2xl font-bold text-gray-900">
                  {[...new Set(books.map((b) => b.genre).filter(Boolean))].length}
                </p>
              </div>
            </div>

            {/* Showing */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-4">
              <div className="bg-emerald-500 rounded-xl p-2.5">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Showing</p>
                <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
              </div>
            </div>

          </div>
        )}

        {/* Search & Filter */}
        {!loading && !error && (
          <SearchBar
            search={search}
            onSearch={setSearch}
            genre={genre}
            onGenre={setGenre}
            total={filtered.length}
          />
        )}

        {/* Book grid / loader / error */}
        {loading && <Loader />}
        {error   && <ErrorMessage message={error} onRetry={loadBooks} />}
        {!loading && !error && (
          <BookList
            books={filtered}
            onEdit={(book) => { setEditBook(book); setShowForm(true); }}
            onDelete={(localId) => setDeleteId(localId)}
          />
        )}
      </main>

      {/* Add / Edit modal */}
      <Modal
        isOpen={showForm}
        title={editBook ? "Edit Book" : "Add New Book"}
        onClose={() => { setShowForm(false); setEditBook(null); }}
      >
        <BookForm
          initialData={editBook}
          onSubmit={handleSave}
          isLoading={saving}
        />
      </Modal>

      {/* Delete confirm modal */}
      <Modal
        isOpen={!!deleteId}
        title="Delete Book"
        onClose={() => setDeleteId(null)}
      >
        <DeleteConfirm
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={saving}
        />
      </Modal>

      {/* Toast notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium z-50 ${
          toast.type === "error" ? "bg-red-500" : "bg-green-500"
        }`}>
          {toast.msg}
        </div>
      )}

    </div>
  );
}

export default App;
