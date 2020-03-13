import React from "react";
import styled from "styled-components";
interface PropsModel {
  pageNum: number;
  className: string;
}


export const LoadingNumBox = styled.div`
  position: fixed;
  background-image: url(./loading-texture.png);
  font-size: 300px;
  font-weight: bold;
  background-size: 130px;
  background-position: 50% 100%;
  background-repeat: repeat-x;
  background-clip: text;
  -webkit-background-clip: text;
  background-color: #2e2e2e;
  color: transparent;
  animation: 1.4s linear 0s infinite ComicPage-loading;
  @keyframes ComicPage-loading {
    0% {
      background-position: 0 100%;
    }

    100% {
      background-position: 130px 100%;
    }
  }
`;
const LoadingPageNumComponent = (props: PropsModel) => {
  return (
    <LoadingNumBox className={props.className}>{props.pageNum}</LoadingNumBox>
  );
};

export default LoadingPageNumComponent;
