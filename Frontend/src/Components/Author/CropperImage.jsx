// src/Components/Author/CropperImage.js
import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function CropperImage({ imageSrc, onCancel, setShowCropper, onCrop }) {
  const cropperRef = useRef(null);

  const handleCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingQuality: "high",
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.9)
      );

      if (blob) {
        onCrop(blob);
        setShowCropper(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white p-4 rounded-xl shadow-xl max-w-xl w-full">
        <Cropper
          src={imageSrc}
          style={{ height: 400, width: "100%" }}
          aspectRatio={1}
          guides={false}
          viewMode={1}
          responsive={true}
          background={false}
          autoCropArea={1}
          checkOrientation={false}
          ref={cropperRef}
        />
        <div className="mt-4 flex justify-end gap-4">
          <button onClick={() => { onCancel(); setShowCropper(false); }} className="px-4 py-2 bg-red-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleCrop} className="px-4 py-2 bg-green-600 text-white rounded">
            Crop
          </button>
        </div>
      </div>
    </div>
  );
}

export default CropperImage;