import React from 'react';
import { AppIconProps } from './types';

const AppIcon: React.FC<AppIconProps> = ({ icon, name, onClick }) => {
  return (
    <div
      className="p-2 rounded-sm flex flex-col items-center cursor-pointer hover:bg-accent"
      onDoubleClick={onClick}
    >
      <div className="h-8 w-16 rounded-full flex items-center justify-center text-foreground">
        {/* <img src={icon} alt={name} className="h-10 w-10" /> */}
        <p className='text-4xl'>{icon}</p>
      </div>
      <span className="text-xs mt-2">{name}</span>
    </div>
  );
};

export default AppIcon;
