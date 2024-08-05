import React, { CSSProperties } from "react";
import { ImageProps } from "../../types";

const Image: React.FC<ImageProps> = ({ src, alt, style }) => {
  const styleImage: CSSProperties = style || {
    height: "50px",
  };

  return <img src={src} alt={alt} style={styleImage} />;
};

export default Image;
