import React from 'react';
import Image from 'next/image';

const Background = () => {
  return (
    <div className="background-container">
      <Image
        src="/assets/images/background/bg-windows-dark.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
};

export default Background;
