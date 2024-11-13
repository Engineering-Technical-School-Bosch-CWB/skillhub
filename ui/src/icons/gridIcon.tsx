import React, { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;  
  color?: string; 
}

const GridIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = '#000000', ...props }, ref) => {
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
    <path d="M84,84H16V16h68V84z M24,76h52V24H24V76z M176,84h-68V16h68V84z M116,76h52V24h-52V76z M176,176h-68v-68h68V176z M116,168
	h52v-52h-52V168z M84,176H16v-68h68V176z M24,168h52v-52H24V168z"/>
    </svg>
  );
});

GridIcon.displayName = 'GridIcon';

export default GridIcon;
