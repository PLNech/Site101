import React from 'react';
import { categoryColors, GraphNode } from './courseUtils';

interface LegendProps {
  completedCourses: string[];
  graphData: {
    nodes: GraphNode[];
  };
}

const Legend: React.FC<LegendProps> = ({ completedCourses, graphData }) => {
  return (
    <>
      <div className="p-4 border rounded-lg shadow-md bg-gray-900 border-gray-800">
        <h3 className="text-lg font-semibold mb-2 text-yellow-300">Legend</h3>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2 text-gray-200">Categories</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center">
                <div className="w-4 h-4 mr-2 rounded-full" style={{ 
                  backgroundColor: color,
                  boxShadow: `0 0 6px ${color}` 
                }}></div>
                <span className="text-sm text-gray-200">{category}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2 text-gray-200">Node Status</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full border-2" 
                style={{ backgroundColor: "rgba(0,0,0,0.4)", borderColor: "#3498db" }}></div>
              <span className="text-sm text-gray-200">Unlocked (available to start)</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full border-2 flex items-center justify-center" 
                style={{ 
                  backgroundColor: "rgba(46, 204, 113, 0.2)", 
                  borderColor: "#2ecc71" 
                }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-200">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full border-2 flex items-center justify-center" 
                style={{ backgroundColor: "#222", borderColor: "#555" }}>
                <span className="text-gray-400 text-xs">🔒</span>
              </div>
              <span className="text-sm text-gray-200">Locked (prerequisites needed)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border rounded-lg shadow-md bg-gray-900 border-gray-800">
        <h3 className="text-lg font-semibold mb-2 text-yellow-300">Progress</h3>
        <div className="w-full bg-gray-800 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-400 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(completedCourses.length / graphData.nodes.length) * 100}%`,
              boxShadow: "0 0 10px rgba(46, 204, 113, 0.5)"
            }}
          ></div>
        </div>
        <p className="mt-2 text-center text-gray-200">
          <span className="text-green-400 font-bold">{completedCourses.length}</span> of <span className="font-bold">{graphData.nodes.length}</span> courses completed
        </p>
      </div>
    </>
  );
};

export default Legend; 