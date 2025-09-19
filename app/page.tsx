'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import TrashContent from './components/TrashContent'
import MobileHeader from './components/MobileHeader'
import FloatingActionButton from './components/FloatingActionButton'
import ActionMenu from './components/ActionMenu'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<'files' | 'trash'>('files')
  const [isMobileActionMenuOpen, setIsMobileActionMenuOpen] = useState(false)

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 via-emerald-50/30 to-gray-100 antialiased">
      {/* Mobile Header */}
      <MobileHeader
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
      />

      {/* Main Layout */}
      <div className="flex h-full lg:h-screen">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        {currentPage === 'files' ? <MainContent /> : <TrashContent />}
      </div>

      {/* Floating Action Button for Mobile - Only on Files page */}
      {currentPage === 'files' && (
        <FloatingActionButton onClick={() => setIsMobileActionMenuOpen(true)} />
      )}

      {/* Mobile Action Menu */}
      <ActionMenu
        isOpen={isMobileActionMenuOpen}
        onClose={() => setIsMobileActionMenuOpen(false)}
        isMobile={true}
      />
    </div>
  )
}
