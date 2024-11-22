import React, { forwardRef } from "react";
import styles from "./Subtitle.module.css";

type SubtitleProps = {
  children: React.ReactNode;
  className?: string;
};

const Subtitle = forwardRef<HTMLHeadingElement, SubtitleProps>(
  ({ children, className = "", ...props }, ref) => (
    <h2 ref={ref} className={`${styles.subtitle} ${className}`} {...props}>
      {children}
    </h2>
  )
);

Subtitle.displayName = "Subtitle";

export default Subtitle;
