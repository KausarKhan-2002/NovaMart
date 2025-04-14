import { MdOutlineFileUpload } from "react-icons/md";

function ProductHeader({ setUpload, setShowForm }) {

  const handleButton = (e) => {
    setShowForm(true);

    // I am tracking wheather user click on edit button or upload product
    const btnText = e.target.innerText;
    if (btnText === "Upload product") setUpload(true);
    else setUpload(false);
  };

  return (
    <div className="bg-white flex justify-between items-center px-2 py-1">
      <h2 className="text-lg">All products</h2>
      <button
        onClick={handleButton}
        className="flex items-center gap-1 border border-gray-600 px-3 py-1 rounded-lg text-black hover:bg-gray-600 hover:text-white transition duration-300 cursor-pointer"
      >
        <MdOutlineFileUpload size={21} /> Upload product
      </button>
    </div>
  );
}

export default ProductHeader;
