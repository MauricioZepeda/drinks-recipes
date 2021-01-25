import React from 'react'; 
import Badge from '@material-ui/core/Badge'; 

const Counter = ({ count = 0, showZero = true , children = null }) => {
  return ( 
    <>
      <Badge  
        max={999} 
        badgeContent={count} 
        color={ (count > 0) ? "primary" : "error"}
        showZero={ showZero ? true : false }
      >
        {children}
      </Badge>       
    </>
  );
}

export default Counter;