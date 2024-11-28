import React, { forwardRef } from "react";
import styles from "./Heading.module.css";

type HeadingProps = {
  children: React.ReactNode;
  level?: 3 | 4 | 5;
  className?: string;
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 3, className = "", children, ...props }, ref) => {
    const Tag: React.ElementType = `h${level}`;
    const sizeClasses: Record<number, string> = {
      3: styles.h1,
      4: styles.h2,
      5: styles.h3,
    };

    return (
      <Tag ref={ref} className={`${sizeClasses[level]} ${className}`} {...props}>
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
