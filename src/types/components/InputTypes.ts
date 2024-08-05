export type InputProps = {
  placeholder: string;
  type: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: Function;
  validation?: object;
  name?: string;
  error?: any;
  label?: string;
  disabled?: boolean;
}