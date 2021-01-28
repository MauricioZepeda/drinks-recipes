export class Message { 
  initialMessage = ''
  drinksfound = ''
  noDrinksFound = ''

  constructor(){ 
    this.initialMessage = 'Look for some recipes'
    this.drinksfound = 'drinks found'
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
      ? `${this.found()}  ${this.getFilterResume()}`
      : `${this.notFound()}  ${this.getFilterResume()}`
  ) 

  found = () => (
    `${this.total} ${this.drinksfound}`
  )

  notFound = () =>  this.noDrinksFound

  getTypes = () => { 
    const countTypes = this.query.types.length
    return (countTypes > 0) 
      ? `${countTypes} types`
      : null
  }

  getIngredients = () => {
    const countIngredients = this.query.ingredients.length > 0 
    return (countIngredients > 0) 
    ? `${this.query.ingredients.length} ingredients`
    : null
  }

  getName = () => (
    this.query.name.length > 0 
      ? 'a name' 
      : null
  )

  getFilterResume = () => {
    const resume = [this.getName(), this.getTypes(), this.getIngredients()]
    const resumeFinal = resume.filter(msg=>msg)
    const filteredBy = `filtered by ${resumeFinal.join(', ')}`
    return filteredBy
  }
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