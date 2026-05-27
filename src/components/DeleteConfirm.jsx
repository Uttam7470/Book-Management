import { Trash2 } from "lucide-react";

function DeleteConfirm({ onConfirm, onCancel, isLoading }) {
  return (
    <div className="text-center py-2">
      
      {/* Trash icon */}
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Trash2 className="w-7 h-7 text-red-500" />
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">Delete this book?</h3>
      <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 text-sm transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg text-sm transition"
        >
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirm;
