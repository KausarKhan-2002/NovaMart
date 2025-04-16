import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TagsModal from "../Components/FeaturedTags/TagsModal";
import SaveCurrentTags from "../Components/FeaturedTags/SaveCurrentTags";
import TagsSelection from "../Components/FeaturedTags/TagsSelection";
import SwitchFeaturedTags from "../Components/FeaturedTags/SwitchFeaturedTags";
import { TAGS } from "../Utils/constants";

function FeatureTagEditor() {
  // 🔄 Getting all products from Redux store
  const products = useSelector((store) => store.products);

  const {FEATURED_TAGS, NON_FEATURED_TAGS} = TAGS

  // 🔍 Extracting productId from the URL
  const { productId } = useParams();

  // 🧲 Finding the specific product using ID
  const product = products.find((p) => p._id === productId);

  // 💡 Local States
  const [currentTags, setCurrentTags] = useState([]); // Current selected tags
  const [selectedTagType, setSelectedTagType] = useState(""); // featured / non-featured
  const [showModal, setShowModal] = useState(false); // Modal toggle
  const [nextType, setNextType] = useState(""); // Which type user wants to switch to

  // 🧠 Detecting initial tag type and loading product tags
  useEffect(() => {
    if (product) {
      const tags = product.tags || [];
      console.log(tags);

      const hasFeatured = tags.some((tag) => FEATURED_TAGS.includes(tag));
      setSelectedTagType(hasFeatured ? "featured" : "non-featured");
      setCurrentTags(tags);
    }
  }, [product]);

  // ❌ If product not found, show message
  if (!product)
    return <p className="text-center mt-10 text-red-500">Product not found</p>;

  // 🔁 When user tries to switch tag type (featured ↔ non-featured)
  const handleTagTypeSwitch = (type) => {
    if (type !== selectedTagType) {
      setNextType(type); // Store selected type for confirmation
      setShowModal(true); // Show confirmation modal
    }
  };
  

  // ✅ Confirm switch: reset tags and update type
  const confirmTagTypeSwitch = () => {
    setSelectedTagType(nextType);
    setCurrentTags([]); // Clear existing tags
    setShowModal(false);
  };

  // ❌ Cancel tag switch
  const cancelSwitch = () => {
    setShowModal(false);
    setNextType("");
  };

  // 🔃 Add/Remove tag from current selection
  const toggleTag = (tag) => {
    // check to include new tag or uncheck to exclude existing tag
    setCurrentTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // 📦 Get tag options based on selected tag type
  const getTagList = () =>
    selectedTagType === "featured" ? FEATURED_TAGS : NON_FEATURED_TAGS;


  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Edit Product Tags
      </h2>

      {/* 🔘 Switch Between Featured & Non-Featured */}
      <SwitchFeaturedTags
        handleTagTypeSwitch={handleTagTypeSwitch}
        selectedTagType={selectedTagType}
      />

      {/* ✅ Tag Selection Section */}
      <TagsSelection
        getTagList={getTagList}
        currentTags={currentTags}
        toggleTag={toggleTag}
      />

      {/* 💾 Save Button (enabled only if at least 1 tag is selected) */}
      <SaveCurrentTags currentTags={currentTags} productId={productId} />

      {/* ⚠️ Confirmation Modal for Tag Type Switch */}
      {showModal && (
        <TagsModal
          nextType={nextType}
          cancelSwitch={cancelSwitch}
          confirmTagTypeSwitch={confirmTagTypeSwitch}
        />
      )}
    </div>
  );
}

export default FeatureTagEditor;