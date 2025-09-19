'use client'

import { useState } from 'react';
import { FolderPlus, Check, X } from 'lucide-react';

interface CreateFolderProps {
  onCreateFolder: (name: string) => void;
  onCancel: () => void;
  className?: string;
}

export function CreateFolder({ onCreateFolder, onCancel, className = "" }: CreateFolderProps) {
  const [folderName, setFolderName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!folderName.trim()) return;
    
    setIsCreating(true);
    try {
      await onCreateFolder(folderName.trim());
      setFolderName('');
    } catch (error) {
      console.error('Error creating folder:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
            <FolderPlus className="h-5 w-5 text-sky-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Nova Pasta</h3>
            <p className="text-sm text-gray-500">Digite o nome da pasta</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="folderName" className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Pasta
            </label>
            <input
              id="folderName"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Ex: Documentos, Projetos, Fotos..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-900 placeholder-gray-400 transition-all duration-200"
              autoFocus
              disabled={isCreating}
            />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isCreating}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={!folderName.trim() || isCreating}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Criando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Criar Pasta
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
