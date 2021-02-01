import React from 'react'; 
import Typography from '@material-ui/core/Typography'; 
import { Grid } from '@material-ui/core';

 
export default function Ingredient({ingredient}) {  
  return ( 
    <Grid container direction='column'>  
      <Grid item>  
        <img  src={ingredient.image}  
        />
      </Grid>

      <Grid item>  
        <Typography component="h5" variant="h5">
          {ingredient.ingredient}
        </Typography>
      </Grid>
      <Grid item>  
        <Typography variant="subtitle1" color="textSecondary">
          {ingredient.measure}
        </Typography> 
      </Grid>
    </Grid>  
  );
}
  