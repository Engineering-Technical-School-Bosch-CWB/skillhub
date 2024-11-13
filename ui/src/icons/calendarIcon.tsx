import React, { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;  
  color?: string; 
}

const CalendarIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = '#000000', ...props }, ref) => {
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
    <path d="M136,32V20h-8v12H64V20h-8v12H16v128h160V32H136z M56,40v7h8v-7h64v7h8v-7h32v24H24V40H56z M24,152V72h144v80H24z M32,108
	h36V80H32V108z M40,88h20v12H40V88z"/>
    </svg>
  );
});

CalendarIcon.displayName = 'CalendarIcon';

export default CalendarIcon;
