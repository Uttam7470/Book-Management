import { BookOpen } from "lucide-react";
import BookCard from "./BookCard";

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-24 text-gray-400">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="font-semibold text-gray-500 text-lg">No books found</p>
        <p className="text-sm mt-1">Try a different search or add a new book.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {books.map((book, index) => (
        <BookCard
          key={book._localId}
          book={book}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BookList;
