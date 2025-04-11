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
      <div className="p-4 border rounded-lg shadow-md bg-card border-border">
        <h3 className="text-lg font-semibold mb-2 text-accent">Legend</h3>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2 text-foreground">Categories</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center">
                <div className="w-4 h-4 mr-2 rounded-full" style={{ 
                  backgroundColor: color,
                  boxShadow: `0 0 6px ${color}` 
                }}></div>
                <span className="text-sm text-foreground">{category}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2 text-foreground">Node Status</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full border-2" 
                style={{ backgroundColor: "var(--background)", borderColor: "var(--primary)" }}></div>
              <span className="text-sm text-foreground">Unlocked (available to start)</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full border-2 flex items-center justify-center" 
                style={{ 
                  backgroundColor: "rgba(48, 225, 164, 0.2)", 
                  borderColor: "var(--secondary)" 
                }}>
                <span className="text-foreground text-xs">✓</span>
              </div>
              <span className="text-sm text-foreground">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full border-2 flex items-center justify-center" 
                style={{ backgroundColor: "var(--background-dark)", borderColor: "var(--border)" }}>
                <span className="text-muted text-xs">🔒</span>
              </div>
              <span className="text-sm text-foreground">Locked (prerequisites needed)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border rounded-lg shadow-md bg-card border-border">
        <h3 className="text-lg font-semibold mb-2 text-accent">Progress</h3>
        <div className="w-full bg-background rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-secondary to-accent h-4 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(completedCourses.length / graphData.nodes.length) * 100}%`,
              boxShadow: "0 0 10px rgba(48, 225, 164, 0.5)"
            }}
          ></div>
        </div>
        <p className="mt-2 text-center text-foreground">
          <span className="text-secondary font-bold">{completedCourses.length}</span> of <span className="font-bold">{graphData.nodes.length}</span> courses completed
        </p>
      </div>
    </>
  );
};

export default Legend; 