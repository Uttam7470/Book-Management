import { BookOpen } from "lucide-react";

function Header({ onAddBook }) {
  return (
    <header className="bg-[#0f1123] text-white px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 rounded-xl p-2">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-lg font-bold leading-none">
            <span className="text-white">Book</span>
            <span className="text-indigo-400">Shelf</span>
          </p>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-0.5">Management System</p>
        </div>
      </div>

      {/* Add Book button */}
      <button
        onClick={onAddBook}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition flex items-center gap-2"
      >
        <span className="text-lg leading-none">+</span> Add Book
      </button>
    </header>
  );
}

export default Header;
