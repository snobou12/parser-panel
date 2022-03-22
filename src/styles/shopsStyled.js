import styled from "styled-components";


export const Container = styled.main`
  padding:20px;
  padding-top: 100px;
  background: #fff;
  header {
    display: flex;
    & > button {
      margin-left: 5px;
    }
    h1 {
      margin-right: auto;
    }
    @media (max-width: 950px) {
      & {
        align-items: center;
        flex-direction: column;
        margin-bottom: 10px;
        a {
          margin-bottom: 5px;
        }
        h1 {
          font-size: 1.5rem;
          margin: 0;
          margin-bottom: 20px;
        }
      }
    }
    align-items: center;
  }
  input[type="checkbox"] {
    cursor: pointer;
    width: 18px;
    height: 18px;
    outline: none;
    display: inline-block;
    padding: 5px;
  }
  table {
    tr {
      td {
      }
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .shops-status__green {
    background-color: greenyellow;
  }

  .shops-status__red {
    background-color: red;
  }
  .shops-status__orange{
    background-color:orange;
  }
  td{
    border-bottom:solid 1.5px gray !important;
    border-top:solid 1.5px gray !important;

  }
`;