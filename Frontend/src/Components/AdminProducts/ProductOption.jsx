import { FaTag } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductOption({
  user,
  handleEdit,
  setUpload,
  isCurrentOption,
  currentId,
}) {
  const products = useSelector((store) => store.products);
  if (!products.length) return;

  return (
    <div
      className={`absolute top-9 right-6 z-20 bg-white border border-gray-200 rounded-xl shadow-md py-4 px-2 space-y-1 transition-all duration-100 ease-in-out ${
        isCurrentOption
          ? "opacity-100 w-auto h-auto p-4 right-0"
          : "overflow-hidden right-[-64%]"
      }`}
    >
      {/* Edit Product */}
      {["Admin", "Seller"].includes(user?.role) && (
        <button
          onClick={() => {
            handleEdit(currentId);
            setUpload(false);
          }}
          title="Edit Product"
          className="flex items-center gap-3 text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md w-full transition"
        >
          <FiEdit className="text-blue-600" size={18} />
          <span className="text-sm font-medium">Edit Product</span>
        </button>
      )}

      {/* Edit Tags */}
      {["Admin", "Moderator"].includes(user?.role) && (
        <Link
          to={`/admin-panel/edit/tags/${currentId}`}
          className="flex items-center gap-3 text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md w-full transition"
        >
          <FaTag className="text-green-600" size={14} />
          <span className="text-sm font-medium">Edit Tags</span>
        </Link>
      )}

      {/* Product sponsored */}
      <Link to={`/admin-panel/sponsorship/${currentId}`}>Get sponshorship</Link>
    </div>
  );
}

export default ProductOption;
