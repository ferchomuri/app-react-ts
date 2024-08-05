import React from "react";
import { ContainerProps } from "../../types";
import "./Container.css";

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

export default Container;
