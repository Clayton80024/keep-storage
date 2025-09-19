'use client'

import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { useState } from "react";
import { Plus, Upload, FolderPlus, File } from "lucide-react";
import type { OurFileRouter } from "@/lib/uploadthing";

interface UploadComponentProps {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
  multiple?: boolean;
  className?: string;
}

export function FileUploadButton({ 
  onUploadComplete, 
  onUploadError, 
  multiple = false,
  className = ""
}: UploadComponentProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className={className}>
      <UploadButton<OurFileRouter, "fileUploader">
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          if (res && res[0]) {
            onUploadComplete?.(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          onUploadError?.(error);
        }}
        onUploadBegin={(name) => {
          setIsUploading(true);
        }}
        appearance={{
          button: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-700/40 hover:scale-105",
          allowedContent: "text-gray-500 text-xs",
        }}
        content={{
          button: (
            <div className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              {isUploading ? "Enviando..." : "Upload Arquivo"}
            </div>
          ),
        }}
      />
    </div>
  );
}

export function MultipleFileUploadButton({ 
  onUploadComplete, 
  onUploadError, 
  className = ""
}: UploadComponentProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className={className}>
      <UploadButton<OurFileRouter, "multipleFileUploader">
        endpoint="multipleFileUploader"
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          if (res) {
            res.forEach(file => onUploadComplete?.(file.url));
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          onUploadError?.(error);
        }}
        onUploadBegin={(name) => {
          setIsUploading(true);
        }}
        appearance={{
          button: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-teal-600/30 hover:shadow-teal-700/40 hover:scale-105",
          allowedContent: "text-gray-500 text-xs",
        }}
        content={{
          button: (
            <div className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              {isUploading ? "Enviando..." : "Upload Múltiplos"}
            </div>
          ),
        }}
      />
    </div>
  );
}

export function FileUploadDropzone({ 
  onUploadComplete, 
  onUploadError, 
  className = ""
}: UploadComponentProps) {
  return (
    <div className={className}>
      <UploadDropzone<OurFileRouter, "fileUploader">
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            onUploadComplete?.(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          onUploadError?.(error);
        }}
        appearance={{
          container: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors",
          uploadIcon: "text-emerald-500",
          label: "text-gray-700 font-semibold",
          button: "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors",
          allowedContent: "text-gray-500 text-sm",
        }}
        content={{
          uploadIcon: <Upload className="h-12 w-12 mx-auto mb-4 text-emerald-500" />,
          label: "Arraste arquivos aqui ou clique para selecionar",
          button: "Selecionar Arquivos",
        }}
      />
    </div>
  );
}

// Action Menu Component with Upload Integration
export function UploadActionMenu({ 
  isOpen, 
  onClose, 
  isMobile = false,
  onUploadComplete,
  onUploadError 
}: {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
}) {
  const actions = [
    {
      name: 'Upload Arquivo',
      icon: Upload,
      color: 'emerald',
      description: 'Enviar um arquivo',
      component: <FileUploadButton onUploadComplete={onUploadComplete} onUploadError={onUploadError} />
    },
    {
      name: 'Upload Múltiplos',
      icon: Upload,
      color: 'teal',
      description: 'Enviar vários arquivos',
      component: <MultipleFileUploadButton onUploadComplete={onUploadComplete} onUploadError={onUploadError} />
    },
    {
      name: 'Nova Pasta',
      icon: FolderPlus,
      color: 'sky',
      description: 'Criar uma nova pasta',
      onClick: () => {
        // TODO: Implement folder creation
        console.log('Create folder');
        onClose();
      }
    },
  ];

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Mobile Menu */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out border-t border-gray-100">
          {/* Handle */}
          <div className="flex justify-center pt-5 pb-3">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Criar Novo</h3>
                <p className="text-sm text-gray-500 mt-1">Escolha o que você quer criar</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 space-y-4">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={action.name} className="space-y-2">
                  <div className="flex items-center p-4 bg-gray-50/50 rounded-xl">
                    <div className={`h-12 w-12 bg-gradient-to-br from-${action.color}-100 to-${action.color}-200 rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon className={`h-6 w-6 text-${action.color}-600`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-semibold text-gray-900">{action.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                    </div>
                  </div>
                  {action.component}
                </div>
              );
            })}
          </div>

          {/* Bottom padding */}
          <div className="h-6" />
        </div>
      </>
    );
  }

  // Desktop Modal
  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">Criar Novo</h3>
              <p className="text-sm text-gray-600 mt-1">Escolha o que você quer criar</p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 space-y-4">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={action.name} className="space-y-2">
                  <div className="flex items-center p-4 bg-gray-50/50 rounded-xl">
                    <div className={`h-12 w-12 bg-gradient-to-br from-${action.color}-100 to-${action.color}-200 rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon className={`h-6 w-6 text-${action.color}-600`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-semibold text-gray-900">{action.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                    </div>
                  </div>
                  {action.component}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
