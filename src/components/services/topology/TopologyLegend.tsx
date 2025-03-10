
import React from 'react';

export const TopologyLegend: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 p-2 rounded-md shadow-md text-xs border">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>Active</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
          <span>Maintenance</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
          <span>Inactive</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span>Deprecated</span>
        </div>
      </div>
      <div className="mt-2 border-t pt-1">
        <div className="flex items-center">
          <div className="w-8 border-t-2 border-gray-500 mr-1"></div>
          <span>Related</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 border-t-2 border-gray-500 border-dashed mr-1"></div>
          <span>Component</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 border-t-3 border-gray-500 mr-1"></div>
          <span>Depends On</span>
        </div>
      </div>
    </div>
  );
};
