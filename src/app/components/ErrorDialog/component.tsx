import React, { useEffect } from 'react';
import Image from 'next/image';
import { WindowTitleBar } from '../Window';

interface ErrorDialogProps {
  filePath?: string;
  errorCode?: string | number;
  customMessage?: string;
  onClose: () => void;
  isOpen: boolean;
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  filePath = 'C:\\Users\\com\\Desktop\\unknown.file',
  errorCode = '-214741639',
  customMessage,
  onClose,
  isOpen,
}) => {
  useEffect(() => {
    if (isOpen) {
      const audio = new Audio('/assets/audios/windows/error.wav');
      audio
        .play()
        .catch((error) => console.error('Error playing sound:', error));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const defaultMessage = `File system error (${errorCode}).`;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[9999]">
      <div className="w-[450px] shadow-xl border border-gray-200 bg-[#F0F0F0] rounded-lg">
        <WindowTitleBar
          icon="/assets/images/template/error.svg"
          title="Error"
          onClose={onClose}
          onMaximize={() => {}}
          isMaximized={false}
        />

        <div className="px-4 py-6">
          <div className="flex gap-4">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/assets/images/template/error.svg"
                alt="Error"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <div className="text-sm break-all">{filePath}</div>
              <div className="text-sm flex flex-col gap-1">
                <p>{defaultMessage}</p>
                {customMessage && <p>{customMessage}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="min-w-[75px] px-4 py-1 bg-[#E1E1E1] border border-[#868686] active:bg-[#D1D1D1] hover:bg-[#E8E8E8] rounded-sm text-sm"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
