import { forwardRef } from 'react';
import IIcons, { sizeMap } from './InterfacesIconProps';

const ResultsIcon = forwardRef<SVGSVGElement, IIcons>(({ size = 'medium', color = '#000000', ...props }, ref) => {
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
      <path d="M55.6,32c-1.9-9.1-9.9-16-19.6-16c-10.7,0-19.5,8.5-20,19.1h0v105.5h0c0.3,10.1,8.1,18.3,18,19.3v0.1h142V32H55.6z M36,24
	c6.6,0,12,5.4,12,12l0,0l0.1,88.1c-3.4-2.6-7.6-4.1-12.1-4.1c-4.5,0-8.7,1.5-12,4V36C24,29.4,29.4,24,36,24z M168,152H36
	c-6.6,0-12-5.4-12-12s5.4-12,12-12c6.6,0,12,5.4,12.1,12.1l8-0.1L56,40h112V152z M156,140H68v-8h88V140z M75,118.6l-6-5.3l34.5-39.3
	L119.7,90l24-30H132v-8h24v24h-8v-8.6L120.3,102l-16.4-16.2L75,118.6z"/>
    </svg>
  );
});

ResultsIcon.displayName = 'ResultsIcon';

export default ResultsIcon;
