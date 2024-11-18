import { forwardRef } from 'react';
import IIcons, { sizeMap } from './InterfacesIconProps';

const ArrowLeftIcon = forwardRef<SVGSVGElement, IIcons>(({ size = 'small', color = '#000000', ...props }, ref) => {
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
            <path d="M81.17139,118.82861L58.34326,96l22.82812-22.82861l5.65723,5.65723L73.65686,92H136v8H73.65686l13.17175,13.17139
	L81.17139,118.82861z M16,96c0-44.1123,35.8877-80,80-80s80,35.8877,80,80s-35.8877,80-80,80S16,140.1123,16,96z M24,96
	c0,39.70117,32.29883,72,72,72s72-32.29883,72-72s-32.29883-72-72-72S24,56.29883,24,96z"/>
        </svg>
    );
});

ArrowLeftIcon.displayName = 'ArrowLeftIcon';

export default ArrowLeftIcon;
