import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export const ProductDetailsMainDiv = styled.div`
  background-color: rgb(240, 240, 240);
  min-height: fit-content;
  display: flex;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
`
export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 40px;
`
export const ProductDetailsImageDiv = styled.img`
  width: 300px;
  object-fit: contain;
  margin: 5px;
  align-self: center;
`
export const ProductDetailsContentDiv = styled.div`
  width: fit-content;
  margin-bottom: 30px;
`
export const ProductDetailsInfoDiv = styled.div`
  align-self: flex-start;
`
export const ProductDetailsCardDiv = styled.div`
  margin: 5px;
`