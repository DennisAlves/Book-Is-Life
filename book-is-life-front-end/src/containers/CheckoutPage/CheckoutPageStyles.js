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
export const CheckOutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;

`
export const CheckOutItensTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 30px;
`
export const CheckOutItensPriceWrapper = styled.div`
  align-self: flex-end;
  margin-right: 15px;
`
export const CheckOutItensBottonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 15px;
`
export const CheckOutItensWrapper = styled.div`
  background-color: white;
  width: 90%;
`
export const CheckOutItenWrapper = styled.div`
    display: flex;
  
`
export const CheckOutDivWrapper = styled.div`
`
export const CheckOutConfirmWrapper = styled.div`

`
export const Footer = styled.div`
  padding: 20px;
  background-color: rgb(230, 230, 230);
  text-align: center;
`
