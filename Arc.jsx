import React from 'react';
import { Svg, Path } from 'react-native-svg';

const Arc = ({ size, strokeWidth, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const halfCircle = size / 2;

  // Adjust the arc's sweep (0 - 1) based on the number of complaints, etc.
  const arcSweep = 0.75; // 75% of the circle
  const arcLength = circumference * arcSweep;
  const remainingLength = circumference - arcLength;

  const pathDescription = `
    M ${halfCircle},${halfCircle}
    m 0,-${radius}
    a ${radius},${radius} 0 1,1 0,${2 * radius}
    a ${radius},${radius} 0 1,1 0,-${2 * radius}
  `;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Path
        stroke={color}
        strokeWidth={strokeWidth}
        d={pathDescription}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${arcLength} ${remainingLength}`}
      />
    </Svg>
  );
};

export default Arc;
