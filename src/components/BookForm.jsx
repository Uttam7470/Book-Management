import { useState, useEffect } from "react";

const GENRES = [
  "Fiction", "Non-Fiction", "Science", "History", "Fantasy",
  "Biography", "Mystery", "Romance", "Technology",
  "Self Help", "Finance", "Business", "Psychology", "Philosophy",
];

const EMPTY = { title: "", author: "", genre: "", year: "" };

function BookForm({ initialData, onSubmit, isLoading }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData ? {
      title:  initialData.title  || "",
      author: initialData.author || "",
      genre:  initialData.genre  || "",
      year:   initialData.year   || "",
    } : EMPTY);
    setErrors({});
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim())  e.title  = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (form.year && (isNaN(form.year) || form.year < 1000 || form.year > 2100))
      e.year = "Enter a valid year";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, year: form.year ? Number(form.year) : "" });
  }

  const inputClass = (field) =>
    `w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input name="title" value={form.title} onChange={handleChange}
          placeholder="e.g. Atomic Habits" className={inputClass("title")} />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Author <span className="text-red-500">*</span>
        </label>
        <input name="author" value={form.author} onChange={handleChange}
          placeholder="e.g. James Clear" className={inputClass("author")} />
        {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">

          <label className="block text-sm font-medium text-gray-700 mb-1.5">Genre</label>
          <select name="genre" value={form.genre} onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">Select genre</option>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        
        <div className="w-28">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Year</label>
          <input name="year" type="number" value={form.year} onChange={handleChange}
            placeholder="2024" className={inputClass("year")} />
          {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition mt-1"
      >
        {isLoading ? "Saving..." : initialData ? "Update Book" : "Add Book"}
      </button>

    </form>
  );
}

export default BookForm;
