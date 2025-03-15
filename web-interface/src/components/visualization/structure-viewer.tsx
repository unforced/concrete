import React, { useState } from 'react';

interface FileNode {
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

function TreeNode({ node, depth = 0, onNodeClick }: { 
  node: FileNode; 
  depth?: number;
  onNodeClick: (node: FileNode) => void;
}) {
  const [isOpen, setIsOpen] = useState(depth < 2);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.type === 'directory') {
      setIsOpen(!isOpen);
    }
  };

  const handleClick = () => {
    onNodeClick(node);
  };

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'directory' && (
          <button
            className="h-4 w-4 flex items-center justify-center"
            onClick={toggleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
        <FileIcon type={node.type} />
        <span className="text-sm">{node.name}</span>
      </div>

      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StructureViewer({ structure }: StructureViewerProps) {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  const handleNodeClick = (node: FileNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Structure Preview</h2>
        <p className="text-sm text-gray-500">
          This is a preview of your .concrete structure
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-y-auto border-r p-4">
          <TreeNode node={structure} onNodeClick={handleNodeClick} />
        </div>

        <div className="w-1/2 overflow-y-auto p-4">
          {selectedNode ? (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <FileIcon type={selectedNode.type} />
                <h3 className="text-md font-medium">{selectedNode.name}</h3>
              </div>

              {selectedNode.type === 'file' && selectedNode.content ? (
                <pre className="rounded-md bg-gray-100 p-4 text-sm dark:bg-gray-800">
                  <code>{selectedNode.content}</code>
                </pre>
              ) : (
                <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                  <p className="text-sm">
                    {selectedNode.type === 'directory'
                      ? `Directory with ${selectedNode.children?.length || 0} items`
                      : 'No content available'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-500">
                Select a file or directory to view details
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium">Export Options:</span>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800">
              Download ZIP
            </button>
            <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white">
              Create GitHub Repo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 