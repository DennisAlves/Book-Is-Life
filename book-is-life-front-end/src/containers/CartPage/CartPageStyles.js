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
  height: 100%;

`
export const CartPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;

`
export const CartPageItensTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 30px;
`
export const CartPageItensPriceWrapper = styled.div`
  align-self: flex-end;
  margin-right: 15px;
`
export const CartPageItensBottonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 15px;
`
export const CartPageItensWrapper = styled.div`
  margin-left: 15px;
  background-color: white;
  width: 90%;
`
export const CartPageItenWrapper = styled.div`
    display: flex;
  
`
export const CartPageDivWrapper = styled.div`
`
export const CartPageConfirmWrapper = styled.div`

`
export const Footer = styled.div`
  padding: 20px;
  background-color: rgb(230, 230, 230);
  text-align: center;
`