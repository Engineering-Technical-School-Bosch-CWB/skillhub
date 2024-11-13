import React, { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;  
  color?: string; 
}

const FilterIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = '#000000', ...props }, ref) => {
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
    <path d="M80,175.47412V89.18115L32.64746,16h126.70508L112,89.18115v64.95947L80,175.47412z M47.35254,24L88,86.81885v73.70703
	l16-10.6665V86.81885L144.64746,24H47.35254z"/>
    </svg>
  );
});

FilterIcon.displayName = 'FilterIcon';

export default FilterIcon;
