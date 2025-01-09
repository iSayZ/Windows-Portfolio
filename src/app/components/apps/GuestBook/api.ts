import type { Message, NewMessage } from './types';

export const fetchMessages = async (): Promise<Message[]> => {
  try {
    const response = await fetch('/api/comments');
    if (!response.ok) {
      console.error('API Response not OK:', response.status);
      return [];
    }
    const data = await response.json();
    console.log('Fetched messages:', data);
    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
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