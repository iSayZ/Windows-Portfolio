import React from 'react';
import Image from 'next/image';
import { AppIconProps } from './types';

const AppIcon: React.FC<AppIconProps> = ({
  icon,
  name,
  onClick,
  className = '',
  'data-app-name': dataAppName,
  size = 'medium',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'p-1',
          image: 'size-6',
          imageContainer: 'h-6 w-12',
          text: 'text-xs',
        };
      case 'large':
        return {
          container: 'p-3',
          image: 'size-14',
          imageContainer: 'h-12 w-20',
          text: 'text-sm',
        };
      default: // medium
        return {
          container: 'p-2',
          image: 'size-10',
          imageContainer: 'h-8 w-16',
          text: 'text-xs',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div
      data-app-name={dataAppName}
      className={`${sizeClasses.container} rounded-sm flex flex-col items-center cursor-pointer hover:bg-accent transition active:scale-95 app-icon ${className}`}
      onClick={onClick}
    >
      <div
        className={`${sizeClasses.imageContainer} rounded-full flex items-center justify-center text-foreground`}
      >
        <Image
          src={icon}
          alt={name}
          width={30}
          height={30}
          className={sizeClasses.image}
          priority
        />
      </div>
      <span className={`${sizeClasses.text} mt-2`}>{name}</span>
    </div>
  );
};

export default AppIcon;
