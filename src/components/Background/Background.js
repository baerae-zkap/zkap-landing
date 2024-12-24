import React from 'react';
import { useEffect, useState } from 'react';
import './Background.scss';

const Background = () => {
  const [columnCount, setColumnCount] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1200) setColumnCount(10);
      else if (width > 992) setColumnCount(8);
      else if (width > 768) setColumnCount(6);
      else if (width > 576) setColumnCount(4);
      else setColumnCount(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="background">
      <div className="background-wrapper">
        {[...Array(columnCount)].map((_, index) => (
          <div key={index} className="background-column" />
        ))}
      </div>
    </div>
  );
};

export default Background; 