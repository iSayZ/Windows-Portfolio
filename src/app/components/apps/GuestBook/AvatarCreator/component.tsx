'use client';

import React, { useState } from 'react';
import RandomAvatar from './components/RandomAvatar';
import { AvatarProps } from 'beanheads';

interface AvatarCreatorProps {
  initialAvatar?: AvatarProps;
  onAvatarChange?: (avatar: AvatarProps) => void;
  className?: string;
}

export const AvatarCreator: React.FC<AvatarCreatorProps> = ({
  initialAvatar,
  onAvatarChange,
  className = '',
}) => {
  const [currentAvatar, setCurrentAvatar] = useState<AvatarProps | null>(
    initialAvatar ?? null,
  );

  const handleAvatarChange = (newAvatar: AvatarProps) => {
    setCurrentAvatar(newAvatar);
    onAvatarChange?.(newAvatar);
  };

  return (
    <div className={`avatar-creator ${className}`}>
      <RandomAvatar onAvatarChange={handleAvatarChange} />
    </div>
  );
};

export default AvatarCreator;
