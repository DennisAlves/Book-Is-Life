import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
    }
`

export const CustomHeader = styled.div`
    padding: 5px 15px 5px 10px;
    background-color: rgb(230,230,230);
    text-align: left;
    display: flex;
`
export const HeaderLinks = styled.div`
    margin-left: 3px;
    width: 25%;
    display: flex;
    justify-content: center;
   
`
export const HomeLogoWraper = styled.div`
  width: 75%;
  margin-left: 5%;
`
export const HomeLogo = styled.div`
  cursor: pointer;
  width: 20%;
`
export const HeaderLink = styled.p`
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
`

export const MainDiv = styled.div`
    background-color: rgb(240,240,240);
    text-align: center;
`

export const Footer = styled.div`
    padding: 20px;
    background-color: rgb(230,230,230);
    text-align: center;
`

export const BodyTitle = styled.h1`
`

export const Mid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  min-height: 78vh;
`
