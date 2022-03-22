
import styled from "styled-components";

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

export const Container = styled.div`
  padding: 50px;
  padding-top: 100px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    h1 {
      margin-bottom: 0;
    }
    @media (max-width: 950px) {
      & {
        h1 {
          font-size: 1.5rem;
        }
        margin-bottom: 10px;
      }
    }
  }
  background-color: #fff;
  form {
    textarea {
      display: block;
      margin-bottom: 16px;
      width: 100%;
      box-sizing: border-box;
      padding: 0.375rem 0.75rem;
      font-size: 0.9375rem;
      border-radius: 3px;
      font-family: inherit;
      border: 1px solid rgba(0, 40, 100, 0.12);
    }
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
    @media (max-width: 950px) {
      & {
        flex-direction: column;
        .preview,
        .output {
          width: 100% !important;
          max-width: 100% !important;
        }
      }
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
        text-shadow: none !important;
        code {
          width: 100%;
          overflow: auto;
        }
      }
    }
  }
`;