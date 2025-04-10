import { MdOutlineFileUpload } from "react-icons/md";

function ProductHeader({setShowForm}) {
  return (
    <div className="bg-white flex justify-between items-center px-2 py-1">
      <h2 className="text-lg">All products</h2>
      <button onClick={() => setShowForm(true)} className="flex items-center gap-1 border border-gray-600 px-3 py-1 rounded-lg text-black hover:bg-gray-600 hover:text-white transition duration-300 cursor-pointer">
        <MdOutlineFileUpload size={21} /> Upload product
      </button>
    </div>
  );
}

export default ProductHeader;
