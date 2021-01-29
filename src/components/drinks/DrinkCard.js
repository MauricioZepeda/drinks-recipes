import React, { useState, useContext, useEffect } from 'react';  
import noimage from '../../images/noimage.svg'

// Utils
import Utils from '../../utils';

// Context
import { DrinksContext } from '../../contexts/DrinksContext'; 

// Material-UI
import Card from "@material-ui/core/Card"; 
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import Typography from "@material-ui/core/Typography"; 
import IconButton from '@material-ui/core/IconButton';  
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { makeStyles } from "@material-ui/core/styles"; 

const useStyles = makeStyles(() => ({
  root: { 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 300, 
    height: 550,
    marginBottom: 30,
    borderRadius: 15 
  },  
  image: {
    height: '60%',
  }, 
  favorite: {
    fontSize: 40
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  } 
}))

const DrinkCard = ({drink})=> {
  const [ isFavorite, setIsFavorite ] = useState(false) 
  const [ ingredients, setIngredients ] = useState([])  
  const [ shadow, setShadow ] = useState(3)  

  useEffect(()=>{
    getIngredients(drink)
    checkFavorite(drink)
  },[]) 
  
  const { 
    listFavorites, 
    getDrinkSelectedDetail,
    setListFavorites,
    setDrinkToView
  } = useContext(DrinksContext); 
  const classes = useStyles(); 

  const onMouseOver = () => setShadow(10);
  const onMouseOut = () => setShadow(3);

  const checkFavorite = (drink) => {
    const exist = listFavorites.some(favorite=> favorite.idDrink === drink.idDrink)
    setIsFavorite(exist)
  }

  const getIngredients = (drink) =>{ 
    const ingredientsFormated = drink.listIngredients.join(' | ')
    setIngredients(ingredientsFormated) 
  }
  
  const handlerFavorite = async() =>{
    setIsFavorite(!isFavorite)  
    const favorites = (!isFavorite)
    ? [...listFavorites, drink] 
    : listFavorites.filter(favorite => favorite.idDrink !== drink.idDrink)  
    
    await Utils.saveOnLocalStorage("listFavorites", favorites)
    setListFavorites(favorites)
  }

  const handlerViewDetails = () => {
    getDrinkSelectedDetail(drink.idDrink)
  }

  const { strDrink = '', strDrinkThumb = ''} = drink   
  return (
    <Card 
      className={classes.root} 
      elevation={shadow}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}     
    >       
      <img 
        loading="lazy"  
        className={classes.image} 
        src={strDrinkThumb ? strDrinkThumb : noimage} 
        alt={strDrink} 
      /> 

      <CardContent className={classes.information}>
        <Typography gutterBottom variant="h5">
          {strDrink}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {ingredients}
        </Typography>
      </CardContent>

      <CardActions className={classes.buttons}>
        <IconButton aria-label="add to favorites" onClick={handlerFavorite}>
          { isFavorite
            ? <FavoriteIcon fontSize='large' color='error' />
            : <FavoriteBorderOutlinedIcon fontSize='large' color='disabled' />
          }
        </IconButton>

        <IconButton aria-label="view details" onClick={handlerViewDetails}>
          <AddIcon fontSize='large' /> 
        </IconButton>  
      </CardActions>
    </Card>
  );
    
}

export default DrinkCard;