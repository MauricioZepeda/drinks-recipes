import React, { useState, useEffect } from 'react'; 
import noimage from '../images/noimage.svg'

//Material-UI 
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid' 
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider'; 


const DrinkDetailCard = ({drink, setDrinkSelected}) => {    

  const handlerBackToHome = () => {  
    setDrinkSelected(null)
  } 

  const {
    strDrink,
    strAlcoholic,
    strCategory,
    listIngredients, 
    listMeasures,
    strDrinkThumb,
    strGlass,
    strInstructions 
  } = drink

  return (
    <>  
      <Grid container justify='center' style={{ marginTop: 30 }} > 
        <Box  
          bgcolor="#f5f5f5" 
          p={2}
          borderRadius={15} 
          textAlign="center" 
          width='70%'
          
        >
        <Grid container justify="space-around">           
          <img    
            style={{ width: '40%', paddingTop: 15 }} 
            src={strDrinkThumb || noimage} 
            alt={strDrink} 
          />  

          <Grid item xs={6}>
            <Box px={2}>  
              <List>  
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Name: ${strDrink}`}  />
                </ListItem>
                <Divider variant="inset" component="li" />


                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Type: ${strAlcoholic}`} />
                </ListItem>
                <Divider variant="inset" component="li" />

                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Category: ${strCategory}`} /> 
                </ListItem>
                <Divider variant="inset" component="li" />


                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Glass: ${strGlass}`} />
                </ListItem>
                <Divider variant="inset" component="li" />


              </List>
            </Box>
          </Grid> 
        </Grid> 
        </Box> 
      </Grid>

      <Grid container xs={12} justify="center" direction="column">
          <Box mt={5}>  
            <Button 
              variant="contained"
              color="primary" 
              onClick={ handlerBackToHome } 
            >
              Back to list 
            </Button>  
          </Box>
        </Grid>
    </>
  )
}

export default DrinkDetailCard