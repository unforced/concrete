'use client';

import { useState } from 'react';
import { FileNode } from '@/components/visualization/structure-viewer';

interface ExportDialogProps {
  structure: FileNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportDialog({ structure, isOpen, onClose }: ExportDialogProps) {
  const [format, setFormat] = useState<'json' | 'zip' | 'github'>('json');
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<{
    success: boolean;
    message: string;
    downloadUrl?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportResult(null);

      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          structure,
          format,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Export failed');
      }

      setExportResult({
        success: true,
        message: data.message,
        downloadUrl: data.downloadUrl,
      });
    } catch (error) {
      console.error('Export error:', error);
      setExportResult({
        success: false,
        message: error instanceof Error ? error.message : 'Export failed',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = () => {
    if (exportResult?.downloadUrl) {
      window.open(exportResult.downloadUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Export Structure</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Export Format</label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                id="format-json"
                name="format"
                type="radio"
                checked={format === 'json'}
                onChange={() => setFormat('json')}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700"
              />
              <label htmlFor="format-json" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                JSON (.json)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="format-zip"
                name="format"
                type="radio"
                checked={format === 'zip'}
                onChange={() => setFormat('zip')}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700"
              />
              <label htmlFor="format-zip" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                ZIP Archive (.zip)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="format-github"
                name="format"
                type="radio"
                checked={format === 'github'}
                onChange={() => setFormat('github')}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700"
              />
              <label htmlFor="format-github" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                GitHub Repository
              </label>
            </div>
          </div>
        </div>

        {exportResult && (
          <div className={`mb-4 rounded-md p-4 ${exportResult.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            <div className="flex">
              <div className={`text-sm ${exportResult.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {exportResult.message}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          {exportResult?.success && exportResult.downloadUrl ? (
            <button
              onClick={handleDownload}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none disabled:opacity-70"
            >
              Download
            </button>
          ) : (
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none disabled:opacity-70"
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 