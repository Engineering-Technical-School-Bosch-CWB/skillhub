import { forwardRef } from 'react';
import IIcons, { sizeMap } from './InterfacesIconProps';

const GiftIcon = forwardRef<SVGSVGElement, IIcons>(({ size = 'medium', color = '#000000', ...props }, ref) => {
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
      <path d="M160 64h-20c2.5-3.3 4-7.5 4-12 0-11-9-20-20-20-8.7 0-16.9 4.1-23.1 11.4-1.9 2.3-3.6 4.9-4.9 7.6-1.3-2.7-3-5.3-4.9-7.6C84.9 36.1 76.7 32 68 32c-11 0-20 9-20 20 0 4.5 1.5 8.7 4 12H32v32h4v64h120V96h4V64zm-8 24h-40V72h40v16zm-28-48c6.6 0 12 5.4 12 12s-5.4 12-12 12h-23.7c1.7-12 11-24 23.7-24zM56 52c0-6.6 5.4-12 12-12 12.7 0 22 12 23.7 24H68c-6.6 0-12-5.4-12-12zM40 72h40v16H40V72zm40 80H44V96h36v56zm24 0H88V72h16v80zm44 0h-36V96h36v56z"/>
    </svg>
  );
});

GiftIcon.displayName = 'GiftIcon';

export default GiftIcon;
