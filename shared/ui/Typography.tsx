import React, { FC, ReactNode } from "react";

interface TypographyProps {
  as?: "h1" | "h2" | "h3" | "p";
  children: ReactNode;
  className?: string;
}

export const Typography: FC<TypographyProps> = ({
  as,
  children,
  className,
}) => {
  switch (as) {
    case "h1":
      return (
        <h1 className={`text-3xl font-bold text-gray-800 ${className}`}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={`text-xl font-semibold mb-4  ${className}`}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={`text-lg font-bold mb-3 ${className}`}>{children}</h3>
      );
    case "p":
      return (
        <p className={`text-gray-600 ${className}`}>{children}</p>
      );
    default:
      return <span className={` ${className}`}>{children}</span>;
  }
};
