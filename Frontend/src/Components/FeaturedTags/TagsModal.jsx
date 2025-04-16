import React from "react";

function TagsModal({ nextType, cancelSwitch, confirmTagTypeSwitch }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Change Tag Type?
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          You need to delete all the existing tags to switch to{" "}
          <strong>{nextType}</strong> tags. Do you want to proceed?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={cancelSwitch}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={confirmTagTypeSwitch}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Yes, Switch
          </button>
        </div>
      </div>
    </div>
  );
}

export default TagsModal;
