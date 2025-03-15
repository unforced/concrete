'use client';

import React, { useState } from 'react';
import ExportDialog from '@/components/export/export-dialog';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  content?: string;
}

interface StructureViewerProps {
  structure: FileNode;
}

function FileIcon({ type }: { type: 'file' | 'directory' }) {
  if (type === 'directory') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

interface TreeNodeProps {
  node: FileNode;
  onSelect: (node: FileNode) => void;
  selectedId?: string;
}

function TreeNode({ node, onSelect, selectedId }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  const isDirectory = node.type === 'directory';
  const isSelected = node.id === selectedId;
  
  const toggleOpen = (e: React.MouseEvent) => {
    if (isDirectory) {
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <div>
      <div
        className={`flex cursor-pointer items-center rounded-md px-2 py-1 ${
          isSelected ? 'bg-blue-100 dark:bg-blue-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={() => onSelect(node)}
      >
        <div className="mr-1" onClick={toggleOpen}>
          {isDirectory && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              )}
            </svg>
          )}
        </div>
        <FileIcon type={node.type} />
        <span className="ml-1 text-sm">{node.name}</span>
      </div>
      
      {isDirectory && isOpen && node.children && (
        <div className="ml-4 mt-1 border-l pl-2">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StructureViewer({ structure }: StructureViewerProps) {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const handleNodeSelect = (node: FileNode) => {
    setSelectedNode(node);
  };

  const handleExport = () => {
    setIsExportDialogOpen(true);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Structure Viewer</h2>
        <button
          onClick={handleExport}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
        >
          Export
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-auto border-r p-4">
          <TreeNode 
            node={structure} 
            onSelect={handleNodeSelect} 
            selectedId={selectedNode?.id}
          />
        </div>
        <div className="w-1/2 overflow-auto p-4">
          {selectedNode ? (
            <div>
              <h3 className="mb-2 text-lg font-medium">{selectedNode.name}</h3>
              <p className="mb-4 text-sm text-gray-500">
                {selectedNode.type === 'file' ? 'File' : 'Directory'}
              </p>
              {selectedNode.type === 'file' && selectedNode.content && (
                <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                  <pre className="whitespace-pre-wrap text-sm">{selectedNode.content}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              Select a file or directory to view details
            </div>
          )}
        </div>
      </div>
      
      {isExportDialogOpen && (
        <ExportDialog
          structure={structure}
          isOpen={isExportDialogOpen}
          onClose={() => setIsExportDialogOpen(false)}
        />
      )}
    </div>
  );
} 