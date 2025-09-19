'use client'

import { useState } from 'react'
import { Plus, Search, Grid3X3, List, Trash2, Undo2, X } from 'lucide-react'

const trashedFiles = [
  { name: 'Old Project.pdf', size: '1.2 MB', deleted: '2 days ago', type: 'pdf' },
  { name: 'Backup Files.zip', size: '25.1 MB', deleted: '1 week ago', type: 'zip' },
  { name: 'Draft Document.docx', size: '0.5 MB', deleted: '3 days ago', type: 'doc' },
]

export default function TrashContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header - Desktop only */}
      <header className="hidden lg:block border-b border-gray-200/60 bg-white/95 backdrop-blur-sm px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Trash</h1>
            <p className="text-sm text-gray-600 mt-1 font-medium">Manage deleted files and recover them</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search in trash..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm w-72 bg-white shadow-sm placeholder:text-gray-400 text-gray-900"
              />
            </div>

            {/* View options */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-md transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm text-gray-700 hover:text-gray-900 hover:shadow-md'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-gray-700 hover:text-gray-900 hover:shadow-md'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Empty Trash button */}
            <div className="relative">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-700/40 hover:scale-105">
                <Trash2 className="h-5 w-5 mr-2" />
                Empty Trash
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden border-b border-gray-200/60 bg-white/95 backdrop-blur-sm px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Trash</h1>
            <p className="text-xs text-gray-600 mt-1 font-medium">Deleted files</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-600/30">
            <Trash2 className="h-4 w-4 mr-1" />
            Empty
          </button>
        </div>

        {/* Mobile Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search in trash..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm bg-white shadow-sm placeholder:text-gray-400 text-gray-900"
          />
        </div>

        {/* Mobile View options */}
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-gray-700 hover:text-gray-900 hover:shadow-md'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-gray-700 hover:text-gray-900 hover:shadow-md'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 lg:py-8 pb-20 lg:pb-8 bg-gradient-to-br from-gray-50 to-red-50/20 min-h-0 overflow-auto">
        {/* Trash Info */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
          <div className="flex items-start">
            <Trash2 className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-red-800">Items in Trash</h3>
              <p className="text-sm text-red-700 mt-1">Files in trash will be automatically deleted after 30 days. You can restore or permanently delete them.</p>
            </div>
          </div>
        </div>

        {/* Trashed Files */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/60 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Deleted Files</h2>
            <span className="text-sm text-gray-500">{trashedFiles.length} items</span>
          </div>

          {trashedFiles.length > 0 ? (
            viewMode === 'list' ? (
              <div className="space-y-3 transition-all duration-300">
                {trashedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 md:p-4 bg-gray-50/50 hover:bg-white hover:shadow-md rounded-lg border border-gray-200/40 transition-all duration-200 cursor-pointer group hover:border-red-200"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="h-10 w-10 md:h-11 md:w-11 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mr-3 md:mr-4 shadow-sm flex-shrink-0">
                        <Trash2 className="h-4 w-4 md:h-5 md:w-5 text-red-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors truncate">
                          {file.name}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-500 font-medium">
                          <span className="hidden sm:inline">{file.size} • </span>Deleted {file.deleted}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                      <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200" title="Restore">
                        <Undo2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200" title="Delete permanently">
                        <X className="h-4 w-4" />
                      </button>
                      <span className="inline-flex items-center px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                        {file.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 transition-all duration-300">
                {trashedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="bg-gray-50/50 hover:bg-white hover:shadow-md rounded-lg border border-gray-200/40 p-4 transition-all duration-200 cursor-pointer group hover:border-red-200"
                  >
                    <div className="text-center">
                      <div className="h-16 w-16 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Trash2 className="h-8 w-8 text-red-700" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors truncate mb-1">
                        {file.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium mb-3">
                        {file.size}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">
                        Deleted {file.deleted}
                      </p>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <button className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200" title="Restore">
                          <Undo2 className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200" title="Delete permanently">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                        {file.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="h-12 w-12 md:h-16 md:w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trash is empty</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">No deleted files to show. Files you delete will appear here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}