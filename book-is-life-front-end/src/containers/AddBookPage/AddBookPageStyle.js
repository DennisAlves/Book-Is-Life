import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export const CustomHeader = styled.div`
  padding: 5px 15px 5px 10px;
  background-color: rgb(230, 230, 230);
  text-align: left;
`

export const HomeLogo = styled.div`
  cursor: pointer;
  width: 75%;
  margin-left: 5%;

`

export const MainDiv = styled.div`
  background-color: rgb(240, 240, 240);
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  
`
export const Footer = styled.div`
  padding: 20px;
  background-color: rgb(230, 230, 230);
  text-align: center;
`
export const AddBookWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 25px;
`;
export const AddBookPageWrapper = styled.div`
  display: flex;
  width: max-content;
`;
export const AddBookImageWrapper = styled.img`
  object-fit: contain;
  width: 200px;
  height: 320px;
`
export const AddBookImageUploadWrapper = styled.div`
  margin: 15px;
`
