import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse p-10 space-y-6 bg-[#1e293b] h-full">
      {/* Header */}
      <div className="h-6 bg-gray-700 rounded w-1/3" />

      {/* Summary block */}
      <div className="h-4 bg-gray-600 rounded w-2/3" />
      <div className="h-4 bg-gray-600 rounded w-1/2" />

      {/* Section titles and blocks */}
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="space-y-2 mt-6">
          <div className="h-5 bg-gray-700 rounded w-1/4" />
          <div className="h-3 bg-gray-600 rounded w-3/4" />
          <div className="h-3 bg-gray-600 rounded w-2/3" />
          <div className="h-3 bg-gray-600 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
