'use client'

import { useState, useEffect } from 'react';

interface FileItem {
  id: string;
  name: string;
  originalName: string;
  size: string;
  modified: string;
  type: string;
  isFolder: boolean;
  url?: string;
  mimeType?: string;
  createdAt: string;
  updatedAt: string;
}

interface FilesData {
  allFiles: FileItem[];
  recentFiles: FileItem[];
  totalFiles: number;
  totalFolders: number;
}

export function useFiles() {
  const [filesData, setFilesData] = useState<FilesData>({
    allFiles: [],
    recentFiles: [],
    totalFiles: 0,
    totalFolders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/files');
      
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      
      const data = await response.json();
      setFilesData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshFiles = () => {
    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    filesData,
    loading,
    error,
    refreshFiles
  };
}

