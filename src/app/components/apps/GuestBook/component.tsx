'use client';

import React, { useState, useEffect } from 'react';
import { MessagesScroll } from './components/MessagesScroll';
import { CreateMessage } from './components/CreateMessage';
import { SuccessMessage } from './components/SuccessMessage';
import { fetchMessages, submitMessage } from './api';
import type { Message, NewMessage, Step } from './types';
import { LoadingScreen } from '../components/LoadingScreen';

const GuestBook = () => {
  const [currentStep, setCurrentStep] = useState<Step>('messages');
  const [newMessage, setNewMessage] = useState<NewMessage>({
    name: '',
    content: '',
    avatar: null,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await fetchMessages();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getMessages();
  }, []);

  const handleSubmit = async () => {
    try {
      await submitMessage(newMessage);
      setCurrentStep('success');
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'messages':
        return (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-center text-foreground">
              Guest Book
            </h1>
            <div className="flex-shrink-0 h-[200px] -mx-4">
              <MessagesScroll messages={messages} />
            </div>
            <p className="mt-6 mx-auto">
              🖐️ Drag and drop the comments to explore the reviews at your own
              pace.
            </p>
            <button
              onClick={() => setCurrentStep('create')}
              className="w-2/3 mx-auto py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              Leave a Message
            </button>
          </div>
        );

      case 'create':
        return (
          <CreateMessage
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep('messages')}
          />
        );

      case 'success':
        return <SuccessMessage onBack={() => setCurrentStep('messages')} />;
    }
  };

  const handleLoadingComplete = () => {
    setShowApp(true);
  };

  if (!showApp) {
    return (
      <LoadingScreen
        appName="Guest Book"
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-auto">
      <div className="min-h-full w-full bg-background backdrop-blur-2xl">
        <div className="w-full mx-auto px-4 py-8">{renderStep()}</div>
      </div>
    </div>
  );
};

export default GuestBook;
