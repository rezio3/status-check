import React from "react";

export const TextColor = {
  Danger: "text-danger",
  Success: "text-success",
  Muted: "text-muted",
} as const;

export type TextColor = (typeof TextColor)[keyof typeof TextColor];

type TextTypeProps = {
  as?: "span" | "p";
  children: React.ReactNode;
  color?: TextColor;
  style?: React.CSSProperties;
  className?: string;
};

const Text: React.FC<TextTypeProps> = ({
  as: Tag = "p",
  children,
  color,
  style,
  className = "",
}) => {
  const combinedClasses = [color, className].filter(Boolean).join(" ");

  return (
    <Tag style={style} className={`${combinedClasses || undefined} mb-0`}>
      {children}
    </Tag>
  );
};

export default Text;
