export type ButtonProps = {
  text: string;
  size?: "small-button" | "large-button" | "fixed-width-button";
  color?: "primary-button" | "secondary-button" | "transparent-button";
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
}