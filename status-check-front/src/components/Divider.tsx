type DivierPropsType = {
  variant: "left" | "top" | "right" | "bottom";
  className?: string;
};

const Divider: React.FC<DivierPropsType> = ({ variant, className = "" }) => {
  const borderDefault = "1px solid var(--divider-color)";
  const borderStyles: React.CSSProperties = {
    left: { borderLeft: borderDefault },
    top: { borderTop: borderDefault },
    right: { borderRight: borderDefault },
    bottom: { borderBottom: borderDefault },
  }[variant];
  return <div className={className} style={borderStyles} />;
};

export default Divider;
