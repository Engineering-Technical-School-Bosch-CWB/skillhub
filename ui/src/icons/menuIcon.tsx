import React, { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;  
  color?: string; 
}

const MenuIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = '#000000', ...props }, ref) => {
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
      <path d="M160,60H32v-8h128V60z M160,92H32v8h128V92z M160,132H32v8h128V132z"/>
    </svg>
  );
});

MenuIcon.displayName = 'MenuIcon';

export default MenuIcon;
