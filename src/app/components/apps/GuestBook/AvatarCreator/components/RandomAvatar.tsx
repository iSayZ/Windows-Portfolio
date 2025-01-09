'use client';

import React, { useState, useEffect } from 'react';
import { BeanHead } from 'beanheads';
import { CustomizeModal } from './CustomizeModal';
import { OPTIONS } from '../constants';
import { getRandomOption } from '../utils';
import type { RandomAvatarProps } from '../types';
import { AvatarProps } from 'beanheads';

const RandomAvatar: React.FC<RandomAvatarProps> = ({ onAvatarChange }) => {
  const generateInitialAvatar = (): AvatarProps => ({
    accessory: getRandomOption(OPTIONS.accessory),
    body: getRandomOption(OPTIONS.body),
    circleColor: 'blue' as const,
    clothing: getRandomOption(OPTIONS.clothing),
    clothingColor: getRandomOption(OPTIONS.clothingColor),
    eyebrows: getRandomOption(OPTIONS.eyebrows),
    eyes: getRandomOption(OPTIONS.eyes),
    facialHair: getRandomOption(OPTIONS.facialHair),
    graphic: getRandomOption(OPTIONS.graphic),
    hair: getRandomOption(OPTIONS.hair),
    hairColor: getRandomOption(OPTIONS.hairColor),
    hat: getRandomOption(OPTIONS.hat),
    hatColor: getRandomOption(OPTIONS.hatColor),
    lashes: false,
    lipColor: getRandomOption(OPTIONS.lipColor),
    mask: true,
    faceMask: false,
    mouth: getRandomOption(OPTIONS.mouth),
    skinTone: getRandomOption(OPTIONS.skinTone),
  });

  const [avatar, setAvatar] = useState<AvatarProps>(generateInitialAvatar());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (onAvatarChange && avatar) {
      const timeoutId = setTimeout(() => {
        onAvatarChange(avatar);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [avatar, onAvatarChange]);

  const generateNewAvatar = () => {
    setAvatar(generateInitialAvatar());
  };

  const handleChange = (key: string, value: string | boolean) => {
    setAvatar((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex-shrink-0">
        <div className="w-64 h-64 bg-secondary-bg rounded-lg p-4">
          <BeanHead {...avatar} />
        </div>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={generateNewAvatar}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Random
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 bg-secondary-bg text-foreground border border-foreground rounded-lg hover:bg-background transition-colors"
        >
          Customize
        </button>
      </div>

      {isEditing && (
        <CustomizeModal
          avatar={avatar}
          handleChange={handleChange}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default RandomAvatar;