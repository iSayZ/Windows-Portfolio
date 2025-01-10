import React from 'react';
import { BeanHead } from 'beanheads';
import type { Message } from '../types';

export const MessageCard = ({ message }: { message: Message }) => (
  <div className="flex-shrink-0 w-96 h-auto bg-secondary-bg rounded-lg shadow-lg mx-2">
    <div className="flex flex-col h-full p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 flex-shrink-0 bg-background rounded-full">
          <BeanHead {...message.avatar} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            {message.name}
          </h3>
          <span className="text-xs text-foreground opacity-70">
            {new Date(message.timestamp).toLocaleDateString()}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-foreground opacity-90 break-words whitespace-normal">
        {message.content}
      </p>
    </div>
  </div>
);
