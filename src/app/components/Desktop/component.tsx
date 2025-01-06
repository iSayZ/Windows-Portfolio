'use client';

import { desktopApps } from '../apps/config/desktopAppsConfig';
import { AppIcon } from './AppIcon';
import { useWindowsStore, WindowManager } from '../Window';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useOpenApp } from '@/app/hooks/useOpenApp';
import { SelectionBox } from './types';

const Desktop: React.FC = () => {
 const desktopRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
 const setDesktopRef = useWindowsStore((state) => state.setDesktopRef);
 const openApp = useOpenApp();
 const [isSelecting, setIsSelecting] = useState(false);
 const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
 const [selectedApps, setSelectedApps] = useState<string[]>([]);

 useEffect(() => {
   setDesktopRef(desktopRef);
 }, [setDesktopRef]);

 const isInSelection = (element: Element) => {
  if (!selectionBox) return false;

  // Get the bounding rectangle of the current element
  const rect = element.getBoundingClientRect();

  // Calculate the boundaries of the selection box
  const selectionLeft = Math.min(selectionBox.startX, selectionBox.endX);
  const selectionTop = Math.min(selectionBox.startY, selectionBox.endY);
  const selectionRight = Math.max(selectionBox.startX, selectionBox.endX);
  const selectionBottom = Math.max(selectionBox.startY, selectionBox.endY);

  // Check if the element intersects with the selection box
  return !(rect.right < selectionLeft || 
           rect.left > selectionRight || 
           rect.bottom < selectionTop || 
           rect.top > selectionBottom);
};


const updateSelectedApps = () => {
  // Select all app icons on the desktop
  const icons = document.querySelectorAll('.app-icon');

  // Filter icons that are inside the selection box and map them to their app names
  const newSelectedApps = Array.from(icons)
    .filter(icon => isInSelection(icon))
    .map(icon => icon.getAttribute('data-app-name') || '');

  // Update the list of selected apps
  setSelectedApps(newSelectedApps);
};

const handleMouseDown = (e: React.MouseEvent) => {
  // Ignore clicks on app icons to avoid starting a selection
  if ((e.target as HTMLElement).closest('.app-icon')) return;

  // Start the selection process and initialize the selection box
  setIsSelecting(true);
  setSelectionBox({
    startX: e.clientX,
    startY: e.clientY,
    endX: e.clientX,
    endY: e.clientY
  });

  // Clear the previously selected apps
  setSelectedApps([]);
};

const handleMouseMove = (e: React.MouseEvent) => {
  if (!isSelecting) return;

  // Update the dimensions of the selection box as the user drags the mouse
  setSelectionBox(prev => prev ? {
    ...prev,
    endX: e.clientX,
    endY: e.clientY
  } : null);

  // Recalculate the selected apps based on the updated selection box
  updateSelectedApps();
};

const handleMouseUp = () => {
  // End the selection process and reset the selection box
  setIsSelecting(false);
  setSelectionBox(null);
};

 return (
   <>
     <div
       ref={desktopRef}
       className="h-[calc(100vh-3rem)] w-full p-6 flex flex-col flex-wrap gap-2 content-start relative select-none"
       onMouseDown={handleMouseDown}
       onMouseMove={handleMouseMove}
       onMouseUp={handleMouseUp}
     >
       {desktopApps.map((app) => (
         <AppIcon
           key={app.shortname}
           icon={app.icon}
           name={app.shortname}
           onClick={() => openApp(app)}
           className={`app-icon ${selectedApps.includes(app.shortname) ? 'bg-accent' : ''}`}
           data-app-name={app.shortname}
         />
       ))}
       {selectionBox && (
         <div
           className="absolute border border-blue-500 bg-blue-500/20 pointer-events-none"
           style={{
             left: Math.min(selectionBox.startX, selectionBox.endX),
             top: Math.min(selectionBox.startY, selectionBox.endY),
             width: Math.abs(selectionBox.endX - selectionBox.startX),
             height: Math.abs(selectionBox.endY - selectionBox.startY),
           }}
         />
       )}
     </div>
     <WindowManager desktopRef={desktopRef} />
   </>
 );
};

export default Desktop;