import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Open Sans', sans-serif;
        background: #f1f1f1;
    }
`;

export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-flow: column wrap;
    width: 100%;
    min-height: 100vh;
`

export const Button = styled.button`
    outline: none;
    background: none;
    cursor: pointer;
    border:none;
`