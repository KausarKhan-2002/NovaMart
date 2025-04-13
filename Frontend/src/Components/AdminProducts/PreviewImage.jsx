import { IoCloseOutline } from "react-icons/io5";

function PreviewImage({ showPreviewImg, setShowpreviewImg }) {
  return (
    <div
    onClick={(e) => e.target.id === "previewImg" && setShowpreviewImg(false)}
      id="previewImg"
      className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex items-center justify-center z-10"
    >
      <div className="bg-white w-[85%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[700px] h-[65%] px-4">
        <button className="text-4xl flex justify-end w-full">
          <IoCloseOutline
            onClick={() => setShowpreviewImg(false)}
            className="p-1 mt-1 text-gray-700 cursor-pointer"
            size={45}
          />
        </button>
        <img
          src={showPreviewImg}
          className="w-full h-full border- border-white object-contain"
        />
      </div>
    </div>
  );
}

export default PreviewImage;
