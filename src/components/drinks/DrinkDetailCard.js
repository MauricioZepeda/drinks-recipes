import React from 'react' 
import noimage from '../../images/noimage.svg'

//Material-UI 
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid' 
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import LocalBarIcon from '@material-ui/icons/LocalBar'
import CategoryIcon from '@material-ui/icons/Category' 
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import LocalDrinkIcon from '@material-ui/icons/LocalDrink'
import Divider from '@material-ui/core/Divider'
import DrinksIngredients from './DrinksIngredients'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import Typography from '@material-ui/core/Typography'

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
          <Grid item xs={6}>
            <img     
              style={{ width: '80%', paddingTop: 15 }} 
              src={strDrinkThumb || noimage} 
              alt={strDrink} 
            />  
          </Grid>
          <Grid item xs={6}>
            <Box> 
              <Typography variant="h3" gutterBottom>
                {strDrink}
              </Typography> 
            </Box>
            <Box px={2}>  
              <List>   
 
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalBarIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Type: ${strAlcoholic}`} />
                </ListItem>
                <Divider variant="inset" component="li" />

                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CategoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Category: ${strCategory}`} /> 
                </ListItem>
                <Divider variant="inset" component="li" />


                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalDrinkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Glass: ${strGlass}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FormatListNumberedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Instructions: ${strInstructions}`} /> 
                </ListItem>
                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DeviceHubIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Ingredients`} /> 
                </ListItem>

              </List>
            </Box>
            <Box> 
              <DrinksIngredients 
                listIngredients={listIngredients} 
                listMeasures={listMeasures} 
              />
            </Box>
          </Grid> 
        </Grid> 
        </Box> 
      </Grid>

      <Grid container xs={12} justify="center" style={{ marginTop: 15 }}> 
            <Button 
              variant="contained"
              color="primary" 
              onClick={ handlerBackToHome } 
            >
              Back to list 
            </Button>   
        </Grid>
    </>
  )
}

export default DrinkDetailCard