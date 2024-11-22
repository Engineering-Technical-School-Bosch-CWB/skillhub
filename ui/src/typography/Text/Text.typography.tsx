import React, { forwardRef } from "react";
import styles from "./Text.module.css";

type TextProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  weight?: "light" | "normal" | "bold";
  className?: string;
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = "md", weight = "normal", children, className = "", ...props }, ref) => {
    const sizeClasses: Record<string, string> = {
      sm: styles.small,
      md: styles.medium,
      lg: styles.large,
    };

    const weightClasses: Record<string, string> = {
      light: styles.light,
      normal: styles.normal,
      bold: styles.bold,
    };

    return (
      <p
        ref={ref}
        className={`${styles.text} ${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";

export default Text;
