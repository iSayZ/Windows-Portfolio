import React from 'react';
import Image from 'next/image';
import { AppIconProps } from './types';

const AppIcon: React.FC<AppIconProps> = ({ 
  icon, 
  name, 
  onClick, 
  className = '', 
  'data-app-name': dataAppName 
}) => {
  return (
    <div
      data-app-name={dataAppName}
      className={`p-2 rounded-sm flex flex-col items-center cursor-pointer hover:bg-accent transition active:scale-95 app-icon ${className}`}
      onClick={onClick}
    >
      <div className="h-8 w-16 rounded-full flex items-center justify-center text-foreground">
        <Image
          src={icon}
          alt={name}
          width={30}
          height={30}
          className="size-10"
          priority
        />
      </div>
      <span className="text-xs mt-2">{name}</span>
    </div>
  );
};

export default AppIcon;