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
`

export const MainDiv = styled.div`
    background-color: rgb(240,240,240);
    text-align: center;
    min-height: 80vh;
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
`
