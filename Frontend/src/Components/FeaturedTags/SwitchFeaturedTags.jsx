import React from 'react'

function SwitchFeaturedTags({handleTagTypeSwitch, selectedTagType}) {
  return (
    <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleTagTypeSwitch("featured")}
          className={`px-4 py-2 rounded-lg border border-slate-300 transition ${
            selectedTagType === "featured"
              ? "bg-slate-200 text-slate-900"
              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
          }`}
        >
          Featured Tags
        </button>
        <button
          onClick={() => handleTagTypeSwitch("non-featured")}
          className={`px-4 py-2 rounded-lg border border-slate-300 transition ${
            selectedTagType === "non-featured"
              ? "bg-slate-200 text-slate-900"
              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
          }`}
        >
          Non-Featured Tags
        </button>
      </div>
  )
}

export default SwitchFeaturedTags
