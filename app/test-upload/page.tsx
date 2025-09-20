'use client'

import { useState } from 'react'
import { UploadButton } from '@/lib/uploadthing-components'

export default function TestUpload() {
  const [uploadResult, setUploadResult] = useState<string>('')
  const [error, setError] = useState<string>('')

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Test Upload</h2>
      
      <div className="mb-4">
        <UploadButton
          endpoint="fileUploader"
          onClientUploadComplete={(res) => {
            console.log('✅ Upload complete:', res)
            setUploadResult(JSON.stringify(res, null, 2))
            setError('')
          }}
          onUploadError={(error) => {
            console.error('❌ Upload error:', error)
            setError(error.message)
            setUploadResult('')
          }}
          onUploadBegin={(name) => {
            console.log('🚀 Upload started:', name)
            setUploadResult('')
            setError('')
          }}
        />
      </div>

      {uploadResult && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Upload Success:</h3>
          <pre className="text-sm text-green-700 whitespace-pre-wrap">{uploadResult}</pre>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">Upload Error:</h3>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}
