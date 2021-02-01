export class Message { 
  initialMessage = ''
  drinksfound = ''
  noDrinksFound = ''

  constructor(){ 
    this.initialMessage = 'Look for some drinks recipes'
    this.drinksfound = 'drinks found'
    this.drinkfound = 'drink found'
    this.noDrinksFound = 'No drinks found'
  }

  getMessage = () => this.initialMessage
}

export class Search extends Message { 
  total = 0
  query = []
  
  constructor(total, query, message, drinksfound, noDrinksFound){
    super({ message, drinksfound, noDrinksFound }) 
    this.total = total
    this.query = query
  } 
  
  getMessage = () => (
    this.total > 0  
      ? `${this.found()} ${this.getFilterResume()}`
      : `${this.notFound()}  ${this.getFilterResume()}`
  ) 

  found = () => (
    `${this.total} ${ (this.total === 1) ? this.drinkfound : this.drinksfound},`
  )

  notFound = () =>  this.noDrinksFound

  checkPluralWord = (word, count) =>{
    const plural = count > 1 ? 's' : '' 
    return word + plural
  }

  getTypes = () => { 
    const countTypes = this.query.types.length
    return (countTypes > 0) 
      ? `${countTypes} ${this.checkPluralWord('type', countTypes)}`
      : null
  }

  getIngredients = () => {
    const countIngredients = this.query.ingredients.length   
    return (countIngredients > 0) 
    ? `${countIngredients} ${this.checkPluralWord('ingredient', countIngredients)}`
    : null
  }

  getName = () => (
    this.query.name.length > 0 
      ? `name "${this.query.name}"` 
      : null
  )

  getFilterResume = () => {
    const resume = [this.getName(), this.getTypes(), this.getIngredients()]
    const resumeFinal = resume.filter(msg=>msg)
    const filters = resumeFinal.length === 1 ?  resumeFinal[0] : this.getFilters(resumeFinal)
    const filteredBy = `filtered by: ${ filters }`
    return filteredBy
  }

  getFilters = (resumeFinal) => (
    (resumeFinal.length === 2) 
      ? `${resumeFinal[0]} and ${resumeFinal[1]}`
      : `${resumeFinal[0]}, ${resumeFinal[1]} and ${resumeFinal[2]}` 
  )
}

export class Favorite extends Message {
  total = 0
  messageFavorite = ''

  constructor(total, message, drinksfound, noDrinksFound){
    super({ message, drinksfound, noDrinksFound })
    this.total = total 
    this.messageFavorite = 'on your favorites';
  }

  getMessage = () => (this.total > 0) ? this.found() : this.notFound()

  found = () => `${this.total} ${this.drinksfound} ${this.messageFavorite}`
  notFound = () =>  `${this.noDrinksFound} ${this.messageFavorite}`
}