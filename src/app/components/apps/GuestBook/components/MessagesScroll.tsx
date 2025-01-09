import React, { useState, useRef, useEffect } from 'react';
import { MessageCard } from './MessageCard';
import type { Message } from '../types';

interface MessagesScrollProps {
  messages: Message[];
}

export const MessagesScroll = ({ messages = [] }: MessagesScrollProps) => {
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

  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-foreground opacity-70">No messages yet</p>
      </div>
    );
  }

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