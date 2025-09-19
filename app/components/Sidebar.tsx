'use client'

import { Cloud, FolderOpen, Trash2, User } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentPage: 'files' | 'trash'
  onPageChange: (page: 'files' | 'trash') => void
}

export default function Sidebar({ isOpen, onClose, currentPage, onPageChange }: SidebarProps) {
  const navigation = [
    { name: 'Files', icon: FolderOpen, key: 'files' as const, current: currentPage === 'files' },
    { name: 'Trash', icon: Trash2, key: 'trash' as const, current: currentPage === 'trash' },
  ]
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`flex flex-col h-full w-64 bg-white border-r border-gray-200 shadow-md lg:relative lg:translate-x-0 lg:shadow-sm ${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out`}>
        {/* Logo - Hidden on mobile (shown in MobileHeader) */}
        <div className="hidden lg:flex items-center px-6 py-6 bg-white border-b border-gray-200">
          <Cloud className="h-8 w-8 text-gray-800 mr-3" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">CloudStorage</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-8 lg:py-8 pt-8 lg:pt-8 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                onClick={() => onPageChange(item.key)}
                className={`w-full group flex items-center px-4 py-3.5 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out ${
                  item.current
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    item.current ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                  }`}
                />
                {item.name}
              </button>
            )
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200 cursor-pointer">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-4 w-4 text-gray-700" />
            </div>
            <span className="text-sm font-semibold">user</span>
          </div>
        </div>
      </div>
    </>
  )
}