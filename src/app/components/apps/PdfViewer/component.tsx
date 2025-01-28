import React, { useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { PdfViewerProps } from './types';

export const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl);
    printWindow?.focus();
    printWindow?.print();
  };

  return (
    <div className="w-full h-full bg-white relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <p>Chargement du PDF...</p>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
          <p className="mb-4">Impossible d&apos;afficher le PDF.</p>
          <a
            href={pdfUrl}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Télécharger le PDF
          </a>
        </div>
      )}

      <iframe
        src={`${pdfUrl}#toolbar=0`}
        className={`w-full h-full border-none ${isLoading || hasError ? 'invisible' : 'visible'}`}
        title="PDF Viewer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {/* Floating toolbar */}
      {!isLoading && !hasError && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
          <a
            href={pdfUrl}
            download
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            title="Télécharger"
          >
            <Download size={20} />
            <span className="hidden sm:inline">Télécharger</span>
          </a>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            title="Imprimer"
          >
            <Printer size={20} />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
        </div>
      )}
    </div>
  );
};
