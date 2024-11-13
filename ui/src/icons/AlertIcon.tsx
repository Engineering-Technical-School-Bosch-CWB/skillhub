import React, { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;  
  color?: string; 
}

const AlertIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = '#000000', ...props }, ref) => {
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
    <path d="M175.7832,160H16.2168L96,15.73486L175.7832,160z M29.7832,152H162.2168L96,32.26514L29.7832,152z M103.11114,136.88885
	C103.11114,140.77821,99.88873,144,96,144c-4.0004,0-7.11114-3.11073-7.11114-7.11115c0-3.99977,3.11073-7.11113,7.11114-7.11113
	C99.88873,129.77773,103.11114,133.00014,103.11114,136.88885z M90.88844,88.88898V64h10.2225v24.88898l-2.66653,30.66686h-4.88882
	L90.88844,88.88898z"/>
    </svg>
  );
});

AlertIcon.displayName = 'AlertIcon';

export default AlertIcon;
