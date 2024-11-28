import React, { forwardRef } from "react";
import styles from "./Title.module.css";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children, className = "", ...props }, ref) => (
    <h1 ref={ref} className={`${styles.title} ${className}`} {...props}>
      {children}
    </h1>
  )
);

Title.displayName = "Title";

export default Title;
