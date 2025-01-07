'use client';

import React, { RefObject, useEffect, useRef, useState, useMemo } from 'react';
import { desktopApps } from '../apps/config/desktopAppsConfig';
import { AppIcon } from './AppIcon';
import { useWindowsStore, WindowManager } from '../Window';
import { useOpenApp } from '@/app/hooks/useOpenApp';
import {
  ContextMenuPosition,
  IconSize,
  SelectionBox,
  SortMethod,
} from './types';
import { ContextMenu } from './ContextMenu/component';
import { allApps } from '../apps/config/appsConfig';
import { sortApps } from './utils';

const Desktop: React.FC = () => {
  const desktopRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const setDesktopRef = useWindowsStore((state) => state.setDesktopRef);
  const openApp = useOpenApp();

  // Selection state
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  // Desktop state
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
    null,
  );
  const [areIconsVisible, setAreIconsVisible] = useState(true);
  const [sortMethod, setSortMethod] = useState<SortMethod>('date');
  const [iconSize, setIconSize] = useState<IconSize>('medium');
  const [randomOrderSeed, setRandomOrderSeed] = useState<number[]>([]);

  // Generate random order when sort method changes to 'size'
  useEffect(() => {
    if (sortMethod === 'size') {
      setRandomOrderSeed(
        Array.from({ length: desktopApps.length }, (_, index) => index).sort(
          () => Math.random() - 0.5,
        ),
      );
    }
  }, [sortMethod]);

  // Sorting logic with memoization
  const sortedApps = useMemo(
    () => sortApps(desktopApps, sortMethod, randomOrderSeed),
    [sortMethod, randomOrderSeed],
  );

  // Icon size handler
  const handleChangeIconSize = (size: IconSize) => {
    setIconSize(size);
    closeContextMenu();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleChangeView = (view: SortMethod) => {
    setSortMethod(view);
    closeContextMenu();
  };

  // Selection and other event managers
  const isInSelection = (element: Element) => {
    if (!selectionBox) return false;

    const rect = element.getBoundingClientRect();
    const selectionLeft = Math.min(selectionBox.startX, selectionBox.endX);
    const selectionTop = Math.min(selectionBox.startY, selectionBox.endY);
    const selectionRight = Math.max(selectionBox.startX, selectionBox.endX);
    const selectionBottom = Math.max(selectionBox.startY, selectionBox.endY);

    return !(
      rect.right < selectionLeft ||
      rect.left > selectionRight ||
      rect.bottom < selectionTop ||
      rect.top > selectionBottom
    );
  };

  const updateSelectedApps = () => {
    const icons = document.querySelectorAll('.app-icon');
    const newSelectedApps = Array.from(icons)
      .filter((icon) => isInSelection(icon))
      .map((icon) => icon.getAttribute('data-app-name') || '');
    setSelectedApps(newSelectedApps);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.app-icon')) return;

    setIsSelecting(true);
    setSelectionBox({
      startX: e.clientX,
      startY: e.clientY,
      endX: e.clientX,
      endY: e.clientY,
    });
    setSelectedApps([]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting) return;

    setSelectionBox((prev) =>
      prev
        ? {
            ...prev,
            endX: e.clientX,
            endY: e.clientY,
          }
        : null,
    );

    updateSelectedApps();
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setSelectionBox(null);
  };

  const handleSelectAll = () => {
    setSelectedApps(sortedApps.map((app) => app.shortname));
    closeContextMenu();
  };

  const handleOpenTerminal = () => {
    closeContextMenu();
    openApp(allApps.terminal);
  };

  const handleToggleIcons = () => {
    setAreIconsVisible((prev) => !prev);
    closeContextMenu();
  };

  useEffect(() => {
    setDesktopRef(desktopRef);
  }, [setDesktopRef]);

  // Click outside to close context menu
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <div
        ref={desktopRef}
        className="h-[calc(100vh-3rem)] w-full p-6 flex flex-col flex-wrap gap-2 content-start relative select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
      >
        {areIconsVisible &&
          sortedApps.map((app) => (
            <AppIcon
              key={app.shortname}
              icon={app.icon}
              name={app.shortname}
              onClick={() => openApp(app)}
              className={
                selectedApps.includes(app.shortname) ? 'bg-accent' : ''
              }
              data-app-name={app.shortname}
              size={iconSize}
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

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={closeContextMenu}
            onOpenTerminal={handleOpenTerminal}
            onChangeView={handleChangeView}
            onSelectAll={handleSelectAll}
            onToggleIcons={handleToggleIcons}
            onChangeIconSize={handleChangeIconSize}
            areIconsVisible={areIconsVisible}
            currentIconSize={iconSize}
            currentSortMethod={sortMethod}
          />
        )}
      </div>
      <WindowManager desktopRef={desktopRef} />
    </>
  );
};

export default Desktop;
