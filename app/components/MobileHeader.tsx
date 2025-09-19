'use client'

import { useState } from 'react'
import { Cloud, Menu, X, Search } from 'lucide-react'

interface MobileHeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export default function MobileHeader({ onMenuToggle, isMenuOpen }: MobileHeaderProps) {
  return (
    <header className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-4 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <div className="flex items-center ml-3">
          <Cloud className="h-7 w-7 text-gray-800 mr-2" />
          <span className="text-lg font-bold text-gray-900 tracking-tight">CloudStorage</span>
        </div>
      </div>

      <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
        <Search className="h-5 w-5" />
      </button>
    </header>
  )
}