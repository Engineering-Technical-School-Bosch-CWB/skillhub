import { forwardRef } from 'react';
import IIcons, { sizeMap } from './InterfacesIconProps';

const ArrowRightIcon = forwardRef<SVGSVGElement, IIcons>(({ size = 'medium', color = '#000000', ...props }, ref) => {
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
    <path d="M173.65674,96l-34.82812,34.82861l-5.65723-5.65723L158.3432,100H16v-8h142.3432l-25.17181-25.17139l5.65723-5.65723
	L173.65674,96z"/>
    </svg>
  );
});

ArrowRightIcon.displayName = 'ArrowRightIcon';

export default ArrowRightIcon;
