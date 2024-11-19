import { forwardRef } from 'react';
import IIcons, { sizeMap } from './InterfacesIconProps';

const MenuIcon = forwardRef<SVGSVGElement, IIcons>(({ size = "medium", color = '#000000', ...props }, ref) => {
  const iconSize = sizeMap[size];

  return (
    <svg
      ref={ref}
      width={iconSize}
      height={iconSize}
      viewBox="0 0 192 192"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M160,60H32v-8h128V60z M160,92H32v8h128V92z M160,132H32v8h128V132z"/>
    </svg>
  );
});

MenuIcon.displayName = 'MenuIcon';

export default MenuIcon;
