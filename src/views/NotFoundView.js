import { Link } from "react-router-dom"

// Material-UI
import { Box, Button, Grid, Typography } from "@material-ui/core"


const NotFoundView = () => ( 
  <Grid container 
    xs={12} 
    justify="center" 
    style={{ marginTop: 15 }} 
    direction="column"
    alignItems="center"
  >  
    <Box>
      <Typography variant="h2" gutterBottom>
        Not Found
      </Typography>
    </Box>
    <Box>
      <Link to='/'>
        <Button 
          variant="contained"
          color="primary"   
        >
          Back to Home 
        </Button>  
      </Link>
    </Box>
  </Grid>
) 
export default NotFoundView