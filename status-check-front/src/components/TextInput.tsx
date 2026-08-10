import { TextField } from "@mui/material";

type TextInputPropsType = {
  inputValue: string;
  setInputValue: (value: string) => void;
  isPending: boolean;
  label: string;
  icon?: React.ReactNode;
};

const TextInput = ({
  inputValue,
  setInputValue,
  isPending,
  label,
  icon,
}: TextInputPropsType) => {
  return (
    <TextField
      id="outlined-basic"
      sx={{
        width: "300px",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.23)",
          },
        },
        "& .MuiInputBase-input": {
          backgroundColor: "transparent !important",
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
          transition: "background-color 5000s ease-in-out 0s",
        },
      }}
      label={
        <div className="d-flex align-items-center gap-2">
          {icon && icon}
          <span>{label}</span>
        </div>
      }
      variant="outlined"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      disabled={isPending}
    />
  );
};

export default TextInput;
