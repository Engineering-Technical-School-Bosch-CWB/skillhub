import React, { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;  
  color?: string; 
}

const HistoryIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = '#000000', ...props }, ref) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 192 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M100,52v40h48v8H92V52H100z M96,16c-23.79443,0-44.84973,10.52179-60,29.79657V16h-8v44h44v-8H41.32343
	C55.01074,33.9021,74.24603,24,96,24c39.70117,0,72,32.29883,72,72s-32.29883,72-72,72s-72-32.29883-72-72h-8
	c0,44.1123,35.8877,80,80,80s80-35.8877,80-80S140.1123,16,96,16z"/>
    </svg>
  );
});

HistoryIcon.displayName = 'HistoryIcon';

export default HistoryIcon;
