import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(150px, 5vw) 1fr;


  &.active{
    grid-template-columns: 1fr;
    & > div:first-of-type {
      display: none;
    }
  }
  @media (max-width: 950px) {
    & {
      grid-template-columns: 1fr;
      & > div:first-of-type {
        display: none;
      }
    }
  }
  & > button {
    
    z-index: 1001;
    border: none;
    outline: none;
    background: transparent;
    position: fixed;
    top: 5px;
    left: 5px;
    cursor: pointer;
    &.active {
      svg {
        color: #fff;
      }
    }
    svg {
      transition: all 0.3s ease-in-out;
      width: 30px;
      height: 30px;
    }
  }
`

export const Nav = styled.nav`
  z-index: 1000;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 5vw;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 40px;
  overflow: auto;
  background-color: #121828;
 
    & {
      left: -300px;
      transition: all 0.3s ease-in-out;
    }
    &.active {
      left: 0;
    }

  a, button {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    padding: 9px 24px;
    color: #D1D5DB;
    &:not(:last-of-type) {
      margin-bottom: 5px;
    }
    &:hover, &:focus {
      text-decoration: none;
      background-color: rgba(255,255,255, 0.08);
    }
    border-radius: 8px;
  }
  button {
    margin-top: auto;
  }
`