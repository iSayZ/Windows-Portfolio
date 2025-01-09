import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BeanHead } from 'beanheads';
import { SelectOption } from './SelectOption';
import { OPTIONS } from '../constants';
import type { CustomizeModalProps } from '../types';

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  avatar,
  handleChange,
  onClose,
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
              value={avatar.body ?? OPTIONS.body[0]}
              onChange={(e) => handleChange('body', e.target.value)}
            />
            <SelectOption
              label="Skin tone"
              options={OPTIONS.skinTone}
              value={avatar.skinTone ?? OPTIONS.skinTone[0]}
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
                value={avatar.eyes ?? OPTIONS.eyes[0]}
                onChange={(e) => handleChange('eyes', e.target.value)}
              />
              <SelectOption
                label="Eyebrows"
                options={OPTIONS.eyebrows}
                value={avatar.eyebrows ?? OPTIONS.eyebrows[0]}
                onChange={(e) => handleChange('eyebrows', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SelectOption
                label="Mouth"
                options={OPTIONS.mouth}
                value={avatar.mouth ?? OPTIONS.mouth[0]}
                onChange={(e) => handleChange('mouth', e.target.value)}
              />
              <SelectOption
                label="Lip color"
                options={OPTIONS.lipColor}
                value={avatar.lipColor ?? OPTIONS.lipColor[0]}
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
                value={avatar.hair ?? OPTIONS.hair[0]}
                onChange={(e) => handleChange('hair', e.target.value)}
              />
              <SelectOption
                label="Color"
                options={OPTIONS.hairColor}
                value={avatar.hairColor ?? OPTIONS.hairColor[0]}
                onChange={(e) => handleChange('hairColor', e.target.value)}
              />
            </div>
            <SelectOption
              label="Facial hair"
              options={OPTIONS.facialHair}
              value={avatar.facialHair ?? OPTIONS.facialHair[0]}
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
                value={avatar.clothing ?? OPTIONS.clothing[0]}
                onChange={(e) => handleChange('clothing', e.target.value)}
              />
              <SelectOption
                label="Color"
                options={OPTIONS.clothingColor}
                value={avatar.clothingColor ?? OPTIONS.clothingColor[0]}
                onChange={(e) => handleChange('clothingColor', e.target.value)}
              />
            </div>
            <SelectOption
              label="Logo"
              options={OPTIONS.graphic}
              value={avatar.graphic ?? OPTIONS.graphic[0]}
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
              value={avatar.accessory ?? OPTIONS.accessory[0]}
              onChange={(e) => handleChange('accessory', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <SelectOption
                label="Hat"
                options={OPTIONS.hat}
                value={avatar.hat ?? OPTIONS.hat[0]}
                onChange={(e) => handleChange('hat', e.target.value)}
              />
              <SelectOption
                label="Hat color"
                options={OPTIONS.hatColor}
                value={avatar.hatColor ?? OPTIONS.hatColor[0]}
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

          <div className="p-4">{renderContent()}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};