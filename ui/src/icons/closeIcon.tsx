import { forwardRef } from 'react';
import IIcons, { sizeMap } from './InterfacesIconProps';

const CloseIcon = forwardRef<SVGSVGElement, IIcons>(({ size = 'small', color = '#000000', ...props }, ref) => {
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
    <path d="M101.65723,96l37.17139,37.17139l-5.65723,5.65723L96,101.65723l-37.17139,37.17139l-5.65723-5.65723L90.34277,96
	L53.17139,58.82861l5.65723-5.65723L96,90.34277l37.17139-37.17139l5.65723,5.65723L101.65723,96z"/>
    </svg>
  );
});

CloseIcon.displayName = 'CloseIcon';

export default CloseIcon;
