import React, { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;  
  color?: string; 
}

const FolderIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = '#000000', ...props }, ref) => {
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
      <path d="M160,160H32c-8.82227,0-16-7.17773-16-16V32h53.65674l12,12H176v100C176,152.82227,168.82227,160,160,160z M24,40v104
	c0,4.41113,3.58887,8,8,8h128c4.41113,0,8-3.58887,8-8V52H78.34326l-12-12H24z"/>
    </svg>
  );
});

FolderIcon.displayName = 'FolderIcon';

export default FolderIcon;
