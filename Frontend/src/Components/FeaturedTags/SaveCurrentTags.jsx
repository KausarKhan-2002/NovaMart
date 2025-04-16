import { useState } from "react";
import { useUpdateTags } from "../../Hooks/useUpdateTags";
import Spinner from "../../Helpers/Spinner";

function SaveCurrentTags({ currentTags, productId }) {
  const [loader, setLoader] = useState(false);
  const updateTags = useUpdateTags()

   // 💾 Final submission (console only for now)
   const saveTags = () => {
    // console.log("✅ Final tags to be saved:", currentTags);
    updateTags(currentTags, productId, setLoader)
  };
  
  return (
    <div className="flex justify-end">
      <button
        onClick={saveTags}
        disabled={currentTags.length === 0}
        className={`flex items-center gap-3 px-5 py-2 rounded-lg transition ${
          currentTags.length === 0
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
        }`}
      >
        {loader && <Spinner />} Save Changes
      </button>
    </div>
  );
}

export default SaveCurrentTags;
