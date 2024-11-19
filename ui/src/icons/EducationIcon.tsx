import { forwardRef } from 'react';
import IIcons, { sizeMap } from './InterfacesIconProps';

const EducationIcon = forwardRef<SVGSVGElement, IIcons>(({ size = 'medium', color = '#000000', ...props }, ref) => {
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
      <path d="M174.5 80L96 47.7 17.5 80l33.8 13.9-8.1 28.4 52.8 22 52.8-22-8.1-28.4L160 86v26h8V82.7l6.5-2.7zm-35.3 37.7l-43.2 18-43.2-18L58.7 97 96 112.3 133.3 97l5.9 20.7zm-43.2-14L38.5 80 96 56.3 153.5 80 96 103.7z"/>
    </svg>
  );
});

EducationIcon.displayName = 'EducationIcon';

export default EducationIcon;
