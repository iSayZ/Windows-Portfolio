import React from 'react';
import { PdfViewerProps } from './types';

export const PdfViewer: React.FC<PdfViewerProps> = ({ 
  pdfUrl
}) => {
  return (
    <div className="w-full h-full bg-white">
      <object
        data={pdfUrl}
        type="application/pdf"
        className="w-full h-full"
      >
        <p>Impossible d&apos;afficher le PDF. <a href={pdfUrl}>Télécharger</a> à la place.</p>
      </object>
    </div>
  );
};