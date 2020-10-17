import React, { useState } from 'react'
import { ethers } from "ethers";
import { usePoller } from "../hooks";

export default function Balance(props) {
  const [balance, setBalance] = useState();


  const getBalance = async ()=>{
    if(props.address && props.provider){
      try{
        const newBalance = await props.provider.getBalance(props.address)
        setBalance(newBalance)
      }catch(e){
        console.log(e)
      }
    }
  }

  usePoller(()=>{getBalance()},props.pollTime?props.pollTime:1999)

  let floatBalance = parseFloat("0.00")

  let usingBalance = balance

  if(typeof props.balance != "undefined"){
    usingBalance = props.balance
  }

  if(usingBalance){
    let etherBalance = ethers.utils.formatEther(usingBalance)
    parseFloat(etherBalance).toFixed(2)
    floatBalance = parseFloat(etherBalance)
  }

  let displayBalance = floatBalance.toFixed(4)

  displayBalance = "$"+(floatBalance).toFixed(2)

  return (
    <span style={{verticalAlign:"middle",fontSize:props.size?props.size:24,padding:8,cursor:'pointer'}}>
      {displayBalance}
    </span>
  );
}
