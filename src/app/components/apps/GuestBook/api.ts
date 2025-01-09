import type { Message, NewMessage } from './types';

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch('/api/comments');
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

export const submitMessage = async (message: NewMessage): Promise<void> => {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error('Failed to submit comment');
  }
};