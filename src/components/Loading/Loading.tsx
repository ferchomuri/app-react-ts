import React from "react";
import { ILoadingProps } from "../../types";
import "./Loading.css";
import Text from "../Text/Text";

const Loading: React.FC<ILoadingProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className='loading'>
          <svg viewBox='25 25 50 50'>
            <circle r='20' cy='50' cx='50'></circle>
          </svg>
          <Text text='Cargando la informacion' />
        </div>
      )}
    </>
  );
};

export default Loading;
