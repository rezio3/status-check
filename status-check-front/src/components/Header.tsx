import React from "react";

type HeaderTypeProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Header: React.FC<HeaderTypeProps> = ({
  as: Tag,
  children,
  style,
  className = "",
}) => {
  return (
    <Tag style={style} className={className}>
      {children}
    </Tag>
  );
};

export default Header;
