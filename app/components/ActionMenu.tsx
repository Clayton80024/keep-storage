'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Upload, FolderPlus, File, X } from 'lucide-react'
import { FileUploadButton, MultipleFileUploadButton } from '../../components/FileUpload'

interface ActionMenuProps {
  isOpen: boolean
  onClose: () => void
  isMobile?: boolean
}

const actions = [
  {
    name: 'Upload Files',
    icon: Upload,
    color: 'emerald',
    description: 'Upload files from your device'
  },
  {
    name: 'New Folder',
    icon: FolderPlus,
    color: 'teal',
    description: 'Create a new folder'
  },
  {
    name: 'Create Document',
    icon: File,
    color: 'sky',
    description: 'Start with a blank document'
  },
]

export default function ActionMenu({ isOpen, onClose, isMobile = false }: ActionMenuProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleUploadComplete = (url: string) => {
    console.log('File uploaded successfully:', url)
    // TODO: Refresh file list or show success message
    onClose()
  }

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error)
    // TODO: Show error message to user
  }

  const handleAction = (actionName: string) => {
    console.log(`Action selected: ${actionName}`)
    // Aqui você pode implementar a lógica específica para cada ação
    onClose()
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Mobile Menu - Enhanced UI/UX */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out border-t border-gray-100">
          {/* Handle */}
          <div className="flex justify-center pt-5 pb-3">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Create New</h3>
                <p className="text-sm text-gray-500 mt-1">Choose what you'd like to create</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 space-y-4">
            {/* Upload Single File */}
            <div className="space-y-2">
              <div className="flex items-center p-4 bg-gray-50/50 rounded-xl">
                <div className="h-12 w-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Upload className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-semibold text-gray-900">Upload Arquivo</h4>
                  <p className="text-sm text-gray-500 mt-1">Enviar um arquivo</p>
                </div>
              </div>
              <FileUploadButton 
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                className="w-full"
              />
            </div>

            {/* Upload Multiple Files */}
            <div className="space-y-2">
              <div className="flex items-center p-4 bg-gray-50/50 rounded-xl">
                <div className="h-12 w-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Upload className="h-6 w-6 text-teal-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-semibold text-gray-900">Upload Múltiplos</h4>
                  <p className="text-sm text-gray-500 mt-1">Enviar vários arquivos</p>
                </div>
              </div>
              <MultipleFileUploadButton 
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                className="w-full"
              />
            </div>

            {/* Create Folder */}
            <button
              onClick={() => handleAction('New Folder')}
              className="w-full flex items-center p-5 text-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-emerald-50/30 rounded-xl transition-all duration-200 group border border-transparent hover:border-emerald-100"
            >
              <div className="h-14 w-14 bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                <FolderPlus className="h-7 w-7 text-sky-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Nova Pasta</h4>
                <p className="text-sm text-gray-500 group-hover:text-gray-600 mt-1 transition-colors">Criar uma nova pasta</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-3">
                <div className="h-2.5 w-2.5 bg-emerald-400 rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Footer tip */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              💡 Swipe down or tap outside to close
            </p>
          </div>

          {/* Bottom padding for safe area */}
          <div className="h-6" />
        </div>
      </>
    )
  }

  // Desktop Modal Popup - Using Portal to render at body level
  const modalContent = (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 ease-out scale-100">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100 relative">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">Create New</h3>
              <p className="text-sm text-gray-600 mt-1">Choose what you'd like to create</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="p-6 space-y-4">
            {/* Upload Single File */}
            <div className="space-y-2">
              <div className="flex items-center p-4 bg-gray-50/50 rounded-xl">
                <div className="h-12 w-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Upload className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-semibold text-gray-900">Upload Arquivo</h4>
                  <p className="text-sm text-gray-500 mt-1">Enviar um arquivo</p>
                </div>
              </div>
              <FileUploadButton 
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                className="w-full"
              />
            </div>

            {/* Upload Multiple Files */}
            <div className="space-y-2">
              <div className="flex items-center p-4 bg-gray-50/50 rounded-xl">
                <div className="h-12 w-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Upload className="h-6 w-6 text-teal-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-semibold text-gray-900">Upload Múltiplos</h4>
                  <p className="text-sm text-gray-500 mt-1">Enviar vários arquivos</p>
                </div>
              </div>
              <MultipleFileUploadButton 
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                className="w-full"
              />
            </div>

            {/* Create Folder */}
            <button
              onClick={() => handleAction('New Folder')}
              className="w-full flex items-center p-4 text-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-emerald-50/30 rounded-xl transition-all duration-200 group border border-transparent hover:border-emerald-100 hover:shadow-sm"
            >
              <div className="h-14 w-14 bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                <FolderPlus className="h-7 w-7 text-sky-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  Nova Pasta
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-gray-600 mt-0.5 transition-colors">
                  Criar uma nova pasta
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-3">
                <div className="h-2.5 w-2.5 bg-emerald-400 rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              💡 Press ESC or click outside to close
            </p>
          </div>
        </div>
      </div>
    </>
  )

  // Use portal to render modal at document.body level
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}