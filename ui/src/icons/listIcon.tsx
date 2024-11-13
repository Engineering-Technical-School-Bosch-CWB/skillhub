import React, { forwardRef } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;  
  color?: string; 
}

const ListIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, color = '#000000', ...props }, ref) => {
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
      <path d="M32,64c-8.82227,0-16-7.17773-16-16s7.17773-16,16-16s16,7.17773,16,16S40.82227,64,32,64z M32,40c-4.41113,0-8,3.58887-8,8
	s3.58887,8,8,8s8-3.58887,8-8S36.41113,40,32,40z M32,112c-8.82227,0-16-7.17773-16-16s7.17773-16,16-16s16,7.17773,16,16
	S40.82227,112,32,112z M32,88c-4.41113,0-8,3.58887-8,8s3.58887,8,8,8s8-3.58887,8-8S36.41113,88,32,88z M32,160
	c-8.82227,0-16-7.17773-16-16s7.17773-16,16-16s16,7.17773,16,16S40.82227,160,32,160z M32,136c-4.41113,0-8,3.58887-8,8
	s3.58887,8,8,8s8-3.58887,8-8S36.41113,136,32,136z M176,44H56v8h120V44z M176,92H56v8h120V92z M176,140H56v8h120V140z"/>
    </svg>
  );
});

ListIcon.displayName = 'ListIcon';

export default ListIcon;
