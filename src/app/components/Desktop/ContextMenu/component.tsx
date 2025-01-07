import React from 'react';
import { ContextMenuProps, SubMenuItem } from './types';
import { createMenuItems } from './utils/menu';

export const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { x, y } = props;
  const menuItems = createMenuItems(props);

  return (
    <div
      className="fixed bg-background backdrop-blur-2xl rounded-sm shadow-lg p-1 z-50 min-w-48"
      style={{ left: x, top: y }}
    >
      {menuItems.map((item, index) =>
        item.type === 'separator' ? (
          <div key={index} className="h-px bg-accent my-1" />
        ) : (
          <div key={item.label} className="relative group">
            <button
              className="w-full px-4 py-2 text-xs flex items-center gap-3 rounded-custom-sm hover:bg-accent transition"
              onClick={item.onClick}
            >
              {item.icon && <item.icon size={16} />}
              <span>{item.label}</span>
              {item.subItems && <span className="ml-auto">▶</span>}
            </button>

            {item.subItems && (
              <div className="absolute left-full top-0 ml-0.5 bg-background backdrop-blur-2xl rounded-sm shadow-lg p-1 min-w-40 invisible group-hover:visible">
                {item.subItems.map((subItem: SubMenuItem) => (
                  <button
                    key={subItem.label}
                    className={`w-full px-4 py-2 text-xs flex items-center gap-3 rounded-custom-sm transition ${
                      subItem.isActive ? 'bg-accent/50' : 'hover:bg-accent'
                    }`}
                    onClick={subItem.onClick}
                  >
                    {subItem.label}
                    {subItem.isActive && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
};
