
import styled from "styled-components";

export const Container = styled.div`
  padding: 50px;
  padding-top: 100px;
  background: #fff;
  max-width: 100%;
  overflow: auto;
  box-sizing: border-box;
  .wrap {
    width: 100%;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .form-group {
      margin-bottom: 0;
    }
    @media (max-width: 950px) {
      & {
        flex-direction: column;
        h1 {
          font-size: 1.5rem;
        }
      }
    }
  }
  pre code {
    text-shadow: none;
  }
  .shop-header__group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .shop-header__group button {
    margin-left: 10px;
  }
  .code {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    h3 {
      margin-bottom: 0;
    }
    .preview {
      label {
        margin-bottom: 0;
      }
      h3 {
        margin-bottom: 19.6px;
      }
      box-sizing: border-box;
      width: 49%;
      line-break: anywhere;
      & > pre {
        height: 100vh;
        overflow: auto;
      }
      & > div {
        textarea {
          &:focus {
            border: none !important;
            outline: none !important;
          }
          border: none !important;
          outline: none !important;
        }
        overflow: auto;
        height: 100vh;
        background: #2d2d2d !important;
        color: #ccc;
        text-shadow: none !important;
        pre {
          color: #ccc;
          text-shadow: none !important;
        }
      }
    }
    .output {
      & > div {
        height: 38px;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      width: 49%;
      box-sizing: border-box;
      & > pre {
        height: 100vh;
        overflow: auto;
        margin-top: 0;
        code {
          width: 100%;
          overflow: auto;
        }
      }
    }
  }
  @media (max-width: 950px) {
    .code {
      flex-direction: column;
      .preview,
      .output {
        width: 100%;
        max-width: 100%;
      }
    }
  }
  form {
    width: 100%;
    button:not(:last-of-type) {
      margin-right: 10px;
    }
  }
  #codeEditor {
  }
`;

export const Buttons = styled.div`
  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      margin-left: 0px !important;
      margin-top: 10px;
    }
  }
  button:not(:first-of-type) {
    margin-left: 10px;
  }
`;