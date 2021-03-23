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
  min-height: 100vh;
`

export const Footer = styled.div`
  padding: 20px;
  background-color: rgb(230, 230, 230);
  text-align: center;
`

export const CheckOutPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  min-height:53.5vh;
`
export const CheckOutTopWrapper = styled.div`
  margin-bottom: 15px;
`
export const CheckOutAdressBottonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const CheckOutAdressWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`
export const CheckOutAdressButtomWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  
`
export const CheckOutAdressItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
export const CheckOutCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`
export const CheckOutCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const CheckOutCardItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 5px;
  height: 60px;
`
export const CheckOutResumeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`
export const CheckOutResumeItens = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 51.5vh;
`
export const CheckOutResumeAdress = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  width: 250px;
`
export const CheckOutResumeCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
`
export const CheckOutResumeCupom = styled.div`
  margin: 15px;
`


