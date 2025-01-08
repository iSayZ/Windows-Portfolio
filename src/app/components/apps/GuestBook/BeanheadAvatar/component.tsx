'use client';

import React, { useState, useEffect } from 'react';
import { BeanHead } from 'beanheads';
import { createPortal } from 'react-dom';

const OPTIONS = {
  accessory: ['none', 'roundGlasses', 'tinyGlasses', 'shades'],
  body: ['chest', 'breasts'],
  clothing: ['naked', 'shirt', 'dressShirt', 'vneck', 'tankTop', 'dress'],
  clothingColor: ['white', 'blue', 'black', 'green', 'red'],
  eyebrows: ['raised', 'leftLowered', 'serious', 'angry', 'concerned'],
  eyes: [
    'normal',
    'leftTwitch',
    'happy',
    'content',
    'squint',
    'simple',
    'dizzy',
    'wink',
    'heart',
  ],
  facialHair: ['none', 'stubble', 'mediumBeard'],
  graphic: ['none', 'redwood', 'gatsby', 'vue', 'react', 'graphQL'],
  hair: [
    'none',
    'long',
    'bun',
    'short',
    'pixie',
    'balding',
    'buzz',
    'afro',
    'bob',
  ],
  hairColor: ['blonde', 'orange', 'black', 'white', 'brown', 'blue', 'pink'],
  hat: ['none', 'beanie', 'turban'],
  hatColor: ['white', 'blue', 'black', 'green', 'red'],
  lipColor: ['red', 'purple', 'pink', 'turqoise', 'green'],
  mouth: ['grin', 'sad', 'openSmile', 'lips', 'open', 'serious', 'tongue'],
  skinTone: ['light', 'yellow', 'brown', 'dark', 'red', 'black'],
  faceMaskColor: ['white', 'blue', 'black', 'green', 'red'],
} as const;

const getRandomOption = <T extends readonly string[]>(
  options: T,
): T[number] => {
  return options[Math.floor(Math.random() * options.length)];
};

const SelectOption = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-foreground capitalize">
      {label.replace(/([A-Z])/g, ' $1').trim()}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="p-2 rounded bg-secondary-bg text-foreground border border-foreground hover:border-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
          className="bg-secondary-bg capitalize"
        >
          {option.replace(/([A-Z])/g, ' $1').trim()}
        </option>
      ))}
    </select>
  </div>
);

const CustomizeModal = ({
  avatar,
  handleChange,
  onClose,
}: {
  avatar: any;
  handleChange: (key: string, value: string | boolean) => void;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', label: 'Appearance' },
    { id: 'face', label: 'Face' },
    { id: 'hair', label: 'Hair' },
    { id: 'clothes', label: 'Clothes' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <div className="space-y-4">
            <SelectOption
              label="Body"
              options={OPTIONS.body}
              value={avatar.body}
              onChange={(e) => handleChange('body', e.target.value)}
            />
            <SelectOption
              label="Skin tone"
              options={OPTIONS.skinTone}
              value={avatar.skinTone}
              onChange={(e) => handleChange('skinTone', e.target.value)}
            />
          </div>
        );
      case 'face':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <SelectOption
                label="Eyes"
                options={OPTIONS.eyes}
                value={avatar.eyes}
                onChange={(e) => handleChange('eyes', e.target.value)}
              />
              <SelectOption
                label="Eyebrows"
                options={OPTIONS.eyebrows}
                value={avatar.eyebrows}
                onChange={(e) => handleChange('eyebrows', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SelectOption
                label="Mouth"
                options={OPTIONS.mouth}
                value={avatar.mouth}
                onChange={(e) => handleChange('mouth', e.target.value)}
              />
              <SelectOption
                label="Lip color"
                options={OPTIONS.lipColor}
                value={avatar.lipColor}
                onChange={(e) => handleChange('lipColor', e.target.value)}
              />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={avatar.lashes}
                  onChange={(e) => handleChange('lashes', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-foreground">
                  Lashes
                </span>
              </label>
            </div>
          </div>
        );
      case 'hair':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <SelectOption
                label="Style"
                options={OPTIONS.hair}
                value={avatar.hair}
                onChange={(e) => handleChange('hair', e.target.value)}
              />
              <SelectOption
                label="Color"
                options={OPTIONS.hairColor}
                value={avatar.hairColor}
                onChange={(e) => handleChange('hairColor', e.target.value)}
              />
            </div>
            <SelectOption
              label="Facial hair"
              options={OPTIONS.facialHair}
              value={avatar.facialHair}
              onChange={(e) => handleChange('facialHair', e.target.value)}
            />
          </div>
        );
      case 'clothes':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <SelectOption
                label="Style"
                options={OPTIONS.clothing}
                value={avatar.clothing}
                onChange={(e) => handleChange('clothing', e.target.value)}
              />
              <SelectOption
                label="Color"
                options={OPTIONS.clothingColor}
                value={avatar.clothingColor}
                onChange={(e) => handleChange('clothingColor', e.target.value)}
              />
            </div>
            <SelectOption
              label="Logo"
              options={OPTIONS.graphic}
              value={avatar.graphic}
              onChange={(e) => handleChange('graphic', e.target.value)}
            />
          </div>
        );
      case 'accessories':
        return (
          <div className="space-y-4">
            <SelectOption
              label="Glasses"
              options={OPTIONS.accessory}
              value={avatar.accessory}
              onChange={(e) => handleChange('accessory', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <SelectOption
                label="Hat"
                options={OPTIONS.hat}
                value={avatar.hat}
                onChange={(e) => handleChange('hat', e.target.value)}
              />
              <SelectOption
                label="Hat color"
                options={OPTIONS.hatColor}
                value={avatar.hatColor}
                onChange={(e) => handleChange('hatColor', e.target.value)}
              />
            </div>
          </div>
        );
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] overflow-y-auto">
      <div className="min-h-screen p-4 flex flex-col items-center">
        <div className="bg-secondary-bg rounded-lg shadow-lg w-full max-w-2xl p-6">
          {/* Avatar and close button */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1" />
            <div className="size-60 bg-secondary-bg rounded-lg p-4">
              <BeanHead {...avatar} />
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={onClose}
                className="text-foreground hover:text-foreground/80 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex border-b border-foreground/10 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors relative
                  ${
                    activeTab === tab.id
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground/80'
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 -mb-px" />
                )}
              </button>
            ))}
          </div>

          {/* Contenu */}
          <div className="p-4">{renderContent()}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

interface RandomAvatarProps {
  onAvatarChange?: (avatar: any) => void;
}

const RandomAvatar: React.FC<RandomAvatarProps> = ({ onAvatarChange }) => {
  const [avatar, setAvatar] = useState({
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
    const newAvatar = {
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
      lashes: Math.random() > 0.5,
      lipColor: getRandomOption(OPTIONS.lipColor),
      mask: true,
      faceMask: false,
      mouth: getRandomOption(OPTIONS.mouth),
      skinTone: getRandomOption(OPTIONS.skinTone),
    };
    setAvatar(newAvatar);
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
