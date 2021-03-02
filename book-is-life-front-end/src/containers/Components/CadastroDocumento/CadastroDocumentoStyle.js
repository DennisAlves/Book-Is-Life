import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
    }
`
export const DocumentoWrapper = styled.div`

`
export const DocumentoFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`