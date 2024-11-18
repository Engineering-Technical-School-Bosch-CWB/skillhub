import { forwardRef } from 'react';
import IIcons, { sizeMap } from './InterfacesIconProps';

const AddIcon = forwardRef<SVGSVGElement, IIcons>(({ size = 'small', color = '#000000', ...props }, ref) => {
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
    <path d="M148.00005,100.00027h-47.99978v48.00013h-8.00053v-48.00013l-47.99995-0.00022v-8.00053l47.99995,0.00021V44.00048h8.00053
	v47.99925h47.99978V100.00027z M176,96c0,44.1123-35.8877,80-80,80s-80-35.8877-80-80s35.8877-80,80-80S176,51.8877,176,96z M168,96
	c0-39.70117-32.29883-72-72-72S24,56.29883,24,96s32.29883,72,72,72S168,135.70117,168,96z"/>
    </svg>
  );
});

AddIcon.displayName = 'AddIcon';

export default AddIcon;
