import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
export const CreditCardWrapper = styled.div`
  display: flex;
  gap: 10px;
`
export const CreditCardFieldsWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const CreditCardLineWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
`
export const CreditCardErrorMsg = styled.p`
  margin: 0 0 0 15px;
  padding: 0;
  width: 120px;
  text-align: left;
  font-size: 14px;
`

