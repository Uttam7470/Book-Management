import { Search, Tag, ClipboardList } from "lucide-react";

const GENRES = [
  "All", "Fiction", "Non-Fiction", "Science", "History",
  "Fantasy", "Biography", "Mystery", "Romance", "Technology",
  "Self Help", "Finance", "Business", "Psychology", "Philosophy",
];

function SearchBar({ search, onSearch, genre, onGenre, total }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">

      {/* Search input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />
      </div>

      {/* Genre dropdown */}
      <div className="relative">
        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <select
          value={genre}
          onChange={(e) => onGenre(e.target.value)}
          className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm appearance-none cursor-pointer w-full sm:w-44"
        >
          {GENRES.map((g) => (
            <option key={g} value={g}>{g === "All" ? "All Genres" : g}</option>
          ))}
        </select>
      </div>

      {/* Results badge */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm text-sm text-gray-600 font-medium whitespace-nowrap">
        <ClipboardList className="w-4 h-4 text-gray-400" />
        {total} results
      </div>

    </div>
  );
}

export default SearchBar;
