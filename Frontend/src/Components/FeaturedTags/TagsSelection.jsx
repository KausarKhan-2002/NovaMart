
function TagsSelection({ getTagList, currentTags, toggleTag }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Select Tags
      </h3>
      <div className="flex flex-wrap gap-3">
        {getTagList().map((tag) => (
          <label
            key={tag}
            className="flex items-center space-x-2 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md"
          >
            <input
              type="checkbox"
              checked={currentTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            <span className="capitalize">{tag.replace("-", " ")}</span>
          </label>
        ))}
      </div>
      {/* ⚠️ Warning if no tag is selected */}
      {currentTags.length === 0 && (
        <p className="text-red-500 mt-2 text-sm">
          Please select at least one tag.
        </p>
      )}
    </div>
  );
}

export default TagsSelection;
