import React from "react";

const ResumeLoader = () => {
  return (
    <div className="flex-1 p-8 h-full bg-[#1e293b]">
      <div className="mx-auto max-w-[800px] bg-gray-800 p-8 flex flex-col justify-between gap-4 h-full rounded shadow-lg">
        <div className="flex items-center flex-col justify-between mb-6">
          <div className="h-6 w-[40%] bg-gray-600 rounded mb-4" />
          <div className="h-4 w-[30%] bg-gray-700 rounded mb-6" />
          <div className="w-full flex gap-4 items-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-600 rounded w-1/3" />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-600 rounded w-full" />
          <div className="h-4 bg-gray-600 rounded w-5/6" />
          <div className="h-4 bg-gray-600 rounded w-4/6" />
        </div>

        {/* Experience */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-6">
            <div className="h-4 bg-gray-500 rounded w-3/4 mb-2" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-600 rounded w-full" />
              <div className="h-3 bg-gray-600 rounded w-11/12" />
              <div className="h-3 bg-gray-600 rounded w-10/12" />
            </div>
          </div>
        ))}

        {/* Skills & Language */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 w-24 bg-gray-700 rounded" />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-28 bg-gray-600 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeLoader;
