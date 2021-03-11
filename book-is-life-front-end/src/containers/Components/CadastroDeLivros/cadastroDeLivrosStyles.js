import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
    }
`
export const AddBookWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
export const AddBookFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  justify-content:space-between;
`
export const AddBookButtonWrapper = styled.div`
`