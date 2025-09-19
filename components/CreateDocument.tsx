'use client'

import { useState } from 'react';
import { FileText, Check, X, File, FileSpreadsheet, FileImage } from 'lucide-react';

interface CreateDocumentProps {
  onCreateDocument: (type: string, name: string) => void;
  onCancel: () => void;
  className?: string;
}

const documentTypes = [
  {
    id: 'text',
    name: 'Documento de Texto',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'from-blue-100 to-blue-200',
    extension: '.txt',
    description: 'Criar um documento de texto simples'
  },
  {
    id: 'spreadsheet',
    name: 'Planilha',
    icon: FileSpreadsheet,
    color: 'text-green-600',
    bg: 'from-green-100 to-green-200',
    extension: '.csv',
    description: 'Criar uma planilha de dados'
  },
  {
    id: 'note',
    name: 'Nota',
    icon: File,
    color: 'text-purple-600',
    bg: 'from-purple-100 to-purple-200',
    extension: '.md',
    description: 'Criar uma nota em Markdown'
  }
];

export function CreateDocument({ onCreateDocument, onCancel, className = "" }: CreateDocumentProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [documentName, setDocumentName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !documentName.trim()) return;
    
    setIsCreating(true);
    try {
      const fullName = documentName.trim() + documentTypes.find(t => t.id === selectedType)?.extension;
      await onCreateDocument(selectedType, fullName);
      setDocumentName('');
      setSelectedType('');
    } catch (error) {
      console.error('Error creating document:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Novo Documento</h3>
            <p className="text-sm text-gray-500">Escolha o tipo e nome do documento</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-6">
          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Documento
            </label>
            <div className="grid grid-cols-1 gap-3">
              {documentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedType === type.id
                        ? 'border-purple-300 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 bg-gradient-to-br ${type.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${type.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">{type.name}</h4>
                        <p className="text-xs text-gray-500">{type.description}</p>
                      </div>
                      {selectedType === type.id && (
                        <div className="h-5 w-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document Name */}
          <div>
            <label htmlFor="documentName" className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Documento
            </label>
            <input
              id="documentName"
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Digite o nome do documento..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-400 transition-all duration-200"
              disabled={isCreating}
            />
            {selectedType && (
              <p className="text-xs text-gray-500 mt-1">
                Arquivo será criado como: {documentName.trim() || 'nome'}{documentTypes.find(t => t.id === selectedType)?.extension}
              </p>
            )}
          </div>

          {/* Actions */}
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
              disabled={!selectedType || !documentName.trim() || isCreating}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Criando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Criar Documento
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
