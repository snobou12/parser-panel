import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    min-width: 230px;
  }
  & button {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
  }
`;