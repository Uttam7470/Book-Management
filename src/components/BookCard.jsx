import { BookOpen, User, Pencil, Trash2 } from "lucide-react";

// Gradient cover colors
const COVERS = [
  "from-blue-500 to-teal-500",
  "from-purple-600 to-indigo-600",
  "from-violet-600 to-purple-700",
  "from-indigo-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-emerald-500 to-teal-600",
];

// Genre  colors
const GENRE_COLORS = {
  Fiction:       "bg-blue-100 text-blue-700",
  "Non-Fiction": "bg-green-100 text-green-700",
  Science:       "bg-cyan-100 text-cyan-700",
  History:       "bg-yellow-100 text-yellow-700",
  Fantasy:       "bg-purple-100 text-purple-700",
  Biography:     "bg-orange-100 text-orange-700",
  Mystery:       "bg-red-100 text-red-700",
  Romance:       "bg-pink-100 text-pink-700",
  Technology:    "bg-indigo-100 text-indigo-700",
  "Self Help":   "bg-lime-100 text-lime-700",
  Finance:       "bg-teal-100 text-teal-700",
  Business:      "bg-sky-100 text-sky-700",
  Psychology:    "bg-violet-100 text-violet-700",
  Philosophy:    "bg-gray-100 text-gray-600",
};

const GENRE_DOTS = {
  Fiction: "bg-blue-500", "Non-Fiction": "bg-green-500", Science: "bg-cyan-500",
  History: "bg-yellow-500", Fantasy: "bg-purple-500", Biography: "bg-orange-500",
  Mystery: "bg-red-500", Romance: "bg-pink-500", Technology: "bg-indigo-500",
  "Self Help": "bg-lime-500", Finance: "bg-teal-500", Business: "bg-sky-500",
  Psychology: "bg-violet-500", Philosophy: "bg-gray-400",
};


function BookCard({ book, index, onEdit, onDelete }) {

  const cover    = COVERS[index % COVERS.length];
  const pillColor = GENRE_COLORS[book.genre] || "bg-gray-100 text-gray-600";
  const dotColor  = GENRE_DOTS[book.genre]   || "bg-gray-400";

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">

      {/* Gradient-cover */}
      <div className={`relative bg-gradient-to-br ${cover} h-40 flex flex-col items-center justify-center gap-2`}>

        {/* Year  */}
        {book.year && (
          <span className="absolute top-3 right-3 bg-[#1a1f3c] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {book.year}
          </span>
        )}

        {/* Design lines */}
        <div className="flex flex-col gap-1.5 items-center mb-1">
          <div className="w-10 h-0.5 bg-white/40 rounded-full" />
          <div className="w-8 h-0.5 bg-white/40 rounded-full" />
        </div>

        {/* Book icon */}
        <BookOpen className="w-10 h-10 text-white/80" />
      </div>

      {/* Card information */}
      <div className="p-4 flex flex-col flex-1">

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
          {book.title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
          <User className="w-3.5 h-3.5" />
          {book.author}
        </div>

        {/* Genre pill */}
        {book.genre && (
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${pillColor}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              {book.genre}
            </span>
          </div>
        )}

        {/* Edit / Delete buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-lg transition"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete(book._localId)}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}

export default BookCard;
