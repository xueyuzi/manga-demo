import styled from "styled-components";
export default styled.div`
  position: relative;
  height: 26px;
  padding: 0px 10px;
  color: #adadad;
  border: 1px solid #adadad;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  line-height: 24px;
  background-color: transparent;
  box-sizing: border-box;
  transition-property: color border-color;
  transition-duration: 0.3s;
  margin:10px;
  user-select:none;
  &:hover{
    color:white;
    background-color:#efc366;
    border:none;
  }
`;
