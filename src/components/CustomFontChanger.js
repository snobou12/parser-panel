import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'tabler-react';
import { handleDecrementFont, handleIncrementFont } from '../store/slices/root';

const CustomFontChanger=()=> {
  const dispatch=useDispatch();
  const handleAugment=()=>{
    dispatch(handleIncrementFont());
  }
  const handleReduction=()=>{
    dispatch(handleDecrementFont());
  }

  return (
    <>
      <Button color="green" onClick={handleAugment} >↑</Button>
      <Button color="red" onClick={handleReduction}>↓</Button>
    </>   
  )
}

export default CustomFontChanger;
