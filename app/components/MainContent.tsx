'use client'

import { useState } from 'react'
import { Plus, Search, Grid3X3, List, Upload, FolderPlus, File, Folder, FileText, FileImage, FileVideo, FileAudio, FileSpreadsheet, RefreshCw } from 'lucide-react'
import ActionMenu from './ActionMenu'
import { useFiles } from '../../hooks/useFiles'

const getFileIcon = (file: any) => {
  if (file.isFolder) {
    return { icon: Folder, color: 'text-blue-600', bg: 'from-blue-100 to-blue-200' }
  }

  switch (file.type) {
    case 'pdf':
      return { icon: File, color: 'text-red-600', bg: 'from-red-100 to-red-200' }
    case 'doc':
    case 'docx':
      return { icon: FileText, color: 'text-blue-600', bg: 'from-blue-100 to-blue-200' }
    case 'excel':
    case 'xlsx':
      return { icon: FileSpreadsheet, color: 'text-green-600', bg: 'from-green-100 to-green-200' }
    case 'ppt':
    case 'pptx':
      return { icon: FileText, color: 'text-orange-600', bg: 'from-orange-100 to-orange-200' }
    case 'image':
    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'gif':
    case 'webp':
      return { icon: FileImage, color: 'text-purple-600', bg: 'from-purple-100 to-purple-200' }
    case 'video':
    case 'mp4':
    case 'avi':
    case 'mov':
      return { icon: FileVideo, color: 'text-pink-600', bg: 'from-pink-100 to-pink-200' }
    case 'audio':
    case 'mp3':
    case 'wav':
    case 'flac':
      return { icon: FileAudio, color: 'text-indigo-600', bg: 'from-indigo-100 to-indigo-200' }
    case 'zip':
    case 'rar':
    case '7z':
      return { icon: File, color: 'text-yellow-600', bg: 'from-yellow-100 to-yellow-200' }
    default:
      return { icon: File, color: 'text-gray-600', bg: 'from-gray-100 to-gray-200' }
  }
}

export default function MainContent() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const { filesData, loading, error, refreshFiles } = useFiles()

  const handleUploadComplete = () => {
    // Refresh files after upload
    refreshFiles()
    setIsActionMenuOpen(false)
  }

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error)
    // TODO: Show error message to user
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        {/* Header - Desktop only */}
        <header className="hidden lg:block border-b border-gray-200/60 bg-white/95 backdrop-blur-sm px-8 py-6 shadow-sm relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Files</h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">Manage and organize your cloud storage</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm w-72 bg-white shadow-sm placeholder:text-gray-400 text-gray-900"
                  disabled
                />
              </div>
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 shadow-sm">
                <button className="p-2.5 rounded-md bg-white shadow-sm text-gray-700">
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button className="p-2.5 rounded-md text-gray-500">
                  <List className="h-4 w-4" />
                </button>
              </div>
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-700/40 hover:scale-105">
                <Plus className="h-5 w-5 mr-2" />
                New
              </button>
            </div>
          </div>
        </header>

        {/* Loading Content */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 lg:py-8 pb-20 lg:pb-8 bg-gradient-to-br from-gray-50 to-emerald-50/30 min-h-0 overflow-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/60 p-4 md:p-6 mb-8">
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-6 w-6 text-emerald-600 animate-spin" />
                <span className="text-lg font-medium text-gray-700">Loading your files...</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        {/* Header - Desktop only */}
        <header className="hidden lg:block border-b border-gray-200/60 bg-white/95 backdrop-blur-sm px-8 py-6 shadow-sm relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Files</h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">Manage and organize your cloud storage</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshFiles}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all duration-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </button>
            </div>
          </div>
        </header>

        {/* Error Content */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 lg:py-8 pb-20 lg:pb-8 bg-gradient-to-br from-gray-50 to-emerald-50/30 min-h-0 overflow-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-red-200/60 p-4 md:p-6 mb-8">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <File className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading files</h3>
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                <button
                  onClick={refreshFiles}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 transition-all duration-200"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

const getFileIcon = (file: any) => {
  if (file.isFolder) {
    return { icon: Folder, color: 'text-blue-600', bg: 'from-blue-100 to-blue-200' }
  }

  switch (file.type) {
    case 'pdf':
      return { icon: File, color: 'text-red-600', bg: 'from-red-100 to-red-200' }
    case 'doc':
    case 'docx':
      return { icon: FileText, color: 'text-blue-600', bg: 'from-blue-100 to-blue-200' }
    case 'excel':
    case 'xlsx':
      return { icon: FileSpreadsheet, color: 'text-green-600', bg: 'from-green-100 to-green-200' }
    case 'ppt':
    case 'pptx':
      return { icon: FileText, color: 'text-orange-600', bg: 'from-orange-100 to-orange-200' }
    case 'image':
    case 'jpg':
    case 'png':
      return { icon: FileImage, color: 'text-purple-600', bg: 'from-purple-100 to-purple-200' }
    case 'video':
    case 'mp4':
      return { icon: FileVideo, color: 'text-pink-600', bg: 'from-pink-100 to-pink-200' }
    case 'audio':
    case 'mp3':
      return { icon: FileAudio, color: 'text-indigo-600', bg: 'from-indigo-100 to-indigo-200' }
    case 'zip':
      return { icon: File, color: 'text-yellow-600', bg: 'from-yellow-100 to-yellow-200' }
    default:
      return { icon: File, color: 'text-gray-600', bg: 'from-gray-100 to-gray-200' }
  }
}

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header - Desktop only */}
      <header className="hidden lg:block border-b border-gray-200/60 bg-white/95 backdrop-blur-sm px-8 py-6 shadow-sm relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Files</h1>
            <p className="text-sm text-gray-600 mt-1 font-medium">Manage and organize your cloud storage</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search files..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm w-72 bg-white shadow-sm placeholder:text-gray-400 text-gray-900"
              />
            </div>

            {/* View options */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-md transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Refresh button */}
            <button
              onClick={refreshFiles}
              className="inline-flex items-center px-4 py-2.5 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>

            {/* New button */}
            <div className="relative">
              <button
                onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-700/40 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                New
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden border-b border-gray-200/60 bg-white/95 backdrop-blur-sm px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Files</h1>
            <p className="text-xs text-gray-600 mt-1 font-medium">Manage your files</p>
          </div>
          <button
            onClick={refreshFiles}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </button>
        </div>

        {/* Mobile Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white shadow-sm placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 lg:py-8 pb-20 lg:pb-8 bg-gradient-to-br from-gray-50 to-emerald-50/30 min-h-0 overflow-auto">
        {/* All Files */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/60 p-4 md:p-6 mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">All Files</h2>
            <span className="text-sm text-gray-500">{filesData.allFiles.length} items</span>
          </div>

          {filesData.allFiles.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <div className="h-12 w-12 md:h-16 md:w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <File className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No files yet</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto mb-6">Get started by uploading your first file or creating a new document.</p>
              <button
                onClick={() => setIsActionMenuOpen(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-700/40 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Upload Your First File
              </button>
            </div>
          ) : viewMode === 'list' ? (
            /* List View */
            <div className="space-y-2">
              {filesData.allFiles.map((file) => {
                const { icon: Icon, color, bg } = getFileIcon(file)
                return (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 md:p-4 bg-gray-50/50 hover:bg-white hover:shadow-md rounded-lg border border-gray-200/40 transition-all duration-200 cursor-pointer group hover:border-blue-200"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <div className={`h-10 w-10 md:h-11 md:w-11 bg-gradient-to-br ${bg} rounded-lg flex items-center justify-center mr-3 md:mr-4 shadow-sm flex-shrink-0`}>
                        <Icon className={`h-5 w-5 md:h-6 md:w-6 ${color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                          {file.name}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-500 font-medium">
                          {file.size} • {file.modified}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                      {!file.isFolder && (
                        <span className="inline-flex items-center px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                          {file.type.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filesData.allFiles.map((file) => {
                const { icon: Icon, color, bg } = getFileIcon(file)
                return (
                  <div
                    key={file.id}
                    className="flex flex-col items-center p-4 bg-gray-50/50 hover:bg-white hover:shadow-md rounded-lg border border-gray-200/40 transition-all duration-200 cursor-pointer group hover:border-blue-200"
                  >
                    <div className={`h-12 w-12 bg-gradient-to-br ${bg} rounded-lg flex items-center justify-center mb-3 shadow-sm`}>
                      <Icon className={`h-6 w-6 ${color}`} />
                    </div>
                    <div className="text-center min-w-0 w-full">
                      <h4 className="text-xs font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate mb-1">
                        {file.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium truncate">
                        {file.size}
                      </p>
                      {!file.isFolder && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm mt-2">
                          {file.type.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Files */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/60 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Recent Files</h2>
            <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors duration-200">
              View all
            </button>
          </div>

          {filesData.recentFiles.length > 0 ? (
            <div className="space-y-3">
              {filesData.recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 md:p-4 bg-gray-50/50 hover:bg-white hover:shadow-md rounded-lg border border-gray-200/40 transition-all duration-200 cursor-pointer group hover:border-teal-200"
                >
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="h-10 w-10 md:h-11 md:w-11 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mr-3 md:mr-4 shadow-sm flex-shrink-0">
                      <File className="h-4 w-4 md:h-5 md:w-5 text-emerald-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors truncate">
                        {file.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-500 font-medium">
                        <span className="hidden sm:inline">{file.size} • </span>{file.modified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <span className="inline-flex items-center px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                      {file.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="h-12 w-12 md:h-16 md:w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <File className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent files</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">Files you upload will appear here.</p>
            </div>
          )}
        </div>
      </main>

      {/* Action Menu - Rendered outside all containers */}
      <ActionMenu
        isOpen={isActionMenuOpen}
        onClose={() => setIsActionMenuOpen(false)}
        isMobile={false}
        onUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />
    </div>
  )
}