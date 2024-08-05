import { TextProps } from "../../types";
import "./Text.css";

const Text: React.FC<TextProps> = (props) => {
  const { text, type, align = "left", wrap, size } = props;

  const className = `normal-text ${type || ""} ${wrap || ""}`;
  const style = { textAlign: align, fontSize: size };

  return (
    <p className={className} style={style}>
      {text}
    </p>
  );
};

export default Text;
