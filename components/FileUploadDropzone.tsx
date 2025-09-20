'use client'

import { useState, useCallback, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { UploadDropzone } from "@/lib/uploadthing-components";
import type { OurFileRouter } from "@/lib/uploadthing";

interface FileUploadDropzoneProps {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
  className?: string;
  multiple?: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  url?: string;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export function FileUploadDropzone({ 
  onUploadComplete, 
  onUploadError, 
  className = "",
  multiple = false
}: FileUploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Handle file drop - UploadThing will handle this
      console.log('Files dropped:', files);
    }
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return { icon: File, color: 'text-red-600', bg: 'from-red-100 to-red-200' };
      case 'doc':
      case 'docx':
        return { icon: File, color: 'text-blue-600', bg: 'from-blue-100 to-blue-200' };
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return { icon: File, color: 'text-purple-600', bg: 'from-purple-100 to-purple-200' };
      case 'mp4':
      case 'avi':
      case 'mov':
        return { icon: File, color: 'text-pink-600', bg: 'from-pink-100 to-pink-200' };
      case 'mp3':
      case 'wav':
      case 'flac':
        return { icon: File, color: 'text-indigo-600', bg: 'from-indigo-100 to-indigo-200' };
      default:
        return { icon: File, color: 'text-gray-600', bg: 'from-gray-100 to-gray-200' };
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Dropzone */}
      <div
        ref={dropzoneRef}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
          isDragOver
            ? 'border-emerald-400 bg-emerald-50/50 scale-105'
            : 'border-gray-300 hover:border-emerald-300 hover:bg-gray-50/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadDropzone
          endpoint={multiple ? "multipleFileUploader" : "fileUploader"}
          onClientUploadComplete={(res) => {
            setIsUploading(false);
            if (res && res.length > 0) {
              const newFiles = res.map(file => ({
                id: file.key,
                name: file.name,
                size: file.size,
                url: file.url,
                status: 'completed' as const
              }));
              setUploadedFiles(prev => [...prev, ...newFiles]);
              
              if (res[0]) {
                onUploadComplete?.(res[0].url);
              }
            }
          }}
          onUploadError={(error: Error) => {
            setIsUploading(false);
            onUploadError?.(error);
          }}
          onUploadBegin={(name) => {
            setIsUploading(true);
            const newFile: UploadedFile = {
              id: Date.now().toString(),
              name: name,
              size: 0,
              status: 'uploading'
            };
            setUploadedFiles(prev => [...prev, newFile]);
          }}
          appearance={{
            container: "w-full",
            uploadIcon: "text-emerald-600",
            label: "text-gray-700 font-semibold",
            allowedContent: "text-gray-500 text-sm",
            button: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-700/40 hover:scale-105",
          }}
          content={{
            uploadIcon: <Upload className="h-12 w-12 text-emerald-600" />,
            label: "Arraste arquivos aqui ou clique para selecionar",
            allowedContent: "PNG, JPG, PDF, DOC, MP4 até 64MB",
            button: "Selecionar Arquivos"
          }}
        />

        {/* Drag overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
            <div className="text-center">
              <Upload className="h-16 w-16 text-emerald-600 mx-auto mb-4 animate-bounce" />
              <p className="text-lg font-semibold text-emerald-700">Solte os arquivos aqui</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <span className="text-sm font-medium text-blue-700">Enviando arquivos...</span>
          </div>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Arquivos Enviados</h4>
          {uploadedFiles.map((file) => {
            const { icon: Icon, color, bg } = getFileIcon(file.name);
            
            return (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 bg-gradient-to-br ${bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.size > 0 ? formatFileSize(file.size) : 'Calculando...'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'uploading' && (
                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                  )}
                  {file.status === 'completed' && (
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

