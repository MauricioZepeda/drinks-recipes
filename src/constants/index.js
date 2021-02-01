const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1' 

const imageURL = 'https://www.thecocktaildb.com/images/ingredients'
const imageSize = 'Small'

export const getBaseURL = () => baseURL
export const getImageURL = (strDrink = '') => `${ imageURL }/${ strDrink }-${imageSize}.png`