import React from 'react';
import './TestGraphicSogec.css';

export default function TestGraphicSogec() {
  const totalHeight = 200; 
  const namePercentage = 44.7; 

  const idPercentage = 55.3; 

  const idHeight = (totalHeight * idPercentage) / 100;
  const nameHeight = (totalHeight * namePercentage) / 100;

  return (
    <div className="column-chart" style={{ height: `${totalHeight}px` }}>
      <div className="column">
        <div className="id" style={{ height: `${idHeight}px` }}>
        </div>
        <div className="name" style={{ height: `${nameHeight}px` }}>
        </div>
      </div>
    </div>
  );
}
