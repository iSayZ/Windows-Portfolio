import React, { useState } from 'react';
import { AvatarProps } from 'beanheads';
import { AvatarCreator } from '../AvatarCreator';
import type { NewMessage } from '../types';

interface CreateMessageProps {
  newMessage: NewMessage;
  onMessageChange: (message: NewMessage) => void;
  onSubmit: () => Promise<void>;
  onBack: () => void;
}

export const CreateMessage = ({
  newMessage,
  onMessageChange,
  onSubmit,
  onBack,
}: CreateMessageProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleAvatarChange = (avatar: AvatarProps) => {
    onMessageChange({ ...newMessage, avatar });
  };

  const handleSubmitWithValidation = async () => {
    if (newMessage.name.length < 3) {
      setError('Name must be at least 3 characters long');
      return;
    }

    if (newMessage.content.length < 3) {
      setError('Message must be at least 3 characters long');
      return;
    }

    setError(null);
    await onSubmit();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-center text-foreground">
        Personalize your avatar
      </h2>

      <AvatarCreator onAvatarChange={handleAvatarChange} />

      <h2 className="text-xl font-bold text-center text-foreground">
        Create Your Message
      </h2>

      <div className="space-y-4 bg-secondary-bg p-6 rounded-lg w-full">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Name
          </label>
          <input
            type="text"
            value={newMessage.name}
            onChange={(e) => {
              setError(null);
              onMessageChange({ ...newMessage, name: e.target.value });
            }}
            maxLength={50}
            className="w-full p-3 rounded bg-background text-foreground border border-foreground"
          />
          {newMessage.name.length > 0 && newMessage.name.length < 3 && (
            <span className="text-xs text-red-500 mt-1">
              Name must be at least 3 characters
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            value={newMessage.content}
            onChange={(e) => {
              setError(null);
              onMessageChange({ ...newMessage, content: e.target.value });
            }}
            maxLength={200}
            rows={4}
            className="w-full p-3 rounded bg-background text-foreground border border-foreground"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-foreground opacity-70">
              {200 - newMessage.content.length} characters remaining
            </span>
            {newMessage.content.length > 0 && newMessage.content.length < 3 && (
              <span className="text-xs text-red-500">
                Message must be at least 3 characters
              </span>
            )}
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm py-2 px-3 rounded bg-red-100/10">
            {error}
          </div>
        )}
        <div className="flex gap-4 pt-2">
          <button
            onClick={onBack}
            className="flex-1 py-3 border border-foreground text-foreground rounded hover:bg-background/50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSubmitWithValidation}
            className="flex-1 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              newMessage.name.length < 3 ||
              newMessage.content.length < 3 ||
              !newMessage.avatar
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
