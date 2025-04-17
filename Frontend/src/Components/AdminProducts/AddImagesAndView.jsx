import React, { useState } from "react";
import PreviewImage from "./PreviewImage";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Spinner from "../../Shared/Spinner";

function AddImagesAndView({
  productInfo,
  handleImageChange,
  handleImageDelete,
  showPreviewImg,
  setShowpreviewImg,
  spin,
  product,
}) {

  const [imgIndexes, setImgIndexes] = useState([])
  const images = product?.images

  // If images exist from redux than map otherwise map on productInfo.images
  const productImages = images || productInfo.images
  
  return (
    <div>
      <div>
        <label className="flex border-dotted border-2 border-gray-300 justify-center items-center text-sm bg-gray-100 h-[150px] rounded-xl font-medium mb-1 text-gray-700 dark:text-white">
          <div className="flex flex-col items-center gap-1 text-gray-500">
            <RiUploadCloud2Fill size={35} />
            <p className="text-sm text-gray-400">Select product images</p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3 justify-center bg-slate-100 p-2">
        {productImages.map((img, ind) => (
          <div key={ind} className="relative">
            <img
              src={img?.url}
              alt={`Preview ${ind}`}
              className="w-20 h-20 sm:w-25 sm:h-25 md:w-30 md:h-30 object-cover rounded-x"
            />

            <section>
              <button
                onClick={() => {
                  handleImageDelete(ind, img)
                  setImgIndexes(prev => ([...prev, ind]))
                }}
                className="absolute text-sm w-[50%] flex justify-center right-0 bottom-0 bg-white opacity-80 text-red-500 p-1 cursor-pointer"
              >
                <MdDelete />
              </button>
              <button
                onClick={() => setShowpreviewImg(img.url)}
                className="absolute text-sm w-[50%] flex justify-center left-0 bottom-0 bg-blue-100 opacity-80 text-blue-500 p-1 cursor-pointer"
              >
                <FaRegEye />
              </button>
            </section>

            {/*  show spin either single or multiple images deletion is under process */}
            {spin && imgIndexes.includes(ind) && <p className="absolute top-0 text-orange-500 w-full h-full flex justify-center items-center bg-black/20"><Spinner /></p>}

            {showPreviewImg && (
              <PreviewImage
                showPreviewImg={showPreviewImg}
                setShowpreviewImg={setShowpreviewImg}
              />
            )}
          </div>
        ))}

        {!productInfo.images.length && (
          <p className="text-sm text-gray-500">No product image chosen yet</p>
        )}
      </div>
    </div>
  );
}

export default AddImagesAndView;