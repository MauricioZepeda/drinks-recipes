export default class Utils {   
  static sortListBy = async (list, sortBy) => (
    await list.sort((a, b) => a[sortBy].localeCompare(b[sortBy])) 
  ) 

  static removeDuplicates = async(list) => (
    await Array.from(new Set(list)) 
  )

  static saveOnLocalStorage = async(key, value) => (
    await localStorage.setItem(key, JSON.stringify(value)) 
  )

  static getFromLocalStorage = async(key) => (
    await JSON.parse(localStorage.getItem(key))
  ) 

  static getDrinkInfoByKeyName = (drink, keyname) => { 
    const keysFound = Object.keys(drink).filter(key => (
      key.includes(keyname) && drink[key] 
    ))
    const infoFound = keysFound.map(key => drink[key].trim()) 
    return infoFound
  }
}