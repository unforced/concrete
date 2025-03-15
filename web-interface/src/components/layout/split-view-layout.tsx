import React, { useState } from 'react';

interface SplitViewLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  defaultLeftWidth?: number; // Percentage (0-100)
}

export default function SplitViewLayout({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 50,
}: SplitViewLayoutProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const container = e.currentTarget as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain to reasonable limits (20% - 80%)
    const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
    setLeftWidth(constrainedWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="flex h-[calc(100vh-4rem)] relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="overflow-auto border-r"
        style={{ width: `${leftWidth}%` }}
      >
        {leftPanel}
      </div>
      
      {/* Resizer handle */}
      <div 
        className="absolute top-0 bottom-0 w-2 bg-transparent hover:bg-blue-200 cursor-col-resize z-10"
        style={{ left: `calc(${leftWidth}% - 2px)` }}
        onMouseDown={handleMouseDown}
      />
      
      <div 
        className="overflow-auto"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {rightPanel}
      </div>
    </div>
  );
} 