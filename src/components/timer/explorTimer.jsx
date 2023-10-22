import React, { useEffect, useState } from "react";


const Count = (props) => {
  const [countdown, setCountdown] = useState( Math.floor(props.items.expiryDate - Date.now()));

 
  useEffect(() => {
    setTimeout(() => {
      setCountdown(props.items.expiryDate - Date.now())  ;
    }, 1000);
  }, [countdown]);
function times(){
  if(countdown > 0){
    const seconds = countdown / 1000;
    const minutes = seconds / 60;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    const remainingSeconds = Math.floor((seconds % 60) % 60);
    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
  } 
 
  if (countdown - Date.now() === 0) {
    return "EXPIRED";
  } else{
    return "Null"
  }

}
  return (
  <>
  {countdown ? (
<div className="countdown">{times()}</div>
  ):(
    "Null"
  )}
  </>
  ); 
  };

export default Count;