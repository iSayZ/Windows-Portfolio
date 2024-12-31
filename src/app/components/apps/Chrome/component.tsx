import React from 'react';

export const Chrome: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        src="https://www.google.fr/webhp?igu=1"
        className="absolute top-0 left-0 w-full h-full"
        title="Chrome"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
        style={{
          border: 'none',
          margin: 0,
          padding: 0,
          position: 'absolute',
          inset: 0
        }}
      />
    </div>
  );
};