import { SyncLoader } from 'react-spinners' 

import Grid from '@material-ui/core/Grid' 
import Box from '@material-ui/core/Box'


const Loading = () => {
  return ( 
    <Grid container justify="center" alignItems="center" direction="column"> 
      <Grid item xs={1} >
        <SyncLoader />
      </Grid> 
    </Grid>  
  )
}

export default Loading;