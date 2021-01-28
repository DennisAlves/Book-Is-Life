import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
    }
`
export const AdressWrapper = styled.div`
  display: flex;
  gap: 10px;
`
export const AdressFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`