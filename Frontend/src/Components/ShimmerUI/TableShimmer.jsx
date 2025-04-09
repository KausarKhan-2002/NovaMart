import React from "react";

function TableShimmer() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Table Header Skeleton */}
      <div className="grid grid-cols-6 gap-4 bg-white p-4 rounded-md shadow-sm">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="h-5 bg-slate-200 rounded" />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      {[...Array(6)].map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="grid grid-cols-6 gap-4 bg-white p-4 rounded-md shadow-sm"
        >
          {[...Array(6)].map((_, colIdx) => (
            <div key={colIdx} className="h-4 bg-slate-100 rounded w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableShimmer;
