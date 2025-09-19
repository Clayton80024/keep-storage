'use client'

import { useState } from 'react'
import { Plus, Search, Grid3X3, List, Upload, FolderPlus, File, Folder, FileText, FileImage, FileVideo, FileAudio, FileSpreadsheet } from 'lucide-react'
import ActionMenu from './ActionMenu'

const allFiles = [
  // Folders
  { name: 'Documents', type: 'folder', size: '23 items', modified: '2 hours ago', isFolder: true },
  { name: 'Images', type: 'folder', size: '156 items', modified: '1 day ago', isFolder: true },
  { name: 'Videos', type: 'folder', size: '12 items', modified: '3 days ago', isFolder: true },
  { name: 'Work Projects', type: 'folder', size: '8 items', modified: '1 week ago', isFolder: true },

  // Files
  { name: 'Project Proposal.pdf', size: '2.3 MB', modified: '2 hours ago', type: 'pdf', isFolder: false },
  { name: 'Design Assets.zip', size: '15.7 MB', modified: '1 day ago', type: 'zip', isFolder: false },
  { name: 'Meeting Notes.docx', size: '0.8 MB', modified: '3 days ago', type: 'doc', isFolder: false },
  { name: 'Budget 2024.xlsx', size: '1.2 MB', modified: '5 days ago', type: 'excel', isFolder: false },
  { name: 'Presentation.pptx', size: '8.5 MB', modified: '1 week ago', type: 'ppt', isFolder: false },
  { name: 'Profile Picture.jpg', size: '3.2 MB', modified: '2 weeks ago', type: 'image', isFolder: false },
  { name: 'Code Backup.zip', size: '45.2 MB', modified: '3 weeks ago', type: 'zip', isFolder: false },
  { name: 'Audio Recording.mp3', size: '12.8 MB', modified: '1 month ago', type: 'audio', isFolder: false },
]

const recentFiles = allFiles.filter(file => !file.isFolder).slice(0, 3)

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

export default function MainContent() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
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
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className="hidden lg:inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-600/30"
          >
            <Plus className="h-4 w-4 mr-1" />
            New
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
            <span className="text-sm text-gray-500">{allFiles.length} items</span>
          </div>

          {viewMode === 'list' ? (
            /* List View */
            <div className="space-y-2">
              {allFiles.map((file, index) => {
                const { icon: Icon, color, bg } = getFileIcon(file)
                return (
                  <div
                    key={index}
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
              {allFiles.map((file, index) => {
                const { icon: Icon, color, bg } = getFileIcon(file)
                return (
                  <div
                    key={index}
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

          {recentFiles.length > 0 ? (
            <div className="space-y-3">
              {recentFiles.map((file, index) => (
                <div
                  key={index}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No files yet</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">Get started by uploading your first file or creating a new document.</p>
            </div>
          )}
        </div>
      </main>

      {/* Action Menu - Rendered outside all containers */}
      <ActionMenu
        isOpen={isActionMenuOpen}
        onClose={() => setIsActionMenuOpen(false)}
        isMobile={false}
      />
    </div>
  )
}