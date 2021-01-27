import React from 'react'; 
import Badge from '@material-ui/core/Badge'; 

const Counter = ({ count = 0, showZero = true , children = null, invisible = false }) => {
  return ( 
    <>
      <Badge  
        max={999} 
        badgeContent={count} 
        color={ (count > 0) ? "primary" : "error"}
        showZero={ showZero ? true : false }
        invisible={invisible}
      >
        {children}
      </Badge>       
    </>
  );
}

export default Counter;