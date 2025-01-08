"use client";

import React, { useState, useRef, useEffect } from 'react';
import { AvatarProps, BeanHead } from 'beanheads';
import { RandomAvatar } from './BeanheadAvatar';

// Types
type Message = {
  _id: string;
  avatar: AvatarProps;
  name: string;
  content: string;
  timestamp: Date;
};

const MessageCard = ({ message }: { message: Message }) => (
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

const MessagesScroll = ({ messages }: { messages: Message[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const lastScrollPosition = useRef(0);
  const scrollSpeed = 0.5;

  useEffect(() => {
    if (isPaused || !scrollRef.current || isDragging) return;

    const scrollElement = scrollRef.current;
    let animationFrameId: number;

    const animate = () => {
      if (!scrollElement || isPaused || isDragging) return;

      lastScrollPosition.current =
        (lastScrollPosition.current + scrollSpeed) %
        (scrollElement.scrollWidth - scrollElement.clientWidth);
      scrollElement.scrollLeft = lastScrollPosition.current;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollElement) {
        lastScrollPosition.current = scrollElement.scrollLeft;
      }
    };
  }, [isPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      lastScrollPosition.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
    if (scrollRef.current) {
      lastScrollPosition.current = scrollRef.current.scrollLeft;
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-hidden whitespace-nowrap cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex py-2">
        {messages.map((message) => (
          <MessageCard key={`original-${message._id}`} message={message} />
        ))}
        {messages.map((message) => (
          <MessageCard key={`duplicate-${message._id}`} message={message} />
        ))}
      </div>
    </div>
);
};

type Step = 'messages' | 'create' | 'success';

const GuestBook = () => {
  const [currentStep, setCurrentStep] = useState<Step>('messages');
  const [newMessage, setNewMessage] = useState({
    name: '',
    content: '',
    avatar: null as any,
  });

  const handleAvatarChange = (avatar: AvatarProps) => {
    setNewMessage((prev) => ({ ...prev, avatar }));
  };

  const [messages, setMessages] = useState<Message[]>([]);
  
  // Get all comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments');
        const data = await response.json();
        console.log("DATA :", data);
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, []);

  // Send a comment
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newMessage.name,
          content: newMessage.content,
          avatar: newMessage.avatar,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setCurrentStep('success');
    } catch (error) {
      console.error('Error submitting comment:', error);
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
            <button
              onClick={() => setCurrentStep('create')}
              className="w-2/3 mx-auto mt-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              Leave a Message
            </button>
          </div>
        );

      case 'create':
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-center text-foreground">
              Personalize your avatar
            </h2>

            <RandomAvatar onAvatarChange={handleAvatarChange} />

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
                  onChange={(e) =>
                    setNewMessage((prev) => ({ ...prev, name: e.target.value }))
                  }
                  maxLength={50}
                  className="w-full p-3 rounded bg-background text-foreground border border-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) =>
                    setNewMessage((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  maxLength={200}
                  rows={4}
                  className="w-full p-3 rounded bg-background text-foreground border border-foreground"
                />
                <span className="text-xs text-foreground opacity-70">
                  {200 - newMessage.content.length} characters remaining
                </span>
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setCurrentStep('messages')}
                  className="flex-1 py-3 border border-foreground text-foreground rounded hover:bg-background/50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
            <div className="text-4xl">🎉</div>
            <h2 className="text-xl font-bold text-foreground">
              Message Submitted!
            </h2>
            <p className="text-sm text-foreground opacity-90">
              Your message is awaiting approval.
            </p>
            <button
              onClick={() => setCurrentStep('messages')}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Guest Book
            </button>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-auto">
      <div className="min-h-full w-full bg-background backdrop-blur-2xl">
        <div className="w-full mx-auto px-4 py-8">{renderStep()}</div>
      </div>
    </div>
  );
};

export default GuestBook;
