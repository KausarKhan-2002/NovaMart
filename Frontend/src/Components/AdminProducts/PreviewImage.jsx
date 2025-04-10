import { IoCloseOutline } from "react-icons/io5";

function PreviewImage({ showPreviewImg, setShowpreviewimg }) {
  return (
    <div
    onClick={(e) => e.target.id === "previewImg" && setShowpreviewimg(false)}
      id="previewImg"
      className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center"
    >
      <div className="bg-white w-[70%] h-[75%] px-4">
        <button className="text-4xl flex justify-end w-full">
          <IoCloseOutline
            onClick={() => setShowpreviewimg(false)}
            className="p-1 mt-1 text-gray-700 cursor-pointer"
            size={45}
          />
        </button>
        <img
          src={showPreviewImg}
          className="w-full h-[89.5%] border- border-white object-contain"
        />
      </div>
    </div>
  );
}

export default PreviewImage;
