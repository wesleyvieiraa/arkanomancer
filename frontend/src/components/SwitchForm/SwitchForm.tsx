import { FormControlLabel, Switch } from "@mui/material";

interface Props {
  label: string;
}

export function SwitchForm({ label }: Props) {
  return <FormControlLabel control={<Switch />} label={label} />;
}
