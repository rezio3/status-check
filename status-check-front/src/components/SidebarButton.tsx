import { Button } from "@mui/material";

const SidebarButton = ({ label }: { label: string }) => {
  return (
    <Button
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        color: "black",
        fontSize: 14,
        fontWeight: 400,
      }}
    >
      {label}
    </Button>
  );
};

export default SidebarButton;
